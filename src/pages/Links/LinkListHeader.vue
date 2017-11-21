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
        <input class="input" type="text" placeholder="Title" />
      </div>
      <div class="column">
        <input class="input" type="text" placeholder="Tags" />
      </div>
      <div class="column is-narrow">
        <div class="dropdown is-hoverable">
          <div class="dropdown-trigger">
            <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
              <span>Filter Category</span>
            </button>
          </div>
          <div class="dropdown-menu" id="dropdown-menu" role="menu">
            <div class="dropdown-content">
              <a href="#" class="dropdown-item">
                Active
              </a>
              <a class="dropdown-item">
                Inactive
              </a>
              <a href="#" class="dropdown-item">
                Delete
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="column is-narrow">
    <router-link class="button is-primary" to="/links/add">Add</router-link>
  </div>
</div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: ["ids"],
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
