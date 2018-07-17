export interface Activation {
  der(x: number): number;
  output(x: number): number;
}

export class Activations {
  public static SIGMOID: Activation = {
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