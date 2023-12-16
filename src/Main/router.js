import { createRouter, createWebHashHistory } from 'vue-router';

import Home from './routes/Home.vue';
import About from './routes/About.vue';
import Play from './routes/Play.vue';
import Scores from './routes/Scores.vue';
import Settings from './routes/Settings.vue';

// -----------------------------------------------------------------------------
// ROUTER
// -----------------------------------------------------------------------------

const routes = [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/play', component: Play },
    { path: '/scores', component: Scores },
    { path: '/settings', component: Settings },
];

export default createRouter({ 
    history: createWebHashHistory(),
    routes
});
