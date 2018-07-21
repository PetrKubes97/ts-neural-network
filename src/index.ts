import { Visualizer } from './Visualizer';
import { NeuralCore } from './neuralNetwork/NeuralCore';
import { Regularizations } from './neuralNetwork/HelperObjects';

(window as any).slide = (i: number, value: number) => {
  input[i] = value;
  neuralCore.evaluate(input);
  visualizer.draw(neuralCore.getNeurons(), neuralCore.getConnections());
}

(window as any).addOrRemoveLayer = (add: boolean) => {
  neuralCore.addOrRemoveLayer(add);
  neuralCore.evaluate(input);

  updateUI();
  visualizer.draw(neuralCore.getNeurons(), neuralCore.getConnections());
}

(window as any).addOrRemoveNeuron = (add: boolean, layerIdx: number) => {
  neuralCore.addOrRemoveNeuron(add, layerIdx);
  if (layerIdx == 0) {
    if (add)
      input.push(1);
    else
      input.pop();
  }
  neuralCore.evaluate(input);

  updateUI();
  visualizer.draw(neuralCore.getNeurons(), neuralCore.getConnections());
}

(window as any).train = (multipleIters: boolean) => {
  let iters = multipleIters ? Number.parseInt(itersInput.value) : 1;
  neuralCore.setRate(Number.parseFloat(rateInput.value));

  // Regularization
  switch (regTypeInput.value) {
    case "L1":
      neuralCore.setRegularizationType(Regularizations.L1);
      break;
    case "L2":
      neuralCore.setRegularizationType(Regularizations.L2);
      break;
    case "none":
      neuralCore.setRegularizationType(Regularizations.NONE);
      break;
  }

  neuralCore.setRegularizationRate(Number.parseFloat(regRateInput.value));

  for (let i = 0; i < iters; i++) {
    neuralCore.train();
  }

  neuralCore.evaluate(input);
  updateUI();
  visualizer.draw(neuralCore.getNeurons(), neuralCore.getConnections());
}

(window as any).reset = () => {
  neuralCore.reset();
  neuralCore.evaluate(input);
  updateUI();
  visualizer.draw(neuralCore.getNeurons(), neuralCore.getConnections());
}

window.onload = () => {
  main();
};

let neuralCore: NeuralCore;
let visualizer: Visualizer;
let input: number[];

let inputSize = 4;
let hiddenSizes = [3];
let outputSize = 4;
let layerControls: HTMLElement;
let inputControls: HTMLElement;

let cost: HTMLElement;
let iter: HTMLElement;

let rateInput: HTMLInputElement;
let itersInput: HTMLInputElement;
let regTypeInput: HTMLInputElement;
let regRateInput: HTMLInputElement;

const main = () => {
  const content: HTMLCanvasElement = document.getElementById('content') as HTMLCanvasElement;
  inputControls = document.getElementById('input-controls');
  layerControls = document.getElementById('layer-controls');
  iter = document.getElementById('iter-output');
  cost = document.getElementById('cost');
  rateInput = document.getElementById('rate-input') as HTMLInputElement;
  itersInput = document.getElementById('iters-input') as HTMLInputElement;
  regTypeInput = document.getElementById('regularization-type-input') as HTMLInputElement;
  regRateInput = document.getElementById('regularization-rate-input') as HTMLInputElement;

  visualizer = new Visualizer(content);

  initCore();
}

const initCore = () => {
  neuralCore = new NeuralCore(inputSize, hiddenSizes, outputSize);

  neuralCore.addTrainingSet([1, 0, 0, 0], [0, 1, 0, 0]);
  neuralCore.addTrainingSet([0, 1, 0, 0], [0, 0, 1, 0]);
  neuralCore.addTrainingSet([0, 0, 1, 0], [0, 0, 0, 1]);

  // Set default values
  input = new Array(neuralCore.getInputSize());
  input.fill(1);

  neuralCore.evaluate(input);
  updateUI();
  visualizer.draw(neuralCore.getNeurons(), neuralCore.getConnections());
}

const updateUI = () => {
  let content = addLayerControlRow(
    'Layers',
    neuralCore.getLayerCnt().toString(),
    'addOrRemoveLayer(true)',
    'addOrRemoveLayer(false)'
  );


  content += addLayerControlRow(
    'Input size',
    neuralCore.getInputSize().toString(),
    'addOrRemoveNeuron(true, 0)',
    'addOrRemoveNeuron(false, 0)'
  );

  for (let i = 0; i < neuralCore.getLayerCnt() - 2; i++) {
    content += addLayerControlRow(
      'Hidden layer size',
      neuralCore.getHiddenLayerSizes()[i].toString(),
      `addOrRemoveNeuron(true, ${i + 1})`,
      `addOrRemoveNeuron(false, ${i + 1})`
    );
  }

  content += addLayerControlRow(
    'Output size',
    neuralCore.getOutputSize().toString(),
    `addOrRemoveNeuron(true, ${neuralCore.getLayerCnt() - 1})`,
    `addOrRemoveNeuron(false, ${neuralCore.getLayerCnt() - 1})`
  );

  layerControls.innerHTML = content;

  inputControls.innerHTML = '';
  for (let i = 0; i < neuralCore.getInputSize(); i++) {
    inputControls.innerHTML += `<label>Neuron ${i}:</label> <input style="position: relative; top: 5px;" type="range" min="0" max="1" value="1" step="0.05" id="slider${i}" oninput="slide(${i}, this.value);"><br>`;
  }

  iter.innerHTML = neuralCore.getIteration().toString();
  cost.innerHTML = neuralCore.getCost().toString();
}

const addLayerControlRow = (label: string, size: string, onclickPos: string, onclickNeg: string): string => {
  return `<tr><td align='right'><label>${label}:</label><b style="margin: auto 6px">${size}</b></td><td>
  <div class="btn-group" role="group">
    <button type="button" class="btn btn-secondary btn-sm" onclick="${onclickNeg}">-</button>
    <button type="button" class="btn btn-secondary btn-sm" onclick="${onclickPos}">+</button>
  </div></td></tr>`;
}