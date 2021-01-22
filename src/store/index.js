import { createStore } from "vuex";
import {v4 as uuid} from 'uuid';

const lessThanCurrentDate = (date) => {
  const currentDate = new Date();
  const [day, month, year] = date.value.split('.');
  const targetDate = new Date(+year, +month - 1, +day + 1);
  return targetDate.getTime() < currentDate.getTime();
}

export default createStore({
  state() {
    return {
      tasks: [],
      task: null
      // task: {
      //   id: '',
      //   name: '',
      //   date: new Date().toLocaleDateString(),
      //   desc: '',
      //   status: 'active'
      // }
    }
  },
  mutations: {
    ADD_TASK(state, task) {
      state.tasks.push(task);
    },
    SET_TASK(state, task) {
      state.task = task;
    },
    SET_TASKS(state, tasks) {
      state.tasks = tasks;
    },
    CHANGE_TASK_STATUS(state, status) {
      state.task.status = status;
    }
  },
  actions: {
    createTask({commit}, task) {
      task.id = uuid();
      task.status = 'active';
      if (lessThanCurrentDate(task.date)) {
        task.status = 'cancelled';
      }
      const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      tasks.push(task);
      localStorage.setItem('tasks', JSON.stringify(tasks));
      commit('ADD_TASK', task);
    },
    getTask({commit}, taskId) {
      const task = JSON.parse(localStorage.getItem('tasks') || '[]').find(t => t.id === taskId);
      if (task) {
        commit('SET_TASK', task);
      }
    },
    getTasks({commit}) {
      const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      commit('SET_TASKS', tasks);
    },
    changeTaskStatus({commit}, {id, status}) {
      const tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
      const taskIndex = tasks.findIndex(t => t.id === id);
      if (taskIndex >= 0) {
        tasks[taskIndex].status = status;
        localStorage.setItem('tasks', JSON.stringify(tasks));
        commit('CHANGE_TASK_STATUS', status);
      }
    },
  },
  getters: {
    tasksCount(state) {
      return state.tasks.filter(t => t.status === 'active').length;
    }
  }
});
