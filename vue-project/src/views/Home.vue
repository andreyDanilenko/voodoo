<template>
  <div class="home">
    <div class="home__search">
      <input
        class="home__search-input"
        type="text"
        @input="serachAuthorPosts"
      />
    </div>
    <div class="home__posts">
      <post
        v-for="post in searchAuthorPosts"
        :key="post"
        :post="post"
        :users="users"
      />
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";
import Post from "../components/Post.vue";

export default {
  components: { Post },

  computed: {
    ...mapGetters(["searchAuthorPosts"]),
    ...mapState({
      users: (state) => state.users,
    }),
  },

  methods: {
    ...mapActions(["fetchPosts", "fetchUsers"]),
    ...mapMutations(["setFetchPosts", "setFetchUsers", "setSearchQuery"]),

    serachAuthorPosts(evt) {
      this.setSearchQuery(evt.target.value);
    },
  },

  mounted() {
    Promise.all([this.fetchPosts(), this.fetchUsers()]).then(
      ([posts, userMap]) => {
        this.setFetchPosts(posts);
        this.setFetchUsers(userMap);
      }
    );
  },
};
</script>

<style lang="scss">
.home {
  max-width: 1280px;
  padding: 0 20px;
  margin: 0 auto;

  &__search-input {
    box-sizing: border-box;
    width: 100%;
    padding: 10px;
    border: 1px solid #4682b4;
    font-size: 30px;
  }

  &__posts {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
}
</style>
