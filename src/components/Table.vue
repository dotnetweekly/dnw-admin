<template>
  <div>
    <table v-if="items && columns">
      <thead>
        <th v-for="column in columns">{{column.header}}</th>
      </thead>
      <tbody>
        <tr v-for="item in items">
          <td v-for="column in columns">{{getValue(item, column)}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        columns: [],
        items: []
      }
    },
    methods: {
      getValue(item, column) {
        if(column.hasOwnProperty("render")){
          return column.render(item);
        }

        return item[column.prop];
      }
    }
  }
</script>
