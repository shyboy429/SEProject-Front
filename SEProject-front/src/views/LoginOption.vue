<template>
  <img :src="src" :alt="alt" class="w-10 h-10">
</template>

<script>
export default {
  props: {
    src: String,
    alt: String,
  },
};
</script>
