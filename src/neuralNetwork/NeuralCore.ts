import { Neuron } from "./Neuron";
import { Connection } from "./Connection";
import { TrainSample, Activations } from "./HelperClasses";

export class NeuralCore {
  private inputSize: number;
  private hiddenLayerSizes: number[];
  private outputSize: number;

  private layerCnt: number;

  private rate = 1;

  private biasNeuron = new Neuron('bias', true);
  private neurons: Neuron[][] = [];
  private connections: Connection[][] = [];

  private trainSamples: TrainSample[] = [];

  constructor(inputSize: number, hiddenLayerSizes: number[], outputSize: number) {
    this.inputSize = inputSize;
    this.hiddenLayerSizes = hiddenLayerSizes;
    this.outputSize = outputSize;
    this.layerCnt = hiddenLayerSizes.length + 2;

    // Reset
    this.neurons = [];
    this.connections = [];

    this.init();
  }

  private init() {
    // Create the neurons
    for (let l = 0; l < this.layerCnt; l++) {
      // How many neurons are in each layer?
      let neuronsInLayerCnt = 0;
      switch (l) {
        case 0:
          neuronsInLayerCnt = this.inputSize;
          break;
        case this.hiddenLayerSizes.length + 1:
          neuronsInLayerCnt = this.outputSize;
          break;
        default:
          neuronsInLayerCnt = this.hiddenLayerSizes[l - 1];
          break;
      }

      this.neurons[l] = [];

      // Create them
      for (let n = 0; n < neuronsInLayerCnt; n++) {
        this.neurons[l][n] = new Neuron(`Neuron${l}${n}`);
        if (l == 0) {
          this.neurons[l][n].setAsInputNeuron(0); // just to avoid crashes, the 0 should be overriden later 
        }
      }
    }

    // Create the Connections
    this.createConnections(0, this.layerCnt - 1);
  }

  public evaluate(input: number[]): number[] {
    if (input.length != this.inputSize) {
      throw 'Input size does not match';
    }
    // Reset, so each neuron is recalculated
    this.neurons.forEach(layer => { layer.forEach(neuron => neuron.reset()) })
    // Set input layer
    this.neurons[0].forEach((neuron, idx) => { neuron.setInput(input[idx]) });

    this.neurons[this.layerCnt - 1].forEach(neuron => {
      neuron.calculateActivation();
    });

    return this.neurons[this.layerCnt - 1].map(neuron => neuron.getActivation());
  }

  public addTrainingSet(input: number[], output: number[]) {
    this.trainSamples.push(new TrainSample(input, output))
  }

  public getCost(): number {
    if (this.trainSamples.length == 0) {
      return 0;
    }

    const costSum = this.trainSamples.reduce((costSum, sample) => { // Add up all samples
      this.evaluate(sample.input);
      return costSum + this.neurons[this.layerCnt - 1].reduce((acc, neuron, i) => { // Add up all output neurons
        return acc + (neuron.getActivation() - sample.output[i]) ** 2;
      }, 0);
    }, 0);

    return 1 / 2 * costSum * (1 / this.trainSamples.length);
  }

  public train() {
    this.trainSamples.forEach((sample) => {
      this.evaluate(sample.input)

      // Calculate sigmas of the last layer
      this.neurons[this.layerCnt - 1].forEach((neuron, idx) => {
        const newSigma =
          (sample.output[idx] - neuron.getActivation()) * Activations.SIGMOID.der(neuron.getActivation());

        neuron.setSigma(newSigma);
      });

      // Calculate sigmas for each neuron in the lower layers
      for (let l = this.layerCnt - 2; l >= 0; l--) {
        this.neurons[l].forEach((neuron) => {
          const newSigma =
            neuron.getOutputs().reduce((acc, connection) => {
              return acc + connection.getOutputNeuron().getSigma() * connection.getWeight();
            }, 0) * Activations.SIGMOID.der(neuron.getActivation());
          neuron.setSigma(newSigma);
        });
      }

      // Accumulate all weight updates
      this.connections.forEach((connLayer) => {
        connLayer.forEach((connection) => {
          const weightChange =
            connection.getOutputNeuron().getSigma() *
            connection.getInputNeuron().getActivation() *
            this.rate;

          connection.addSampleWeightChange(weightChange);
        });
      });
    });

    // Uff, let's hope everything works and apply the magic
    this.connections.forEach((connLayer) => {
      connLayer.forEach((connection) => {
        connection.applyAverageWeightChange();
      });
    });
  }

  public addOrRemoveLayer(add: boolean) {
    if (add) {
      const newLayerSize = 3;
      this.hiddenLayerSizes.push(newLayerSize);
      this.layerCnt++;

      // Create the new neurons
      this.createLayerOfNeurons(this.layerCnt - 2, newLayerSize);

      // Recreate the last layer
      this.createLayerOfNeurons(this.layerCnt - 1, this.outputSize);

      // Recreate all necessary connections
      this.createConnections(this.layerCnt - 3, this.layerCnt - 1);
    } else {
      if (this.layerCnt == 2) {
        return;
      }

      this.hiddenLayerSizes.pop();
      this.layerCnt--;
      this.neurons.pop();
      this.connections.pop();

      // Recreate the last layer
      this.createLayerOfNeurons(this.layerCnt - 1, this.outputSize);

      // Recreate all necessary connections
      this.createConnections(this.layerCnt - 2, this.layerCnt - 1);
    }
  }

  // This function is very long and ugly, I dont want to simply rebuild the network because I want to keep the weights
  public addOrRemoveNeuron(add: boolean, layerIdx: number) {
    const isInput = layerIdx == 0;
    const isOutput = layerIdx == this.layerCnt - 1;
    const isHidden = !isInput && !isOutput;
    
    const sizeChange = (add) ? 1 : -1

    if (isHidden) {
      this.hiddenLayerSizes[layerIdx - 1] += sizeChange;
    }
    else if (isInput) {
      this.inputSize += sizeChange;
      this.trainSamples = [];
    } else {
      this.outputSize += sizeChange;
      this.trainSamples = [];
    }

    if (add) {
      let newNeuronIdx;

      if (isHidden) {
        newNeuronIdx = this.hiddenLayerSizes[layerIdx - 1] - 1;
      }
      else if (isInput) {
        newNeuronIdx = this.inputSize - 1;
      } else {
        newNeuronIdx = this.outputSize - 1;
      }  

      const newNeuron = new Neuron(`Neuron${layerIdx}${newNeuronIdx}`);
      this.neurons[layerIdx][newNeuronIdx] = newNeuron;

      if (isInput)
        newNeuron.setAsInputNeuron(0);

      //// Add connections from the prev layer
      if (!isInput) {
        this.neurons[layerIdx - 1].forEach((neuron) => {
          const connection = new Connection(neuron, newNeuron);
          neuron.addOutput(connection);
          newNeuron.addInput(connection);
          this.connections[layerIdx - 1].push(connection);
        });
        // Dont forget the bias
        const connection = new Connection(this.biasNeuron, newNeuron);
        newNeuron.addInput(connection);
        this.connections[layerIdx - 1].push(connection);
      }

      if (!isOutput) {
        //// Add connections to the next layer
        this.neurons[layerIdx + 1].forEach((neuron) => {
          const connection = new Connection(newNeuron, neuron);
          neuron.addInput(connection);
          this.connections[layerIdx].push(connection);
        });
      }
    } else {
      const removedNeuron = this.neurons[layerIdx].pop();
      // Remove outputs from the prev layer
      if (!isInput) {
        this.neurons[layerIdx - 1].forEach((neuron) => {
          neuron.setOutputs(neuron.getOutputs().filter((connection) => {
            return connection.getOutputNeuron().getName() != removedNeuron.getName();
          }));
        });
      }

      // Remove input in the next layer
      if (!isOutput) {
        this.neurons[layerIdx + 1].forEach((neuron) => {
          neuron.setInputs(neuron.getInputs().filter((connection) => {
            return connection.getInputNeuron().getName() != removedNeuron.getName();
          }));
        });
      }

      // Remove the unused connections
      if (!isInput) {
        this.connections[layerIdx-1] = this.connections[layerIdx-1].filter((connection: Connection) => {
          return connection.getOutputNeuron().getName() != removedNeuron.getName();
        });
      }

      if (!isOutput) {
        this.connections[layerIdx] = this.connections[layerIdx].filter((connection: Connection) => {
          return connection.getInputNeuron().getName() != removedNeuron.getName();
        });
      }
    }
  }

  public reset() {
    this.createConnections(0, this.layerCnt - 1);
  }

  private createLayerOfNeurons(layerIdx: number, layerSize: number) {
    this.neurons[layerIdx] = [];
    for (let i = 0; i < layerSize; i++) {
      this.neurons[layerIdx][i] = new Neuron(`Neuron${layerIdx}${i}`);
    }
  }

  private createConnections(firstLayer, lastLayer) {
    for (let l = firstLayer; l < lastLayer; l++) {
      // For each neuron in the layer add all connections to neurons in the next layer
      this.connections[l] = [];

      // Reset input & outputs
      this.neurons[l + 1].forEach(nextNeuron => { nextNeuron.resetInputs() });
      this.neurons[l].forEach(nextNeuron => { nextNeuron.resetOutputs() });


      this.neurons[l + 1].forEach(nextNeuron => { // If you wonder why this cycles are switched, it's because of the bias
        this.neurons[l].forEach(currNeuron => {
          const connection = new Connection(currNeuron, nextNeuron)
          currNeuron.addOutput(connection);
          nextNeuron.addInput(connection);
          this.connections[l].push(connection);
        });

        // Add bias neuron to each layer
        const biasConnection = new Connection(this.biasNeuron, nextNeuron);
        nextNeuron.addInput(biasConnection);
        this.connections[l].push(biasConnection);
      });
    }
  }

  public getNeurons() {
    return this.neurons;
  }

  public getConnections() {
    return this.connections;
  }

  public getInputSize() {
    return this.inputSize;
  }

  public getLayerCnt() {
    return this.layerCnt;
  }

  public getHiddenLayerSizes() {
    return this.hiddenLayerSizes;
  }

  public setRate(newRate: number) {
    this.rate = newRate;
  }
}