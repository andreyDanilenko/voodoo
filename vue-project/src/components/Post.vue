<template>
  <div class="post">
    <h2 class="post__title">{{ post.title }}</h2>
    <div class="post__body">{{ post.body }}</div>
    <div class="post__author">{{ users[post.userId].name }}</div>
  </div>
</template>
<script>
export default {
  props: {
    post: {
      type: Object,
      required: true,
    },

    users: {
      type: Object,
      required: true,
    },
  },
};
</script>
<style lang="scss">
.post {
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

  &__title {
    margin: 0;
  }

  &__body {
    margin-top: 10px;
  }

  &__author {
    margin-top: 10px;
    font-weight: 600;
  }
}
</style>