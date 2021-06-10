<template>
  <div class="card">
        <div class="card-header bg-secondary">

    <h5 class="text-white ">Category</h5>
    </div>

    <div class="card-body">
      <div v-if="formattedError.title && formattedError.message">
        <err-presenter
          :title="formattedError.title"
          :message="formattedError.message"
        />
      </div>
      <p class="card-text">Type: {{ type }}</p>

      <div class="d-md-flex flex-md-row justify-content-md-end">
        <button
          type="button"
          class="btn btn-primary"
          @click.prevent="editCategory"
        >
          Edit
        </button>
        <button
          class="btn btn-secondary"
          type="button"
          @click.prevent="deleteCategory"
        >
          Delete
        </button>
      </div>

    </div>
  </div>
</template>

<script>
import { errHandler } from "../util.js";
import ErrPresenter from "./ErrPresenter.vue";
import { ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import { DELETE_CATEGORY_ACT } from "../storeDef.js";

export default {
  components: {
    ErrPresenter,
  },

  props: {
    id: {
      type: Number,
      required: true,
    },
    type: {
      type: String,
      required: true,
    },
    userId: {
      type: Number,
      required: false,
    },
  },
  setup(props, context) {
    const router = useRouter();
    const store = useStore();

    const formattedError = ref({ title: null, message: null });

    const deleteCategory = async () => {
      try {
        await store.dispatch(DELETE_CATEGORY_ACT, props.id);
        formattedError.value = { title: null, message: null };
      } catch (err) {
        formattedError.value = errHandler(err);
        console.log(formattedError);
      } finally {
      }
    };

    const editCategory = () => {
      router.push({ name: "category_edit", params: { id: props.id } });
    };
    const id = ref(props.id);
    const type = ref(props.type);

    watch(props, (currentValue, oldValue) => {
      id.value = currentValue.id;
      type.value = currentValue.type;
    });

    return {
      id,
      type,
      deleteCategory,
      editCategory,
      formattedError,
    };
  },
};
</script>


<style>
</style>