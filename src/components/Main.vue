<template>
  <div class="container">
    <Modal v-show="showModal"></Modal>
    <CardBeer
      class="beer"
      v-for="(beer, index) in showList"
      :key="index"
      :index="index"
      :beer="beer"
    ></CardBeer>
    <Button v-show="showButton"></Button>
  </div>
</template>

<script>
import CardBeer from "./CardBeer";
import Button from "./Button";
import Modal from "./Modal"

export default {
  data: () => {
    return {};
  },
  components: {
    CardBeer,
    Button,
    Modal
  },
  computed: {
    showButton() {
      return (
        this.listEmpty === false &&
        (this.showList.length !== 0 || this.nextPage.length !== 0)
      );
    },
    showModal(){
      return this.$store.state.modal
    },
    showList() {
      return this.$store.state.showList;
    },
    nextPage() {
      return this.$store.state.nextPage;
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
  display: flex;
  flex-direction: column;
  align-items: center;
}
</style>