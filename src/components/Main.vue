<template>
  <div class="container">
    <CardBeer v-for="(beer, index) in list" :key="index" :number="index + 1" :beer="beer"></CardBeer>
  </div>
</template>

<script>
import CardBeer from "./CardBeer";
export default {
  components: {
    CardBeer,
  },
  computed: {
    list() {
      return this.$store.state.list;
    },
  },
};
</script>

<style lang="scss" scoped>
.container{
  padding: 1em;
}
</style>