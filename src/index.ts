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
  neuralCore = new NeuralCore();

  neuralCore.initNetwork(2, [2], 2, true);
  
  neuralCore.setTrainingSet([1,1], [0,1]);
  for (let i = 0; i<1000; i++) {
    neuralCore.train();
  }
  
}
