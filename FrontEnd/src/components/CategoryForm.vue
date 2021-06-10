<template>
  <div v-if="formattedError.title && formattedError.message">
    <err-presenter
      :title="formattedError.title"
      :message="formattedError.message"
    />
  </div>

  <form @submit="onSubmit">
    <div class="formContainer">
      <!-- ---------------------------type--------------------------------- -->
      <div class="form-floating">
        <input
          class="form-control"
          id="typeInput"
          name="type"
          v-model="type"
          :class="{
            'is-invalid': errors.type && errors.type.length > 0,
          }"
        />
        <label for="typeInput">type</label>
        <!-- Notice the use of bootstrap class invalid-feedback-->
        <div class="invalid-feedback">{{ errors.type }}</div>
      </div>
      <!-- -------------------------------------------------------------------- -->

      <div class="d-md-flex flex-md-row justify-content-md-end">
        <button
          class="btn btn-secondary"
          type="submit"
          :disabled="!meta.dirty || isSubmitting"
        >
          Submit
        </button>
        <button class="btn btn-dark" @click="cancel">Cancel</button>
      </div>
    </div>
  </form>
</template>

<script>
import { useForm, useField } from "vee-validate";
import { useStore } from "vuex";
import { computed } from "vue";
import { errHandler } from "../util.js";
import ErrPresenter from "./ErrPresenter.vue";
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import {
  EDIT_CATEGORY_ACT,
  CREATE_CATEGORY_ACT,
  GET_CATEGORY_ACT,
  GET_CATEGORY_GET,
  DELETE_CATEGORY_ACT,
} from "../storeDef.js";

const FormMode = {
  EDIT: "Edit",
  CREATE: "Create",
};

export default {
  components: {
    ErrPresenter,
  },
  props: {
    id: {
      type: Number,
      required: false,
    },
  },

  setup(props) {
    let formMode = props.id ? FormMode.EDIT : FormMode.CREATE;
    const store = useStore();
    const router = useRouter();

    // Define a validation schema
    const myValidationSchema = {
      type(v) {
       
        if (!isSubmitting.value) return true;

        if (!v) {
         
          return "Type is a required field!";
        }
        return true;
      },
    };

    let myInitialValues = {};

    let submittionAction = "";

    if (formMode == FormMode.EDIT) {
      myInitialValues = computed(() => {
        return store.getters[GET_CATEGORY_GET](props.id);
      });
      submittionAction = EDIT_CATEGORY_ACT;
    } else {
      submittionAction = CREATE_CATEGORY_ACT;
    }

    // Create a form context with the validation schema
    const {
      meta, // this will hold the form validity state
      errors, // the errMsgs that are returned from the functions inside "validationSchema"
      handleSubmit,
      isSubmitting, // to be used inside validatingfuncs inside "validationSchema", inorder to validate ONLY after submittion
      setFieldError,
      resetForm,
      setErrors, // can be used to set err manually, for ex. unique email validation inside  "handleSubmit"
    } = useForm({
      validationSchema: myValidationSchema,
      initialValues: myInitialValues,
    });

    const onSubmit = handleSubmit(async (values) => {
      values.userId = store.state.current_user.id;
      if (formMode == FormMode.EDIT) values.id = props.id;

      console.log(values);

      try {
        await store.dispatch(submittionAction, values);
        formattedError.value = { title: null, message: null };
        router.push({ name: "categories" });
      } catch (err) {
        formattedError.value = errHandler(err);
        console.log(formattedError);
      } finally {
      }
    });
    const formattedError = ref({ title: null, message: null });

    // No need to define rules for fields
    const { value: type } = useField("type");
    const cancel = () => {
      router.push({ name: "categories" });
      resetForm();
    };

    return {
      store,
      formMode,
      meta,
      errors,
      handleSubmit,
      isSubmitting,
      setFieldError,
      setErrors,
      onSubmit,
      type,
      formattedError,
      cancel,
    };
  },
  async created() {
    if (this.formMode == FormMode.EDIT)
      try {
        await this.store.dispatch(GET_CATEGORY_ACT, this.id);
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

  