import { Neuron } from "./neuralNetwork/Neuron";
import { Connection } from "./neuralNetwork/Connection";

export class DrawableNeuron {
  public x: number;
  public y: number;
  public activation: number;
  public name: string;
  public isBias: boolean;
  public id: number;

  constructor(x, y, activation, name, id, isBias = false) {
    this.x = x;
    this.y = y;
    this.activation = activation;
    this.name = name;
    this.isBias = isBias;
    this.id = id;
  }
}

export class Visualizer {

  private content: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private height: number;
  private width: number;
  private drawableNeurons: DrawableNeuron[];
  private drawableInputNeurons: DrawableNeuron[];

  constructor(content: HTMLCanvasElement) {
    this.content = content;
    this.ctx = content.getContext('2d');
    this.height = content.height;
    this.width = content.width;
  }

  public draw(neurons: Neuron[][], connections: Connection[][]) {
    this.ctx.clearRect(0, 0, this.width, this.height);

    this.drawableNeurons = [];
    this.drawableInputNeurons = [];
    const leftMargin = this.width / (neurons.length + 1);

    // Neurons
    neurons.forEach((layer, lIdx) => {
      const topMargin = this.height / (layer.length + 2);
      layer.forEach((neuron, nIdx) => {
        const x = leftMargin * (1 + lIdx);
        const y = topMargin * (1 + nIdx);

        const drawableNeuron = new DrawableNeuron(x, y, neuron.getActivation(), neuron.getName(), nIdx);
        this.drawableNeurons.push(drawableNeuron);

        if (lIdx === 0) {
          this.drawableInputNeurons.push(drawableNeuron);
        }
      });

      if (lIdx != neurons.length - 1) {
        const x = leftMargin * (1 + lIdx);
        const y = topMargin * (1 + neurons[lIdx].length);

        const drawableNeuron = new DrawableNeuron(x, y, 1, `bias${lIdx}`, neurons[lIdx].length, true);
        this.drawableNeurons.push(drawableNeuron);
      }
    });

    // Connections
    const drawableNameMap = new Map<string, DrawableNeuron>();
    this.drawableNeurons.forEach(
      (drawableNeuron) => drawableNameMap.set(drawableNeuron.name, drawableNeuron)// WTF, I was not able to create map from 2d arr
    );

    connections.forEach((layer, lIdx) => {
      layer.forEach((connection) => {
        const inputNName =
          (connection.getInputNeuron().getIsBias()) ?
            `bias${lIdx}` :
            connection.getInputNeuron().getName();

        this.drawConnection(
          drawableNameMap.get(inputNName),
          drawableNameMap.get(connection.getOutputNeuron().getName()),
          connection.getWeight()
        );
      });
    });

    this.drawableNeurons.forEach((neuron) => {
      this.drawNeuron(neuron);
    });
  }

  public getDrawableInputNeurons() {
    return this.drawableInputNeurons;
  }

  private drawNeuron(drawableNeuron: DrawableNeuron) {
    // white background
    this.ctx.beginPath();
    this.ctx.arc(drawableNeuron.x, drawableNeuron.y, 25, 0, 2 * Math.PI);
    this.ctx.fillStyle = `rgb(255, 255, 255)`;
    this.ctx.fill();

    this.ctx.beginPath();
    if (drawableNeuron.isBias)
      this.ctx.fillStyle = `rgba(46, 40, 42, 1)`;
    else
      this.ctx.fillStyle = `rgba(61, 232, 255, ${drawableNeuron.activation})`;
    this.ctx.strokeStyle = `rgb(46, 40, 42, 1)`
    this.ctx.lineWidth = 1;
    this.ctx.arc(drawableNeuron.x, drawableNeuron.y, 25, 0, 2 * Math.PI);
    this.ctx.fill();
    this.ctx.stroke();

    this.ctx.fillStyle = `rgb(46, 40, 42, 1)`
    const height = 16;
    this.ctx.font = `bold ${height}px serif`;
    const text = Number(drawableNeuron.activation).toFixed(2);
    this.ctx.fillText(
      text,
      drawableNeuron.x - this.ctx.measureText(text).width / 2,
      drawableNeuron.y + height / 3);
  }

  private drawConnection(inputNeuron: DrawableNeuron, outputNeuron: DrawableNeuron, weight: number) {
    this.ctx.beginPath();
    this.ctx.lineWidth = Math.log(1.001 + Math.abs(weight));
    this.ctx.strokeStyle = (weight > 0) ?
      `rgba(61, 232, 255, 1)` :
      `rgba(205, 83, 52, 1)`;
    this.ctx.moveTo(inputNeuron.x, inputNeuron.y);
    this.ctx.lineTo(outputNeuron.x, outputNeuron.y);
    this.ctx.closePath();
    this.ctx.stroke();
  }
}
