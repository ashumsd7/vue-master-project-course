import { createRouter,createWebHistory} from 'vue-router'

import CoachDetail from './pages/coaches/CoachDetail.vue'
import CoachesList from './pages/coaches/CoachesList.vue'
import CoachRegistartion from './pages/coaches/CoachRegistartion.vue'
import ContactCoach from './pages/requests/ContactCoach.vue'
import RequestsReceived from './pages/requests/RequestsReceived.vue'
import NotFound from './pages/NotFound.vue'


const router = createRouter({
    history:createWebHistory(),
    routes:[
         {path:'/', redirect:'/coaches'},
        {path:'/coaches', component:CoachesList},
        {path:'/coaches/:id', component:CoachDetail, children:[
            {path:'contact', component:ContactCoach}  //  /coaches/c1/contact
        ]},
        {path:'/register', component:CoachRegistartion},
        {path:'/requests', component:RequestsReceived},
        {path:'/:notFound(.*)', component:NotFound},
    ]
});


export default router;