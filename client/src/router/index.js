import { createRouter, createWebHashHistory } from 'vue-router';

import StateListVue from '@/components/StateList.vue';

import AboutSite from '@/components/AboutSite.vue';

import StateMap from '@/components/StateMap.vue';

// Not Found Page sFile import
import NotFoundPage from '@/components/NotFoundPage.vue';

import StatesVisited from '@/components/StatesVisited.vue';

export default createRouter({
  history: createWebHashHistory(),
  routes: [
    // Each object inside this array is essentially a route to navigate to
    {
      path: '/',
      name: 'StateList',
      component: StateListVue,
    },

    {
      path: '/about',
      name: 'AboutSite',
      component: AboutSite,
    },

    { path: '/map/:state', name: 'StateMap', component: StateMap },

    // New route to not found page
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFoundPage',
      component: NotFoundPage,
    },

    // List of visited states page route
    {
      path: '/visited States',
      name: 'StatesVisited',
      component: StatesVisited,
    },
  ],
});
