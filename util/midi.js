export function initializeMIDI(callback) {
  if (!navigator.requestMIDIAccess) {
    console.error("Web MIDI API is not supported in this browser.");
    return;
  }

  navigator.requestMIDIAccess().then(
    (midiAccess) => {
      
      for (const input of midiAccess.inputs.values()) {
        
        input.onmidimessage = (message) => {
          const [status, control, value] = message.data;
          const type =
            status === 144
              ? "note_on"
              : status === 128
              ? "note_off"
              : status === 176
              ? "control_change"
              : "unknown";
          callback(control, value, type);
        };
      }
    },
    (error) => {
      console.error("Failed to access MIDI devices:", error);
    }
  );
}
