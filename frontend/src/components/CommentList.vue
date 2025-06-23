<template>
  <ul>
    <li
      v-for="comment in comments"
      :key="comment.id"
      class="mb-3 border-b pb-2"
    >
      <strong>{{ comment.author.name }}</strong
      >:
      <p>{{ comment.content }}</p>
      <small class="text-gray-500">{{
        new Date(comment.createdAt).toLocaleString()
      }}</small>
    </li>
  </ul>
</template>

<script setup>
defineProps({
  comments: Array,
});
</script>
