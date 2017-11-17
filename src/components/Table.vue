<template>
  <div>
    <table v-if="columns">
      <thead>
        <slot name="row-header"></slot>
      </thead>
      <slot name="items"></slot>
    </table>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        columns: []
      }
    }
  }
</script>
<style scoped>
  tbody td{
    border: 0;
  }

  tr:hover{
    background-color: inherit;
  }

  tbody:hover{
    background-color: whitesmoke;
  }
  tbody.inactive, tbody.inactive:hover {
   background-color: #f8e6e6 !important;
  }

  tbody{
    border: 1px solid #dbdbdb;
    border-width: 0 0 1px;
    padding: 0.5em 0.75em;
    vertical-align: top;
  }
</style>
