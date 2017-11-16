<template>
  <div>
    <div class="columns">
      <div class="column is-narrow">
        <div class="dropdown is-hoverable">
          <div class="dropdown-trigger">
            <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
              <span>Actions</span>
            </button>
          </div>
          <div class="dropdown-menu" id="dropdown-menu" role="menu">
            <div class="dropdown-content">
              <a href="#" class="dropdown-item" :click="updateStatus()">
                Activate
              </a>
              <a class="dropdown-item">
                Disable
              </a>
              <a href="#" class="dropdown-item">
                Delete
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="column">
      </div>
      <div class="column is-narrow">
        <router-link class="button is-primary" to="/link/add">Add</router-link>
      </div>
    </div>
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
    watch: {
      categoriesLength(newCount, oldCount) {
        Vue.set(this.$refs.dnwTable, 'items', this.categories);
      }
    },
    computed: {
      ...mapGetters('categoriesModule', ['categories']),
      categoriesLength() {
        return this.categories.length
      }
    },
    methods: {
      ...mapActions('categoriesModule', {
        getList: 'getList'
      }),
      renderInput(item) {
        return `<input type="checkbox" />`;
      },
      updateStatus() {

      },
      getColumns() {
        return [
          {
            header: `<input type="checkbox" />`,
            render: this.renderInput
          },
          {
            header: "ID",
            prop: "_id"
          },
          {
            header: "Name",
            prop: "name"
          },
          {
            header: "Slug",
            prop: "slug"
          },
          {
            header: "Created",
            prop: "createdOn"
          }
        ]
      }
    },
    mounted() {
      Vue.set(this.$refs.dnwTable, 'columns', this.getColumns());
      Vue.set(this.$refs.dnwTable, 'items', this.categories);
      this.getList();
    }
  }
</script>
