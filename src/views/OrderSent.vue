<script>
export default {
  name: "OrderSent",
  data() {
    return {};
  },
};
</script>
<template>
  <main>
    <div class="d-flex flex-column">
      <h1 class="text-white">
        Ordine effettuato con successo! <br />
        Sarà a casa tua in pochi minuti
      </h1>
      <RouterLink :to="{ name: 'home' }" class="my-btn text-decoration-none"
        >Continua ad ordinare</RouterLink
      >
    </div>
  </main>
</template>
<style scoped>
main {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60vh;
  background: linear-gradient(
    90deg,
    rgba(250, 89, 0, 1) 9%,
    rgba(255, 213, 0, 1) 100%
  );

  .my-btn {
    display: block;
    margin: auto;
    padding: 15px;
    background-color: var(--accent);
    border: none;
    border-radius: 10px;
    color: white;
    font-weight: 600;
    transition: background-color 0.3s ease;
    &:hover {
      background-color: #e8590c;
    }
  }
}
</style>
