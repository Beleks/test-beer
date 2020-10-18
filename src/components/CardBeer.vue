<template>
  <div class="card">
    <div class="head">
      <div class="left">
        <div class="number">{{ index + 1 }}</div>
        <div class="name">
          <img src="@/assets/beer.png" alt="" />
          {{ beer.name }}
        </div>
      </div>
      <div class="right">
        <div class="edite button" @click="editCard(index)">
          <img src="@/assets/edit.png" alt="" />
        </div>
        <div class="delete button" @click="deletCard(index)">
          <img src="@/assets/delete.png" alt="" />
        </div>
      </div>
    </div>
    <div class="body">
      <div class="photo">
        <img :src="beer.image_url" alt="Не удалось загрузить" />
      </div>
      <div class="description">
        <div class="section">
          <div class="title">Description:</div>
          <div class="text">{{ beer.description }}</div>
        </div>
        <div class="section">
          <div class="title">Brewers tips:</div>
          <div class="text">{{ beer.brewers_tips }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// import Beer from "./svg/Beer";
// import Delete from "./svg/Delete";
// import Edit from "./svg/Edit";

export default {
  props: {
    index: Number,
    beer: Object,
  },
  components: {},
  methods: {
    editCard: function (index) {
      let params = {
        index: this.index,
        name: this.beer.name,
        description: this.beer.description,
      };
      this.$store.commit("OPEN_EDIT", params);
    },
    deletCard: function (index) {
      this.$store.commit("DELETE_ELEMENT", index);
    },
  },
  computed: {},
};
</script>

<style lang="scss" scoped>
.card {
  background-color: #fff;
  width: 600px;
  padding: 0.8em;
  border-radius: 10px;
  margin: 0.5em 0.3em;
  box-shadow: 0px 10px 20px -6px rgba(0, 0, 0, 0.1);
  .head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    .left {
      font-weight: bold;

      display: flex;
      // align-items: center;
      .number {
        display: flex;
        align-items: center;
        border-radius: 5px 0px 0px 5px;
        padding: 0.2em 0.4em;
        background-color: rgb(255, 226, 152);
      }
      .name {
        display: flex;
        align-items: center;
        padding: 0.2em 0.5em;
        border-radius: 0px 5px 5px 0px;
        background-color: rgb(251, 238, 204);
        img {
          margin-right: 0.5em;
        }
      }
    }
    .right {
      display: flex;
      .button {
        cursor: pointer;
        border: 1px solid;
        display: flex;
        align-items: center;
        padding: 0.2em 0.8em;
        border-radius: 5px;
        margin: 0.2em 0.3em;
        transition: background-color 0.3s ease-in-out;
      }
      .edite {
        border-color: rgb(147, 204, 255);
      }
      .delete {
        border-color: rgba(255, 124, 139, 0.85);
      }
      .delete:hover {
        background-color: rgb(255, 204, 209);
      }
      .edite:hover {
        background-color: rgb(204, 228, 249);
      }
    }
  }
  .body {
    margin-top: 1em;
    display: flex;
    .photo {
      width: 120px;
      min-width: 110px;
      display: flex;
      justify-content: center;
      align-items: center;
      border-radius: 10px;
      img {
        max-height: 100px;
      }
    }
  }
  .description {
    max-width: 550px;
    > div {
      margin-top: 0.3em;
    }
    .section {
      margin-bottom: 1em;
      .title {
        max-width: 120px;
        text-align: center;
        border-radius: 5px;
        background-color: rgb(225, 211, 248);
        margin-bottom: 0.4em;
      }
      .text{
        overflow:hidden;
        word-wrap: break-word;
      }
    }
  }
}
@media (max-width: 650px) {
  .card{
    width:fit-content;
  }
}

</style>