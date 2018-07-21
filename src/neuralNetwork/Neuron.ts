import { Connection } from "./Connection";
import { SIGMOID } from "./HelperObjects";

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

  public getName() {
    return this.name;
  }

  public getIsBias() {
    return this.isBias;
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

  public getInputs(): Connection[] {
    return this.inputs;
  }

  public addOutput(output: Connection) {
    this.outputs.push(output);
  }

  public getOutputs(): Connection[] {
    return this.outputs;
  }

  public setOutputs(connections: Connection[]) {
    this.outputs = connections;
  }

  public setInputs(connections: Connection[]) {
    this.inputs = connections;
  }

  public resetInputs() {
    this.inputs = [];
  }

  public resetOutputs() {
    this.outputs = [];
  }

  public reset() {
    this.isCalculated = false;
  }

  public getActivation(): number {
    if (this.isBias) this.activation = 1;
    return this.activation;
  }

  public getSigma() {
    return this.sigma;
  }

  public calculateActivation(): number {
    if (!this.isInput && !this.isCalculated && !this.isBias) {
      this.activation = SIGMOID.output(this.inputs.reduce((acc, currConn) => acc + currConn.calculateValue(), 0));
      this.isCalculated = true;
    }
    return this.getActivation();
  }
}