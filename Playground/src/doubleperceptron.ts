import * as Plotly from 'plotly.js-dist-min';

// Define the activation function type
type ActivationFunction = (x: number) => number;

// Define activation functions
const relu: ActivationFunction = x => x > 0 ? x : 0;

// Function to calculate the output of a perceptron
function calculatePerceptronOutput(input: number, weight: number, bias: number, activationFunc: ActivationFunction): number {
    return activationFunc(input * weight + bias);
}

// Function to update the Plotly chart
function updatePlot(): void {
    // Get the input, weights, and biases from the DOM
    const input: number = parseFloat((document.getElementById('input') as HTMLInputElement).value);
    const weight1: number = parseFloat((document.getElementById('weight1d') as HTMLInputElement).value);
    const bias1: number = parseFloat((document.getElementById('bias1d') as HTMLInputElement).value);
    const weight2: number = parseFloat((document.getElementById('weight2d') as HTMLInputElement).value);
    const bias2: number = parseFloat((document.getElementById('bias2d') as HTMLInputElement).value);

    // Calculate the output of the first perceptron
    const output1: number = calculatePerceptronOutput(input, weight1, bias1, relu);

    // Calculate the output of the second perceptron
    const output2: number = calculatePerceptronOutput(output1, weight2, bias2, relu);

    // Create a range of x values for plotting the ReLU activation
    let xValues = [];
    let yValuesReLU1 = [];
    let yValuesReLU2 = [];
    for (let x = -10; x <= 10; x += 0.1) {
        xValues.push(x);
        yValuesReLU1.push(relu(x * weight1 + bias1));
        yValuesReLU2.push(relu(relu(x * weight1 + bias1) * weight2 + bias2));
    }

    // Define traces for the ReLU function and the current input
    const traceReLU1 = {
        x: xValues,
        y: yValuesReLU1,
        mode: 'lines',
        type: 'scatter',
        name: 'ReLU Node 1'
    };

    const traceReLU2 = {
        x: xValues,
        y: yValuesReLU2,
        mode: 'lines',
        type: 'scatter',
        name: 'ReLU Node 2'
    };

    const traceCurrentInput = {
        x: [input],
        y: [output1],
        mode: 'markers',
        type: 'scatter',
        name: 'Current Input Node 1',
        marker: { size: 12, color: 'rgb(76, 175, 80)' }
    };

    const traceCurrentOutput = {
        x: [output1],
        y: [output2],
        mode: 'markers',
        type: 'scatter',
        name: 'Current Output Node 2',
        marker: { size: 12, color: 'rgb(33, 150, 243)' }
    };

    const data = [traceReLU1, traceReLU2, traceCurrentInput, traceCurrentOutput];

    // Define layout
    const layout = {
        title: 'Double Perceptron Visualization',
        xaxis: {
            title: 'Input'
        },
        yaxis: {
            title: 'Output'
        }
    };

    // Plot the graph
    Plotly.newPlot('plot', data, layout);
}

function updateSliderDisplay(sliderId: string, displayId: string): void {
  const slider = document.getElementById(sliderId) as HTMLInputElement;
  const display = document.getElementById(displayId) as HTMLElement;
  if (slider && display) {
      // Initial display update
      display.textContent = slider.value;

      // Update display on slider input
      slider.addEventListener('input', () => {
          display.textContent = slider.value;
      });
  }
  updatePlot();
}

// Set up event listeners for the input elements
function attachEventListeners(): void {
    updateSliderDisplay('weight1d', 'weight1d-value');
    updateSliderDisplay('bias1d', 'bias1d-value');
    updateSliderDisplay('weight2d', 'weight2d-value');
    updateSliderDisplay('bias2d', 'bias2d-value');
    document.getElementById('input').addEventListener('change', updatePlot);
    document.getElementById('weight1d').addEventListener('input', updatePlot);
    document.getElementById('bias1d').addEventListener('input', updatePlot);
    document.getElementById('weight2d').addEventListener('input', updatePlot);
    document.getElementById('bias2d').addEventListener('input', updatePlot);
    updatePlot();
}


// Call the function to attach event listeners when the DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    attachEventListeners();
    updatePlot(); // Initial plot
});
