<script>
export default {
  name: "HomeView",
  data() {
    return {};
  },
};
</script>
<template>
  <div class="jumbotron">
    <div class="overlay"></div>
    <img src="/public/img/jumbo.jpg" alt="" />
    <div class="left">
      <h2>Lorem ipsum dolor sit amet consectetur.</h2>
    </div>
    <div class="right">
      <h2>Sei un ristoratore?</h2>
      <a href="http://127.0.0.1:8000/register">Registrati</a>
    </div>
  </div>
  <h1>I am the home page</h1>
</template>
<style scoped>
.jumbotron {
  height: 800px;
  background-color: red;
  position: relative;
  & h2 {
    font-size: 3rem;
  }
  & img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .overlay {
    position: absolute;
    width: 100%;
    height: 100%;
    z-index: 2;
    background-color: rgba(0, 0, 0, 0.466);
  }

  .left,
  .right {
    color: white;
    position: absolute;
    z-index: 3;
    top: 50%;
    transform: translateY(-50%);
  }

  .right {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1rem;
    right: 17%;

    & a {
      text-decoration: none;
      color: var(--accent);
      display: block;
      padding: 7px 13px;
      font-size: 1.2rem;
      background-color: white;
      border-radius: 10px;
      transition: background-color 0.3s ease, color 0.3s ease;

      &:hover {
        background-color: var(--accent);
        color: white;
      }
    }
  }

  .left {
    left: 17%;
    max-width: 500px;
  }
}
</style>
