<template>
  <select :value="modelValue" @change="changeOption">
    <option value="" disabled>Please choose an option</option>
    <option v-for="option in options" :key="option.id" :value="option.value">
      {{ option.name }}
    </option>
  </select>
</template>

<script>
export default {
  name: 's-select',
  props: {
    modelValue: {
      type: String,
      required: true
    },
    options: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    changeOption(event) {
      this.$emit('update:modelValue', event.target.value)
    }
  }
}
</script>
