import { createRouter, createWebHistory } from 'vue-router'
import Main from '../pages/Main.vue'
import PostsPage from '../pages/PostsPage.vue'
import PostDetails from '../pages/PostDetails.vue'
import PostPageWithStore from '../pages/PostPageWithStore.vue'
const routes = [
  {
    path: '/',
    component: Main
  },
  {
    path: '/posts',
    component: PostsPage
  },
  {
    path: '/posts/:id',
    component: PostDetails
  },
  {
    path: '/postsV2',
    component: PostPageWithStore
  }
]

const router = createRouter({
  history: createWebHistory('/'),
  routes
})

export default router
