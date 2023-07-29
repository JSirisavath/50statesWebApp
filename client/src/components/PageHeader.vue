<template>
  <div id="block-header">
    <h1 id="title">Have you visited every state?</h1>
  </div>
</template>

<script>
export default {
  name: 'PageHeader',
};
</script>

<style scoped>
#block-header {
  padding: 2rem 1rem;
  margin-bottom: 2rem;
  border-radius: 0.3rem;
  background-color: salmon;
  background-image: url('~@/assets/map_header_CL.jpg');
  background-position: center;
  background-size: cover;
}

#title {
  font-weight: bold;
  color: ghostwhite;
}
</style>
