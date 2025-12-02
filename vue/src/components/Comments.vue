<template>
  <section class="comments">
    <button class="show-hide" @click="toggleComments">{{ isVisible ? 'Hide comments' : 'Show comments' }}</button>

    <div class="comment-wrapper" v-show="isVisible">
      <form class="comment-form" @submit.prevent="submitComment">
        <h3>Add comment</h3>
        <div class="flex-pair">
          <label for="name">Your name:</label>
          <input type="text" id="name" v-model="name" placeholder="Enter your name">
        </div>
        <div class="flex-pair">
          <label for="comment">Your comment:</label>
          <input type="text" id="comment" v-model="comment" placeholder="Enter your comment">
        </div>
        <input type="submit" value="Submit comment">
      </form>

      <h3>Comments</h3>
      <ul class="comment-container">
        <li v-for="(c, index) in comments" :key="index">
          <p><strong>{{ c.name }}</strong></p>
          <p>{{ c.comment }}</p>
        </li>
      </ul>
    </div>
  </section>
</template>

<script lang="ts">
import { ref } from 'vue';

export default {
  setup() {
    const isVisible = ref(false);
    const name = ref('');
    const comment = ref('');
    const comments = ref([{ name: 'Bob Fossil', comment: 'Oh I am so glad you taught me all about the big brown angry guys...' }]);

    const toggleComments = () => {
      isVisible.value = !isVisible.value;
    };

    const submitComment = () => {
      if (!name.value.trim() || !comment.value.trim()) {
        alert('Bitte fülle beide Felder aus.');
        return;
      }
      comments.value.push({ name: name.value, comment: comment.value });
      name.value = '';
      comment.value = '';
    };

    return { isVisible, name, comment, comments, toggleComments, submitComment };
  }
};
</script>
