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
        <div class="column">
          Latest Items: <input type="text" value="" />
        </div>
      </div>
    </div>
    <div class="column">
    </div>
    <div class="column is-narrow">
      <router-link class="button is-primary" :to="`/comments/${link}/add`">Add</router-link>
    </div>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["ids", "link"],
  methods: {
    ...mapActions("commentsModule", {
      updateStatus: "updateStatus",
      deleteItems: "deleteItems"
    }),
    active() {
      this.updateStatus({ ids: this.ids, status: true, link: this.link });
    },
    disable() {
      this.updateStatus({ ids: this.ids, status: false, link: this.link });
    },
    deleteSelected() {
      this.deleteItems({ ids: this.ids, link: this.link });
    }
  }
};
</script>
