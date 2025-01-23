<template>
  <div class="microfreak-container">
    <h1>MicroFreak</h1>
    <Knobs :knobs="knobs" />
    <Keyboard :activeKeys="activeKeys" :velocityValues="velocityValues" />
  </div>
</template>

<script>
import Knobs from "~/components/Knobs.vue";
import Keyboard from "~/components/Keyboard.vue";
import { initializeMIDI } from "~/util/midi";

export default {
  components: { Knobs, Keyboard },
  data() {
    return {
      knobs: [
        { id: 5, label: "Glide", angle: 0, value: 0 },
        { id: 9, label: "Oscillator Type", angle: 0, value: 0 },
        { id: 10, label: "Wave", angle: 0, value: 0 },
        { id: 12, label: "Timbre", angle: 0, value: 0 },
        { id: 13, label: "Shape", angle: 0, value: 0 },
        { id: 23, label: "Cutoff", angle: 0, value: 0 },
        { id: 83, label: "Resonance", angle: 0, value: 0 },
        { id: 102, label: "Cycling Env Rise", angle: 0, value: 0 },
        { id: 103, label: "Cycling Env Fall", angle: 0, value: 0 },
        { id: 28, label: "Cycling Env Hold", angle: 0, value: 0 },
        { id: 24, label: "Cycling Env Amount", angle: 0, value: 0 },
        { id: 105, label: "Attack", angle: 0, value: 0 },
        { id: 106, label: "Decay/Release", angle: 0, value: 0 },
        { id: 29, label: "Sustain", angle: 0, value: 0 },
        { id: 26, label: "Filter Amount", angle: 0, value: 0 },
        { id: 94, label: "LFO Rate", angle: 0, value: 0 },
        { id: 92, label: "ARP/SEQ Rate", angle: 0, value: 0 },
      ],
      activeKeys: [],
      velocityValues: {},
    };
  },
  methods: {
    handleMIDIMessage(control, value, type) {
      
      if (type === "note_on") {
        const note = control;
        if (value > 0) {
          if (!this.activeKeys.includes(note)) this.activeKeys.push(note);
          this.$set(this.velocityValues, note, value);
        } else {
          this.activeKeys = this.activeKeys.filter((key) => key !== note);
          this.$delete(this.velocityValues, note);
        }
      } else if (type === "note_off") {
        const note = control;
        this.activeKeys = this.activeKeys.filter((key) => key !== note);
        this.$delete(this.velocityValues, note);
      }
      if (type === "control_change") {
        const knob = this.knobs.find((k) => k.id === control);
        if (knob) {
          knob.value = value;
          knob.angle = (value / 127) * 270 - 135;
        }
      }
    },
  },
  mounted() {
    initializeMIDI((control, value, type) => {
      this.handleMIDIMessage(control, value, type);
    });
  },
};
</script>

<style>
.microfreak-container {
  width: 800px;
  height: 600px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  background: linear-gradient(135deg, #1a1a1a, #333);
  color: #fff;
  padding: 10px;
  border: 2px solid #00ffcc;
  border-radius: 10px;
  overflow: hidden;
}
h1 {
  font-size: 1.2rem;
}
</style>
