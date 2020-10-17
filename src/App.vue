<template>
  <div id="app">
    <Main></Main>
  </div>
</template>

<script>
import Main from "./components/Main.vue";

export default {
  name: "App",
  components: {
    Main,
  },
  beforeCreate(){
    this.$store.dispatch("GET_BEER");
  }
};
</script>

<style lang="scss">
body{
  padding: 0;
  margin: 0;
  background-color: rgb(248, 248, 248);
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
