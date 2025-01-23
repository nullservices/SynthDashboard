<template>
  <div class="keyboard-container">
    <!-- White Keys -->
    <div
      v-for="key in whiteKeys"
      :key="key.id"
      :class="['key', 'white', { active: activeKeys.includes(key.id) }]"
      :style="getKeyStyle(key.id)"
    ></div>

    <!-- Black Keys -->
    <div
      v-for="key in blackKeys"
      :key="key.id"
      :class="['key', 'black', { active: activeKeys.includes(key.id) }]"
      :style="{ left: key.position + '%', ...getKeyStyle(key.id) }"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    activeKeys: {
      type: Array,
      required: true,
    },
    velocityValues: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      whiteKeys: [
        { id: 48 }, { id: 50 }, { id: 52 }, { id: 53 }, { id: 55 }, { id: 57 }, { id: 59 },
        { id: 60 }, { id: 62 }, { id: 64 }, { id: 65 }, { id: 67 }, { id: 69 }, { id: 71 },
      ],
      blackKeys: [
        { id: 49, position: 7 }, { id: 51, position: 13 },
        { id: 54, position: 26 }, { id: 56, position: 33 }, { id: 58, position: 40 },
        { id: 61, position: 53 }, { id: 63, position: 60 },
        { id: 66, position: 73 }, { id: 68, position: 80 }, { id: 70, position: 87 },
      ],
    };
  },
  methods: {
    getKeyStyle(keyId) {
      const velocity = this.velocityValues[keyId] || 0;
      if (velocity > 0) {
        const scale = 1 + velocity / 127;
        const glowIntensity = Math.min(velocity * 2, 255);
        return {
          transform: `scale(${scale})`,
          boxShadow: `0 0 ${glowIntensity / 4}px rgba(255, ${glowIntensity}, 0)`,
          zIndex: 2,
        };
      }
      return {};
    },
  },
};
</script>

<style scoped>
.keyboard-container {
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  width: 100%;
  height: 200px;
  background: #222;
  border-radius: 10px;
  border: 2px solid #444;
  overflow: hidden;
}

/* White Keys */
.key.white {
  flex: 1;
  height: 100%;
  background: #fff;
  border-right: 1px solid #ddd;
  position: relative;
  transition: transform 0.1s ease, box-shadow 0.1s ease;
}

.key.white:last-child {
  border-right: none;
}

.key.white.active {
  background: #ffcc00;
}

/* Black Keys */
.key.black {
  position: absolute;
  width: 3%;
  height: 60%;
  background: #000;
  top: 0;
  transform: translateX(-50%);
  border-radius: 3px;
  z-index: 1;
  transition: transform 0.1s ease, box-shadow 0.1s ease;
}

.key.black.active {
  background: #ff3300;
}
</style>
