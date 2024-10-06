<template>
  <div class="navbar">
    <h1 @click="$router.push('/')">Vue</h1>
    <div class="navbar_bttns">
      <s-button style="margin-right: 15px" @click="$router.push('/posts')"> Posts </s-button>
      <s-button style="margin-right: 15px" @click="$router.push('/postsV2')">
        PostsV2 (store)
      </s-button>
      <s-button style="margin-right: 15px"> About </s-button>
      <s-button> Profile </s-button>
    </div>
  </div>
</template>

<script>
export default {}
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  height: 50px;
  background-color: rgb(239, 245, 239);
  box-shadow: 2px 2px 4px gray;
  padding: 15px;
}
h1 {
  cursor: pointer;
}
.navbar_bttns {
  margin-left: auto;
}
</style>
