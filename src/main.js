import { createApp } from 'vue'
import App from './App.vue'
import components from './components/UI/index.js'
import router from './router/router'
import store from './store/index'

const app = createApp(App)
components.forEach((component) => {
  app.component(component.name, component)
})

app.use(router).use(store).mount('#app')
