import Plotly from 'plotly.js-dist';

type ActivationFunction = (x: number) => number;

// Define activation functions
const relu: ActivationFunction = x => x > 0 ? x : 0;
const tanh: ActivationFunction = x => (Math.exp(x) - Math.exp(-x)) / (Math.exp(x) + Math.exp(-x));
const sigmoid: ActivationFunction = x => 1 / (1 + Math.exp(-x));
const linear: ActivationFunction = x => x;

// Function to generate random inputs
function generateRandomInputs(): void {
    (document.getElementById('input1') as HTMLInputElement).value = Math.random().toFixed(2);
    (document.getElementById('input2') as HTMLInputElement).value = Math.random().toFixed(2);
    (document.getElementById('input3') as HTMLInputElement).value = Math.random().toFixed(2);
}

// Initialize Plot
function initPlot(): void {
    const initialData = [{
        x: [0],
        y: [0],
        type: 'scatter',
        mode: 'lines+markers',
        name: 'Activation Output'
    }];

    const layout = {
        title: 'Perceptron Activation Function',
        xaxis: { title: 'Input' },
        yaxis: { title: 'Output' }
    };

    Plotly.newPlot('plot', initialData, layout);
}

// Function to update perceptron and plot
function updatePerceptron(): void {
    const input1 = parseFloat((document.getElementById('input1') as HTMLInputElement).value);
    const input2 = parseFloat((document.getElementById('input2') as HTMLInputElement).value);
    const input3 = parseFloat((document.getElementById('input3') as HTMLInputElement).value);

    const weight1 = parseFloat((document.getElementById('weight1') as HTMLInputElement).value);
    const weight2 = parseFloat((document.getElementById('weight2') as HTMLInputElement).value);
    const weight3 = parseFloat((document.getElementById('weight3') as HTMLInputElement).value);

    const bias = parseFloat((document.getElementById('bias') as HTMLInputElement).value);

    let weightedSum = input1 * weight1 + input2 * weight2 + input3 * weight3 + bias;

    const activationFunc = (document.getElementById('activationFunction') as HTMLSelectElement).value;
    let activationOutput: number;

    switch (activationFunc) {
        case 'relu':
            activationOutput = relu(weightedSum);
            break;
        case 'tanh':
            activationOutput = tanh(weightedSum);
            break;
        case 'sigmoid':
            activationOutput = sigmoid(weightedSum);
            break;
        case 'linear':
        default:
            activationOutput = linear(weightedSum);
            break;
    }

    const update = {
        x: [[input1]],
        y: [[activationOutput]]
    };

    Plotly.extendTraces('plot', update, [0]);
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('generateRandom')?.addEventListener('click', generateRandomInputs);
    document.getElementById('updatePerceptron')?.addEventListener('click', updatePerceptron);
    initPlot();
});
