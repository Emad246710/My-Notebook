<template>
  <nav
    id="sidebarMenu"
    class="col-md-3 col-lg-2 d-md-block bg-light sidebar collapse"
  >
    <div class="position-sticky pt-3">
      <ul class="nav flex-column">
        <li class="nav-item">
          <router-link :to="{ name: 'notes' }" class="nav-link">
            <span data-feather="home"></span>
            Notes</router-link
          >
        </li>
        <li class="nav-item">
          <router-link :to="{ name: 'categories' }" class="nav-link">
            <span data-feather="file"></span>
            categories
          </router-link>
        </li>

        <li class="nav-item">
          
          <router-link class="nav-link" :to="{ name: 'note_create' }">
            <span data-feather="users"></span>
            note_create
          </router-link>
        </li>

        <li class="nav-item">
          

          <router-link class="nav-link" :to="{ name: 'category_create' }">
            <span data-feather="users"></span>
            category_create
          </router-link>
        </li>


        <li class="nav-item">
          
          <router-link class="nav-link" :to="{ name: 'login' }">
            <span data-feather="layers"></span>
            login
          </router-link>
        </li>
        


        <li class="nav-item">
          
          <router-link
            class="nav-link"
            :to="{ name: 'user_edit', params: { id: 1 } }"
          >
            <span data-feather="file-text"></span>

            user_edit
          </router-link>
        </li>

        <li class="nav-item">
          
          <router-link
            class="nav-link"
            :to="{ name: 'user' }"
          >
            <span data-feather="file-text"></span>
            user Info 
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {};
</script>

<style>
</style>