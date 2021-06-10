<template>
  <div v-if="user">
    <p>UserId: {{ user.id }}</p>
    <p>Username: {{ user.username }}</p>

      <button
    type="button"
    class="btn btn-primary"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
  >
    Remove my account
  </button>

  </div>
  <remove-confirmation />
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";

import ErrPresenter from "./ErrPresenter.vue";


import RemoveConfirmation from './RemoveConfirmation.vue'



export default {
  components: {
    ErrPresenter,
    RemoveConfirmation,
  },



  setup() {

    const store = useStore();
    const user = computed(() => store.state.current_user);

return {
      store,
      user,
    };
  },
  created() {},
};
</script>

<style>
</style>