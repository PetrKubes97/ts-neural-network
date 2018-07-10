import { Visualizer } from './Visualizer';
import { NeuralCore } from './neuralNetwork/NeuralCore';

(window as any).slide = (i: number, value: number) => {
  input[i] = value;
  neuralCore.evaluate(input);
  visualizer.draw(neuralCore.getNeurons(), neuralCore.getConnections());
}

window.onload = () => {
  main();
};

let neuralCore: NeuralCore;
let visualizer: Visualizer;
let input: number[];

const main = () => {
  const content: HTMLCanvasElement = document.getElementById('content') as HTMLCanvasElement;
  const controls: HTMLCanvasElement = document.getElementById('controls') as HTMLCanvasElement;
  visualizer = new Visualizer(content);
  neuralCore = new NeuralCore(2, [3], 1);

  // Set default values
  input = new Array(neuralCore.getInputSize());
  input.fill(1);

  neuralCore.addTrainingSet([1, 1], [0]);
  neuralCore.addTrainingSet([1, 0], [1]);
  neuralCore.addTrainingSet([0, 1], [1]);
  neuralCore.addTrainingSet([0, 0], [0]);

  for (let i = 0; i < 10000; i++) {
    neuralCore.train();
  }

  neuralCore.evaluate(input);
  visualizer.draw(neuralCore.getNeurons(), neuralCore.getConnections());

  for (let i = 0; i < neuralCore.getInputSize(); i++) {
    controls.innerHTML += `<input type="range" min="0" max="1" value="1" step="0.05" id="slider${i}" oninput="slide(${i}, this.value);"><br>`;
  }
}