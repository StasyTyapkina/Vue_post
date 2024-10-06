import axios from 'axios'

export const postModule = {
  state: () => ({
    posts: [],
    isLoadingPosts: false,
    selectedSort: '',
    search: '',

    page: 1,
    limit: 10,
    totalPages: 0,

    sortOptions: [
      { id: '1', value: 'title', name: 'Name' },
      { id: '2', value: 'body', name: 'Info' }
    ]
  }),
  getters: {
    //sorting posts
    sortedPosts(state) {
      return [...state.posts].sort((a, b) =>
        a[state.selectedSort]?.localeCompare(b[state.selectedSort])
      )
    },
    sortedAndSearchedPosts(state, getters) {
      return getters.sortedPosts.filter((post) =>
        post.title.toLowerCase().includes(state.search.toLowerCase())
      )
    }
  },
  mutations: {
    setPosts(state, posts) {
      state.posts = posts
    },
    setLoading(state, bool) {
      state.isLoadingPosts = bool
    },
    setPage(state, page) {
      state.page = page
    },
    setSelectedSort(state, selectedSort) {
      state.selectedSort = selectedSort
    },
    setTotalPages(state, totalPages) {
      state.totalPages = totalPages
    },
    setSearchQuery(state, search) {
      state.search = search
    }
  },
  actions: {
    async fetchPosts({ state, commit }) {
      try {
        commit('setLoading', true)
        const res = await axios.get(`https://jsonplaceholder.typicode.com/posts`, {
          params: {
            _page: state.page,
            _limit: state.limit
          }
        })
        commit('setTotalPages', Math.ceil(res.headers['x-total-count'] / state.limit))
        commit('setPosts', res.data)
      } catch (e) {
        alert('Error')
      } finally {
        commit('setLoading', false)
      }
    },
    async loadMorePost({ state, commit }) {
      try {
        commit('setPage', state.page + 1)

        const res = await axios.get(`https://jsonplaceholder.typicode.com/posts`, {
          params: {
            _page: state.page,
            _limit: state.limit
          }
        })
        commit('setTotalPages', Math.ceil(res.headers['x-total-count'] / state.limit))
        commit('setPosts', [...state.posts, ...res.data])
      } catch (e) {
        alert('Error')
      }
    }
  }
}
