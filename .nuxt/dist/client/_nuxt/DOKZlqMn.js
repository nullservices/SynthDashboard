function a(t){if(!navigator.requestMIDIAccess){console.error("Web MIDI API is not supported in this browser.");return}navigator.requestMIDIAccess().then(o=>{console.log("MIDI Access obtained:",o);for(const n of o.inputs.values())console.log(`Connecting to MIDI device: ${n.name}`),n.onmidimessage=s=>{const[e,c,i]=s.data;t(c,i,e===144?"note_on":e===128?"note_off":e===176?"control_change":"unknown")}},o=>{console.error("Failed to access MIDI devices:",o)})}export{a as i};