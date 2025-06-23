<script setup>
import { ref, computed, onMounted } from "vue";
import { useRouter } from "vue-router";
const router = useRouter();

import axios from "axios";

const tickets = ref([]);
const loading = ref(true);
const error = ref(null);
const sidebarOpen = ref(true);
const user = ref(null);
const searchQuery = ref("");
const selectedStatus = ref("");
const searchId = ref("");
const searchSubscriber = ref("");

function goToTicket(id) {
  router.push({ name: "TicketDetail", params: { id } });
}

const fetchTickets = async () => {
  try {
    const token = localStorage.getItem("token");
    const res = await axios.get("/api/tickets", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    tickets.value = res.data;
  } catch (err) {
    console.error(err);
    error.value = "Ошибка при загрузке тикетов";
  } finally {
    loading.value = false;
  }
};

const fetchCurrentUser = async () => {
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
};

const filteredTickets = computed(() => {
  return tickets.value.filter((ticket) => {
    const matchTitle = ticket.title
      .toLowerCase()
      .includes(searchQuery.value.toLowerCase());

    const matchSubscriber = ticket.subscriber
      ?.toLowerCase()
      .includes(searchSubscriber.value.toLowerCase());

    const matchId =
      !searchId.value || ticket.id.toString().includes(searchId.value);

    const matchStatus =
      !selectedStatus.value || ticket.status === selectedStatus.value;

    return matchTitle && matchSubscriber && matchId && matchStatus;
  });
});

onMounted(() => {
  fetchTickets();
  fetchCurrentUser();
});
</script>

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

        <h1 class="text-2xl font-bold mb-4 text-gray-800 dark:text-gray-200">
          Список тикетов
        </h1>

        <p v-if="loading" class="dark:text-gray-300">Загрузка...</p>
        <p v-if="error" class="text-red-600 dark:text-red-400">{{ error }}</p>

        <div
          class="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4"
        >
          <div
            class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6"
          >
            <input
              v-model="searchId"
              type="text"
              placeholder="Поиск по ID..."
              class="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              v-model="searchQuery"
              type="text"
              placeholder="Поиск по заголовку..."
              class="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <input
              v-model="searchSubscriber"
              type="text"
              placeholder="Поиск по абоненту..."
              class="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div class="w-full sm:w-1/4">
            <select
              v-model="selectedStatus"
              class="w-full px-4 py-2 rounded-md border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-800 text-gray-800 dark:text-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Все статусы</option>
              <option value="OPEN">Открыт</option>
              <option value="IN_PROGRESS">В работе</option>
              <option value="CLOSED">Закрыт</option>
            </select>
          </div>
        </div>

        <div class="overflow-x-auto">
          <table
            v-if="!loading && filteredTickets.length"
            class="w-full border-collapse border border-gray-600 bg-gray-800 rounded-lg shadow-md overflow-hidden"
          >
            <thead>
              <tr class="bg-gray-700 text-gray-100">
                <th class="border border-gray-600 p-3 text-left">ID</th>
                <th class="border border-gray-600 p-3 text-left">Заголовок</th>
                <th class="border border-gray-600 p-3 text-left">
                  Имя абонента
                </th>
                <th class="border border-gray-600 p-3 text-left">Статус</th>
                <th class="border border-gray-600 p-3 text-left">Оператор</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="ticket in filteredTickets"
                :key="ticket.id"
                class="hover:bg-gray-700 cursor-pointer transition-colors"
                @click="goToTicket(ticket.id)"
              >
                <td class="border border-gray-600 p-3 text-gray-100">
                  {{ ticket.id }}
                </td>
                <td class="border border-gray-600 p-3 text-gray-100">
                  {{ ticket.title }}
                </td>
                <td class="border border-gray-600 p-3 text-gray-100">
                  {{ ticket.subscriber }}
                </td>
                <td class="border border-gray-600 p-3 text-gray-100">
                  {{ ticket.status }}
                </td>
                <td class="border border-gray-600 p-3 text-gray-100">
                  {{ ticket.assignedTo?.name || "—" }}
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <p
          v-if="!loading && !filteredTickets.length"
          class="text-gray-600 dark:text-gray-400"
        >
          Тикетов по заданным условиям нет.
        </p>
      </div>
    </div>
  </div>
</template>
