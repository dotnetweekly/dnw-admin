<template>

  <div>

  <h1 v-if="!item._id">Add User</h1>
  <h1 v-if="item._id">Edit User {{item._id}}</h1>

    <input type="hidden" v-model="item._id" />

    <div class="field">
      <label class="label">Username</label>
      <div class="control">
        <input class="input" v-model="item.username" type="text" placeholder="Text input">
      </div>
    </div>

    <div class="field">
      <label class="label">First Name</label>
      <div class="control">
        <input class="input" v-model="item.firstName" type="text" placeholder="Text input">
      </div>
    </div>

    <div class="field">
      <label class="label">Last Name</label>
      <div class="control">
        <input class="input" v-model="item.lastName" type="text" placeholder="Text input">
      </div>
    </div>

    <div class="field">
      <label class="label">Password</label>
      <div class="control">
        <input class="input" v-model="item.password" type="text" placeholder="Text input">
      </div>
    </div>

    <div class="field">
      <label class="label">Email</label>
      <div class="control">
        <input class="input" v-model="item.email" type="text" placeholder="Text input">
      </div>
    </div>

    <div class="field">
      <div class="control">
        <label class="checkbox">
          <input v-model="item.isActive" type="checkbox">
          Active
        </label>
      </div>
    </div>

    <div class="field">
      <div class="control">
        <label class="checkbox">
          <input v-model="item.subscribed" type="checkbox">
          Subscribed
        </label>
      </div>
    </div>

    <div class="field">
      <div class="control">
        <label class="checkbox">
          <input v-model="item.isAdmin" type="checkbox">
          Is Admin
        </label>
      </div>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button v-on:click="saveItem()" class="button is-primary">Save</button>
      </div>
    </div>

  </div>

</template>
<script>
import { mapGetters, mapActions } from "vuex";
import service from "../../services/users.service";
export default {
  data() {
    return {
      item: {
        _id: "",
        email: "",
        username: "",
        firstName: "",
        lastName: "",
        password: "",
        isActive: true,
        subscribed: true,
        isAdmin: false
      }
    };
  },
  methods: {
    ...mapActions("userModule", {
      updateItem: "updateItem"
    }),
    getEditItem() {
      if (!this.$route.params.id) {
        return;
      }
      service.getItem(this.$route.params.id).then(payload => {
        if (payload.success) {
          this.item = payload.data;
        }
      });
    },
    saveItem() {
      this.updateItem(this.item);
    }
  },
  mounted() {
    this.getEditItem();
  }
};
</script>
