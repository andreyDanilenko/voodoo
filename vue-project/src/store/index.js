import { createStore } from 'vuex'

export default createStore({
  state: {
    posts: [],
    users: null,
    searchQuery: '',
  },

  mutations: {
    setFetchPosts(state, posts) {
      state.posts = posts;
    },

    setFetchUsers(state, users) {
      state.users = users;
    },

    setSearchQuery(state, searchQuery) {
      state.searchQuery = searchQuery
    },
  },

  actions: {
    async fetchPosts() {
      return await fetch('https://jsonplaceholder.typicode.com/posts')
        .then(res => res.json())
    },

    async fetchUsers() {
      return await fetch('https://jsonplaceholder.typicode.com/users')
        .then(res => res.json())
        .then(users => {
          return users.reduce((map, user) => {
            map[user.id] = user;
            return map;
          }, {});
        });
    }
  },

  getters: {
    searchAuthorPosts(state) {
      return [...state.posts]
        .filter(post => state.users[post.userId].name.toLowerCase().includes(state.searchQuery.toLowerCase()))
    }
  }
})
