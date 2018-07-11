import { Neuron } from "./Neuron";

export class Connection {
  private weight: number = Math.random() * 10 - 5;
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

  public applyAverageWeightChange() {
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