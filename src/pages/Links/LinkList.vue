<template>
  <div>
    <a class="button is-primary">Add</a>
    <a class="button is-success">Active</a>
    <a class="button is-warning">Inactive</a>
    <a class="button is-danger">Delete</a>
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
      renderEdit(item) {
        return '<a href="">Edit</a>';
      },
      renderUrl(item) {
        return `<a target="_blank" href="${item.url}">${item.url}</a>`;
      },
      renderInput(item) {
        return `<input type="checkbox" />`;
      },
      getColumns() {
        return [
          {
            header: "",
            render: this.renderInput
          },
          {
            header: "ID",
            prop: "_id"
          },
          {
            header: "Title",
            prop: "title"
          },
          {
            header: "Url",
            prop: "url",
            render: this.renderUrl
          },
          {
            header: "",
            prop: "",
            render: this.renderEdit
          }
        ]
      }
    },
    mounted() {
      Vue.set(this.$refs.dnwTable, 'columns', this.getColumns());
      Vue.set(this.$refs.dnwTable, 'items', this.links);
      this.getList();
    }
  }
</script>
