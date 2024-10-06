<template>
  <h2 style="margin-top: 15px; margin-bottom: 15px">Posts page</h2>

  <div class="app_btns">
    <s-input v-model="search" type="text" placeholder="Search..." />
    <s-button @click="openModalWindow">Add new post</s-button>
    <s-select v-model="selectedSort" :options="sortOptions"></s-select>
  </div>

  <post-list :posts="sortedAndSearchedPosts" @remove="removePost" v-if="!isLoadingPosts" />
  <h4 v-show="isLoadingPosts" style="margin-top: 15px">Loading posts...</h4>

  <!-- <div class="page_wrapper">
    <div
      v-for="pageNumber in totalPage"
      :key="pageNumber"
      class="page"
      :class="{ 'current-page': page === pageNumber }"
      @click="changePage(pageNumber)"
    >
      {{ pageNumber }}
    </div>
  </div>-->
  <div class="observer" ref="observer"></div>

  <s-modal v-model:show="modalVisible"> <post-form @create="createNewPost" /></s-modal>
</template>

<script>
import axios from 'axios'
import PostForm from '../components/PostForm.vue'
import PostList from '../components/PostList.vue'

export default {
  components: {
    PostForm,
    PostList
  },
  data() {
    return {
      posts: [],
      modalVisible: false,
      isLoadingPosts: false,
      page: 1,
      limit: 10,
      totalPage: 0,
      selectedSort: '',
      search: '',
      sortOptions: [
        { id: '1', value: 'title', name: 'Name' },
        { id: '2', value: 'body', name: 'Info' }
      ]
    }
  },

  mounted() {
    this.fetchPosts()

    const options = {
      rootMargin: '0px',
      threshold: 1.0
    }

    const callback = (entries, observer) => {
      if (entries[0].isIntersecting && this.page < this.totalPage) {
        console.log(entries[0].isIntersecting)
        this.loadMorePost()
      }
    }

    const observer = new IntersectionObserver(callback, options)
    observer.observe(this.$refs.observer)
  },

  computed: {
    //sorting posts
    sortedPosts() {
      return [...this.posts].sort((a, b) =>
        a[this.selectedSort]?.localeCompare(b[this.selectedSort])
      )
    },
    sortedAndSearchedPosts() {
      return this.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(this.search.toLowerCase())
      )
    }
  },

  methods: {
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
    },
    /* changePage(pageNumber) {
      this.page = pageNumber
      this.fetchPosts()
    },*/
    async fetchPosts() {
      try {
        this.isLoadingPosts = true
        const res = await axios.get(`https://jsonplaceholder.typicode.com/posts`, {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        })
        this.totalPage = Math.ceil(res.headers['x-total-count'] / this.limit)
        this.posts = res.data
      } catch (e) {
        alert('Error')
      } finally {
        this.isLoadingPosts = false
      }
    },
    async loadMorePost() {
      try {
        this.page += 1

        const res = await axios.get(`https://jsonplaceholder.typicode.com/posts`, {
          params: {
            _page: this.page,
            _limit: this.limit
          }
        })
        this.totalPage = Math.ceil(res.headers['x-total-count'] / this.limit)
        this.posts = [...this.posts, ...res.data]
      } catch (e) {
        alert('Error')
      }
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
/** .page {
  border: 1px solid black;
  padding: 10px;
  cursor: pointer;
}
.current-page {
  border: 1px solid green;
  background: green;
  color: white;
}*/

.observer {
  height: 30px;
}
</style>
