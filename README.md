# Synth Visualizer Dashboard

Welcome to the **Synth Visualizer Dashboard**! This is a sleek and interactive MIDI visualization app built with Vue.js and Nuxt.js, designed to provide real-time feedback for your synths like the **Arturia MicroFreak** and **KORG NTS-1**. Perfect for live performances, streaming setups, or just having fun with your gear!

## Features

- **Real-Time MIDI Feedback**:
  - Display key presses with dynamic visualizations.
  - Monitor velocity and knob changes live as you tweak your synth.

- **Detailed Controls**:
  - Visual representation of all major knobs and parameters.
  - Organized layout to match the physical synths' design.

- **Compatibility**:
  - Works with Arturia MicroFreak, KORG NTS-1, and other MIDI devices.

- **Stream Ready**:
  - Compatible with OBS via browser source to integrate into your live streams.

## Visual Previews

### Arturia MicroFreak
![Arturia MicroFreak Visualization](./assets/Microfreak-Capture.gif)

### KORG NTS-1
![KORG NTS-1 Visualization](./assets/NTS1-Capture.gif)

## Requirements

1. **Vue.js / Nuxt.js Environment**: Ensure you have Node.js installed to run the app locally.
2. **MIDI Setup**: Connect your Arturia MicroFreak or KORG NTS-1 via USB to your computer.
3. **OBS Integration (Optional)**: Configure OBS with a local web server to stream live visualizations.

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/synth-visualizer-dashboard.git
   cd synth-visualizer-dashboard

2. Install dependencies:
   ```bash
   npm install

 3. Start the development server:
    ```bash
    npm run dev

 4. Open your browser and navigate to:
    ```bash
    http://localhost:3000/microfreak
    http://localhost:3000/nts1

    
