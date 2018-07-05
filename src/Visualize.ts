export class Visualizer {
  
  private content: HTMLElement; 

  constructor(content: HTMLElement) {
    this.content = content;
  }

  public printNumber = (num: number) => {
    this.content.innerText = `${num}`;
  }
}
