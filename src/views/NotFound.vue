<script>
import AppHeader from "../components/AppHeader.vue";
export default {
  name: "NotFound",
  components: {
    AppHeader,
  },
  data() {
    return {};
  },
};
</script>
<template>
  <AppHeader />

  <div class="container not-found">
    <div class="d-flex justify-content-center">
      <div class="four">4</div>
      <img class="nofound_img" src="/public/img/logo.svg" alt="no found page" />
      <div class="four">4</div>
    </div>

    <div class="text_nofound text-center">
      Oops! La pagina che stai cercando non esiste
    </div>
  </div>
</template>
<style scoped>
.container.not-found {
  .four {
    font-size: 500px;
    color: #896127;
  }

  .nofound_img {
    width: 350px;
  }

  .text_nofound {
    font-size: 45px;
    color: #896127;
    margin-top: -120px;
    margin-bottom: 3rem;
  }
  .btn_nofound {
    background-color: #896127;
    color: white;
  }
}
</style>
