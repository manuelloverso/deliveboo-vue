<script>
export default {
  name: "OrderSent",
  data() {
    return {};
  },

  methods: {
    redirect() {
      let counter = document.getElementById("counter");
      let number = Number(counter.innerText);
      setInterval(() => {
        number--;
        counter.innerHTML = number;
        if (number === 0) {
          this.$router.push({ name: "home" });
        }
      }, 1000);
    },
  },

  mounted() {
    this.redirect();
  },
};
</script>
<template>
  <main class="ordersent-main">
    <div class="d-flex flex-column text-center text-white">
      <h1 class="fw-bold mb-4">Ordine effettuato con successo!</h1>
      <h2>Sarà a casa tua in pochi minuti</h2>

      <h4>Sarai reindirizzato in <strong id="counter">5</strong></h4>
    </div>
  </main>
</template>
<style scoped>
.ordersent-main {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60vh;
  background: rgb(253, 126, 20);
  background: linear-gradient(
    0deg,
    rgba(253, 126, 20, 1) 0%,
    rgba(252, 196, 25, 1) 100%
  );

  & h1 {
    font-size: 50px;
  }

  .my-btn {
    display: block;
    margin: auto;
    padding: 15px;
    border: none;
    border-radius: 10px;
    color: white;
    font-weight: 600;
    transition: background-color 0.98s ease;
    &:hover {
      font-size: 15px;
    }
  }
}
</style>
