<template>
<div class="columns">
  <div class="column is-narrow">
    <div class="dropdown is-hoverable">
      <div class="dropdown-trigger">
        <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
          <span>Actions</span>
        </button>
      </div>
      <div class="dropdown-menu" id="dropdown-menu" role="menu">
        <div class="dropdown-content">
          <a v-on:click="active()" class="dropdown-item">
            Activate
          </a>
          <a v-on:click="disable()" class="dropdown-item">
            Disable
          </a>
          <a v-on:click="deleteSelected()" class="dropdown-item">
            Delete
          </a>
        </div>
      </div>
    </div>
  </div>
  <div class="column">
    <div class="columns">
      <div class="column">
        <input class="input" type="text" placeholder="Title" v-model="selected.name" />
      </div>
      <div class="column">
        <v-select multiple class="is-fullhd" label="name" placeholder="Tags" v-model="selected.tags" :options="filter.tags"></v-select>
      </div>
      <div class="column is-narrow">
        <v-select label="name" placeholder="Category" v-model="selected.category" :options="filter.categories"></v-select>
      </div>
    </div>
  </div>
  <div class="column is-narrow">
    <router-link class="button is-primary" to="/links/add">Add</router-link>
  </div>
</div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import vSelect from "vue-select";
export default {
  props: ["ids"],
  components: { vSelect },
  computed: {
    ...mapGetters("linksModule", ["filter", "selected"])
  },
  methods: {
    ...mapActions("linksModule", {
      updateStatus: "updateStatus",
      deleteItems: "deleteItems"
    }),
    active() {
      this.updateStatus({ ids: this.ids, status: true });
    },
    disable() {
      this.updateStatus({ ids: this.ids, status: false });
    },
    deleteSelected() {
      this.deleteItems(this.ids);
    }
  }
};
</script>
