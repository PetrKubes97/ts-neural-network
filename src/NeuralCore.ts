import { NumericDictionary } from "lodash";

type Matrix = number[][];
type Vector = number[];

export class NeuralCore {
  private inputSize: number;
  private hiddenLayerSizes: number[];
  private outputSize: number;

  private layerCnt: number;

  private rate = 1;

  private neurons: Neuron[][] = [];
  private connections: Connection[][] = [];

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
      this.neurons[l].forEach(neuron => {
        this.neurons[l+1].forEach(nextNeuron => {
          const connection = new Connection(neuron, nextNeuron)
          neuron.addOutput(connection);
          nextNeuron.addInput(connection);
          this.connections[l].push(connection);
        });
      });
    }
  }

  public evaluate(input: number[]): number[] {
    if (input.length != this.inputSize) {
      throw 'Input size does not match';
    }
    // Reset, so each neuron is recalculated
    this.neurons.forEach(layer => {layer.forEach(neuron => neuron.reset())})

    this.neurons[this.layerCnt-1].forEach(neuron => {
      neuron.calculateActivation();
    });
    console.log(this.connections);
    console.log(this.neurons);

    return this.neurons[this.layerCnt-1].map(neuron => neuron.getActivation());
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

  constructor(name: string) {
    this.name = name;
  };

  public toString() {
    return name;
  }

  public setAsInputNeuron(activation: number) {
    this.isInput = true;
    this.activation = activation;
    this.inputs = null;
  }

  public addInput(input: Connection) {
    this.inputs.push(input);
  };

  public addOutput(output: Connection) {
    this.outputs.push(output);
  }

  public reset() {
    this.isCalculated = false;
  }

  public getActivation(): number {
    return this.activation;
  }

  public calculateActivation(): number {
    if (!this.isInput && !this.isCalculated) {
      this.activation = Activations.SIGMOID.output(this.inputs.reduce((acc, currConn) => acc + currConn.calculateValue(), 0));
      this.isCalculated = true;
    }
    return this.activation;
  }
}

export class Connection {
  private weight: number = Math.random();
  private inputNeuron: Neuron;
  private outputNeuron: Neuron;

  constructor(input: Neuron, output: Neuron) {
    this.inputNeuron = input;
    this.outputNeuron = output;
  }

  public updateWeight(newWeight: number) {
    this.weight = newWeight;
  }

  public calculateValue() {
    return this.weight * this.inputNeuron.calculateActivation();
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
