import { Neuron } from "./Neuron";
import { Connection } from "./Connection";
import { TrainSample, SIGMOID, Regularizations, L2Reg, getNumberOfConnections, L1Reg } from "./HelperObjects";

export class NeuralCore {
  private inputSize: number;
  private hiddenLayerSizes: number[];
  private outputSize: number;

  private layerCnt: number;
  private biasList: number[][];
  private weightList: number[][][];

  private iterCnt = 0;

  private rate = 1;
  private lambda = 0.001;
  private regType: Regularizations = Regularizations.NONE;

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

  private resetWeights() {
    let temp: number[][][];
    this.weightList = temp;
  }

  public setWeights(weights: number[][][]) {
    this.resetWeights();
    if (weights.length !== this.layerCnt - 1) {
      throw 'Weight count does not match layer count';
    }
    for (let i = 0; i < weights[0].length; i++) {
      if (weights[0][i].length !== this.inputSize) {
        throw `Weights at hidden layer 1 of neuron ${i+1} do not match the input count`;
      }
    }
    for (let size = 1; size < this.hiddenLayerSizes.length; size++) {
      if (weights[size].length !== this.hiddenLayerSizes[size]) {
        throw `Weights at hidden layer ${size+1} do not match the neuron count`;
      }
      for (let i = 0; i < weights[size].length; i++) {
        if (weights[size][i].length !== this.hiddenLayerSizes[size-1]) {
          throw `Weights at hidden layer ${size+1} of neuron ${i+1} do not match the input count`;
        }
      }
    }
    for (let i = 0; i < weights[weights.length - 1].length; i++) {
      if (weights[weights.length - 1][i].length !== this.hiddenLayerSizes[this.hiddenLayerSizes.length - 1]) {
        throw `Weights at output layer of neuron ${i+1} do not match the input count`;
      }
    }

    this.weightList = weights;
  }

  private resetBiasList() {
    let temp: number[][];
    this.biasList = temp;
  }
  public setBias(biasList: number[][]) {
    this.resetBiasList();
    if (biasList.length !== this.hiddenLayerSizes.length + 1) {
      throw 'Bias count does not match layer count';
    }
    for (let i = 0; i < biasList.length - 1; i++) {
      if (biasList[i].length !== this.hiddenLayerSizes[i]) {
        throw `Bias at layer ${i+1} do not match the hidden layer count`;
      }
    }
    if (biasList[biasList.length - 1].length !== this.outputSize) {
      throw `Bias at output layer do not match the output layer count`;
    }

    this.biasList = biasList;
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
    if (input.length != this.inputSize) {
      throw 'Input size does not match';
    } else if (output.length != this.outputSize) {
      throw 'Output size does not match';
    }

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

    // Regularization
    let regCost = 0;
    switch (this.regType) {
      case Regularizations.L1:
        regCost = L1Reg.cost(this.connections);
        break;
      case Regularizations.L2:
        regCost = L2Reg.cost(this.connections);
        break;
      case Regularizations.NONE:
        regCost = 0;
        break;
    }

    return 1 / 2 * costSum * (1 / this.trainSamples.length) +
      this.lambda * regCost;
  }

  public train() {
    this.trainSamples.forEach((sample) => {
      this.evaluate(sample.input)

      // Calculate sigmas of the last layer
      this.neurons[this.layerCnt - 1].forEach((neuron, idx) => {
        const newSigma =
          (sample.output[idx] - neuron.getActivation()) * SIGMOID.der(neuron.getActivation());
        neuron.setSigma(newSigma);
      });

      // Calculate sigmas for each neuron in the lower layers
      for (let l = this.layerCnt - 2; l >= 0; l--) {
        this.neurons[l].forEach((neuron) => {
          const newSigma =
            neuron.getOutputs().reduce((acc, connection) => {
              return acc + connection.getOutputNeuron().getSigma() * connection.getWeight();
            }, 0) * SIGMOID.der(neuron.getActivation());
          neuron.setSigma(newSigma);
        });
      }

      // Accumulate all weight updates
      this.connections.forEach((connLayer) => {
        connLayer.forEach((connection) => {

          let regDer = 0;
          switch (this.regType) {
            case Regularizations.L1:
              regDer = L1Reg.der(connection.getWeight(), getNumberOfConnections(this.connections));
              break;
            case Regularizations.L2:
              regDer = L2Reg.der(connection.getWeight(), getNumberOfConnections(this.connections));
              break;
            case Regularizations.NONE:
              regDer = 0;
              break;
          }

          const weightChange =
            connection.getOutputNeuron().getSigma() *
            connection.getInputNeuron().getActivation() *
            this.rate -
            this.lambda * regDer; // Regularization

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

    this.iterCnt++;
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
        this.neurons[layerIdx - 1].forEach((neuron, idx) => {
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
        this.neurons[layerIdx + 1].forEach((neuron, idx) => {
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
        this.connections[layerIdx - 1] = this.connections[layerIdx - 1].filter((connection: Connection) => {
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
    this.iterCnt = 0;
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

      this.neurons[l + 1].forEach((nextNeuron, toIdx) => { // If you wonder why this cycles are switched, it's because of the bias
        this.neurons[l].forEach((currNeuron, fromIdx) => {
          let weight;
          try {
            weight = this.weightList[l][toIdx][fromIdx]
          } catch {
            // Happens if new layers have been added - use default value from Connection
          }
          const connection = new Connection(currNeuron, nextNeuron, weight)
          currNeuron.addOutput(connection);
          nextNeuron.addInput(connection);
          this.connections[l].push(connection);
        });

        let bias;
        try {
          bias = this.biasList[l][toIdx];
        } catch {
          // Happens if new layers have been added - use default value from Connection
        }

        // Add bias neuron to each layer
        const biasConnection = new Connection(this.biasNeuron, nextNeuron, bias);
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

  public getOutputSize() {
    return this.outputSize;
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

  public getIteration() {
    return this.iterCnt;
  }

  public setRegularizationType(regType: Regularizations) {
    this.regType = regType;
  }

  public setRegularizationRate(rate: number) {
    this.lambda = rate;
  }

  public getTrainingSamples() {
    return this.trainSamples;
  }

  public setTrainingSamples(samples: TrainSample[]) {
    this.trainSamples = samples;
  }
}
