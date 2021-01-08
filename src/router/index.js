import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import SignIn from '@/components/auth/SignIn'
import SignUp from '@/components/auth/SignUp'
import Ad from '@/components/adds/Ad'
import AdList from '@/components/adds/AdList'
import NewAd from '@/components/adds/NewAd'
import Orders from '@/components/user/Orders'
import AuthGuard from './auth-guard'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '',
      name: 'home',
      component: Home 
    },
    {
      path: '/ad/:id',
      name: 'ad',
      component: Ad,
      props: true
    },
    {
      path: '/list',
      name: 'list',
      component: AdList,
      beforeEnter: AuthGuard
    },
    {
      path: '/new',
      name: 'newAd',
      component: NewAd,
      beforeEnter: AuthGuard
    },
    {
      path: '/signin',
      name: 'signIn',
      component: SignIn
    },
    {
      path: '/signup',
      name: 'signUp',
      component: SignUp
    },
    {
      path: '/orders',
      name: 'orders',
      component: Orders,
      beforeEnter: AuthGuard
    }
  ],
  mode: 'history'
})
