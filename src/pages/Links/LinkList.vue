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
      <tbody slot="items" v-for="item in links" :class="getRowClass(item)">
        <tr>
          <td><input :value="item._id" type="checkbox" v-model="ids"/></td>
          <td v-for="column in columns">
            <span v-html="getValue(item, column)"></span>
          </td>
          <td><a href="">Edit</a></td>
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
  import Table from '../../components/Table.vue'
  import TableHeader from './LinkListHeader.vue'
  import Vue from "vue"
  import { mapGetters, mapActions } from "vuex"

  export default {
    data() {
      return {
        columns: this.getColumns(),
        ids: [],
        allChecked: false
      }
    },
    components: {
      'dnw-table': Table,
      'dnw-table-header': TableHeader
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
      getRowClass(item) {
        if (item && !item.isActive) {
          return "inactive";
        }
      },
      getValue(item, column) {
        if(column.hasOwnProperty("render")){
          return column.render(item);
        }

        return item[column.prop];
      },
      renderUrl(item) {
        return `<a target="_blank" href="${item.url}">${item.url}</a>`;
      },
      renderCategory(item) {
        return item.category.name;
      },
      toggleMore(item) {
        const showMore = item.showMore;
        Vue.set(item, 'showMore', !showMore);
      },
      getColumns() {
        return [
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
        ]
      }
    },
    mounted() {
      Vue.set(this.$refs.dnwTable, 'columns', this.getColumns());
      this.getList();
    }
  }
</script>
<style scoped>

</style>
