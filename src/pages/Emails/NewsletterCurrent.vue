<template>
  <div class="has-text-centered">
    <div class="field is-horizontal">
      <div class="field-label is-normal">
        <label class="label">Subject</label>
      </div>
      <div class="field-body">
        <div class="field">
          <p class="control is-expanded has-icons-left">
            <input class="input" type="text" placeholder="Subject" v-model="subject">
          </p>
        </div>
      </div>
    </div>

    <div style="width:800px;display: inline-block;text-align: left;">
      <div class="columns">
        <div class="column"></div>
        <div class="column"></div>
        <div class="column"></div>
        <div class="column">
          <button v-on:click="save()" class="button is-pulled-right">Generate!</button>
        </div>
        <div class="column">
          <button v-on:click="sendAdmin()" class="button is-pulled-right">Send Admin</button>
        </div>
        <div class="column">
          <button v-on:click="send()" class="button is-primary is-pulled-right">Send</button>
        </div>
      </div>
      <div class="is-clearfix"></div>
      <a v-on:click="changeSize('desktop')">Desktop Size</a>
      <a v-on:click="changeSize('tablet')">Tablet Size</a>
      <a v-on:click="changeSize('mobile')">Mobile Size</a>
      <div class="is-clearfix"></div>
      <iframe class="newsletter-desktop-preview" id="newsletter-iframe"></iframe>
    </div>
  </div>
</div>
</template>
<script>
import request from "../../request";

export default {
  data() {
    return {
      subject: ""
    }
  },
  methods: {
    save() {
      request
      .post("/emails/newsletter/current", {save: true})
      .then(response => {
        // console.log(response);
      })
      .catch(error => {
        console.log(error);
      });
    },
    send() {
      request
      .post("/emails/newsletter/sendNewsletter", {subject: this.subject})
      .then(response => {
          alert(`Sent to ${response.data.data.usersCount}!`);
      })
      .catch(error => {
        console.log(error);
      });
    },
    sendAdmin() {
      request
      .post("/emails/newsletter/sendNewsletter?onlyAdmin=true", {subject: this.subject})
      .then(response => {
          alert(`Sent to ${response.data.data.usersCount}!`);
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
