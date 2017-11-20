<template>

  <div>

  <h1 v-if="!item._id">Add Tag</h1>
  <h1 v-if="item._id">Edit Tag {{item._id}}</h1>

    <input type="hidden" v-model="item._id" />
    <div class="field">
      <label class="label">Name</label>
      <div class="control">
        <input class="input" v-model="item.name" type="text" placeholder="Text input">
      </div>
    </div>

    <div class="field">
      <label class="label">Slug</label>
      <div class="control">
        <input class="input" v-model="item.slug" type="text" placeholder="Text input">
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
import service from "../../services/tags.service";
export default {
  data() {
    return {
      item: {
        _id: "",
        name: "",
        slug: "",
        isActive: true
      }
    };
  },
  methods: {
    ...mapActions("tagsModule", {
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
