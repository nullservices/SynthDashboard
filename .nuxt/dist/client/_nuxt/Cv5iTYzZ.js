import{_ as x,r as w,m as _,c as l,a as g,F as D,n as I,t as A,p as M,o as u,d as z}from"./zLvQlRDL.js";const C={setup(){const r=w([]),s=w(""),p=async()=>{try{const e=await navigator.requestMIDIAccess(),n=Array.from(e.inputs.values());r.value=n.map(t=>({id:t.id,name:t.name})),e.onstatechange=()=>{const t=Array.from(e.inputs.values());r.value=t.map(a=>({id:a.id,name:a.name}))}}catch(e){s.value="Failed to access MIDI devices.",console.error(e)}},o=async()=>{try{const e=document.getElementById("visualizer"),n=e.getContext("2d");e.width=window.innerWidth*.6,e.height=150,console.log("Initializing visualizer with default audio input...");const t=await navigator.mediaDevices.getUserMedia({audio:!0});console.log("Audio stream initialized:",t);const a=new(window.AudioContext||window.webkitAudioContext);a.state==="suspended"&&(console.log("Resuming AudioContext..."),await a.resume());const i=a.createAnalyser();i.fftSize=256;const c=i.frequencyBinCount,f=new Uint8Array(c);a.createMediaStreamSource(t).connect(i),console.log("Visualizer setup complete. Starting animation...");const v=()=>{i.getByteFrequencyData(f),n.clearRect(0,0,e.width,e.height);const h=e.width/c*2.5;let m,y=0;for(let d=0;d<c;d++)m=f[d]/2,n.fillStyle=`hsl(${d/c*360}, 100%, 50%)`,n.fillRect(y,e.height-m,h,m),y+=h+1;requestAnimationFrame(v)};v()}catch(e){console.error("Error accessing default audio input:",e)}};return _(()=>{p(),o()}),{midiDevices:r,errorMessage:s}}},b={class:"banner"},B={class:"equipment"},S={key:0,class:"error"};function k(r,s,p,o,e,n){return u(),l("div",b,[g("div",B,[(u(!0),l(D,null,I(o.midiDevices,t=>(u(),l("div",{key:t.id},[z(" 🎹 "+A(t.name)+": ",1),s[0]||(s[0]=g("span",{class:"status"},"Connected",-1))]))),128))]),s[1]||(s[1]=g("canvas",{id:"visualizer"},null,-1)),o.errorMessage?(u(),l("div",S,A(o.errorMessage),1)):M("",!0)])}const V=x(C,[["render",k]]);export{V as default};