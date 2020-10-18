<template>
  <div class="container">
    <CardBeer
      v-for="(beer, index) in showList"
      :key="index"
      :number="index + 1"
      :beer="beer"
    ></CardBeer>
    <Button v-show="listEmpty === false && showList.length !== 0"></Button>
  </div>
</template>

<script>
import CardBeer from "./CardBeer";
import Button from "./Button";

export default {
  data: () => {
    return {};
  },
  components: {
    CardBeer,
    Button,
  },
  computed: {
    showList() {
      return this.$store.state.showList;
    },
    listEmpty() {
      return this.$store.state.listEmpty;
    },
  },
  methods: {},
};
</script>

<style lang="scss" scoped>
.container {
  padding: 1em;
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>