<template>

<div>

<h1>Add Category</h1>

  <div class="field">
    <label class="label">Name</label>
    <div class="control">
      <input class="input" type="text" placeholder="Text input">
    </div>
  </div>

  <div class="field">
    <label class="label">Slug</label>
    <div class="control">
      <input class="input" type="text" placeholder="Text input">
    </div>
  </div>

  <div class="field">
    <div class="control">
      <label class="checkbox">
        <input type="checkbox">
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
    category: {
      title: ""
    }
  },
  methods: {

  }
}
</script>
