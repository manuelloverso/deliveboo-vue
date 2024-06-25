<script>
import { SplideSlide } from "@splidejs/vue-splide";
import { Splide } from "@splidejs/splide";
import { AutoScroll } from "@splidejs/splide-extension-auto-scroll";
import { store } from "../store";

export default {
  name: "TypesSplider",
  components: {
    Splide,
    SplideSlide,
  },
  data() {
    return {
      store,
      types: [],
    };
  },

  methods: {
    slider() {
      const splideElement = document.querySelector(".splide");
      if (splideElement) {
        setTimeout(() => {
          const splide = new Splide(splideElement, {
            type: "loop",
            drag: false,
            focus: "center",
            arrows: false,
            perPage: 5,
            pagination: false,
            autoScroll: {
              speed: 0.7,
              pauseOnHover: true,
            },
          });

          splide.mount({ AutoScroll });
        }, 200);
      }
    },
  },
  watch: {
    "store.loadingTypes"(newVal) {
      if (!newVal) {
        this.slider();
      }
    },
  },

  mounted() {
    this.types = store.types;
    if (!store.loadingTypes) {
      this.slider();
    }
  },
};
</script>
<template>
  <section class="types-slider">
    <h2 class="text-white text-center mb-5 fw-light">
      Qualsiasi cosa tu abbia voglia di mangiare lo trovi su Deliverome
    </h2>
    <div class="splide" aria-label="types">
      <div class="splide__track">
        <ul class="splide__list align-items-center">
          <splide-slide class="idk" v-for="singleType in store.types" :key="singleType.id">
            <img class="type" :src="singleType.image" :alt="singleType.name" />
          </splide-slide>
        </ul>
      </div>
    </div>
  </section>
</template>
<style scoped>
@import "@splidejs/splide/dist/css/splide.min.css";

.types-slider {
  background-color: var(--accent);
  padding: 3rem 0;
  max-height: 500px;

  @media (max-width:575px) {
    display: none;
  }

  .type {
    width: 90%;
    margin-bottom: 0 !important;
    border-radius: 20px;
    object-fit: cover;
    aspect-ratio: 16/10;



  }
}
</style>
