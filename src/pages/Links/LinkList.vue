<template>
  <div>
    <dnw-table-header v-bind:ids="ids"></dnw-table-header>
    <dnw-table ref="dnwTable">
      <tr slot="row-header">
        <th><input v-model="allChecked" v-on:click="checkAll()" type="checkbox" /></th>
        <th v-for="column in columns"><span v-html="column.header"/></th>
        <th></th>
        <th></th>
        <th></th>
      </tr>
      <tbody slot="items" v-for="item in links" :class="getRowClass(item)">
        <tr>
          <td><input :value="item._id" type="checkbox" v-model="ids"/></td>
          <td v-for="column in columns">
            <span v-html="getValue(item, column)"></span>
          </td>
          <td>
            <router-link :to="`/links/edit/${item._id}`">Edit</router-link>
          </td>
          <td>
            <router-link :to="`/comments/${item._id}`">Comments</router-link>
          </td>
          <td><a v-on:click="toggleMore(item)">More</a></td>
        </tr>
        <tr class="showMore" v-if="item.showMore">
          <td colspan="10">
            <p>ID: {{item._id}}</p>
            <p>Status: {{item.isActive}}</p>
          </td>
        </tr>
      </tbody>
    </dnw-table>
  </div>
</template>
<script>
import Table from "../../components/Table.vue";
import TableHeader from "./LinkListHeader.vue";
import Vue from "vue";
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      columns: this.getColumns(),
      ids: [],
      allChecked: false
    };
  },
  components: {
    "dnw-table": Table,
    "dnw-table-header": TableHeader
  },
  watch: {
    idCount(newCount) {
      this.allChecked = newCount === this.links.length;
    },
    tagsLength() {
      this.ids = [];
      this.allChecked = false;
    }
  },
  computed: {
    ...mapGetters("linksModule", ["links"]),
    linksLength() {
      return this.links.length;
    },
    idCount() {
      return this.ids.length;
    }
  },
  methods: {
    ...mapActions("linksModule", {
      getList: "getList",
      loadFilters: "loadFilters"
    }),
    checkAll() {
      if (this.allChecked) {
        this.ids = [];
        return;
      }
      this.ids = this.links.map(x => x._id);
    },
    getRowClass(item) {
      if (item && !item.isActive) {
        return "inactive";
      }
    },
    getValue(item, column) {
      if (column.hasOwnProperty("render")) {
        return column.render(item);
      }

      return item[column.prop];
    },
    renderUrl(item) {
      return `<a target="_blank" href="${item.url}">${item.url}</a>`;
    },
    renderUpvotes(item) {
      return `<div class="has-text-centered">${item.upvotes}</div>`;
    },
    renderCategory(item) {
      return item.category.name;
    },
    toggleMore(item) {
      const showMore = item.showMore;
      Vue.set(item, "showMore", !showMore);
    },
    getColumns() {
      return [
        {
          header: "Upvotes",
          prop: "upvotes",
          render: this.renderUpvotes
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
        }
      ];
    }
  },
  mounted() {
    Vue.set(this.$refs.dnwTable, "columns", this.getColumns());
    this.getList();
    this.loadFilters();
  }
};
</script>
<style scoped>

</style>
