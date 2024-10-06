<template>
  <button class="btn"><slot></slot></button>
</template>

<script>
export default {
  name: 's-button'
}
</script>

<style scoped>
.btn {
  padding: 10px 15px;
  background: none;
  color: green;
  border: 1px solid green;
  &:hover {
    background-color: #04aa6d;
    color: white;
  }
}
</style>
