// Router
const routes = [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/kelas', component: Kelas },
    { path: '/kelas/:id', component: detailKelas },
    { path: '*', component: NotVound },
]

const router = new VueRouter({
    mode: 'history',
    routes
})