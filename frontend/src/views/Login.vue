<script setup>
import { ref } from "vue";
import axios from "axios";
import { useRouter } from "vue-router";

const router = useRouter();

const login = ref("");
const password = ref("");
const responseMessage = ref("");
const isSubmitting = ref(false);

const handleLogin = async () => {
  responseMessage.value = "";
  isSubmitting.value = true;

  try {
    const { data } = await axios.post("/api/auth-v2/login", {
      login: login.value,
      pass: password.value,
    });

    localStorage.setItem("token", data.accessToken);
    const token = localStorage.getItem("token");
    responseMessage.value = "Успешный вход!";
    router.push("/tickets");
  } catch (error) {
    const message =
      error.response?.data?.message || "Ошибка авторизации. Попробуйте снова.";
    responseMessage.value = message;
    console.error(error);
  } finally {
    isSubmitting.value = false;
  }
};
</script>
<template>
  <div
    class="min-h-screen bg-gray-100 dark:bg-gray-900 flex items-center justify-center p-4"
  >
    <div class="w-full max-w-md">
      <form
        @submit.prevent="handleLogin"
        class="bg-gray-800 dark:bg-gray-800 border border-gray-700 rounded-xl shadow-lg p-8 space-y-6 transition-all"
      >
        <h1 class="text-3xl font-semibold text-center text-white">
          Вход в систему
        </h1>

        <div class="space-y-5">
          <div>
            <label
              for="login"
              class="block text-sm font-medium text-gray-300 mb-1"
              >Логин</label
            >
            <input
              id="login"
              v-model="login"
              type="text"
              autocomplete="username"
              placeholder="Введите логин"
              required
              class="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label
              for="password"
              class="block text-sm font-medium text-gray-300 mb-1"
              >Пароль</label
            >
            <input
              id="password"
              v-model="password"
              type="password"
              autocomplete="current-password"
              placeholder="Введите пароль"
              required
              class="w-full px-4 py-2 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <button
          type="submit"
          :disabled="isSubmitting"
          class="w-full bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-semibold py-2 px-4 rounded-lg transition duration-200"
        >
          {{ isSubmitting ? "Вход..." : "Войти" }}
        </button>

        <p
          v-if="responseMessage"
          class="text-center text-sm font-medium"
          :class="{
            'text-green-400': responseMessage === 'Успешный вход!',
            'text-red-400': responseMessage !== 'Успешный вход!',
          }"
        >
          {{ responseMessage }}
        </p>
      </form>
    </div>
  </div>
</template>
