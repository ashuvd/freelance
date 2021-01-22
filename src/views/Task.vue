<template>
  <div v-if="task" class="card">
    <h2>{{task.name.value}}</h2>
    <p><strong>Статус</strong>: <AppStatus :type="task.status" /></p>
    <p><strong>Дэдлайн</strong>: {{ task.date.value }}</p>
    <p><strong>Описание</strong>: {{ task.desc.value }}</p>
    <div>
      <button class="btn" @click="changeTaskStatus('pending')">Взять в работу</button>
      <button class="btn primary" @click="changeTaskStatus('done')">Завершить</button>
      <button class="btn danger" @click="changeTaskStatus('cancelled')">Отменить</button>
    </div>
  </div>
  <h3 v-else class="text-white center">
    Задачи с id = <strong>{{id}}</strong> нет.
  </h3>
</template>

<script>
import AppStatus from '../components/AppStatus'
import {useStore} from "vuex";
import {useRoute} from "vue-router";
import {computed, onMounted} from "vue";

export default {
  setup() {
    const store = useStore();
    const route = useRoute();
    const task = computed(() => store.state.task);
    // const task = store.state.task; // опять не реактивно
    onMounted(() => {
      store.dispatch('getTask', route.params.id);
    })
    function changeTaskStatus(status) {
      store.dispatch('changeTaskStatus', {id: route.params.id, status});
    }
    return {
      id: route.params.id,
      task,
      changeTaskStatus
    }
  },
  components: {AppStatus}
}
</script>

<style scoped>

</style>