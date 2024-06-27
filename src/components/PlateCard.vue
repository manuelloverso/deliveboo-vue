<script>
import { store } from "../store.js";
export default {
  name: "PlateCard",

  props: {
    plate: Object,
    restaurant_name: String,
  },

  data() {
    return {
      store,
    };
  },

  methods: {
    isInCart(name) {
      const found = store.cart.some((el) => {
        if (el.plateObj.name == name) {
          return true;
        }
      });
      return found;
    },
  },
};
</script>
<template>
  <div v-if="plate.is_visible == true" class="col pb-4">
    <div class="plate-card">
      <!-- Image -->
      <template v-if="plate.image != null">
        <img loading="lazy" v-if="plate.image.startsWith('http')" class="plate-img" :src="plate.image" alt="" />
        <img loading="lazy" v-else class="plate-img" :src="'http://127.0.0.1:8000' + '/storage/' + plate.image"
          alt="" />
      </template>
      <img loading="lazy" v-else class="plate-img" src="/public/img/plate-default.jpg" alt="" />

      <div class="plate-info">
        <div>
          <h3 class="plate-name">{{ plate.name }}</h3>
          <p>{{ plate.description }}</p>
          <p><strong>Prezzo: </strong>{{ plate.price }}€</p>
        </div>
      </div>
      <div class="d-flex justify-content-end">
        <div class="buttons d-flex gap-3">
          <button v-if="isInCart(plate.name)" @click="store.removePlate(plate)" class="add-plate">
            <i class="fa-solid fa-minus"></i>
          </button>
          <button v-if="isInCart(plate.name)" class="btn btn-dark">
            {{ store.getQuantity(plate.name) }}
          </button>
          <button @click="store.addPlate(plate, restaurant_name)" class="add-plate">
            <i class="fa-solid fa-plus"></i>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style>
.plate-card {
  display: flex;
  flex-direction: column;
  height: 100%;
  padding: 0.5rem;
  color: black;
  background-color: var(--bg-header);
  border-radius: 15px;
  box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);

  .plate-img {
    width: 100%;
    aspect-ratio: 16/12;
    object-fit: cover;
    margin-bottom: 20px;
    border-radius: 15px;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.2), 0 3px 10px 0 rgba(0, 0, 0, 0.19);
  }

  .plate-info {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: start;
    flex-grow: 1;
  }

  .plate-name {
    font-size: 1.2rem;
  }

  .add-plate {
    padding: 6px 10px;
    border: none;
    border-radius: 10px;
    color: white;
    background-color: var(--accent);
    transition: all 0.2s ease;

    &:hover {
      background-color: white;
      color: var(--text-dark);
    }
  }
}
</style>
