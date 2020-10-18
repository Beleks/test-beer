<template>
  <div
    :disabled="status === 'Loading...'"
    :class="[
      'button',
      {
        loading: status === 'Loading...',
        next: status === 'Show next',
      },
    ]"
    @click="showNext()"
  >
    <div>
      {{ status }}
    </div>
  </div>
</template>

<script>
export default {
  computed: {
    status() {
      if (this.$store.state.nextPageLoading === true) {
        return "Loading...";
      } else {
        return "Show next";
      }
    },
  },
  methods: {
    showNext: function () {
      this.$store.commit("SHOW_NEXT");
      this.$store.dispatch("GET_BEER");
    },
  },
};
</script>

<style lang="scss" scoped>
.button {
  user-select: none;
  font-size: 1.2rem;
  cursor: pointer;
  border-radius: 5px;
  padding: 0.2em 0.5em;
}
.next {
  border: 1px solid rgb(66, 184, 131);
  transition: background-color 0.3s ease-in-out, color 0.3s ease-in-out;
}
.loading {
  background-color: rgba(128, 128, 128, 0.3);
  border-color: rgba(128, 128, 128, 0.7);
}
.next:hover {
  color: white;
  background-color: rgba(66, 184, 131, 0.5);
}
</style>