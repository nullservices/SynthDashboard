import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { WebMidi } from "webmidi";
import { WebSocketServer } from "ws";

const app = express();
app.use(cors());
app.use(bodyParser.json());

let midiLogs = []; // To store incoming MIDI messages

// Enable WebMidi
WebMidi.enable((err) => {
  if (err) {
    console.error("WebMidi could not be enabled.", err);
    return;
  }

  console.log("WebMidi enabled!");

  // Log available MIDI inputs and outputs
  WebMidi.inputs.forEach((input) => {
    console.log("Input:", input.name);
    input.addListener("midimessage", (e) => {
      // Filter out Timing Clock messages ([248])
      if (e.data.length === 1 && e.data[0] === 248) {
        return; // Ignore timing clock messages
      }

      const log = {
        device: input.name,
        timestamp: new Date(),
        message: e.data, // Raw MIDI message
      };
      midiLogs.push(log); // Add to log
      console.log(`[${input.name}] MIDI Message:`, e.data);

      // Broadcast MIDI messages to all WebSocket clients
      wss.clients.forEach((client) => {
        if (client.readyState === client.OPEN) {
          client.send(JSON.stringify(log));
        }
      });
    });
  });

  WebMidi.outputs.forEach((output) => {
    console.log("Output:", output.name);
  });
});

// API to list connected MIDI devices
app.get("/api/midi-devices", (req, res) => {
  const devices = {
    inputs: WebMidi.inputs.map((input) => input.name),
    outputs: WebMidi.outputs.map((output) => output.name),
  };
  res.json(devices);
});

// API to retrieve MIDI logs
app.get("/api/midi-logs", (req, res) => {
  res.json(midiLogs);
});

// API to send a MIDI message
app.post("/api/send-midi", (req, res) => {
  const { outputDevice, message } = req.body;
  const output = WebMidi.getOutputByName(outputDevice);

  if (!output) {
    return res.status(404).json({ error: "Output device not found" });
  }

  try {
    output.send(message);
    console.log(`MIDI Message Sent to ${outputDevice}:`, message);
    res.json({ success: true });
  } catch (err) {
    console.error("Error sending MIDI message:", err);
    res.status(500).json({ error: "Failed to send MIDI message" });
  }
});

// Start the HTTP server
const PORT = 4000;
const server = app.listen(PORT, () => {
  console.log(`MIDI Gateway Backend running on http://localhost:${PORT}`);
});

// Create a WebSocket server
const wss = new WebSocketServer({ server }); // Attach to the existing HTTP server
wss.on("connection", (ws) => {
  console.log("WebSocket client connected.");

  ws.on("message", (data) => {
    try {
      const message = JSON.parse(data);

      if (message.type === "send-midi") {
        const { outputDevice, message: midiMessage } = message;
        const output = WebMidi.getOutputByName(outputDevice);

        if (output) {
          output.send(midiMessage);
          console.log(`MIDI message sent to ${outputDevice}:`, midiMessage);
          ws.send(
            JSON.stringify({
              success: true,
              message: `MIDI message sent to ${outputDevice}`,
            })
          );
        } else {
          console.error(`Output device not found: ${outputDevice}`);
          ws.send(
            JSON.stringify({
              success: false,
              error: `Output device not found: ${outputDevice}`,
            })
          );
        }
      } else {
        console.error("Invalid message type:", message.type);
        ws.send(
          JSON.stringify({
            success: false,
            error: `Invalid message type: ${message.type}`,
          })
        );
      }
    } catch (err) {
      console.error("Error processing WebSocket message:", err);
      ws.send(
        JSON.stringify({
          success: false,
          error: "Invalid WebSocket message format.",
        })
      );
    }
  });

  ws.on("close", () => {
    console.log("WebSocket client disconnected.");
  });
});
