import { createApp } from 'vue';

import App from './App.vue';
import locale from './locale';
import routes from './Main/router';
import 'input';
import './style/root.scss';
import './registerServiceWorker';

// -----------------------------------------------------------------------------
// APP
// -----------------------------------------------------------------------------

const app = createApp(App);

app.use(locale);
app.use(routes);
app.mount('#kaos-root');

export default app;