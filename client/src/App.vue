<template>
  <div>
    <!-- Page header -->
    <page-header></page-header>

    <!-- State lists -->
    <router-view></router-view>

    <!-- Page Footer -->
    <page-footer></page-footer>
  </div>
</template>

<script>
import PageHeader from './components/PageHeader.vue';

import PageFooter from './components/PageFooter.vue';

import StateList from './components/StateList.vue';

import router from './router';

export default {
  name: 'App',
  components: {
    PageHeader,
    PageFooter,
    StateList,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
