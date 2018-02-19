<template>
  <div class="has-text-centered">
      <div>
        Params:
        <span>{{ "${USER_USERNAME}" }}</span>,
        <span>{{ "${USER_RESET}" }}</span>,
        <span>{{ "${USER_UNSUBSCRIBE}" }}</span>,
        <span>{{ "${USER_FISTNAME}" }}</span>
      </div>
      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Subject</label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control is-expanded has-icons-left">
              <input class="input" type="text" placeholder="Subject" v-model="emailData.subject">
            </p>
          </div>
        </div>
      </div>

      <div class="field is-horizontal">
        <div class="field-label is-normal">
          <label class="label">Header</label>
        </div>
        <div class="field-body">
          <div class="field">
            <p class="control is-expanded has-icons-left">
              <input class="input" type="text" placeholder="Header" v-model="emailData.header">
            </p>
          </div>
        </div>
      </div>

        <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Action</label>
            </div>
            <div class="field-body">
              <div class="field">
                <p class="control is-expanded has-icons-left">
                  <input class="input" type="text" placeholder="Action Name" v-model="emailData.actionName">
                </p>
              </div>
              <div class="field">
                <p class="control is-expanded has-icons-left has-icons-right">
                  <input class="input" type="text" placeholder="Action Url" v-model="emailData.actionUrl">
                </p>
              </div>
            </div>
          </div>

        <div class="field is-horizontal">
            <div class="field-label is-normal">
              <label class="label">Content</label>
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <textarea class="textarea" placeholder="Content" v-model="emailData.content"></textarea>
                </div>
              </div>
            </div>
          </div>

          <div class="field is-horizontal">
            <div class="field-label">
              <!-- Left empty for spacing -->
            </div>
            <div class="field-body">
              <div class="field">
                <div class="control">
                  <button class="button" v-on:click="preview()">
                    Preview message
                  </button>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <button class="button" v-on:click="sendAdmin()">
                    Send admin
                  </button>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <button class="button is-primary" v-on:click="send()">
                    Send message
                  </button>
                </div>
              </div>
            </div>
          </div>

      <a v-on:click="changeSize('desktop')">Desktop Size</a>
      <a v-on:click="changeSize('tablet')">Tablet Size</a>
      <a v-on:click="changeSize('mobile')">Mobile Size</a>
      <div class="is-clearfix"></div>
      <iframe class="newsletter-desktop-preview" id="email-iframe"></iframe>
  </div>
</template>
<script>
  import axios from "axios";
  import config from "../../config";

  export default {
    data() {
      return {
        emailData: {
          subject: "",
          header: "",
          actionName: "",
          actionUrl: "",
          content: ""
        }
      }
    },
    methods: {
      changeSize(type) {
        const newsletterIframe = this.$el.querySelector("#email-iframe");
        if(type == "tablet") {
          newsletterIframe.style.width = "600px";
          return;
        } else if(type == "mobile") {
          newsletterIframe.style.width = "400px";
          return;
        }
        newsletterIframe.style.width = "800px";
        return;
      },
      preview() {
        axios.get(`${config.newsletter}api/v1/email/template`, { params: this.emailData })
        .then((response) => {
          const newsletterIframe = this.$el.querySelector("#email-iframe");
          newsletterIframe.contentWindow.document.open();
          newsletterIframe.contentWindow.document.write(response.data.data);
          newsletterIframe.contentWindow.document.close();
        })
      },
      send() {
        axios.post(`${config.api}/emails/custom`, this.emailData)
        .then((response) => {
          alert(`Sent to ${response.data.data.usersCount}!`);
        })
      },
      sendAdmin() {
        axios.post(`${config.api}/emails/custom?onlyAdmin=true`, this.emailData)
        .then((response) => {
          alert(`Sent to ${response.data.data.usersCount}!`);
        })
      }
    },
    mounted() {
      this.preview();
    }
  }
</script>
