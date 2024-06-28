<script>
import { store } from "../store.js";
import axios from "axios";
import Loading from "../components/Loading.vue";

export default {
  name: "CheckoutView",
  components: {
    Loading,
  },
  data() {
    return {
      store,
      loading: false,
      plates: [],
      restaurant_name: null,
      btClientToken: null,
      customer_name: null,
      customer_lastname: null,
      customer_address: null,
      customer_phone: null,
      customer_email: null,
      errors: {},
      dropinInstance: null,
    };
  },

  methods: {
    getClientToken() {
      axios.get("http://127.0.0.1:8000/api/payment").then((resp) => {
        this.btClientToken = resp.data.response;
        this.initBraintree();
      });
    },

    initBraintree() {
      braintree.dropin.create(
        {
          authorization: this.btClientToken,
          container: "#dropin-container",
          dataCollector: true,
          locale: "it_IT",
        },
        (error, dropinInstance) => {
          if (error) console.error(error);
          this.dropinInstance = dropinInstance;
        }
      );
    },

    sendOrder() {
      this.errors = {};
      console.log("entered send order");
      const data = {
        cart: store.cart,
        customer_name: this.customer_name,
        customer_lastname: this.customer_lastname,
        customer_address: this.customer_address,
        customer_phone: this.customer_phone,
        customer_email: this.customer_email,
        total: store.getTotal(),
        restaurant_id: store.cart[0].plateObj.restaurant_id,
        reqPayload: null,
      };

      this.dropinInstance.requestPaymentMethod((error, payload) => {
        if (error) {
          console.error(error);
          return;
        }
        document.getElementById("nonce").value = payload.nonce;
        data.reqPayload = payload;
        this.loading = true;

        axios
          .post("http://127.0.0.1:8000/api/orders/process", data)
          .then((response) => {
            console.log(response);
            if (!response.data.success) {
              this.loading = false;
              if ("errors" in response.data) {
                this.errors = response.data.errors;
                console.log(this.errors);
              }
              if ("failedPayment" in response.data) {
                this.errors = { payment_failed: "Transazione fallita" };
              }
            } else {
              this.loading = false;
              store.emptyCart();
              this.total = null;
              this.customer_name = null;
              this.customer_lastname = null;
              this.customer_address = null;
              this.customer_phone = null;
              this.customer_email = null;
              this.$router.push({ name: "accepted" });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      });
    },
  },

  mounted() {
    store.temporaryPlate = null;
    this.getClientToken();
    this.restaurant_name = store.cart[0].restaurant;
  },
};
</script>
<template>
  <main class="checkout-main">
    <div class="container py-4 d-flex justify-content-center text-white">
      <div v-if="loading == false" class="row justify-content-center w-100">
        <div class="col-12 col-lg-6 mb-4 mb-lg-0 p-lg-5">
          <template v-if="store.cart.length > 0">
            <div class="cart">
              <div
                class="header d-flex justify-content-between align-items-center"
              >
                <div class="info">
                  <h2 class="mb-3">Riepilogo</h2>
                  <h4>{{ restaurant_name }}</h4>
                </div>
                <button @click="store.emptyCart()" class="btn btn-danger">
                  <i class="fa-solid fa-trash"></i>
                </button>
              </div>
              <div class="items">
                <div
                  class="item d-flex justify-content-between"
                  v-for="item in store.cart"
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
                  <div
                    class="actions-btns d-flex gap-2 align-items-center me-2"
                  >
                    <strong>{{ item.plateObj.price }}€</strong>

                    <button
                      class="btn btn-dark"
                      @click="store.removePlate(item.plateObj)"
                    >
                      <i class="fa-solid fa-minus"></i>
                    </button>
                    <button class="btn">
                      <span>{{ item.quantity }}</span>
                    </button>
                    <button
                      class="btn btn-dark"
                      @click="store.addPlate(item.plateObj, restaurant_name)"
                    >
                      <i class="fa-solid fa-plus"></i>
                    </button>
                  </div>
                </div>
              </div>

              <div class="total d-flex justify-content-between">
                <span>Totale Ordine:</span>
                <strong>{{ store.getTotal() }}€</strong>
              </div>
            </div>
          </template>

          <div v-else class="cart">
            <h2 class="text-center mb-4">Il tuo carrello è vuoto</h2>
            <button @click="this.$router.go(-1)" class="payment-btn">
              Continua ad ordinare
            </button>
          </div>
        </div>
        <div class="right col-12 col-lg-6 p-lg-5">
          <div v-if="store.cart.length > 0" class="card p-4 form-card">
            <h2 class="mb-3 px-3">Procedi all'ordine</h2>
            <span class="text-warning fs-5"
              >⚠️Tutti i campi sono obbligatori</span
            >
            <form
              @submit.prevent="sendOrder()"
              id="payment-form"
              method=""
              class="card-form px-3"
            >
              <div class="mb-3">
                <label for="customer_name" class="form-label">Nome</label>
                <input
                  min="2"
                  max="50"
                  class="form-control"
                  v-model="customer_name"
                  type="text"
                  name="customer_name"
                  id="customer_name"
                  autocomplete="given-name"
                />

                <div class="text-danger" v-if="errors.customer_name">
                  {{ errors.customer_name }}
                </div>
              </div>

              <div class="mb-3">
                <label for="customer_lastname" class="form-label"
                  >Cognome</label
                >
                <input
                  required
                  min="2"
                  max="50"
                  class="form-control"
                  v-model="customer_lastname"
                  type="text"
                  name="customer_lastname"
                  id="customer_lastname"
                  autocomplete="family-name"
                />
                <div class="text-danger" v-if="errors.customer_lastname">
                  {{ errors.customer_lastname }}
                </div>
              </div>

              <div class="mb-3">
                <label for="customer_address" class="form-label"
                  >Indirizzo</label
                >
                <input
                  required
                  class="form-control"
                  v-model="customer_address"
                  type="text"
                  name="customer_address"
                  id="customer_address"
                />
                <div class="text-danger" v-if="errors.customer_address">
                  {{ errors.customer_address }}
                </div>
              </div>

              <div class="mb-3">
                <label for="customer_phone" class="form-label"
                  >Num. di telefono</label
                >
                <input
                  required
                  class="form-control"
                  v-model="customer_phone"
                  type="text"
                  name="customer_phone"
                  id="customer_phone"
                />
                <div class="text-danger" v-if="errors.customer_phone">
                  {{ errors.customer_phone }}
                </div>
              </div>

              <div class="mb-3">
                <label for="customer_email" class="form-label">Email</label>
                <input
                  class="form-control"
                  v-model="customer_email"
                  type="text"
                  name="customer_email"
                  id="customer_email"
                />
                <div class="text-danger" v-if="errors.customer_email">
                  {{ errors.customer_email }}
                </div>
              </div>

              <div class="payment">
                <div id="dropin-container"></div>
                <input type="hidden" id="nonce" name="payment_method_nonce" />
                <div class="text-danger fs-5 my-3" v-if="errors.payment_failed">
                  {{ errors.payment_failed }}
                </div>
              </div>

              <p>
                <strong>Totale: {{ store.getTotal() }}€</strong>
              </p>
              <button class="payment-btn" type="submit">
                Concludi l'ordine
              </button>
            </form>
          </div>
        </div>
      </div>
      <template v-else>
        <Loading />
      </template>
    </div>
  </main>
</template>
<style scoped>
.checkout-main {
  min-height: calc(100vh - 248px);
  background: rgb(250, 89, 0);
  background: linear-gradient(
    90deg,
    rgba(250, 89, 0, 1) 9%,
    rgba(255, 213, 0, 1) 100%
  );
  padding-top: 8rem;
  padding-bottom: 4rem;

  .form-card {
    box-shadow: black 0 0 20px 0;
    border-radius: 20px;
  }

  .card-form {
  }

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
}

.payment-btn {
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
</style>
