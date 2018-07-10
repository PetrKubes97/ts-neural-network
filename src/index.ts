import { Visualizer } from './Visualizer';
import { NeuralCore } from './neuralNetwork/NeuralCore';

(window as any).slide = (i: number, value: number) => {
  input[i] = value;
  neuralCore.evaluate(input);
  visualizer.draw(neuralCore.getNeurons(), neuralCore.getConnections());
}

(window as any).numOflayersChange = (val: number) => {
  hiddenSizes = new Array(val-2);
  hiddenSizes.fill(3);
  initCore();
}

(window as any).numOfNeruonsInLayerChange = (idx: number, val) => {
  if (idx == 0) {
    inputSize = Number.parseInt(val);
  } else if (idx == hiddenSizes.length + 1) {
    outputSize = Number.parseInt(val);
  } else {
    hiddenSizes[idx-1] = Number.parseInt(val);
  }
  initCore();
}

(window as any).train = () => {
  neuralCore.addTrainingSet([1,1], [0,0]);
  neuralCore.addTrainingSet([1,0], [1,0]);
  neuralCore.addTrainingSet([0,1], [1,0]);
  neuralCore.addTrainingSet([0,0], [0,0]);

  for (let i=0;i<10000;i++) {
    neuralCore.train();
  }
  console.log(neuralCore.getCost())

  neuralCore.evaluate(input);
  visualizer.draw(neuralCore.getNeurons(), neuralCore.getConnections());
}

window.onload = () => {
  main();
};

let neuralCore: NeuralCore;
let visualizer: Visualizer;
let input: number[];


let inputSize = 2;
let hiddenSizes = [3];
let outputSize = 2;
let layerControls: HTMLCanvasElement;
let inputControls: HTMLCanvasElement;

const main = () => {
  const content: HTMLCanvasElement = document.getElementById('content') as HTMLCanvasElement;
  inputControls = document.getElementById('input-controls') as HTMLCanvasElement;
  layerControls = document.getElementById('layer-controls') as HTMLCanvasElement;
  visualizer = new Visualizer(content);

  initCore();
}

const initCore = () => {
  neuralCore = new NeuralCore(inputSize, hiddenSizes, outputSize);

  layerControls.innerHTML = '';
  layerControls.innerHTML += `Input size: <input type="number" name="layers" min="1" max="10" value="${inputSize}" onchange="numOfNeruonsInLayerChange(0, this.value)"><br>`;
  for (let i = 1; i < hiddenSizes.length+1; i++) {
    layerControls.innerHTML += `Layer ${i} size: <input type="number" name="layers" min="1" max="10" value="${hiddenSizes[i-1]}" onchange="numOfNeruonsInLayerChange(${i}, this.value)"><br>`;
  }
  layerControls.innerHTML += `Output size: <input type="number" name="layers" min="1" max="10" value="${outputSize}" onchange="numOfNeruonsInLayerChange(${hiddenSizes.length + 1}, this.value)"><br>`;

  // Set default values
  input = new Array(neuralCore.getInputSize());
  input.fill(1);

  inputControls.innerHTML = '';
  for (let i = 0; i < neuralCore.getInputSize(); i++) {
    inputControls.innerHTML += `Neuron ${i}: <input style="position: relative; top: 5px;" type="range" min="0" max="1" value="1" step="0.05" id="slider${i}" oninput="slide(${i}, this.value);"><br>`;
  }

  neuralCore.evaluate(input);
  visualizer.draw(neuralCore.getNeurons(), neuralCore.getConnections());
}