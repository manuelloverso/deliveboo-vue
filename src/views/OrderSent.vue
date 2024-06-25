<script>
export default {
  name: "OrderSent",
  data() {
    return {};
  },
};
</script>
<template>
  <main class="ordersent-main">
    <div class="d-flex flex-column text-center text-white">
      <h1 class="fw-bold mb-4">Ordine effettuato con successo! </h1>
         <h2>Sarà a casa tua in pochi minuti</h2>
        
     
      <RouterLink :to="{ name: 'home' }" class="my-btn text-decoration-none my-3 "
        >Continua ad ordinare</RouterLink
      >
    </div>
  </main>
</template>
<style scoped>
.ordersent-main {
  display: flex;
  align-items: center;
  justify-content: center;
  height: 60vh;
  background: rgb(253,126,20);
  background: linear-gradient(0deg, rgba(253,126,20,1) 0%, rgba(252,196,25,1) 100%);
 
  & h1{
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
