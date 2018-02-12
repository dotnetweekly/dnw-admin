<template>

  <div>

    <h1 v-if="!item._id">Add Comment</h1>
    <h1 v-if="item._id">Edit Comment {{item._id}}</h1>

    <h2>Link:  {{link}}</h2>

    <input type="hidden" v-if="!item._id" v-model="item._id" />

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
      link: this.$route.params.link,
      filterUsers: [],
      filterLinks: [],
      item: {
        _id: "",
        content: "",
        user: null,
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
      if (!this.$route.params.id || this.$route.params.id === "add") {
        return;
      }
      service.getItem({ link: this.link, id: this.$route.params.id }).then(payload => {
        if (payload.success) {
          this.item = payload.data.comment;
          this.link = payload.data.linkId;
        }
      });
    },
    saveItem() {
      this.updateItem({ link: this.link, item: this.item }).then(() => {
          this.$router.push(`/comments/${this.link}`);
      });
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
    }
  },
  mounted() {
    this.getEditItem();
  }
};
</script>
