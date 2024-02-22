import * as Plotly from 'plotly.js-dist';

class DoublePerceptron {
  input: number;
  weight1: number;
  bias1: number;
  weight2: number;
  bias2: number;

  constructor() {
    this.input = 0;
    this.weight1 = 0;
    this.bias1 = 0;
    this.weight2 = 0;
    this.bias2 = 0;
    this.initializeUI();
  }

  initializeUI(): void {
    document.getElementById('input').addEventListener('change', this.updateValues.bind(this));
    document.getElementById('weight1').addEventListener('change', this.updateValues.bind(this));
    document.getElementById('bias1').addEventListener('change', this.updateValues.bind(this));
    document.getElementById('weight2').addEventListener('change', this.updateValues.bind(this));
    document.getElementById('bias2').addEventListener('change', this.updateValues.bind(this));
  }

  updateValues(): void {
    // Capture weights and biases from the UI
    this.weight1 = parseFloat((document.getElementById('weight1d') as HTMLInputElement).value);
    this.bias1 = parseFloat((document.getElementById('bias1d') as HTMLInputElement).value);
    this.weight2 = parseFloat((document.getElementById('weight2d') as HTMLInputElement).value);
    this.bias2 = parseFloat((document.getElementById('bias2d') as HTMLInputElement).value);
  
    // No need to update individual outputs here, chart update will handle the calculations
    this.updateChart();
  }

  relu(x: number): number {
    return Math.max(0, x);
  }

  updateChart(): void {
    const xValues = Array.from({length: 21}, (_, i) => i - 10); // Generate x values from -10 to 10
    const yValues = xValues.map(x => {
      // Calculate the output for each x value through both perceptrons
      const output1 = this.relu(x * this.weight1 + this.bias1);
      const finalOutput = this.relu(output1 * this.weight2 + this.bias2);
      return finalOutput;
    });
  
    const data = [{
      x: xValues,
      y: yValues,
      type: 'scatter',
      mode: 'lines+markers',
      name: 'Perceptron Output'
    }];
  
    Plotly.newPlot('chart', data);
  }  
}

const doublePerceptron = new DoublePerceptron();
