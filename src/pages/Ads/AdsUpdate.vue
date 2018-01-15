<template>

  <div>

  <h1 v-if="!ad._id">Add Ad</h1>
  <h1 v-if="ad._id">Edit Ad {{ad._id}}</h1>

    <input type="hidden" v-model="ad._id" />
    <div class="field">
      <label class="label">Title</label>
      <div class="control">
        <input class="input" v-model="ad.title" type="text" placeholder="Text input">
      </div>
    </div>

    <div class="field">
      <label class="label">Link</label>
      <div class="control">
        <input class="input" v-model="ad.link" type="text" placeholder="Text input">
      </div>
    </div>

    <div class="field">
      <label class="label">Image</label>
      <div class="control">
        <input class="input" v-model="ad.image" type="text" placeholder="Text input">
      </div>
    </div>

    <div class="field">
      <label class="label">Description</label>
      <div class="control">
        <textarea rows="10" cols="100" v-model="ad.description"></textarea>
      </div>
    </div>

    <div class="field">
      <div class="control">
        <label class="checkbox">
          <input v-model="ad.isActive" type="checkbox">
          Active
        </label>
      </div>
    </div>

    <div class="field is-grouped">
      <div class="control">
        <button v-on:click="saveAd()" class="button is-primary">Save</button>
      </div>
    </div>

  </div>

</template>
<script>
import { mapGetters, mapActions } from "vuex";
import adService from "../../services/ads.service";
export default {
  data() {
    return {
      ad: {
        _id: "",
        name: "",
        slug: "",
        isActive: true
      }
    };
  },
  methods: {
    ...mapActions("adsModule", {
      updateAd: "updateAd"
    }),
    getEditAd() {
      if (!this.$route.params.id) {
        return;
      }
      adService.getAd(this.$route.params.id).then(payload => {
        if (payload.success) {
          this.ad = payload.data;
        }
      });
    },
    saveAd() {
      this.updateAd(this.ad);
    }
  },
  mounted() {
    this.getEditAd();
  }
};
</script>
<style scoped>
textarea {
  padding: 10px;
  font-size: 14px;
}
</style>