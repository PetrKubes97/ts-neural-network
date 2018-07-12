import { Visualizer } from './Visualizer';
import { NeuralCore } from './neuralNetwork/NeuralCore';

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
    input.push(1);
  }
  neuralCore.evaluate(input);

  updateUI();
  visualizer.draw(neuralCore.getNeurons(), neuralCore.getConnections());
}

(window as any).train = (multipleIters: boolean) => {
  let iters = multipleIters ? Number.parseInt(itersInput.value) : 1;
  neuralCore.setRate(Number.parseFloat(rateInput.value));

  for (let i=0;i<iters;i++) {
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

let layerCnt: HTMLElement;
let cost: HTMLElement;

let rateInput: HTMLInputElement;
let itersInput: HTMLInputElement;

const main = () => {
  const content: HTMLCanvasElement = document.getElementById('content') as HTMLCanvasElement;
  inputControls = document.getElementById('input-controls');
  layerControls = document.getElementById('layer-controls');
  layerCnt = document.getElementById('layer-cnt');
  cost = document.getElementById('cost');
  rateInput = document.getElementById('rate-input') as HTMLInputElement;
  itersInput = document.getElementById('iters-input') as HTMLInputElement;

  visualizer = new Visualizer(content);

  initCore();
}

const initCore = () => {
  neuralCore = new NeuralCore(inputSize, hiddenSizes, outputSize);

  neuralCore.addTrainingSet([1,0,0,0], [0,1,0,0]);
  neuralCore.addTrainingSet([0,1,0,0], [0,0,1,0]);
  neuralCore.addTrainingSet([0,0,1,0], [0,0,0,1]);

  // Set default values
  input = new Array(neuralCore.getInputSize());
  input.fill(1);

  neuralCore.evaluate(input);
  updateUI();
  visualizer.draw(neuralCore.getNeurons(), neuralCore.getConnections());
}

const updateUI = () => {
  let content = '<table>';
  content += `<tr><td align='right'>Input size: <b>${inputSize}</b></td><td>
    <div class="btn-group" role="group">
      <button type="button" class="btn btn-secondary btn-sm" onclick="addOrRemoveNeuron(false, 0)">-</button>
      <button type="button" class="btn btn-secondary btn-sm" onclick="addOrRemoveNeuron(true, 0)">+</button>
    </div></td></tr>`;
  
  for (let i = 0; i < neuralCore.getLayerCnt() - 2; i++) {
    content += `<tr><td align='right'>Hidden layer size: <b>${neuralCore.getHiddenLayerSizes()[i]}</b></td><td>
      <div class="btn-group" role="group">
        <button type="button" class="btn btn-secondary btn-sm" onclick="addOrRemoveNeuron(false, ${i+1})">-</button>
        <button type="button" class="btn btn-secondary btn-sm" onclick="addOrRemoveNeuron(true, ${i+1})">+</button>
      </div></td></tr>`;
  }
  content += `<tr><td align='right'>Output size: <b>${outputSize}</b></td><td>
    <div class="btn-group" role="group">
      <button type="button" class="btn btn-secondary btn-sm" onclick="addOrRemoveNeuron(false, ${neuralCore.getLayerCnt()-1})">-</button>
      <button type="button" class="btn btn-secondary btn-sm" onclick="addOrRemoveNeuron(true, ${neuralCore.getLayerCnt()-1})">+</button>
    </div></td></tr>`;
  content += '</table>';

  layerControls.innerHTML = content;

  inputControls.innerHTML = '';
  for (let i = 0; i < neuralCore.getInputSize(); i++) {
    inputControls.innerHTML += `Neuron ${i}: <input style="position: relative; top: 5px;" type="range" min="0" max="1" value="1" step="0.05" id="slider${i}" oninput="slide(${i}, this.value);"><br>`;
  }

  layerCnt.innerText = neuralCore.getLayerCnt().toString();
  cost.innerHTML = neuralCore.getCost().toString();
}