<template>
  <!-- Button trigger modal -->

  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Confirmation</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <h3>Are you sure?</h3>
          <p>Removing this account will delete all user's data</p>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" @click.prevent="deleteUser">
            Delete account
          </button>
          <button
            type="button"
            class="btn btn-secondary"
            data-bs-dismiss="modal"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { Modal } from "bootstrap";

import { computed } from "vue";
import { useStore } from "vuex";
import { DELETE_USER_ACT } from "../storeDef";
import { ref } from "vue";
import { errHandler } from "../util.js";
import ErrPresenter from "./ErrPresenter.vue";
import { useRouter } from "vue-router";

export default {
  setup() {
    const router = useRouter();
    const store = useStore();
    const formattedError = ref({ title: null, message: null });

    const deleteUser = async () => {
      try {
        // console.log(       JSON.parse(JSON.stringify(categories.value));)
        await store.dispatch(DELETE_USER_ACT);
        router.push({ name: "login" });

        formattedError.value = { title: null, message: null };
      } catch (err) {
        formattedError.value = errHandler(err);
        console.log(formattedError);
      } finally {
      }
    };

    return {
      deleteUser,
      formattedError,
    };
  },
};
</script>