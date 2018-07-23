<template>
  <nav class="nav has-shadow">
    <div class="container" v-if="!isAuthenticated">
      <router-link class="nav-item is-tab" to="/login">Login</router-link>
    </div>
    <div class="container" v-if="isAuthenticated">
      <router-link class="nav-item is-tab" to="/" exact>Home</router-link>
      <router-link class="nav-item is-tab" to="/links">Links</router-link>
      <router-link class="nav-item is-tab" to="/comments">Comments</router-link>
      <router-link class="nav-item is-tab" to="/users">Users</router-link>
      <router-link class="nav-item is-tab" to="/emails">Emails</router-link>
      <router-link class="nav-item is-tab" to="/ads">Ads</router-link>
      <router-link class="nav-item is-tab" to="/newsletters">Newsletters</router-link>
      <router-link class="nav-item is-tab" to="/login">Logout</router-link>
    </div>
  </nav>
</template>
<script>
  import { mapGetters } from 'vuex'
  export default {
    computed: {
      ...mapGetters('authModule', ['isAuthenticated'])
    }
  }
</script>
