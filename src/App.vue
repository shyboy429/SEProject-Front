<template>
  <div id="app">
    <Header />
    <div class="main-container">
      <Sidebar />
      <router-view />
    </div>
  </div>
</template>

<style>
#app {
  display: flex;
  flex-direction: column;
  height: 100vh;
}

.main-container {
  display: flex;
  overflow: auto;
  flex: 1;
}

body {
  margin: 0;
  font-family: Arial, sans-serif;
}
</style>