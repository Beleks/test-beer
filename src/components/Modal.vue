<template>
  <div class="bg">
    <div class="modal">
      <div class="head">
        <div class="name">
          <input type="text" v-model="name" />
        </div>
        <div class="buttons">
          <div class="button done" @click="setCahnge()">
            <img src="@/assets/done.png" alt="" />
          </div>
          <div class="button close" @click="closeModla()">
            <img src="@/assets/close.png" alt="" />
          </div>
        </div>
      </div>
      <div class="body">
        <div class="des">Description:</div>
        <div class="des-text">
          <textarea name="" id="" v-model="description"></textarea>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      setName: "",
      setDescription: "",
    };
  },
  methods: {

    setCahnge: function () {
      console.log(this.setName, this.setDescription);
      let params = {
        name: (this.setName).trim(),
        description: (this.setDescription).trim(),
      };
      this.$store.commit("SET_CHANGE", params);
    },

    closeModla: function () {
      this.$store.commit("CLOSE_MODAL");
    },
  },
  computed: {
    name: {
      get: function () {
        this.setName = this.$store.state.editData.name;
        return this.$store.state.editData.name;
      },
      set: function (value) {
        this.setName = value;
      },
    },

    description: {
      get: function () {
        this.description = this.$store.state.editData.description;
        return this.$store.state.editData.description;
      },
      set: function (value) {
        this.setDescription = value;
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.bg {
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  position: fixed;
  background-color: rgba(128, 128, 128, 0.24);
}
.modal {
  overflow: auto;
  // margin:  0 auto;
  background-color: #fff;
  border-radius: 10px;
  margin: auto;
  box-shadow: 0px 10px 20px -6px rgba(0, 0, 0, 0.1);
  max-width: 650px;
  max-height: 400px;
  padding: 0.8em;
  .head {
    display: flex;
    justify-content: space-between;
    align-items: center;
    .name {
      // font-size: 1.2rem;
      input {
        height: 30px;
      }
    }
    .buttons {
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
      .done {
        border-color: rgb(66, 184, 131);
      }
      .close {
        border-color: rgba(255, 124, 139, 0.85);
      }
      .close:hover {
        background-color: rgb(255, 204, 209);
      }
      .done:hover {
        background-color: rgba(66, 184, 131, 0.3);
      }
    }
  }
  .body {
    .des {
      max-width: 120px;
      text-align: center;
      border-radius: 5px;
      background-color: rgb(225, 211, 248);
      margin-bottom: 0.4em;
    }
    .des-text {
      // // display: flex;
      // text-align: start;
      height: 300px;
      textarea {
        font: inherit;
        overflow: auto;
        min-width: 100%;
        height: inherit;
        outline: none;
        border: none;
        resize: none;
        // height: ;
        width: inherit;
        height: inherit;
        word-wrap: break-word;
      }
    }
  }
}

//

input {
  border: none;
  background-image: none;
  background-color: transparent;
  box-shadow: none;
  outline: none;
  z-index: 10;
  font-size: 1.1rem;
  min-width: 280px;
}
</style>