<template>
  <div class="has-text-centered">
    <iframe class="newsletter-desktop-preview" id="newsletter-iframe"></iframe>
  </div>
</template>
<script>
import request from "../../request";

export default {
  mounted() {
    request
      .get("/emails/newsletter/current")
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
