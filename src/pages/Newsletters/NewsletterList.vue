<template>
  <div>
    <dnw-table-header v-bind:ids="ids"></dnw-table-header>
    <dnw-table ref="dnwTable">
      <tr slot="row-header">
        <th><input v-model="allChecked" v-on:click="checkAll()" type="checkbox" /></th>
        <th v-for="column in columns"><span v-html="column.header"/></th>
        <th></th>
        <th></th>
      </tr>
      <tbody slot="items" v-for="item in newsletters" :class="getRowClass(item)">
        <tr>
          <td><input :value="item._id" type="checkbox" v-model="ids"/></td>
          <td v-for="column in columns">
            <span v-html="getValue(item, column)"></span>
          </td>
          <td>
            <router-link :to="`/newsletters/edit/${item._id}`">Edit</router-link>
          </td>
          <td><a v-on:click="toggleMore(item)">More</a></td>
        </tr>
        <tr class="showMore" v-if="item.showMore">
          <td colspan="10">
            ID: {{item._id}}
          </td>
        </tr>
      </tbody>
    </dnw-table>
  </div>
</template>
<script>
import Table from "../../components/Table.vue";
import NewsletterHeader from "./NewsletterHeader.vue";
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
    "dnw-table-header": NewsletterHeader
  },
  watch: {
    idCount(newCount) {
      this.allChecked = newCount === this.newsletters.length;
    },
    newslettersLength() {
      this.ids = [];
      this.allChecked = false;
    }
  },
  computed: {
    ...mapGetters("newslettersModule", ["newsletters"]),
    newslettersLength() {
      return this.newsletters.length;
    },
    idCount() {
      return this.ids.length;
    }
  },
  methods: {
    ...mapActions("newslettersModule", {
      getItems: "getItems"
    }),
    checkAll() {
      if (this.allChecked) {
        this.ids = [];
        return;
      }
      this.ids = this.newsletters.map(x => x._id);
    },
    toggleMore(item) {
      const showMore = item.showMore;
      Vue.set(item, "showMore", !showMore);
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
    getColumns() {
      return [
        {
          header: "Title",
          prop: "title"
        },
        {
          header: "Slug",
          prop: "slug"
        },
        {
          header: "Week",
          prop: "week"
        },
        {
          header: "Year",
          prop: "year"
        },
        {
          header: "Created",
          prop: "createdOn"
        }
      ];
    }
  },
  mounted() {
    Vue.set(this.$refs.dnwTable, "columns", this.getColumns());
    this.getItems();
  }
};
</script>
