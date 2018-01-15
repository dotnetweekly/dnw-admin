<template>
  <div>
    <dnw-table-header v-bind:ids="ids"></dnw-table-header>
    <dnw-table ref="dnwAdTable">
      <tr slot="row-header">
        <th><input v-model="allChecked" v-on:click="checkAll()" type="checkbox" /></th>
        <th v-for="column in columns"><span v-html="column.header"/></th>
        <th></th>
        <th></th>
      </tr>
      <tbody slot="items" v-for="item in ads" :class="getRowClass(item)" v-for:key="item._id">
        <tr>
          <td><input :value="item._id" type="checkbox" v-model="ids"/></td>
          <td v-for="column in columns">
            <span v-html="getValue(item, column)"></span>
          </td>
          <td>
            <router-link :to="`/ads/edit/${item._id}`">Edit</router-link>
          </td>
          <td><a v-on:click="toggleMore(item)">More</a></td>
        </tr>
        <tr class="showMore" v-if="item.showMore">
          <td colspan="10">
            ID: {{item._id}}<br/>
            Description: {{item.description}}
          </td>
        </tr>
      </tbody>
    </dnw-table>
  </div>
</template>
<script>
import Table from "../../components/Table.vue";
import TableHeader from "./AdsHeader.vue";
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
      this.allChecked = newCount === this.ads.length;
    },
    adsLength() {
      this.ids = [];
      this.allChecked = false;
    }
  },
  computed: {
    ...mapGetters("adsModule", ["ads"]),
    adsLength() {
      return this.ads.length;
    },
    idCount() {
      return this.ids.length;
    }
  },
  methods: {
    ...mapActions("adsModule", {
      getList: "getList"
    }),
    selectItem(id) {
      this.ids.push(id);
    },
    checkAll() {
      if (this.allChecked) {
        this.ids = [];
        return;
      }
      this.ids = this.ads.map(x => x._id);
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
          header: "Link",
          prop: "link"
        },
        {
          header: "Created",
          prop: "createdOn"
        }
      ];
    }
  },
  mounted() {
    Vue.set(this.$refs.dnwAdTable, "columns", this.getColumns());
    this.getList();
  }
};
</script>
