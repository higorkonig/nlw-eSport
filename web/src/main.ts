import { createApp } from 'vue';
import { createPinia } from 'pinia';
import Toast from 'vue-toastification';
import App from './App.vue';
import router from './router';
// Import the CSS or use your own!
import 'vue-toastification/dist/index.css';
import './styles/main.css';

const app = createApp(App);
const options = {
  // You can set your default options here
};
app.use(createPinia());
app.use(Toast, options);
app.use(router);

app.mount('#app');
