import { Connection } from "./Connection";

export interface Activation {
  der(x: number): number;

  output(x: number): number;
};

export const SIGMOID: Activation = {
  output: (x: number): number => 1 / (1 + Math.exp(-x)),
  der: (x: number): number => {
    let output = SIGMOID.output(x);
    return output * (1 - output);
  }
};

export enum Regularizations {
  L1,
  L2,
  NONE,
}

export const L1Reg = {
  cost: (connections: Connection[][]): number => {
    return connections.reduce(
      (prev, connLayer: Connection[]) => {
        return prev + connLayer.reduce((acc, conn) => acc + Math.abs(conn.getWeight()), 0)
      }, 0) * (1 / getNumberOfConnections(connections));
  },

  der: (weight: number, connCount: number): number => {
    return ((weight > 0) ? 1 : -1) * (1 / connCount);
  }
}

export const L2Reg = {
  cost: (connections: Connection[][]): number => {
    return 1 / 2 * connections.reduce(
      (prev, connLayer: Connection[]) => {
        return prev + connLayer.reduce((acc, conn) => acc + conn.getWeight() ** 2, 0)
      }, 0) * (1 / getNumberOfConnections(connections));
  },

  der: (currWeight: number, connCount: number): number => {
    return currWeight * (1 / connCount);
  }
}

export class TrainSample {
  public input: number[];
  public output: number[];

  constructor(input: number[], output: number[]) {
    this.input = input;
    this.output = output;
  }
}

export const getNumberOfConnections = (connections: Connection[][]): number => {
  return connections.reduce((acc, conn) => acc + conn.length, 0);
}