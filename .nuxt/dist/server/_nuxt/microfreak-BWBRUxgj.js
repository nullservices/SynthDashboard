import { mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrRenderStyle, ssrInterpolate, ssrRenderClass, ssrRenderComponent } from "vue/server-renderer";
import { _ as _export_sfc } from "../server.mjs";
import "ofetch";
import "#internal/nuxt/paths";
import "hookable";
import "unctx";
import "h3";
import "unhead";
import "@unhead/shared";
import "vue-router";
import "radix3";
import "defu";
import "ufo";
const _sfc_main$2 = {
  props: {
    knobs: Array
  }
};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "knobs-grid" }, _attrs))}><!--[-->`);
  ssrRenderList($props.knobs, (knob) => {
    _push(`<div class="knob-container"><div class="knob" style="${ssrRenderStyle({ transform: `rotate(${knob.angle}deg)` })}"></div><div class="knob-label">${ssrInterpolate(knob.label)}</div><div class="knob-value">${ssrInterpolate(knob.value)}</div></div>`);
  });
  _push(`<!--]--></div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Knobs.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$2]]);
const _sfc_main$1 = {
  props: {
    activeKeys: {
      type: Array,
      required: true
    },
    velocityValues: {
      type: Object,
      // Map of keyId -> velocity
      required: true
    }
  },
  data() {
    return {
      whiteKeys: [
        { id: 48 },
        { id: 50 },
        { id: 52 },
        { id: 53 },
        { id: 55 },
        { id: 57 },
        { id: 59 },
        { id: 60 },
        { id: 62 },
        { id: 64 },
        { id: 65 },
        { id: 67 },
        { id: 69 },
        { id: 71 }
      ],
      blackKeys: [
        { id: 49, position: 7 },
        { id: 51, position: 13 },
        { id: 54, position: 26 },
        { id: 56, position: 33 },
        { id: 58, position: 40 },
        { id: 61, position: 53 },
        { id: 63, position: 60 },
        { id: 66, position: 73 },
        { id: 68, position: 80 },
        { id: 70, position: 87 }
      ]
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
          zIndex: 2
          // Ensure the key is above others
        };
      }
      return {};
    }
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "keyboard-container" }, _attrs))} data-v-7deb6aa3><!--[-->`);
  ssrRenderList($data.whiteKeys, (key) => {
    _push(`<div class="${ssrRenderClass(["key", "white", { active: $props.activeKeys.includes(key.id) }])}" style="${ssrRenderStyle($options.getKeyStyle(key.id))}" data-v-7deb6aa3></div>`);
  });
  _push(`<!--]--><!--[-->`);
  ssrRenderList($data.blackKeys, (key) => {
    _push(`<div class="${ssrRenderClass(["key", "black", { active: $props.activeKeys.includes(key.id) }])}" style="${ssrRenderStyle({ left: key.position + "%", ...$options.getKeyStyle(key.id) })}" data-v-7deb6aa3></div>`);
  });
  _push(`<!--]--></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Keyboard.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-7deb6aa3"]]);
function initializeMIDI(callback) {
  if (!(void 0).requestMIDIAccess) {
    console.error("Web MIDI API is not supported in this browser.");
    return;
  }
  (void 0).requestMIDIAccess().then(
    (midiAccess) => {
      console.log("MIDI Access obtained:", midiAccess);
      for (const input of midiAccess.inputs.values()) {
        console.log(`Connecting to MIDI device: ${input.name}`);
        input.onmidimessage = (message) => {
          const [status, control, value] = message.data;
          const type = status === 144 ? "note_on" : status === 128 ? "note_off" : status === 176 ? "control_change" : "unknown";
          callback(control, value, type);
        };
      }
    },
    (error) => {
      console.error("Failed to access MIDI devices:", error);
    }
  );
}
const _sfc_main = {
  components: { Knobs: __nuxt_component_0, Keyboard: __nuxt_component_1 },
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
        { id: 92, label: "ARP/SEQ Rate", angle: 0, value: 0 }
      ],
      activeKeys: [],
      velocityValues: {}
    };
  },
  methods: {
    handleMIDIMessage(control, value, type) {
      console.log("Received MIDI message:", { control, value, type });
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
          knob.angle = value / 127 * 270 - 135;
        }
      }
    }
  },
  mounted() {
    initializeMIDI((control, value, type) => {
      this.handleMIDIMessage(control, value, type);
    });
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Knobs = __nuxt_component_0;
  const _component_Keyboard = __nuxt_component_1;
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "microfreak-container" }, _attrs))}><h1>MicroFreak</h1>`);
  _push(ssrRenderComponent(_component_Knobs, { knobs: $data.knobs }, null, _parent));
  _push(ssrRenderComponent(_component_Keyboard, {
    activeKeys: $data.activeKeys,
    velocityValues: $data.velocityValues
  }, null, _parent));
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/microfreak.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const microfreak = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  microfreak as default
};
//# sourceMappingURL=microfreak-BWBRUxgj.js.map
