<template>
  <h2>{{ title }}</h2>
  <p>{{ message }}</p>
</template>



<script >
import { watch, ref } from "vue";

export default {
  props: {
    title: { type: String, required: true },
    message: { type: String, required: true },
  },
  setup(props) {
    const title = ref(props.title);
    const message = ref(props.message);
    watch(props, (currentValue, oldValue) => {
      title.value = currentValue.title;
      message.value = currentValue.message;
    });

    return {
      title,
      message,
    };
  },
  created() {},
};
</script>

<style scoped>
</style>
