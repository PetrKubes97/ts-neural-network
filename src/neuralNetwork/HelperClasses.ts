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