<template>
  <div class="flex h-screen bg-gray-100 dark:bg-gray-900">
    <!-- Sidebar -->
    <div
      class="bg-gray-800 dark:bg-gray-900 text-gray-200 w-64 space-y-6 py-7 px-2 absolute inset-y-0 left-0 transform transition duration-200 ease-in-out"
      :class="{
        'translate-x-0': sidebarOpen,
        '-translate-x-full': !sidebarOpen,
      }"
    >
      <div class="flex items-center space-x-2 px-4">
        <span class="text-xl font-bold">Тикет-система</span>
      </div>

      <nav>
        <router-link
          to="/tickets"
          class="block py-2.5 px-4 rounded transition duration-200 hover:bg-gray-700 hover:text-white"
          active-class="bg-gray-700 text-white"
        >
          <div class="flex items-center space-x-2">
            <svg
              class="h-5 w-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
              />
            </svg>
            <span>Тикеты</span>
          </div>
        </router-link>
      </nav>

      <div
        class="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700"
      >
        <div class="flex items-center space-x-3">
          <div
            class="h-10 w-10 rounded-full bg-gray-600 flex items-center justify-center"
          >
            <span class="text-sm font-medium">AD</span>
          </div>
          <div>
            <p class="text-sm font-medium">
              {{ user?.name || "Имя не указано" }}
            </p>
            <p class="text-xs text-gray-400">
              {{ user?.email || "Почта не указана" }}
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="flex-1 overflow-auto" :class="{ 'ml-64': sidebarOpen }">
      <div class="p-6">
        <button
          @click="sidebarOpen = !sidebarOpen"
          class="mb-4 p-2 rounded-md bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600 transition duration-200"
        >
          <svg
            class="h-5 w-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        <!-- Основное содержимое страницы тикета -->
        <div class="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <div class="flex justify-between items-start mb-6">
            <h1 class="text-2xl font-bold text-gray-800 dark:text-gray-200">
              Тикет #{{ ticket.id }}
            </h1>
            <span
              class="px-3 py-1 rounded-full text-sm font-medium"
              :class="{
                'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200':
                  ticket.status === 'OPEN',
                'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200':
                  ticket.status === 'IN_PROGRESS',
                'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200':
                  ticket.status === 'CLOSED',
              }"
            >
              {{ ticket.status }}
            </span>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h2
                class="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200"
              >
                Информация о тикете
              </h2>
              <div class="space-y-2">
                <p class="text-gray-700 dark:text-gray-300">
                  <span class="font-medium">Абонент:</span>
                  {{ ticket.subscriber }}
                </p>
                <p class="text-gray-700 dark:text-gray-300">
                  <span class="font-medium">Дата создания:</span>
                  {{ formatDate(ticket.createdAt) }}
                </p>
                <p class="text-gray-700 dark:text-gray-300">
                  <span class="font-medium">Приоритет:</span>
                  {{ ticket.priority || "Не указан" }}
                </p>
              </div>
            </div>

            <div class="bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
              <h2
                class="text-lg font-semibold mb-3 text-gray-800 dark:text-gray-200"
              >
                Описание проблемы
              </h2>
              <p class="text-gray-700 dark:text-gray-300 whitespace-pre-line">
                {{ ticket.description }}
              </p>
            </div>
          </div>

          <div class="mb-8">
            <h2
              class="text-xl font-semibold mb-4 text-gray-800 dark:text-gray-200"
            >
              Комментарии
            </h2>
            <CommentList :comments="comments" />
            <CommentForm
              :ticketId="ticket.id"
              @comment-added="fetchComments"
              class="mt-4"
            />
          </div>

          <div class="flex flex-wrap gap-4">
            <button
              @click="updateStatus('CLOSED')"
              class="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md transition duration-200"
              :disabled="ticket.status === 'CLOSED'"
              :class="{
                'opacity-50 cursor-not-allowed': ticket.status === 'CLOSED',
                'hover:bg-red-700': ticket.status !== 'CLOSED',
              }"
            >
              Закрыть тикет
            </button>

            <button
              @click="showOperatorModal = true"
              class="px-4 py-2 bg-yellow-600 hover:bg-yellow-700 text-white rounded-md transition duration-200"
            >
              Передать оператору
            </button>

            <div
              v-if="showOperatorModal"
              class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
            >
              <div
                class="bg-white dark:bg-gray-800 rounded-lg p-6 max-w-md w-full"
              >
                <h2
                  class="text-xl font-bold mb-4 text-gray-800 dark:text-gray-200"
                >
                  Выберите оператора
                </h2>

                <div class="mb-4">
                  <label class="block text-gray-700 dark:text-gray-300 mb-2"
                    >Оператор:</label
                  >
                  <select
                    v-model="selectedOperatorId"
                    class="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white"
                  >
                    <option value="" disabled>Выберите оператора</option>
                    <option
                      v-for="operator in operators"
                      :key="operator.userId"
                      :value="operator.userId"
                    >
                      {{ operator.username }} ({{ operator.role }})
                    </option>
                  </select>
                </div>

                <div class="flex justify-end space-x-3">
                  <button
                    @click="showOperatorModal = false"
                    class="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-md transition duration-200"
                  >
                    Отмена
                  </button>
                  <button
                    @click="reassignToOperator"
                    class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition duration-200"
                    :disabled="!selectedOperatorId"
                  >
                    Подтвердить
                  </button>
                </div>
              </div>
            </div>

            <router-link
              to="/tickets"
              class="px-4 py-2 bg-gray-600 hover:bg-gray-700 text-white rounded-md transition duration-200"
            >
              Вернуться к списку
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import axios from "axios";
import CommentList from "../components/CommentList.vue";
import CommentForm from "../components/CommentForm.vue";
import { useRoute } from "vue-router";

const route = useRoute();
const ticketId = Number(route.params.id);

const ticket = ref({});
const comments = ref([]);
const sidebarOpen = ref(true);
const user = ref(null);
const operators = ref([]);
const showOperatorModal = ref(false);
const selectedOperatorId = ref(null);

async function fetchOperators() {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.get("/api/users/operators", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    operators.value = data;
  } catch (error) {
    console.error("Ошибка загрузки операторов:", error);
  }
}
async function reassignToOperator() {
  if (!selectedOperatorId.value) return;

  try {
    const token = localStorage.getItem("token");

    await axios.patch(
      `/api/tickets/${ticketId}/reassign`,
      {
        newUserId: selectedOperatorId.value,
        currentUserRole: user.value?.role || "SUPERVISOR",
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    showOperatorModal.value = false;
    selectedOperatorId.value = null;
    await fetchTicket(); // обновим инфу о тикете
  } catch (error) {
    console.error("Ошибка при переназначении тикета:", error);
  }
}

const formatDate = (dateString) => {
  if (!dateString) return "Не указана";
  const options = {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  };
  return new Date(dateString).toLocaleDateString("ru-RU", options);
};

async function fetchCurrentUser() {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get("/api/auth-v2/me", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    user.value = res.data;
  } catch (err) {
    console.error("Ошибка при получении данных пользователя", err);
  }
}

async function fetchTicket() {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.get(`/api/tickets/${ticketId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    ticket.value = data;
  } catch (error) {
    console.error("Ошибка загрузки тикета:", error);
  }
}

async function fetchComments() {
  try {
    const token = localStorage.getItem("token");
    const { data } = await axios.get(`/api/comments/ticket/${ticketId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    comments.value = data;
  } catch (error) {
    console.error("Ошибка загрузки комментариев:", error);
  }
}

async function updateStatus(newStatus) {
  if (ticket.value.status === newStatus) return; // чтобы не отправлять повторно

  try {
    const token = localStorage.getItem("token");
    await axios.patch(
      `/api/tickets/${ticketId}/status`,
      { status: newStatus },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    await fetchTicket();
  } catch (error) {
    console.error("Ошибка обновления статуса:", error);
  }
}

onMounted(() => {
  fetchTicket();
  fetchComments();
  fetchCurrentUser();
  fetchOperators();
});
</script>

<style scoped>
ul {
  color: #fff;
}
</style>
