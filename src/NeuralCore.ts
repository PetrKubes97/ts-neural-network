import * as linearAlgebra from 'linear-algebra';
const la = linearAlgebra();

export class NeuralCore {
  private inputSize: number;
  private hiddenLayerSizes: number[];
  private outputSize: number;

  private weights: la.Matrix[];
  
  private trainTarget: la.Matrix;
  private trainInput: la.Matrix;

  private rate = 1;

  public initNetwork(
      inputSize: number, hiddenLayerSizes: number[], outputSize: number,
      randomInit: boolean) {
    this.inputSize = inputSize;
    this.hiddenLayerSizes = hiddenLayerSizes;
    this.outputSize = outputSize;

    if (randomInit) {
      this.weights = [];

      if (hiddenLayerSizes.length > 0) {
        for (let i = 0; i < hiddenLayerSizes.length + 1; i++) {
          switch (i) {
            case 0:
              this.weights.push(this.randMatrix(hiddenLayerSizes[0], inputSize));
              break;
            case hiddenLayerSizes.length:
              this.weights.push(this.randMatrix(outputSize, hiddenLayerSizes[i-1]));
              break;
            default:
              this.weights.push(this.randMatrix(hiddenLayerSizes[i], hiddenLayerSizes[i-1]));
              break;
          }
        }
      } else {
        this.weights.push(this.randMatrix(outputSize, inputSize));
      }
    }
  }

  // TODO for each example
  public setTrainingSet(input: number[], output: number[]) {
    this.trainTarget = new la.Matrix(output);
    this.trainInput = new la.Matrix(input);
  }

  public evaluate(input: number[]): la.Matrix[] {
    if (input.length != this.inputSize) {
      throw Error(`Invalid input size, should be ${this.inputSize}.`);
    }

    const neurons = [];

    // Forward propagation
    let currLayer = new la.Matrix(input).trans();
    for (let i = 0; i < this.hiddenLayerSizes.length + 1; i++) {
      neurons.push(currLayer);
      currLayer = this.weights[i].dot(currLayer).sigmoid();
    }

    neurons.push(currLayer);

    return neurons;
  }

  public getCost(): number {
    const outputLayer = this.evaluate(this.trainInput.data[0])[this.weights.length];

    return (1/2) * outputLayer.minus(this.trainTarget.trans()).map((x) => {return x**2;}).getSum();
  }

  public train() {
    const L = this.weights.length;
    
    // Compute each layer
    let x = this.evaluate(this.trainInput.data[0]);

    // Last layer
    const sigmas = [];
    sigmas[L] = x[L].mul(x[L].plusEach(-1)).mul(x[L].minus(this.trainTarget.trans()));

    // All hidden layers
    for (let i=L-1; i>=1;i--) {
      sigmas[i] = x[i].mul(x[i].plusEach(-1)).mulEach(-1).mul((x[i+1].trans().dot(this.weights[i])).trans());
    }
    sigmas.shift();

    //console.log('sigmas: ', sigmas);
    //console.log('weights: ', this.weights.map((m) => m.data));
    //console.log('x: ', x.map((m) => m.data));

    // Update all weights
    for (let j=0;j<L;j++) {
      this.weights[j] = this.weights[j].plus((sigmas[j].dot(x[j].trans()))); 
    }

    x = this.evaluate(this.trainInput.data[0]);
    
    console.log('x: ', x[L].data);
  }

  private randMatrix(height: number, width: number): la.Matrix {
    const res = [];
    for (let j = 0; j < height; j++) {
      let row = [];
      for (let i = 0; i < width; i++) {
        row.push(Math.random());
      }
      res.push(row);
    }
    const m =  new la.Matrix(res);
    
    return m;
  }
}
