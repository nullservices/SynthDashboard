import { ref, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrInterpolate, ssrRenderStyle } from "vue/server-renderer";
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
const _sfc_main = {
  setup() {
    const modulation = ref({ type: "Off", knobA: 0, knobB: 0 });
    const delay = ref({ type: "Off", knobA: 0, knobB: 0 });
    const reverb = ref({ type: "Off", knobA: 0, knobB: 0 });
    const getKnobStyle = (value) => {
      const angle = value / 127 * 270 - 135;
      return `transform: rotate(${angle}deg);`;
    };
    return { modulation, delay, reverb, getKnobStyle };
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "overlay" }, _attrs))}><div class="title"><h1>KORG NTS-1</h1></div><div class="content"><div id="modulation" class="section"><h2>Modulation</h2><div>Type: <span class="type-display">${ssrInterpolate($setup.modulation.type)}</span></div><div class="knob" style="${ssrRenderStyle($setup.getKnobStyle($setup.modulation.knobA))}"></div><div class="knob-label">Knob A</div><div class="knob" style="${ssrRenderStyle($setup.getKnobStyle($setup.modulation.knobB))}"></div><div class="knob-label">Knob B</div></div><div id="delay" class="section"><h2>Delay</h2><div>Type: <span class="type-display">${ssrInterpolate($setup.delay.type)}</span></div><div class="knob" style="${ssrRenderStyle($setup.getKnobStyle($setup.delay.knobA))}"></div><div class="knob-label">Knob A</div><div class="knob" style="${ssrRenderStyle($setup.getKnobStyle($setup.delay.knobB))}"></div><div class="knob-label">Knob B</div></div><div id="reverb" class="section"><h2>Reverb</h2><div>Type: <span class="type-display">${ssrInterpolate($setup.reverb.type)}</span></div><div class="knob" style="${ssrRenderStyle($setup.getKnobStyle($setup.reverb.knobA))}"></div><div class="knob-label">Knob A</div><div class="knob" style="${ssrRenderStyle($setup.getKnobStyle($setup.reverb.knobB))}"></div><div class="knob-label">Knob B</div></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/nts1.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const nts1 = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  nts1 as default
};
//# sourceMappingURL=nts1-BgEJ9tF1.js.map
