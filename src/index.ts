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
  neuralCore = new NeuralCore(2, [], 1);
  
  neuralCore.addTrainingSet([1,1], [1])
  neuralCore.addTrainingSet([1,0], [0]);
  neuralCore.addTrainingSet([0,1], [0]);
  neuralCore.addTrainingSet([0,0], [0])

  for (let i = 0; i<2000; i++) {
    neuralCore.train();
    console.log(neuralCore.getCost());
  }

  console.log(neuralCore.evaluate([1,1]));
  console.log(neuralCore.evaluate([1,0]));
  console.log(neuralCore.evaluate([0,1]));
  console.log(neuralCore.evaluate([0,0]));
}
