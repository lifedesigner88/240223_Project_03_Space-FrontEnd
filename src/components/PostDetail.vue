<script>
export default {
  name: "PostDetail",
  props: {
    post: Object,
    like: Number,
    dislike: Number,
  }

}
</script>

<template>
  <div class="post-detail-box__bg">
    <div class="post-detail-box__form">
      <h1>{{ post.title }}</h1>
      <img :src="post.image" :alt="post.title">
      <p>{{ post.content }}</p>
      <form class="post-detail-box__inputs" action="">
        <input type="text" placeholder="댓글입력">
        <input @click.prevent="$emit('LogineSucceed')" type="submit" value="댓글"><br>
        <div class="btn-box">
          <button class="btn-like"
                  @click.prevent="$emit('like')">
            좋아요 {{ post.like + like }}
          </button>
          <button class="btn-dislike"
                  @click.prevent="$emit('dislike')">
            싫어요 {{ post.dislike + dislike + post.id }}
          </button>
          <button class="btn-close"
                  @click.prevent="$emit('PostDetailClose')">
            닫기
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<style scoped>
@import "../css/post-list.css";
</style>