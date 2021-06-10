<template>
  <div class="card">
    <div class="card-header bg-secondary">
      <h5 class="text-white">Note</h5>
    </div>
    <div class="card-body">
      <div v-if="formattedError.title && formattedError.message">
        <err-presenter
          :title="formattedError.title"
          :message="formattedError.message"
        />
      </div>

      <div v-else>
        <p class="card-text">Content: {{ content }}</p>

        <div class="d-md-flex flex-md-row justify-content-md-between">
          <p class="card-text">Priority: {{ priority }}</p>
          <p class="card-text">Category: {{ category ? category.type : "" }}</p>
          <p class="card-text">
            CreatedOn: {{ createdOn.date }} at {{ createdOn.time }}
          </p>
        </div>

        <div class="d-md-flex flex-md-row justify-content-md-end">
          <button
            class="btn btn-secondary"
            type="button"
            @click.prevent="editNote"
          >
            Edit
          </button>
          <button
            type="button"
            class="btn btn-primary"
            @click.prevent="deleteNote"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { errHandler } from "../util.js";
import ErrPresenter from "./ErrPresenter.vue";
import { computed, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useStore } from "vuex";
import {
  DELETE_NOTE_ACT,
  GET_ALL_CATEGORIES_ACT,
  GET_CATEGORY_GET,
} from "../storeDef.js";

export default {
  components: {
    ErrPresenter,
  },
  props: {
    id: {
      type: Number,
      required: true,
    },
    categoryId: {
      type: Number,
      required: false,
    },

    priority: {
      type: Number,
      required: false,
    },
    createdOn: {
      type: String,
      required: true,
    },
    userId: {
      type: Number,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
  },
  setup(props, context) {
    const router = useRouter();
    const store = useStore();

    const formattedError = ref({ title: null, message: null });

    const deleteNote = async () => {
      try {
        await store.dispatch(DELETE_NOTE_ACT, props.id);
        formattedError.value = { title: null, message: null };
      } catch (err) {
        formattedError.value = errHandler(err);
        console.log(formattedError);
      } finally {
      }
    };

    const editNote = () => {
      router.push({ name: "note_edit", params: { id: props.id } });
    };
    const parseDateTime = (co) => {
      const event = new Date(co.trim());
      return {
        date: event.toDateString(),
        time: event.toLocaleTimeString("no-NO"),
      };
    };

    const id = ref(props.id);
    const content = ref(props.content);
    const userId = ref(props.userId);
    const createdOn = ref(parseDateTime(props.createdOn));
    const priority = ref(props.priority);

    const category = computed(() => {
      if (props.categoryId)
        return store.getters[GET_CATEGORY_GET](props.categoryId);
      else null;
    });

    watch(props, (currentValue, oldValue) => {
      id.value = currentValue.id;
      content.value = currentValue.content;
      userId.value = currentValue.userId;
      createdOn.value = parseDateTime(currentValue.createdOn);
      priority.value = currentValue.priority;
      // category = computed(() => {
      //   if (props.categoryId)
      //     return store.getters[GET_CATEGORY_GET](props.categoryId);
      // });
    });

    return {
      id,
      content,
      userId,
      createdOn,
      priority,
      category,
      deleteNote,
      editNote,
      formattedError,
      store,
    };
  },
  async created() {
    // bring all categories to populate the dropDownMenu "categoriesOptions"
    try {
      await this.store.dispatch(GET_ALL_CATEGORIES_ACT);
      this.formattedError = { title: null, message: null };
    } catch (err) {
      this.formattedError = errHandler(err);
      console.log(this.formattedError);
    } finally {
    }
  },
};
</script>



<style>
</style>