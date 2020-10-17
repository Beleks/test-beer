<template>
  <div>
    <div class="head">
      <div class="left">
        <div class="number">1</div>
        <div class="name">Buzz</div>
      </div>
      <div class="right">
        <div class="edit">
          <Edit></Edit>
        </div>
        <div class="delete">
          <Delete></Delete>
        </div>
      </div>
    </div>
    <div class="body">
      <div class="photo">
        <img src="" alt="">
      </div>
      <div class="description">
        <div class="des">
          <div class="title">Description</div>
          <div class="text">Какой-то текст</div>
        </div>
        <div class="tips">
          <div class="title">Brewers tips</div>
          <div class="text">Какой-то текст</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Beer from "./svg/Beer";
import Delete from "./svg/Delete";
import Edit from "./svg/Edit";

export default {
  components: {
    Beer,
    Delete,
    Edit,
  },
};
</script>

<style lang="sass" scoped>

</style>