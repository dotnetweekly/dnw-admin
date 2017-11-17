<template>

<div>

<h1>Add Category</h1>
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
      <button class="button is-primary">Save</button>
    </div>
  </div>

</div>

</template>
<script>
export default {
  data() {
    return {
        category: {
        name: "",
        slug: "",
        isActive: true
      }
    }
  },
  methods: {
    save() {

    }
  }
}
</script>
