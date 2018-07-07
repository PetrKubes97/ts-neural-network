import {Visualizer} from './Visualize';
import {NeuralCore} from './NeuralCore';

window.onload = () => {
  main();
};

let neuralCore: NeuralCore;
let visualizer: Visualizer;

const main = () => {
  const content: HTMLElement = document.getElementById('content');
  visualizer = new Visualizer(content);
  neuralCore = new NeuralCore(2, [5], 1);
  console.log(neuralCore.evaluate([1, 1]));
  
}
