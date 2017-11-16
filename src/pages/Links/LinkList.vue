<template>
  <div>
    <dnw-table ref="dnwTable" />
  </div>
</template>
<script>
  import Table from '../../components/Table.vue'
  import Vue from "vue"
  export default {
    data() {
      return {
        data: ["test", "test2"]
      }
    },
    methods: {
      getColumns() {
        return [
          {
            header: "ID",
            prop: "_id"
          }
        ]
      }
    },
    components: {
      'dnw-table': Table
    },
    mounted() {
      Vue.set(this.$refs.dnwTable, 'columns', this.getColumns());
      Vue.set(this.$refs.dnwTable, 'items', [{"_id":1, title:"Title", content:"Content2"}]);
    }
  }
</script>
