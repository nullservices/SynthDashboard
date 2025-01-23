<template>
  <div class="knobs-grid">
    <div
      v-for="knob in knobs"
      :key="knob.id"
      class="knob-container"
    >
      <div
        class="knob"
        :style="{ transform: `rotate(${knob.angle}deg)` }"
      ></div>
      <div class="knob-label">{{ knob.label }}</div>
      <div class="knob-value">{{ knob.value }}</div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    knobs: Array,
  },
};
</script>

<style>
.knobs-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 10px;
  justify-items: center;
}
.knob-container {
  text-align: center;
  color: #ffcc00;
}
.knob {
  width: 40px;
  height: 40px;
  border: 2px solid #ff6600;
  border-radius: 50%;
  background: radial-gradient(circle, #222, #111);
}
.knob:before {
  content: "";
  position: absolute;
  top: 5px;
  left: 50%;
  width: 2px;
  height: 10px;
  background: #ffcc00;
  transform-origin: bottom center;
}
.knob-label {
  font-size: 0.6rem;
}
.knob-value {
  font-size: 0.5rem;
}
</style>
