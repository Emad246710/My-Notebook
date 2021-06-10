<template>
  <div v-if="formattedError.title && formattedError.message">
    <err-presenter
      :title="formattedError.title"
      :message="formattedError.message"
    />
  </div>

  <div v-else-if="filteredCategories">
    <div class="d-flex flex-row justify-content-md-center">
      <div class="form-floating col-md-5">
        <input
          class="form-control"
          id="input-filter"
          name="type"
          v-model="query"
        />
        <label for="input-filter">Filter by type</label>
      </div>


    </div>

    <div class="info">
      <p>Showing {{ filteredCategories.length }} results for "{{ query }}"</p>
    </div>

    <div v-if="filteredCategories.length > 0">
      <div v-for="item in filteredCategories" :key="item.id" class="mt-5">
        <category-card v-bind="item" />
      </div>
    </div>
  </div>
</template>

<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { GET_ALL_CATEGORIES_ACT } from "../storeDef";
import { errHandler } from "../util.js";
import ErrPresenter from "./ErrPresenter.vue";
import { ref } from "vue";
import CategoryCard from "./CategoryCard.vue";

export default {
  components: {
    ErrPresenter,
    CategoryCard,
  },
  setup() {
    const store = useStore();
    const categories = computed(() => {
      let tempList = Object.values(store.state.categories);
      return tempList;
    });

    const query = ref("");

    // const reset = (evt) => {
    //   query.value = ""; // clears the query
    // };

    const filteredCategories = computed(() => {
      // const unwrapped = JSON.parse(JSON.stringify(categories.value));
      let tempCategories = categories.value;
      // Process search input
      if (query.value != "" && query.value) {
        tempCategories = tempCategories.filter((category) =>
          category.type.toLowerCase().includes(query.value.toLowerCase())
        );
      }
      return tempCategories;
    });

    const formattedError = ref({ title: null, message: null });

    return {
      store,

      filteredCategories,
      query,
      // reset,

      formattedError,
    };
  },
  async created() {
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


<style scoped>
.info {
  text-align: right;
  font-size: 0.7em;
  margin: 0;
}
</style>

