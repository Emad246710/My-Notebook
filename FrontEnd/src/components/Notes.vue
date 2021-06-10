<template>
  <div v-if="formattedError.title && formattedError.message">
    <err-presenter
      :title="formattedError.title"
      :message="formattedError.message"
    />
  </div>
  <div v-else-if="filteredNotes">
    <div class="d-md-flex flex-md-row justify-content-md-around ">

      <div class="form-floating col-md-5">
        <input
          class="form-control"
          id="input-filter"
          name="type"
          v-model="query"
        />
        <label for="input-filter">Filter by content</label>
      </div>

    <div class="form-floating col-md-3">
      <select
        class="form-select"
        v-model="sortByProperty"
        @change="sortFunction"
      >
        <option
          v-for="option in sortOptions"
          :value="option.value"
          :key="option.value"
        >
          {{ option.viewValue }}
        </option>
      </select>

      <label for="priorityInput">Order by</label>
    </div>




    </div>


    <div class="info">
      <p>Showing {{ filteredNotes.length }} results for "{{ query }}"</p>
    </div>


    <div v-if="filteredNotes.length > 0">
      <div v-for="item in filteredNotes" :key="item.id" class="mt-5">
        <note-card v-bind="item" />
      </div>
    </div>
  </div>
</template>



<script>
import { computed } from "vue";
import { useStore } from "vuex";
import { GET_ALL_NOTES_ACT } from "../storeDef";
import { errHandler } from "../util.js";
import ErrPresenter from "./ErrPresenter.vue";
import NoteCard from "./NoteCard.vue";
import { ref, unref } from "vue";

export default {
  components: {
    ErrPresenter,
    NoteCard,
  },
  setup() {
    const store = useStore();
    const formattedError = ref({ title: null, message: null });

    const notes = computed(() => {
      let tempList = Object.values(store.state.notes)
      console.log(tempList)
      return tempList
      
    });

    //**filtering */
    const query = ref("");

    // const reset = (evt) => {
    //   query.value = ""; // clears the query
    // };

    const filteredNotes = computed(() => {
      // const unwrapped = JSON.parse(JSON.stringify(notes.value));
      let tempNotes = notes.value;
      if (query.value != "" && query.value) {
        tempNotes = tempNotes.filter(
          (note) =>
            note.content.toLowerCase().includes(query.value.toLowerCase())
        );
      }
      return tempNotes;
    });
    /***************************************** */

    /****************sorting**************** */
    const sortOptions = [
      { value: "id", viewValue: "None" },
      { value: "content", viewValue: "Content" },
      { value: "priority", viewValue: "Priority" },
      { value: "categoryId", viewValue: "Category" },
      { value: "createdOn", viewValue: "Created on" },
    ];
    const sortByProperty = ref(sortOptions[0].value);

    const sortFunction = () => {
      const compareFn = (a, b) => {
        let property = sortByProperty.value;

        var v1 =
          typeof a[property] == "string"
            ? a[property].toLowerCase()
            : a[property];
        var v2 =
          typeof b[property] == "string"
            ? b[property].toLowerCase()
            : b[property];
        if (!v2 || v1 < v2) {
          // !v2 condition will sort the list in such way where null values are at the back
          return -1;
        }
        if (v1 > v2) {
          return 1;
        }
        return 0;
      };
      notes.value.sort(compareFn);
    };

    /***************************************** */

    return {
      store,

      // filtering task:
      filteredNotes,
      query,
      // reset,

      // sorting task:
      sortOptions,
      sortByProperty,
      sortFunction,

      formattedError,
    };
  },

  async created() {
    try {
      await this.store.dispatch(GET_ALL_NOTES_ACT);
      this.formattedError = { title: null, message: null };
    } catch (err) {
      this.formattedError = errHandler(err);
    } finally {
    }
  },
};
</script>

<style>
.info {
  text-align: right;
  font-size: 0.7em;
  margin: 0;
}
</style>

