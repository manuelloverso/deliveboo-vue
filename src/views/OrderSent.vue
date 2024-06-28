<script>
import { RouterLink } from "vue-router";
import { store } from "../store.js";

export default {
  name: "OrderSent",
  data() {
    return {
      store,
      restaurant_name: "",
    };
  },
  mounted() {
    this.restaurant_name = store.lastOrder[0]?.restaurant;
  },
};
</script>
<template>
  <main class="ordersent-main">
    <div class="d-flex flex-column align-items-center text-white">
      <h1 class="fw-bold mb-4">Ordine effettuato con successo!</h1>
      <h2 class="mb-4">Sarà a casa tua in pochi minuti</h2>
      <div v-if="store.lastOrder.length > 0" class="col-12 col-md-8">
        <div class="cart mb-4">
          <div class="header d-flex justify-content-between align-items-center">
            <div class="info">
              <h2 class="mb-3">Riepilogo Ordine</h2>
              <h4>{{ restaurant_name }}</h4>
            </div>
          </div>
          <div class="items">
            <div
              class="item d-flex justify-content-between"
              v-for="item in store.lastOrder"
            >
              <div class="pic-name">
                <!-- Image -->
                <template v-if="item.plateObj.image != null">
                  <img
                    loading="lazy"
                    v-if="item.plateObj.image.startsWith('http')"
                    class="plate-img"
                    :src="item.plateObj.image"
                    alt=""
                  />
                  <img
                    loading="lazy"
                    v-else
                    class="plate-img"
                    :src="
                      'http://127.0.0.1:8000' +
                      '/storage/' +
                      item.plateObj.image
                    "
                    alt=""
                  />
                </template>
                <img
                  loading="lazy"
                  v-else
                  class="plate-img"
                  src="/public/img/plate-default.jpg"
                  alt=""
                />

                <!-- Plate Name -->
                <span>
                  <strong>{{ item.plateObj.name }}</strong></span
                >
              </div>
              <!-- actions -->
              <div class="actions-btns d-flex gap-2 align-items-center me-2">
                <strong>{{ item.plateObj.price }}€</strong>

                <button class="btn btn-dark">
                  <span>{{ item.quantity }}</span>
                </button>
              </div>
            </div>
          </div>

          <div class="total d-flex justify-content-between">
            <span>Totale Ordine:</span>
            <strong>{{ store.getTotal(store.lastOrder) }}€</strong>
          </div>
        </div>
        <RouterLink
          :to="{ name: 'home' }"
          class="btn btn-dark mx-auto d-inline-block"
          >Continua ad ordinare</RouterLink
        >
      </div>
    </div>
  </main>
</template>
<style scoped>
.ordersent-main {
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 60vh;
  padding-bottom: 3rem;
  background: rgb(253, 126, 20);
  background: linear-gradient(
    0deg,
    rgba(253, 126, 20, 1) 0%,
    rgba(252, 196, 25, 1) 100%
  );
  .cart {
    color: var(--text-dark);
    background-color: white;
    border-radius: 20px;
    padding: 2rem;
    box-shadow: black 0 0 20px 0;

    .header {
      padding-bottom: 15px;
      margin-bottom: 20px;
      border-bottom: 1px solid var(--text-dark);
    }

    .items {
      overflow-y: auto;
      max-height: 60vh;
    }

    .item {
      margin-bottom: 20px;

      .plate-img {
        margin-right: 15px;
        width: 70px;
        aspect-ratio: 1;
        border-radius: 50%;
        object-fit: cover;
      }
    }

    .total {
      padding: 20px 20px 0 20px;
      margin: 20px 0;
      border-top: 1px solid var(--text-dark);
    }
  }

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
