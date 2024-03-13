import * as Plotly from 'plotly.js-dist-min';
type ActivationFunction = (x: number) => number;

// Define activation functions
const step: ActivationFunction = x => x > 0 ? 1 : 0;
const linear: ActivationFunction = x => x;
const sigmoid: ActivationFunction = x => 1 / (1 + Math.exp(-x));
const tanh: ActivationFunction = x => (Math.exp(x) - Math.exp(-x)) / (Math.exp(x) + Math.exp(-x));
const relu: ActivationFunction = x => x > 0 ? x : 0;

// Function to update the display of slider values
function updateSliderDisplay(sliderId: string, displayId: string): void {
    const slider: HTMLInputElement = document.getElementById(sliderId) as HTMLInputElement;
    const display: HTMLElement = document.getElementById(displayId) as HTMLElement;
    display.textContent = slider.value;
    slider.addEventListener('input', () => {
        display.textContent = slider.value;
    });
    updatePlot();
}

// Function to generate random inputs
function generateRandomInputs(): void {
    console.log("Generating random input");
    // Set the value of input1 to a random number between -2 and 2
    document.getElementById('input1').setAttribute('value', (Math.random() * 4 - 2).toFixed(2));
    document.getElementById('input2').setAttribute('value', (Math.random() * 4 - 2).toFixed(2));
    document.getElementById('input3').setAttribute('value', (Math.random() * 4 - 2).toFixed(2));
}


// Function to attach event listener to sliders for automatic perceptron update
function attachUpdateListenerToSlider(sliderId: string): void {
    const slider: HTMLInputElement = document.getElementById(sliderId) as HTMLInputElement;
}

function perceptronOutput(input1, input2, input3, weight1, weight2, weight3, bias) {
    return input1 * weight1 + input2 * weight2 + input3 * weight3 + bias;
}

function updatePlot() {
    console.log('updatePlot called');
    const input1 = parseFloat((document.getElementById('input1') as HTMLInputElement).value);
    const input2 = parseFloat((document.getElementById('input2') as HTMLInputElement).value);
    const input3 = parseFloat((document.getElementById('input3') as HTMLInputElement).value);
    const weight1 = parseFloat((document.getElementById('weight1') as HTMLInputElement).value);
    const weight2 = parseFloat((document.getElementById('weight2') as HTMLInputElement).value);
    const weight3 = parseFloat((document.getElementById('weight3') as HTMLInputElement).value);
    const bias = parseFloat((document.getElementById('bias') as HTMLInputElement).value);
    const activationFunction = (document.getElementById('activationFunction') as HTMLInputElement).value;

    const perceptronRawOutput = perceptronOutput(input1, input2, input3, weight1, weight2, weight3, bias);

    // Define the activation function based on selection
    const activationFunctions = {
        step, linear, sigmoid, tanh, relu
    };

    const activatedOutput = activationFunctions[activationFunction](perceptronRawOutput);

    const xValues = [];
    for (let i = -10; i <= 10; i += 0.5) {
        xValues.push(i);
    }

    // y = x line extended
    const trace1 = {
        x: xValues,
        y: xValues,
        mode: 'lines',
        name: 'y = x',
        line: {color: 'green'}
    };

    // Activation function line
    const traceActivationFunction = {
        x: xValues,
        y: xValues.map(x => activationFunctions[activationFunction](x)),
        mode: 'lines',
        name: activationFunction.toUpperCase(),
        line: {color: 'red'}
    };

    // Plotting perceptron's raw output before activation
    const trace2 = {
        x: [perceptronRawOutput],
        y: [perceptronRawOutput],
        mode: 'markers',
        name: 'Perceptron Raw Output',
        marker: {color: 'blue', size: 12}
    };

    // Plotting perceptron's activated output
    const trace3 = {
        x: [perceptronRawOutput],
        y: [activatedOutput],
        mode: 'markers',
        name: 'Activated Output',
        marker: {color: 'red', size: 12}
    };

    const data = [trace1, traceActivationFunction, trace2, trace3];

    const layout = {
        title: 'Perceptron Output',
        xaxis: {
            title: 'Input',
            showline: true,
            showgrid: true, // Hides the gridlines
            zeroline: false, // Hides the zero line
        },
        yaxis: {
            title: 'Output',
            showline: true,
            showgrid: true, // Hides the gridlines
            zeroline: false, // Hides the zero line
        },
        showlegend: true,
        annotations: [
            {
                x: perceptronRawOutput,
                y: activatedOutput,
                xref: 'x',
                yref: 'y',
                text: 'Activated Output',
                showarrow: true,
                arrowhead: 2,
                ax: 0,
                ay: -40,
                bgcolor: 'white'
            }
        ],
        width: 800, // Set the width of the plot
        height: 600, // Set the height of the plot
        margin: { l: 50, r: 50, b: 100, t: 100, pad: 4 } // Adjust the margins as needed
    };
    
    Plotly.newPlot('plot', data, layout);
    
}

// Attach event listeners to sliders after DOM content is loaded
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('generateRandom').addEventListener('click', generateRandomInputs);
    // Initialize slider value displays and attach update listeners
    updateSliderDisplay('weight1', 'weight1-value');
    updateSliderDisplay('weight2', 'weight2-value');
    updateSliderDisplay('weight3', 'weight3-value');
    updateSliderDisplay('bias', 'bias-value');
    // Attach update listeners to sliders
    attachUpdateListenerToSlider('weight1');
    attachUpdateListenerToSlider('weight2');
    attachUpdateListenerToSlider('weight3');
    attachUpdateListenerToSlider('bias');
    document.getElementById('activationFunction').addEventListener('change', updatePlot);
    // Attach event listener to input elements
    document.getElementById('input1').addEventListener('input', updatePlot);
    document.getElementById('input2').addEventListener('input', updatePlot);
    document.getElementById('input3').addEventListener('input', updatePlot);
    // Attach event listener to the sliders
    document.getElementById('weight1').addEventListener('input', updatePlot);
    document.getElementById('weight2').addEventListener('input', updatePlot);
    document.getElementById('weight3').addEventListener('input', updatePlot);
    document.getElementById('bias').addEventListener('input', updatePlot);
});

