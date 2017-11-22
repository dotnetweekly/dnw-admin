<template>

  <div>

  <h1 v-if="!item._id">Add Newsletter</h1>
  <h1 v-if="item._id">Edit Newsletter {{item._id}}</h1>

    <input type="hidden" v-model="item._id" />
    <div class="field">
      <label class="label">Title</label>
      <div class="control">
        <input class="input" v-model="item.title" type="text" placeholder="Text input">
      </div>
    </div>

    <div class="field">
      <label class="label">Slug</label>
      <div class="control">
        <input class="input" v-model="item.slug" type="text" placeholder="Text input">
      </div>
    </div>

    <div class="field">
      <label class="label">Path</label>
      <div class="control">
        <input class="input" v-model="item.path" type="text" placeholder="Text input">
      </div>
    </div>

    <div class="field">
      <label class="label">Week</label>
      <div class="control">
        <input class="input" v-model="item.week" type="text" placeholder="Text input">
      </div>
    </div>

    <div class="field">
      <label class="label">Year</label>
      <div class="control">
        <input class="input" v-model="item.year" type="text" placeholder="Text input">
      </div>
    </div>

    <div class="field">
      <div class="control">
        <label class="checkbox">
          <input v-model="item.isActive" type="checkbox">
          Active
        </label>
      </div>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button v-on:click="saveItem()" class="button is-primary">Save</button>
      </div>
    </div>

  </div>

</template>
<script>
import { mapGetters, mapActions } from "vuex";
import service from "../../services/newsletters.service";
export default {
  data() {
    return {
      item: {
        _id: "",
        title: "",
        slug: "",
        path: "",
        week: 0,
        year: 0,
        isActive: true
      }
    };
  },
  methods: {
    ...mapActions("newslettersModule", {
      updateItem: "updateItem"
    }),
    getEditItem() {
      if (!this.$route.params.id) {
        return;
      }
      service.getItem(this.$route.params.id).then(payload => {
        if (payload.success) {
          this.item = payload.data;
        }
      });
    },
    saveItem() {
      this.updateItem(this.item);
    }
  },
  mounted() {
    this.getEditItem();
  }
};
</script>
