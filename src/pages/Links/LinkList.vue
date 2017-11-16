<template>
  <div>
    <dnw-table ref="dnwTable" />
  </div>
</template>
<script>
  import Table from '../../components/Table.vue'
  import Vue from "vue"
  import { mapGetters, mapActions } from "vuex"

  export default {
    components: {
      'dnw-table': Table
    },
    data() {
      return {
        data: ["test", "test2"]
      }
    },
    watch: {
      linksLength(newCount, oldCount) {
        Vue.set(this.$refs.dnwTable, 'items', this.links);
      }
    },
    computed: {
      ...mapGetters('linksModule', ['links']),
      linksLength() {
        return this.links.length
      }
    },
    methods: {
      ...mapActions('linksModule', {
        getList: 'getList'
      }),
      getColumns() {
        return [
          {
            header: "ID",
            prop: "_id"
          },
          {
            header: "Title",
            prop: "title"
          },
          {
            header: "Content",
            prop: "content"
          },
          {
            header: "Url",
            prop: "url"
          }
        ]
      }
    },
    mounted() {
      Vue.set(this.$refs.dnwTable, 'columns', this.getColumns());
    },
    created() {
      this.getList();
    }
  }
</script>
