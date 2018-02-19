<template>

  <div>

  <h1 v-if="!item._id">Add Link</h1>
  <h1 v-if="item._id">Edit Link {{item._id}}</h1>

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
      <label class="label">Url</label>
      <div class="control">
        <input class="input" v-model="item.url" type="text" placeholder="Text input">
      </div>
    </div>

    <div class="field">
      <label class="label">Image</label>
      <div class="control">
        <input class="input" v-model="item.image" type="text" placeholder="Text input">
      </div>
    </div>

    <div class="column">
      <label class="label">Tags</label>
      <v-select multiple class="is-fullhd" label="name" placeholder="Tags" v-model="item.tags" :options="filter.tags"></v-select>
    </div>
    <div class="column is-narrow">
      <label class="label">Categories</label>
      Category: {{ item.category.name }}<br/>
      <v-select label="slug" placeholder="Category" v-model="item.category" :options="filter.categories"></v-select>
    </div>

    <div class="column is-narrow">
      <label class="label">User</label>
      Username: {{ item.user.username }}<br/>
      <v-select
        v-model="item.user"
        :debounce="250"
        :on-search="debounceUsers"
        :options="filterUsers"
        placeholder="Search Users.."
        label="email"
      >
      </v-select>
    </div>

    <div class="field">
      <label class="label">Content</label>
      <div class="control">
        <textarea class="textarea" v-model="item.content" placeholder="Textarea"></textarea>
      </div>
    </div>

    <div class="field">
      <label class="label">Upvotes</label>
      <div class="control">
        <input class="input" v-model="item.upvotes" type="text" placeholder="Text input">
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
import vSelect from "vue-select";
import service from "../../services/links.service";
import axios from "axios";
import debounce from "debounce";

export default {
  components: { vSelect },
  computed: {
    ...mapGetters("linksModule", ["filter"])
  },
  data() {
    return {
      filterUsers: [],
      item: {
        _id: "",
        title: "",
        content: "",
        slug: "",
        url: "",
        image: "",
        category: "",
        user: "",
        isActive: true,
        upvotes: 0,
        tags: []
      }
    };
  },
  methods: {
    ...mapActions("linksModule", {
      updateItem: "updateItem",
      loadFilters: "loadFilters"
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
    debounceUsers: debounce(function (e, loading) {
      this.getOptions(e, loading);
    }, 1500),
    getOptions(search, loading) {
      loading(true);
      axios
        .get(`users?email=${search}`)
        .then(resp => {
          console.log(resp.data.data.items);
          this.filterUsers = resp.data.data.items;
          loading(false);
        });
    }
  },
  mounted() {
    this.getEditItem();
    this.loadFilters();
  }
};
</script>
