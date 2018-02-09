<template>
  <div class="has-text-centered">
    <div style="width:800px;display: inline-block;text-align: left;">
      <button v-on:click="save()" class="button is-primary is-pulled-right">Generate!</button>
    </div>
    <div class="is-clearfix"></div>
    <a v-on:click="changeSize('desktop')">Desktop Size</a>
    <a v-on:click="changeSize('tablet')">Tablet Size</a>
    <a v-on:click="changeSize('mobile')">Mobile Size</a>
    <div class="is-clearfix"></div>
    <iframe class="newsletter-desktop-preview" id="newsletter-iframe"></iframe>
  </div>
</template>
<script>
import request from "../../request";

export default {
  methods: {
    save() {
      request
      .post("/emails/newsletter/current", {save: true})
      .then(response => {
        console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
    },
    changeSize(type) {
      const newsletterIframe = this.$el.querySelector("#newsletter-iframe");
      if(type == "tablet") {
        newsletterIframe.style.width = "600px";
        return;
      } else if(type == "mobile") {
        newsletterIframe.style.width = "400px";
        return;
      }
      newsletterIframe.style.width = "800px";
      return;
    }
  },
  mounted() {
    request
      .post("/emails/newsletter/current")
      .then(response => {
        const newsletterIframe = this.$el.querySelector("#newsletter-iframe");
        newsletterIframe.contentWindow.document.write(response.data.data);
      })
      .catch(error => {
        console.log(error);
      });
  }
}

</script>
