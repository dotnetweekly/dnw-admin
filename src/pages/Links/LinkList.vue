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
              <a href="#" class="dropdown-item">
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
        <div class="columns">
          <div class="column">
            <input class="input" type="text" placeholder="Title" />
          </div>
          <div class="column">
            <input class="input" type="text" placeholder="Tags" />
          </div>
          <div class="column is-narrow">
            <div class="dropdown is-hoverable">
              <div class="dropdown-trigger">
                <button class="button" aria-haspopup="true" aria-controls="dropdown-menu">
                  <span>Filter Category</span>
                </button>
              </div>
              <div class="dropdown-menu" id="dropdown-menu" role="menu">
                <div class="dropdown-content">
                  <a href="#" class="dropdown-item">
                    Active
                  </a>
                  <a class="dropdown-item">
                    Inactive
                  </a>
                  <a href="#" class="dropdown-item">
                    Delete
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
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
      renderCategory(item) {
        return item.category.name;
      },
      getRowClass(item) {
        if (item && !item.isActive) {
          return "inactive";
        }
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
            header: "Title",
            prop: "title"
          },
          {
            header: "Url",
            prop: "url",
            render: this.renderUrl
          },
          {
            header: "Created",
            prop: "createdOn"
          },
          {
            header: "Category",
            prop: "",
            render: this.renderCategory
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
      Vue.set(this.$refs.dnwTable, 'getRowClass', this.getRowClass);
      Vue.set(this.$refs.dnwTable, 'columns', this.getColumns());
      Vue.set(this.$refs.dnwTable, 'items', this.links);
      this.getList();
    }
  }
</script>
