<template>
  <div class="relative">
    <input
      :type="showPassword ? 'text' : 'password'"
      placeholder="••••••••"
      v-model="password"
      class="w-full p-2 mb-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
    />
    <button type="button" @click="toggleShowPassword" class="absolute right-2 top-2 text-zinc-500">
      <img :src="showPassword ? hideIcon : showIcon" alt="Show/Hide Password" class="w-6 h-6">
    </button>
  </div>
</template>

<script>
export default {
  props: {
    modelValue: String,
  },
  data() {
    return {
      showPassword: false,
      hideIcon: "https://placehold.co/20x20", // replace with the hide icon
      showIcon: "https://placehold.co/20x20", // replace with the show icon
    };
  },
  computed: {
    password: {
      get() {
        return this.modelValue;
      },
      set(value) {
        this.$emit('update:modelValue', value);
      }
    }
  },
  methods: {
    toggleShowPassword() {
      this.showPassword = !this.showPassword;
    }
  }
};
</script>
