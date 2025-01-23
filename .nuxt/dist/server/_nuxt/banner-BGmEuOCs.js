import { ref, mergeProps, useSSRContext } from "vue";
import { ssrRenderAttrs, ssrRenderList, ssrInterpolate } from "vue/server-renderer";
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
    const midiDevices = ref([]);
    const errorMessage = ref("");
    return { midiDevices, errorMessage };
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "banner" }, _attrs))}><div class="equipment"><!--[-->`);
  ssrRenderList($setup.midiDevices, (device) => {
    _push(`<div> 🎹 ${ssrInterpolate(device.name)}: <span class="status">Connected</span></div>`);
  });
  _push(`<!--]--></div><canvas id="visualizer"></canvas>`);
  if ($setup.errorMessage) {
    _push(`<div class="error">${ssrInterpolate($setup.errorMessage)}</div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/banner.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const banner = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
export {
  banner as default
};
//# sourceMappingURL=banner-BGmEuOCs.js.map
