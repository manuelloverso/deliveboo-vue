<script>
import { store } from "../store.js";
import axios from "axios";

export default {
  name: "CheckoutView",
  data() {
    return {
      store,
      plates: [],
      loading: true,
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
          /* return; */
        }
        document.getElementById("nonce").value = payload.nonce;
        data.reqPayload = payload;

        axios
          .post("http://127.0.0.1:8000/api/orders/process", data)
          .then((response) => {
            console.log(response);
            if (!response.data.success) {
              this.errors = response.data.errors;
              console.log(this.errors);
            } else {
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

    getPlates() {
      let restId = null;
      if (store.cart.length > 0) {
        restId = store.cart[0].plateObj.restaurant_id;
      }

      if (restId != null) {
        axios
          .get(store.baseApiUrl + `restaurants/${restId}`)
          .then((resp) => {
            if (resp.data.success) {
              this.plates = resp.data.response.plates;
              this.loading = false;
            } else {
              this.$router.push({ name: "NotFound" });
            }
          })
          .catch((err) => {
            console.log(err);
          });
      }
    },

    sumPrice(plate) {
      let price = plate.plateObj.price * plate.quantity;
      return price.toFixed(2);
    },
  },

  mounted() {
    this.getClientToken();
    this.getPlates();
  },
};
</script>
<template>
  <main class="checkout-main">
    <div class="container py-4 d-flex justify-content-between text-white">
      <div class="col-5 p-4">
        <template v-if="store.cart.length > 0">
          <div v-if="!loading" class="cart">
            <div
              class="header d-flex justify-content-between align-items-center"
            >
              <h2>Riepilogo</h2>
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
                  <span
                    >{{ item.quantity }}x
                    <strong>{{ item.plateObj.name }}</strong></span
                  >
                </div>
                <!-- actions -->
                <div class="actions-btns d-flex gap-2 align-items-center me-2">
                  <strong>{{ sumPrice(item) }}€</strong>
                  <button
                    class="btn btn-dark"
                    @click="store.addPlate(item.plateObj)"
                  >
                    <i class="fa-solid fa-plus"></i>
                  </button>
                  <button
                    class="btn btn-dark"
                    @click="store.removePlate(item.plateObj)"
                  >
                    <i class="fa-solid fa-minus"></i>
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
      <div class="right col-5 p-4">
        <div class="card p-4 form-card">
          <h2 class="mb-3">Procedi all'ordine</h2>
          <form
            @submit.prevent="sendOrder()"
            id="payment-form"
            method=""
            class="card-form"
          >
            <div class="mb-3">
              <label for="customer_name" class="form-label">Nome</label>
              <input
                required
                min="2"
                max="50"
                class="form-control"
                v-model="customer_name"
                type="text"
                name="customer_name"
                id="customer_name"
              />

              <div class="text-danger" v-if="errors.customer_name">
                {{ errors.customer_name }}
              </div>
            </div>

            <div class="mb-3">
              <label for="customer_lastname" class="form-label">Cognome</label>
              <input
                required
                min="2"
                max="50"
                class="form-control"
                v-model="customer_lastname"
                type="text"
                name="customer_lastname"
                id="customer_lastname"
              />
              <div class="text-danger" v-if="errors.customer_lastname">
                {{ errors.customer_lastname }}
              </div>
            </div>

            <div class="mb-3">
              <label for="customer_address" class="form-label">Indirizzo</label>
              <input
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
            <div id="dropin-container"></div>
            <p>
              <strong>Totale: {{ store.getTotal() }}</strong>
            </p>
            <button class="payment-btn" type="submit">Paga</button>
            <input type="hidden" id="nonce" name="payment_method_nonce" />
          </form>
        </div>
      </div>
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
    max-height: 70vh;
    overflow-y: auto;
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
