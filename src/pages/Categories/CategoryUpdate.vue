<template>

  <div>

  <h1 v-if="!category._id">Add Category</h1>
  <h1 v-if="category._id">Edit Category {{category._id}}</h1>

    <input type="hidden" v-model="category._id" />
    <div class="field">
      <label class="label">Name</label>
      <div class="control">
        <input class="input" v-model="category.name" type="text" placeholder="Text input">
      </div>
    </div>

    <div class="field">
      <label class="label">Slug</label>
      <div class="control">
        <input class="input" v-model="category.slug" type="text" placeholder="Text input">
      </div>
    </div>

    <div class="field">
      <div class="control">
        <label class="checkbox">
          <input v-model="category.isActive" type="checkbox">
          Active
        </label>
      </div>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button v-on:click="saveCategory()" class="button is-primary">Save</button>
      </div>
    </div>

  </div>

</template>
<script>
import { mapGetters, mapActions } from "vuex";
import categoryService from "../../services/categories.service";
export default {
  data() {
    return {
      category: {
        _id: "",
        name: "",
        slug: "",
        isActive: true
      }
    };
  },
  methods: {
    ...mapActions("categoriesModule", {
      updateCategory: "updateCategory"
    }),
    getEditCategory() {
      if (!this.$route.params.id) {
        return;
      }
      categoryService.getCategory(this.$route.params.id).then(payload => {
        if (payload.success) {
          this.category = payload.data;
        }
      });
    },
    saveCategory() {
      this.updateCategory(this.category);
    }
  },
  mounted() {
    this.getEditCategory();
  }
};
</script>
