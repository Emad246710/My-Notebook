<template>
  <form @submit="onSubmit">
    <div class="formContainer">
      <!-- ---------------------------username--------------------------------- -->
      <div class="form-floating">
        <input
          class="form-control"
          id="usernameInput"
          name="username"
          v-model="username"
          :class="{
            'is-invalid': errors.username && errors.username.length > 0,
          }"
        />
        <label for="usernameInput">Username</label>
        <!-- Notice the use of bootstrap class invalid-feedback-->
        <div class="invalid-feedback">{{ errors.username }}</div>
      </div>
      <!-- -------------------------------------------------------------------- -->

      <!-- ---------------------------password--------------------------------- -->
      <div class="form-floating">
        <input
          class="form-control"
          id="passwordInput"
          name="password"
          v-model="password"
          :class="{
            'is-invalid': errors.password && errors.password.length > 0,
          }"
          type="password"
        />
        <label for="passwordInput">Password</label>
        <!-- Notice the use of bootstrap class invalid-feedback-->
        <div class="invalid-feedback">{{ errors.password }}</div>
      </div>
      <!-- -------------------------------------------------------------------- -->

      <!-- ---------------------------password--------------------------------- -->
      <div class="form-floating">
        <input
          class="form-control"
          id="confirmationInput"
          name="confirmation"
          v-model="confirmation"
          :class="{
            'is-invalid': errors.confirmation && errors.confirmation.length > 0,
          }"
          type="password"
        />
        <label for="confirmationInput">Confirmation</label>
        <!-- Notice the use of bootstrap class invalid-feedback-->
        <div class="invalid-feedback">{{ errors.confirmation }}</div>
      </div>
      <!-- -------------------------------------------------------------------- -->

      <div class="d-md-flex flex-md-row justify-content-md-end">
        <button
          class="btn btn-secondary"
          type="submit"
          :disabled="!meta.dirty || isSubmitting"
        >
          {{formMode == 'Edit' ? 'Submit' : 'Signup'}}
        </button>

        <button class="btn btn-secondary" @click="cancel">Cancel</button>
      </div>

      <div v-if="formattedError.title && formattedError.message">
        <err-presenter
          :title="formattedError.title"
          :message="formattedError.message"
        />
      </div>
    </div>
  </form>
</template>

<script>
import { useStore } from "vuex";
import { computed } from "vue";
import { EDIT_USER_ACT, SIGNUP_ACT } from "../storeDef.js";

import { useForm, useField, defineRule } from "vee-validate";
import { errHandler } from "../util.js";
import ErrPresenter from "./ErrPresenter.vue";
import { useRouter } from "vue-router";

import { ref } from "vue";

import { debounce } from "debounce";

defineRule("confirmed", (value, [target], ctx) => {
  if (value === ctx.form[target]) {
    return true;
  }

  return "Passwords must match";
});

const FormMode = {
  EDIT: "Edit",
  CREATE: "Create",
};

export default {
  components: {
    ErrPresenter,
  },

  setup() {
    const store = useStore();
    const router = useRouter();

    let formMode =
      store.state.current_user.id != null ? FormMode.EDIT : FormMode.CREATE;

    // Define a validation schema
    const myValidationSchema = {
      username: (v) => {
        if (!v) {
          // if not valid: return false or null or a costume errMsg
          // return false;
          return "Username is a requied field!";
        }
        return true;
      },
      password(v) {
        // validate ONLY after submittion
        if (!isSubmitting.value) return true;

        if (
          (v == "" || typeof v == "undefined" || v == null) &&
          formMode == FormMode.EDIT
        )
          return true;

        console.log(formMode);

        if (!v) return "Password is a required field!";

        let pattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        let valid = pattern.test(String(v));

        if (valid) {
          return true;
        } else {
          return "Invalid format. (The password must have minimum eight characters, at least one letter and one number)!";
        }
      },
      confirmation: "confirmed:password",
    };

    let myInitialValues = {};

    let submittionAction = "";

    if (formMode == FormMode.EDIT) {
      const unwrapped = JSON.parse(JSON.stringify(store.state.current_user));

      myInitialValues = unwrapped;
      console.log(myInitialValues);
      submittionAction = EDIT_USER_ACT;
    } else {
      submittionAction = SIGNUP_ACT;
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

    const formattedError = ref({ title: null, message: null });

    const onSubmit = handleSubmit(async (values) => {
      try {
        await store.dispatch(submittionAction, values);
        // if (!uniqueEmail)
        //     setFieldError("email", "The email is already registered!");

        formattedError.value = { title: null, message: null };
        router.push({ name: 'notes' });

      } catch (err) {
        formattedError.value = errHandler(err);
      } finally {
      }
    });

    // No need to define rules for fields
    const { value: username } = useField("username");
    const { value: password } = useField("password");
    const { value: confirmation } = useField("confirmation");
    const { value: id } = useField("id");
    const cancel = () => {
      router.push({ name: "login" });
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
      username,
      password,
      confirmation,
      formattedError,
      cancel,
    };
  },
};
</script>

<style>
</style>