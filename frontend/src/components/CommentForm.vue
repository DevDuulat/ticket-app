<template>
  <form @submit.prevent="submitComment" class="mt-4 flex flex-col gap-2">
    <textarea
      v-model="content"
      placeholder="Добавить комментарий..."
      rows="3"
      class="border rounded p-2"
      required
    ></textarea>
    <button type="submit" class="btn btn-primary self-start">Отправить</button>
  </form>
</template>
<script setup>
import { ref, defineEmits } from "vue";
import axios from "axios";

const props = defineProps({
  ticketId: Number,
});
const emits = defineEmits(["comment-added"]);

const content = ref("");

async function submitComment() {
  if (!content.value.trim()) return;

  try {
    const token = localStorage.getItem("token"); // Получаем токен из localStorage

    await axios.post(
      "/api/comments",
      {
        content: content.value,
        ticketId: props.ticketId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    content.value = "";
    emits("comment-added");
  } catch (error) {
    console.error("Ошибка добавления комментария:", error);
  }
}
</script>

<style scoped>
.btn-primary {
  background-color: #3b82f6;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 600;
  cursor: pointer;
}
</style>
