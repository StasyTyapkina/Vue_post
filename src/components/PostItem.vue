<template>
  <div class="post">
    <div>
      <div><strong>Title:</strong> {{ post.title }}</div>
      <div><strong>Info:</strong> {{ post.body }}</div>
    </div>
    <s-button style="margin-right: 15px" @click="$emit('remove', post)">Delete</s-button>
    <s-button @click="$router.push(`/posts/${post.id}`)">More</s-button>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  }
}
</script>

<style scoped>
.post {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15px;
  border: 2px solid green;
  margin-top: 15px;
}
</style>
