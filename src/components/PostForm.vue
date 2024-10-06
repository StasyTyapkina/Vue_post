<template>
  <form @submit.prevent>
    <h4>Add Post</h4>
    <s-input v-focus v-model.trim="post.title" type="text" placeholder="Title" />
    <s-input v-model.trim="post.body" type="text" placeholder="Info" />
    <s-button style="align-self: flex-end; margin-top: 15px" @click="createPost"> Add </s-button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      post: {
        title: '',
        body: ''
      }
    }
  },
  methods: {
    createPost() {
      this.post.id = Date.now()
      this.$emit('create', this.post)
      this.post = {
        title: '',
        body: ''
      }
    }
  }
}
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}
</style>
