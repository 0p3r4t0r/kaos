import { createRouter, createWebHashHistory } from 'vue-router';

import Home from './routes/Home.vue';
import About from './routes/About.vue';
import Play from './routes/Play.vue';
import Scores from './routes/Scores.vue';
import Controls from './routes/Controls.vue';

// -----------------------------------------------------------------------------
// ROUTER
// -----------------------------------------------------------------------------

const routes = [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/play', component: Play },
    { path: '/scores', component: Scores },
    { path: '/controls', component: Controls },
];

export default createRouter({ 
    history: createWebHashHistory(),
    routes
});
