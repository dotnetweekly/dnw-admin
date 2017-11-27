<template>

  <div>

  <h1 v-if="!item._id">Add Comment</h1>
  <h1 v-if="item._id">Edit Comment {{item._id}}</h1>

    <input type="hidden" v-model="item._id" />

    <div class="field">
      <label class="label">Parent</label>
      <div class="control">
        <input class="input" v-model="item.parent" type="text" placeholder="Text input">
      </div>
    </div>

    <div class="field">
      <label class="label">Content</label>
      <div class="control">
        <textarea class="textarea" v-model="item.content" placeholder="Textarea"></textarea>
      </div>
    </div>

    <div class="column is-narrow">
      <v-select
        v-model="item.user"
        :debounce="250"
        :on-search="getUsers"
        :options="filterUsers"
        placeholder="Search Users.."
        label="email"
      >
      </v-select>
    </div>

    <div class="column is-narrow">
      <v-select
        v-model="item.link"
        :debounce="250"
        :on-search="getLinks"
        :options="filterLinks"
        placeholder="Search Links.."
        label="title"
      >
      </v-select>
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
import service from "../../services/comments.service";
import vSelect from "vue-select";
import userService from "../../services/users.service";
import linkService from "../../services/links.service";
import axios from "axios";

export default {
  components: { vSelect },
  data() {
    return {
      filterUsers: [],
      filterLinks: [],
      item: {
        _id: "",
        content: "",
        user: {},
        link: {},
        isActive: true
      }
    };
  },
  methods: {
    ...mapActions("commentsModule", {
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
    },
    getUsers(search, loading) {
      loading(true);
      axios
        .get("users", {
          q: search
        })
        .then(resp => {
          this.filterUsers = resp.data.data;
          loading(false);
        });
    },
    getLinks(search, loading) {
      loading(true);
      axios
        .get("links", {
          q: search
        })
        .then(resp => {
          this.filterLinks = resp.data.data;
          loading(false);
        });
    }
  },
  mounted() {
    this.getEditItem();
  }
};
</script>
