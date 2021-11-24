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
      <div v-for="post in searchAuthorPosts" :key="post" class="home__post">
        <h2 class="home__post-title">{{ post.title }}</h2>
        <div class="home__post-body">{{ post.body }}</div>
        <div class="home__post-author">{{ users[post.userId].name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapGetters, mapActions, mapMutations } from "vuex";

export default {
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

  &__post {
    box-sizing: border-box;
    margin-top: 15px;
    width: 100%;
    border: 1px solid #4682b4;
    padding: 20px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    @media (min-width: 660px) {
      width: calc((100% / 2) - 30px);
    }

    @media (min-width: 960px) {
      width: calc((100% / 3) - 30px);
    }
  }

  &__post-title {
    margin: 0;
  }

  &__post-body {
    margin-top: 10px;
  }

  &__post-author {
    margin-top: 10px;
    font-weight: 600;
  }
}
</style>
