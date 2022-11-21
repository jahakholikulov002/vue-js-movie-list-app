/** @format */

import { createApp } from 'vue';
import App from '@/components/app/App.vue';
import './index.css';
import uiComponents from '@/ui-components';

const app = createApp(App);
uiComponents.map((component) => app.component(component.name, component));

app.mount('#app');
