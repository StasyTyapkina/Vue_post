<template>
  <h2 style="margin-top: 15px; margin-bottom: 15px">Posts page</h2>

  <div class="app_btns">
    <s-input
      :model-value="search"
      @update:model-value="search"
      type="text"
      placeholder="Search..."
    />
    <s-button @click="openModalWindow">Add new post</s-button>
    <s-select
      :model-value="selectedSort"
      @update:model-value="setSelectedSort"
      :options="sortOptions"
    ></s-select>
  </div>

  <post-list :posts="sortedAndSearchedPosts" @remove="removePost" v-if="!isLoadingPosts" />
  <h4 v-show="isLoadingPosts" style="margin-top: 15px">Loading posts...</h4>

  <div class="observer" ref="observer"></div>

  <s-modal v-model:show="modalVisible"> <post-form @create="createNewPost" /></s-modal>
</template>

<script>
import PostForm from '../components/PostForm.vue'
import PostList from '../components/PostList.vue'
import { mapState, mapGetters, mapActions, mapMutations } from 'vuex'

export default {
  components: {
    PostForm,
    PostList
  },
  data() {
    return {
      modalVisible: false
    }
  },

  mounted() {
    this.fetchPosts()

    const options = {
      rootMargin: '0px',
      threshold: 1.0
    }

    const callback = (entries) => {
      if (entries[0].isIntersecting && this.page < this.totalPages) {
        console.log(entries[0].isIntersecting)
        this.loadMorePost()
      }
    }

    const observer = new IntersectionObserver(callback, options)
    observer.observe(this.$refs.observer)
  },

  computed: {
    ...mapState({
      posts: (state) => state.post.posts,
      isLoadingPosts: (state) => state.post.isLoadingPosts,
      selectedSort: (state) => state.post.selectedSort,
      search: (state) => state.post.search,
      page: (state) => state.post.page,
      limit: (state) => state.post.limit,
      totalPages: (state) => state.post.totalPages,
      sortOptions: (state) => state.post.sortOptions
    }),
    ...mapGetters({
      sortedPosts: 'post/sortedPosts',
      sortedAndSearchedPosts: 'post/sortedAndSearchedPosts'
    })
  },

  methods: {
    ...mapMutations({
      setPage: 'post/setPage',
      setSearchQuery: 'post/setSearchQuery',
      setSelectedSort: 'post/setSelectedSort'
    }),
    ...mapActions({
      loadMorePost: 'post/loadMorePost',
      fetchPosts: 'post/fetchPosts'
    }),
    createNewPost(post) {
      this.posts.push(post)
      this.modalVisible = false
    },
    changeNewPostTitle(e) {
      this.newTitle = e.target.value
    },
    changeNewPostBody(e) {
      this.newBody = e.target.value
    },
    removePost(post) {
      this.posts = this.posts.filter((i) => i.id !== post.id)
    },
    openModalWindow() {
      this.modalVisible = true
    }
  }
}
</script>

<style scoped>
.app_btns {
  display: flex;
  justify-content: space-between;
}
.page_wrapper {
  display: flex;
  margin-top: 15px;
}

.observer {
  height: 30px;
}
</style>
