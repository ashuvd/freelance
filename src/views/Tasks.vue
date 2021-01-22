<template>
  <h1 v-if="!tasks.length" class="text-white center">Задач пока нет</h1>

  <template v-else>
    <h3 class="text-white">Всего активных задач: {{tasksCount}}</h3>
    <div class="card" :key="task.id" v-for="task in tasks">
      <h2 class="card-title">
        {{task.name.value}}
        <AppStatus :type="task.status" />
      </h2>
      <p>
        <strong>
          <small>
            {{task.date.value}}
          </small>
        </strong>
      </p>
      <button class="btn primary" @click="toTask(task.id)">Посмотреть</button>
    </div>
  </template>
</template>

<script>
import AppStatus from '../components/AppStatus';
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {onMounted, computed} from "vue";

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    function toTask(id) {
      router.push(`/tasks/${id}`);
    }
    onMounted(() => {
      store.dispatch('getTasks'); // обновляем store.state.tasks из localStorage
    })
    const tasks = computed(() => {
      return store.state.tasks // Создал computed, потому что не реактивен массив tasks в store.state при его обновлении, вопрос почему???
    })
    const tasksCount = computed(() => {
      return store.getters.tasksCount; // Создал computed, потому что не реактивен tasksCount в store.getters, вопрос почему???
    })
    return {
      tasks,
      tasksCount,
      //tasks: store.state.tasks, // (не реактивен) почему ???
      //tasksCount: store.getters.tasksCount, // (не реактивен) почему???
      toTask
    }
  },
  components: {AppStatus}
}
</script>
