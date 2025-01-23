<template>
    <div class="container">
      <h1>Synth Dashboard</h1>
      <p>Select a page:</p>
      <ul>
        <li><nuxt-link to="/nts1">NTS-1</nuxt-link></li>
        <li><nuxt-link to="/banner">Banner</nuxt-link></li>
        <li><nuxt-link to="/microfreak">MicroFreak</nuxt-link></li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {};
  </script>
  
  <style>
  .container {
    text-align: center;
    margin: 50px;
  }
  </style>
  
