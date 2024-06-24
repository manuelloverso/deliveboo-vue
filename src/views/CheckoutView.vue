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
      total: 10,
      status: "ok",
      restaurant_id: 1,
    };
  },

  methods: {
    getClientToken() {
      axios.get("http://127.0.0.1:8000/api/payment").then((resp) => {
        /* console.log(resp.data.response); */
        this.btClientToken = resp.data.response;
        this.handleForm();
      });
    },

    handleForm() {
      const form = document.getElementById("payment-form");

      braintree.dropin.create(
        {
          authorization: this.btClientToken,
          container: "#dropin-container",
          dataCollector: true,
        },
        (error, dropinInstance) => {
          if (error) console.error(error);

          form.addEventListener("submit", (event) => {
            event.preventDefault();

            dropinInstance.requestPaymentMethod((error, payload) => {
              if (error) console.error(error);

              document.getElementById("nonce").value = payload.nonce;
              console.log(payload.amount);

              axios
                .post("http://127.0.0.1:8000/api/payment", payload)
                .then((resp) => {
                  console.log(resp);
                  const success = resp.data.response.success;

                  if (success) {
                    this.sendOrder();
                  }
                })
                .catch((err) => {
                  console.log(err);
                });
              /* form.submit(); */
            });
          });
        }
      );
    },

    sendOrder() {
      console.log("entered send order");
      const data = {
        customer_name: this.customer_name,
        customer_lastname: this.customer_lastname,
        customer_address: this.customer_address,
        customer_phone: this.customer_phone,
        customer_email: this.customer_email,
        status: this.status,
        total: this.total,
        restaurant_id: this.restaurant_id,
      };

      axios
        .post("http://127.0.0.1:8000/api/orders", data)
        .then((response) => {
          console.log(response);
        })
        .catch((err) => {
          console.log(err);
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

    getTotal() {
      let total = 0;
      store.cart.forEach((el) => {
        total += el.plateObj.price * el.quantity;
      });

      return total.toFixed(2);
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
    <div class="container py-4 d-flex text-white">
      <div class="left col-6 pt-5 pe-4">
        <h1 class="fs-1 mb-3">Ci siamo quasi..</h1>
        <h3 class="fs-2 mb-3">Rivedi il tuo ordine</h3>
        <h3>
          Una volta confermato, sarà direttamente a casa tua in pochi minuti
        </h3>
      </div>
      <div class="col-6 p-4">
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
                    @click="store.addPlate(item.plateObj.name, plates)"
                  >
                    <i class="fa-solid fa-plus"></i>
                  </button>
                  <button
                    class="btn btn-dark"
                    @click="store.removePlate(item.plateObj.name, plates)"
                  >
                    <i class="fa-solid fa-minus"></i>
                  </button>
                </div>
              </div>
            </div>

            <div class="total d-flex justify-content-between">
              <span>Totale Ordine:</span>
              <strong>{{ getTotal() }}€</strong>
            </div>

            <button
              class="payment-btn"
              data-bs-toggle="modal"
              data-bs-target="#modalId"
            >
              Vai al pagamento
            </button>
          </div>

          <!-- Modal Body -->
          <!-- if you want to close by clicking outside the modal, delete the last endpoint:data-bs-backdrop and data-bs-keyboard -->
          <div
            class="modal fade"
            id="modalId"
            tabindex="-1"
            data-bs-backdrop="static"
            data-bs-keyboard="false"
            role="dialog"
            aria-labelledby="modalTitleId"
            aria-hidden="true"
          >
            <div
              class="modal-dialog modal-dialog-scrollable modal-dialog-centered modal-sm"
              role="document"
            >
              <div class="modal-content">
                <div class="modal-header">
                  <h5 class="modal-title" id="modalTitleId">Modal title</h5>
                  <button
                    type="button"
                    class="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div class="modal-body">
                  <form class="text-dark" id="payment-form" method="">
                    <div class="mb-3">
                      <label for="customer_name" class="form-label">Name</label>
                      <input
                        v-model="customer_name"
                        type="text"
                        name="customer_name"
                        id="customer_name"
                      />
                    </div>

                    <div class="mb-3">
                      <label for="customer_lastname" class="form-label"
                        >lastname</label
                      >
                      <input
                        v-model="customer_lastname"
                        type="text"
                        name="customer_lastname"
                        id="customer_lastname"
                      />
                    </div>

                    <div class="mb-3">
                      <label for="customer_address" class="form-label"
                        >address</label
                      >
                      <input
                        v-model="customer_address"
                        type="text"
                        name="customer_address"
                        id="customer_address"
                      />
                    </div>

                    <div class="mb-3">
                      <label for="customer_phone" class="form-label"
                        >phone</label
                      >
                      <input
                        v-model="customer_phone"
                        type="text"
                        name="customer_phone"
                        id="customer_phone"
                      />
                    </div>

                    <div class="mb-3">
                      <label for="customer_email" class="form-label"
                        >email</label
                      >
                      <input
                        v-model="customer_email"
                        type="text"
                        name="customer_email"
                        id="customer_email"
                      />
                    </div>
                    <div id="dropin-container"></div>
                    <input type="submit" />
                    <input
                      type="hidden"
                      id="nonce"
                      name="payment_method_nonce"
                    />
                  </form>
                </div>
                <div class="modal-footer">
                  <button
                    type="button"
                    class="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Close
                  </button>
                  <button type="button" class="btn btn-primary">Save</button>
                </div>
              </div>
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
    </div>
  </main>
</template>
<style scoped>
.checkout-main {
  min-height: 70vh;
  background: rgb(250, 89, 0);
  background: linear-gradient(
    90deg,
    rgba(250, 89, 0, 1) 9%,
    rgba(255, 213, 0, 1) 100%
  );
  padding-top: 8rem;
  padding-bottom: 4rem;

  .left {
    padding-top: 2rem;
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
  }
}
</style>
