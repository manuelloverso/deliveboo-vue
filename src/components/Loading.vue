<script>
export default {
  name: "Loading",
};
</script>

<template>
  <div class="loading-wrapper">
    <div :class="$route.name == 'checkout' ? 'white' : ''" class="loading">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>
</template>
<style scoped>
.loading-wrapper {
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}

.white > span {
  background-color: white !important;
}

.loading {
  width: 200px;
  display: flex;
  justify-content: center;
}

.loading > span {
  width: 40px;
  height: 40px;
  margin: 15px;
  background-color: var(--accent);
  border-radius: 50%;
  animation: anima 1.5s linear infinite;
}

.loading > span:nth-child(1) {
  animation-delay: 0.2s;
}
.loading > span:nth-child(2) {
  animation-delay: 0.4s;
}
.loading > span:nth-child(3) {
  animation-delay: 0.6s;
}

@keyframes anima {
  from {
    opacity: 0.5;
  }

  50% {
    opacity: 1;
    transform: scale(1.3);
  }

  to {
    opacity: 0.5;
  }
}
</style>
