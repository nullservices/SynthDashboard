<template>
  <div class="overlay">
    <div class="title">
      <h1>KORG NTS-1</h1>
    </div>
    <div class="content">
      <div id="modulation" class="section">
        <h2>Modulation</h2>
        <div>Type: <span class="type-display">{{ modulation.type }}</span></div>
        <div class="knob" :style="getKnobStyle(modulation.knobA)"></div>
        <div class="knob-label">Knob A</div>
        <div class="knob" :style="getKnobStyle(modulation.knobB)"></div>
        <div class="knob-label">Knob B</div>
      </div>
      <div id="delay" class="section">
        <h2>Delay</h2>
        <div>Type: <span class="type-display">{{ delay.type }}</span></div>
        <div class="knob" :style="getKnobStyle(delay.knobA)"></div>
        <div class="knob-label">Knob A</div>
        <div class="knob" :style="getKnobStyle(delay.knobB)"></div>
        <div class="knob-label">Knob B</div>
      </div>
      <div id="reverb" class="section">
        <h2>Reverb</h2>
        <div>Type: <span class="type-display">{{ reverb.type }}</span></div>
        <div class="knob" :style="getKnobStyle(reverb.knobA)"></div>
        <div class="knob-label">Knob A</div>
        <div class="knob" :style="getKnobStyle(reverb.knobB)"></div>
        <div class="knob-label">Knob B</div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";

export default {
  setup() {
    const modulation = ref({ type: "Off", knobA: 0, knobB: 0 });
    const delay = ref({ type: "Off", knobA: 0, knobB: 0 });
    const reverb = ref({ type: "Off", knobA: 0, knobB: 0 });

    const connectWebSocket = () => {
      const ws = new WebSocket("ws://localhost:4000");

      ws.onopen = () => {
        console.log("WebSocket connection established.");
      };

      ws.onmessage = (event) => {
        try {
          const data = JSON.parse(event.data);

          // Process only messages for the "NTS-1 digital kit" device
          if (data.device === "NTS-1 digital kit") {
            console.log("MIDI Message Received:", data.message);

            if (data.message[0] === 176) {
              // Process only "control change" messages
              handleMIDIMessage(data.message[1], data.message[2]);
            }
          }
        } catch (error) {
          console.error("Error processing WebSocket message:", error);
        }
      };

      ws.onclose = () => {
        console.log("WebSocket connection closed. Reconnecting...");
        setTimeout(connectWebSocket, 1000);
      };

      ws.onerror = (error) => {
        console.error("WebSocket error:", error);
      };
    };

    const handleMIDIMessage = (control, value) => {
      console.log("Processing MIDI Message:", { control, value });
      switch (control) {
        case 88:
          modulation.value.type = mapModulation(value);
          break;
        case 28:
          modulation.value.knobA = value;
          break;
        case 29:
          modulation.value.knobB = value;
          break;
        case 89:
          delay.value.type = mapDelay(value);
          break;
        case 30:
          delay.value.knobA = value;
          break;
        case 31:
          delay.value.knobB = value;
          break;
        case 90:
          reverb.value.type = mapReverb(value);
          break;
        case 34:
          reverb.value.knobA = value;
          break;
        case 35:
          reverb.value.knobB = value;
          break;
      }
    };

    const mapModulation = (value) => ({
      0: "Off",
      25: "Chorus",
      50: "Ensemble",
      75: "Phaser",
      127: "Flanger",
    }[value] || "Unknown");

    const mapDelay = (value) => ({
      0: "Off",
      21: "Stereo",
      42: "Mono",
      63: "Ping Pong",
      84: "High Phase",
      127: "Tape",
    }[value] || "Unknown");

    const mapReverb = (value) => ({
      0: "Off",
      21: "Hall",
      42: "Plate",
      63: "Space",
      84: "Riser",
      127: "Submarine",
    }[value] || "Unknown");

    const getKnobStyle = (value) => {
      const angle = (value / 127) * 270 - 135;
      return `transform: rotate(${angle}deg);`;
    };

    onMounted(() => {
      connectWebSocket();
    });

    return { modulation, delay, reverb, getKnobStyle };
  },
};
</script>

<style>
body, html {
  margin: 0;
  padding: 0;
  background: transparent;
  overflow: hidden;
}

.overlay {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 500px;
  padding: 15px;
  border: 4px solid #00ffcc;
  border-radius: 15px;
  background-color: rgba(0, 0, 0, 0.8);
  box-shadow: 0 0 20px #00ffcc;
}

.title h1 {
  font-size: 1.2rem;
  color: #ff0066;
  margin-bottom: 10px;
  text-align: center;
}

.content {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.section {
  text-align: center;
  flex: 1;
  margin: 0 5px;
}

h2 {
  font-size: 0.9rem;
  margin-bottom: 5px;
  color: #ff0066;
}

.knob {
  width: 30px;
  height: 30px;
  background: #222;
  border: 2px solid #0f0;
  border-radius: 50%;
  margin: 5px auto;
  position: relative;
}

.knob:before {
  content: "";
  position: absolute;
  top: 2px;
  left: 50%;
  width: 2px;
  height: 10px;
  background: #0f0;
  transform-origin: bottom center;
}

.knob-label {
  font-size: 0.7rem;
  color: #ccc;
}

.type-display {
  width: 80px;
  text-align: center;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  display: inline-block;
}
</style>
