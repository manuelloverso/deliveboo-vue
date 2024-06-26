<script>
export default {
  name: "AppFooter",
  data() {
    return {};
  },
};
</script>
<template>
  <footer class="section_footer">

    <div class="container  py-5 text-white fs-6 fw-lighter text-start">

      <div class="row">
        <div class="col d-flex gap-5 mb-3">
          <div>
            <h5>Scopri Deliverome</h5>
            <ul>
              <li><a href="">Chi siamo</a>

              </li>
              <li><a href="">Ristoranti</a>

              </li>
              <li><a href="">Lavora con noi</a>

              </li>
              <li><a href="">Diventa nostro partner</a>

              </li>
              <li><a href="">Altro</a>

              </li>
            </ul>
          </div>

          <div>
            <h5>Note legali</h5>
            <ul>
              <li><a href="">Termini & Condizioni</a>

              </li>
              <li><a href="">Informativa sulla privacy</a>

              </li>
              <li><a href="">Cookies</a>

              </li>
            </ul>
          </div>
          <div>

            <h5>Aiuto</h5>
            <ul>
              <li><a href="">Contatti</a>

              </li>
              <li><a href="">FAQ</a>

              </li>
              <li><a href="">Tipi di cucina</a>

              </li>
            </ul>
          </div>
        </div>


        <div class="col-6 col-sm-4 ">
          <h5>Seguici sui nostri canali social</h5>
          <ul class="d-flex gap-4 ">
            <li><a href=""><i class="fa-brands fa-facebook fs-3 py-3"></i></a>

            </li>
            <li><a href=""><i class="fa-brands fa-instagram fs-3 py-3"></i></a>

            </li>
            <li><a href=""><i class="fa-brands fa-twitter fs-3 py-3"></i></a>

            </li>
          </ul>
        </div>
      </div>


    </div>


  </footer>
</template>
<style scoped>
.section_footer {
  background-color: var(--bg-footer);
}

h5,
a {
  color: #a38e93b0;
}

ul {
  margin: 0;
  padding: 0;
}

li {
  list-style: none;
}

a {
  text-decoration: none;
  font-size: smaller;

  &:hover {
    color: #d6d6d6;
  }
}

.fa-facebook:hover {
  color: rgb(12, 79, 213);
}

.fa-instagram:hover {
  color: rgb(183, 0, 152);
}

.fa-twitter:hover {
  color: rgb(0, 149, 255);
}
</style>
