export class NeuralCore {
  private inputSize: number;
  private hiddenLayerSizes: number[];
  private outputSize: number;

  private layerCnt: number;

  private rate = 1;

  private biasNeuron = new Neuron('bias', )
  private neurons: Neuron[][] = [];
  private connections: Connection[][] = [];

  private trainSamples: TrainSample[] = [];

  constructor(inputSize: number, hiddenLayerSizes: number[], outputSize: number) {
    this.inputSize = inputSize;
    this.hiddenLayerSizes = hiddenLayerSizes;
    this.outputSize = outputSize;
    this.layerCnt = hiddenLayerSizes.length + 2;
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
    for (let l = 0; l < this.layerCnt - 1; l++) {
      // For each neuron in the layer add all connections to neurons in the next layer
      this.connections[l] = [];

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
    const costSum = this.trainSamples.reduce((costSum, sample, idx) => { // Add up all samples
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
        connection.applyAverageWeight();
      });
    });
  }

  public getNeurons() {
    return this.neurons;
  }

  public getConnections() {
    return this.connections;
  }
}

export class Neuron {
  private name: string;

  private activation: number;
  private inputs: Connection[] = [];
  private outputs: Connection[] = [];

  // The derivation of C with respect to z
  private sigma: number;
  private isInput: boolean = false;
  private isCalculated: boolean = false;
  private isBias: boolean = false;

  constructor(name: string, isBias = false) {
    this.name = name;
    this.isBias = isBias;
  };

  public toString() {
    return name;
  }

  public setAsInputNeuron(activation: number) {
    this.isInput = true;
    this.activation = activation;
    this.inputs = null;
  }

  public setInput(activation: number) {
    if (!this.isInput) {
      throw 'Cannot set activation of non-input neuron';
    }

    this.activation = activation;
  }

  public setSigma(sigma: number) {
    this.sigma = sigma;
  }

  public addInput(input: Connection) {
    this.inputs.push(input);
  };

  public addOutput(output: Connection) {
    this.outputs.push(output);
  }

  public getOutputs(): Connection[] {
    return this.outputs;
  }

  public reset() {
    this.isCalculated = false;
  }

  public getActivation(): number {
    if (this.isBias) return 1;
    return this.activation;
  }

  public getSigma() {
    return this.sigma;
  }

  public calculateActivation(): number {
    if (!this.isInput && !this.isCalculated && !this.isBias) {
      this.activation = Activations.SIGMOID.output(this.inputs.reduce((acc, currConn) => acc + currConn.calculateValue(), 0));
      this.isCalculated = true;
    }
    return this.getActivation();
  }
}

export class Connection {
  private weight: number = Math.random();
  private inputNeuron: Neuron;
  private outputNeuron: Neuron;
  private sampleWeightChanges: number[] = [];

  constructor(input: Neuron, output: Neuron) {
    this.inputNeuron = input;
    this.outputNeuron = output;
  }

  public addSampleWeightChange(weightChange: number) {
    this.sampleWeightChanges.push(weightChange);
  }

  public applyAverageWeight() {
    const change = (this.sampleWeightChanges.reduce((acc, val) => acc + val, 0) / this.sampleWeightChanges.length);
    this.weight += change;
    this.sampleWeightChanges = [];
  }

  public getWeight() {
    return this.weight;
  }

  public calculateValue() {
    return this.weight * this.inputNeuron.calculateActivation();
  }

  public getOutputNeuron() {
    return this.outputNeuron;
  }

  public getInputNeuron() {
    return this.inputNeuron;
  }
}

export class Activations {
  public static SIGMOID = {
    output: (x: number): number => 1 / (1 + Math.exp(-x)),
    der: (x: number): number => {
      let output = Activations.SIGMOID.output(x);
      return output * (1 - output);
    }
  };
}

export class TrainSample {
  public input: number[];
  public output: number[];

  constructor(input: number[], output: number[]) {
    this.input = input;
    this.output = output;
  }
}
