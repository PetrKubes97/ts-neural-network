import { Visualizer, DrawableNeuron } from './Visualizer';
import { NeuralCore } from './neuralNetwork/NeuralCore';
import { Regularizations, TrainSample } from './neuralNetwork/HelperObjects';
import { Neuron } from './neuralNetwork/Neuron';

(window as any).slide = (i: number, value: number) => {
  input[i] = value;
  neuralCore.evaluate(input);
  visualizer.draw(neuralCore.getNeurons(), neuralCore.getConnections());
}

(window as any).addOrRemoveLayer = (add: boolean) => {
  neuralCore.addOrRemoveLayer(add);
  updateUI();
}

(window as any).addOrRemoveNeuron = (add: boolean, layerIdx: number) => {
  neuralCore.addOrRemoveNeuron(add, layerIdx);
  if (layerIdx == 0) {
    if (add)
      input.push(1);
    else
      input.pop();
  }

  updateUI();
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

  if (trainRepeat.checked && interval == null) {
    trainBtn.innerText = "Stop"
    interval = setInterval(() => {
      runTrainLoop(iters)
    }, 100);
  } else if (interval != null) {
    clearInterval(interval);
    interval = null;
    trainBtn.innerText = "Start"
  } else {
    runTrainLoop(iters);
  }
}

const runTrainLoop = (iters: number) => {
  for (let i = 0; i < iters; i++) {
    neuralCore.train();
  }
  updateUI();
}

(window as any).setTrainingData = () => {
  try {
    const dataArr = JSON.parse(trainingSetInput.value);
    neuralCore.setTrainingSamples([]);
    dataArr.forEach((sample) => {
      neuralCore.addTrainingSet(sample[0], sample[1]);
    });
    neuralCore.reset();
    updateUI();
  } catch (err) {
    alert(err);
  }
}
(window as any).randomWeights = () => {
  weightsInput.value = '[]'
  try {
    neuralCore.randomWeights();
  } catch (err) {
    alert(err);
  }
  updateUI()
}
(window as any).setWeights = () => {
  try {
    const weights: number[][][] = JSON.parse(weightsInput.value);
    neuralCore.setWeights(weights);
    updateUI();
  } catch (err) {
    alert(err);
  }
}

(window as any).reset = () => {
  neuralCore.reset();
  updateUI();
}

(window as any).applyTrainingSample = (idx: number) => {
  input = neuralCore.getTrainingSamples()[idx].input;
  updateUI();
}

window.onload = () => {
  main();
};

let neuralCore: NeuralCore;
let visualizer: Visualizer;
let input: number[];
let interval = null;

let inputSize = 3;
let hiddenSizes = [2, 3];
let outputSize = 2;

let layerControls: HTMLElement;
let inputControls: HTMLElement;
let canvas: HTMLCanvasElement;

let cost: HTMLElement;
let iter: HTMLElement;

let rateInput: HTMLInputElement;
let itersInput: HTMLInputElement;
let regTypeInput: HTMLInputElement;
let regRateInput: HTMLInputElement;
let trainRepeat: HTMLInputElement;
let trainBtn: HTMLInputElement;

let trainingSetLabelsOutput: HTMLElement;
let trainingSetDataOutput: HTMLElement;
let trainingSetInput: HTMLInputElement;
let weightsInput: HTMLInputElement;

const main = () => {
  canvas = document.getElementById('content') as HTMLCanvasElement;
  inputControls = document.getElementById('input-controls');
  layerControls = document.getElementById('layer-controls');
  iter = document.getElementById('iter-output');
  cost = document.getElementById('cost');
  rateInput = document.getElementById('rate-input') as HTMLInputElement;
  itersInput = document.getElementById('iters-input') as HTMLInputElement;
  regTypeInput = document.getElementById('regularization-type-input') as HTMLInputElement;
  regRateInput = document.getElementById('regularization-rate-input') as HTMLInputElement;
  trainingSetDataOutput = document.getElementById('training-set-data-output') as HTMLInputElement;
  trainingSetLabelsOutput = document.getElementById('training-set-neurons-output') as HTMLInputElement;
  trainingSetInput = document.getElementById('training-set-input') as HTMLInputElement;
  weightsInput = document.getElementById('training-set-weights') as HTMLInputElement;
  trainRepeat = document.getElementById('train-repeat-chckbx') as HTMLInputElement;
  trainBtn = document.getElementById('train-btn') as HTMLInputElement;

  visualizer = new Visualizer(canvas);

  initCore();
}
const initCore = () => {
  neuralCore = new NeuralCore(inputSize, hiddenSizes, outputSize);

  // Set default values
  input = new Array(neuralCore.getInputSize());
  input.fill(1);

  neuralCore.evaluate(input);
  const wn = (window as any)
  wn.setTrainingData()
  wn.setWeights()
  updateUI();
}

const updateUI = () => {
  neuralCore.evaluate(input);

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

  if (!visualizer.getDrawableInputNeurons()) {
    visualizer.draw(neuralCore.getNeurons(), neuralCore.getConnections());
  }


  const controlHeight = 50;
  visualizer.getDrawableInputNeurons().forEach((neuron: DrawableNeuron) => {
    const x = neuron.x - 80;
    const y = neuron.y - controlHeight / 2 + 5;
    inputControls.innerHTML += `<input
      style="position: absolute; top: ${y}px; left: ${x}px; height: ${controlHeight}px;" 
      type="range" orient="vertical" min="0" max="1" value="${neuron.activation}" step="0.05" 
      oninput="slide(${neuron.id}, this.value);">`;
  })

  iter.innerHTML = neuralCore.getIteration().toString();
  cost.innerHTML = neuralCore.getCost().toString();

  // Add training set data labels
  let labels = '';
  for (let i = 0; i < neuralCore.getInputSize(); i++) {
    labels += `<th scope='col'>Input ${i}</th>`;
  }
  for (let i = 0; i < neuralCore.getOutputSize(); i++) {
    labels += `<th scope='col' style="text-align: right">Output ${i}</th>`;
  }
  trainingSetLabelsOutput.innerHTML = labels;

  // Add training data
  let trainingData = '';
  neuralCore.getTrainingSamples().forEach((sample, idx) => {
    trainingData += `<tr style="cursor:pointer;" onclick="applyTrainingSample(${idx})">`;
    sample.input.forEach(val => {
      trainingData += `<td>${val}</td>`;
    });
    sample.output.forEach(val => {
      trainingData += `<td style="text-align: right">${val}</td>`;
    });
    trainingData += '</tr>';
  });
  trainingSetDataOutput.innerHTML = trainingData;
  visualizer.draw(neuralCore.getNeurons(), neuralCore.getConnections());
}

const addLayerControlRow = (label: string, size: string, onclickPos: string, onclickNeg: string): string => {
  return `<tr><td align='right'><label>${label}:</label><b style="margin: auto 6px">${size}</b></td><td>
  <div class="btn-group" role="group">
    <button type="button" class="btn btn-secondary btn-sm" onclick="${onclickNeg}">-</button>
    <button type="button" class="btn btn-secondary btn-sm" onclick="${onclickPos}">+</button>
  </div></td></tr>`;
}