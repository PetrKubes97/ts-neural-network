import { Visualizer } from './Visualizer';
import { NeuralCore } from './neuralNetwork/NeuralCore';

(window as any).slide = (i: number, value: number) => {
  input[i] = value;
  neuralCore.evaluate(input);
  visualizer.draw(neuralCore.getNeurons(), neuralCore.getConnections());
}

(window as any).addOrRemoveLayer = (add: boolean) => {
  neuralCore.addLayer(add);
  neuralCore.evaluate(input);

  updateUI();
  visualizer.draw(neuralCore.getNeurons(), neuralCore.getConnections());
}

(window as any).addOrRemoveNeuron = (layer: number, add: boolean) => {

}

(window as any).train = (iters: number) => {
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


let inputSize = 2;
let hiddenSizes = [3];
let outputSize = 2;
let layerControls: HTMLElement;
let inputControls: HTMLElement;

let layerCnt: HTMLElement;
let cost: HTMLElement;

const main = () => {
  const content: HTMLCanvasElement = document.getElementById('content') as HTMLCanvasElement;
  inputControls = document.getElementById('input-controls');
  layerControls = document.getElementById('layer-controls');
  layerCnt = document.getElementById('layer-cnt');
  cost = document.getElementById('cost');

  visualizer = new Visualizer(content);

  initCore();
}

const initCore = () => {
  neuralCore = new NeuralCore(inputSize, hiddenSizes, outputSize);

  neuralCore.addTrainingSet([1,1], [1,1]);
  neuralCore.addTrainingSet([1,0], [0,0]);
  neuralCore.addTrainingSet([0,1], [0,0]);
  neuralCore.addTrainingSet([0,0], [0,0]);

  // Set default values
  input = new Array(neuralCore.getInputSize());
  input.fill(1);

  neuralCore.evaluate(input);
  updateUI();
  visualizer.draw(neuralCore.getNeurons(), neuralCore.getConnections());
}

const updateUI = () => {
  let content = '<table>';
  content += `<tr><td align='right'>Input size:</td><td>
    <div class="btn-group" role="group">
      <button type="button" class="btn btn-secondary btn-sm" onclick="addOrRemoveNeuron(-1, false)">-</button>
      <button type="button" class="btn btn-secondary btn-sm" onclick="addOrRemoveNeuron(-1, true)">+</button>
    </div></td></tr>`;
  
  for (let i = 0; i < neuralCore.getLayerCnt() - 2; i++) {
    content += `<tr><td align='right'>Hidden layer size:</td><td>
      <div class="btn-group" role="group">
        <button type="button" class="btn btn-secondary btn-sm" onclick="addOrRemoveNeuron(${i}, false)">-</button>
        <button type="button" class="btn btn-secondary btn-sm" onclick="addOrRemoveNeuron(${i}, true)">+</button>
      </div></td></tr>`;
  }
  content += `<tr><td align='right'>Output size:</td><td>
    <div class="btn-group" role="group">
      <button type="button" class="btn btn-secondary btn-sm" onclick="addOrRemoveNeuron(-2, false)">-</button>
      <button type="button" class="btn btn-secondary btn-sm" onclick="addOrRemoveNeuron(-2, true)">+</button>
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