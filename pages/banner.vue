<template>
  <div class="banner">
    <div class="equipment">
      <div v-for="device in midiDevices" :key="device.id">
        🎹 {{ device.name }}: <span class="status">Connected</span>
      </div>
    </div>
    <canvas id="visualizer"></canvas>
    <div class="error" v-if="errorMessage">{{ errorMessage }}</div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";

export default {
  setup() {
    const midiDevices = ref([]);
    const errorMessage = ref("");

    const getMIDIDevices = async () => {
      try {
        const midiAccess = await navigator.requestMIDIAccess();
        const inputs = Array.from(midiAccess.inputs.values());
        midiDevices.value = inputs.map((input) => ({
          id: input.id,
          name: input.name,
        }));

        midiAccess.onstatechange = () => {
          const updatedInputs = Array.from(midiAccess.inputs.values());
          midiDevices.value = updatedInputs.map((input) => ({
            id: input.id,
            name: input.name,
          }));
        };
      } catch (err) {
        errorMessage.value = "Failed to access MIDI devices.";
        console.error(err);
      }
    };

    const setupVisualizer = async () => {
  try {
    const canvas = document.getElementById("visualizer");
    const ctx = canvas.getContext("2d");
    canvas.width = window.innerWidth * 0.6;
    canvas.height = 150;


    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    
    const audioContext = new (window.AudioContext || window.webkitAudioContext)();
    if (audioContext.state === "suspended") {
      
      await audioContext.resume();
    }

    const analyser = audioContext.createAnalyser();
    analyser.fftSize = 256;

    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);

    const source = audioContext.createMediaStreamSource(stream);
    source.connect(analyser);

    

    const draw = () => {
      analyser.getByteFrequencyData(dataArray);

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const barWidth = (canvas.width / bufferLength) * 2.5;
      let barHeight;
      let x = 0;

      for (let i = 0; i < bufferLength; i++) {
        barHeight = dataArray[i] / 2;
        ctx.fillStyle = `hsl(${(i / bufferLength) * 360}, 100%, 50%)`;
        ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
        x += barWidth + 1;
      }

      requestAnimationFrame(draw);
    };

    draw();
  } catch (err) {
    console.error("Error accessing default audio input:", err);
  }
};


    onMounted(() => {
      getMIDIDevices();
      setupVisualizer();
    });

    return { midiDevices, errorMessage };
  },
};
</script>


<style>
.banner {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  height: 250px;
  padding: 10px;
  background: linear-gradient(45deg, #111, #1b1b1b);
  border: 5px solid #00ffcc;
  box-shadow: 0 0 20px #00ffcc;
  position: relative;
}

.equipment {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  font-size: 1.2em;
  color: #00ffcc;
  width: 100%;
}

.status {
  color: #00ff00;
}

canvas {
  width: 100%;
  height: 150px;
}

.error {
  color: #ff0066;
  font-weight: bold;
}
</style>
