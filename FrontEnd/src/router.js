import { createRouter, createWebHistory, createWebHashHistory } from 'vue-router'

import Categories from "./components/Categories.vue"
import CategoryForm from "./components/CategoryForm.vue"
import NoteForm from "./components/NoteForm.vue"
import Notes from "./components/Notes.vue"
import Home from "./components/Home.vue"
import Note from "./components/Note.vue"

import User from "./components/User.vue"
import UserForm from "./components/UserForm.vue"
import Login from "./components/UserLogin.vue"

import store from "./store.js";
import { IS_LOGGED_IN, LOGIN_MUT } from './storeDef';

const castIdToInt = (route) => {
  let temp = Number.parseInt(route.params.id);
  return { id: temp };
}

const routes = [
  {
    path: '/', name: 'root', redirect: { name: 'notes' }
  },

  { path: '/login', name: 'login', component: Login, meta: { requiresAuth: false } },
  { path: '/signup', name: 'signup', component: UserForm, meta: { requiresAuth: false } },

  { path: '/user', name: 'user', component: User, meta: { requiresAuth: true } }, // Pass route.params to props
  { path: '/users/form/:id', name: 'user_edit', component: UserForm, props: castIdToInt, meta: { requiresAuth: true } }, // Pass route.params to props

  { path: '/notes', name: 'notes', component: Notes, meta: { requiresAuth: true } },
  { path: '/notes/:id', name: 'note', component: Note, props: castIdToInt, meta: { requiresAuth: true } }, // Pass route.params to props
  { path: '/notes/form', name: 'note_create', component: NoteForm, meta: { requiresAuth: true } },
  { path: '/notes/form/:id', name: 'note_edit', component: NoteForm, props: castIdToInt, meta: { requiresAuth: true } }, // Pass route.params to props

  { path: '/categories', name: 'categories', component: Categories, meta: { requiresAuth: true } },
  { path: '/categories/form', name: 'category_create', component: CategoryForm, meta: { requiresAuth: true } },
  { path: '/categories/form/:id', name: 'category_edit', component: CategoryForm, props: castIdToInt, meta: { requiresAuth: true } }, // Pass route.params to props

]

const router = createRouter({
  history: createWebHistory(),
  routes,
})


router.beforeEach((to, from) => {
  // instead of having to check every route record with
  // to.matched.some(record => record.meta.requiresAuth)


  if (to.meta.requiresAuth && !store.getters[IS_LOGGED_IN]) {
    // this route requires auth, check if logged in
    // if not, redirect to login page.

    if (localStorage.current_user_id && localStorage.current_user_username) {
      let user = {}
      user.id = localStorage.current_user_id;
      user.username = localStorage.current_user_username;
      store.commit(LOGIN_MUT, user)
      
      return true
    } else {
      delete localStorage.current_user_id 
      delete localStorage.current_user_username 

      return {
        name: 'login',
        // save the location we were at to come back later
        query: { redirect_to_name: to.name },
      }

    }





  }
  return true
})

export default router

