<template>
  <span
    :class="['badge', statusClass]"
  >
    {{name}}
  </span>
</template>

<script>
import {computed, ref} from "vue";

export default {
  props: ['type'],
  setup(props) {
    const statusClass = ref('');
    const name = computed(() => {
      switch (props.type) {
        case 'active':
          statusClass.value = 'primary';
          return 'Активен';
        case 'done':
          statusClass.value = 'primary';
          return 'Завершен';
        case 'cancelled':
          statusClass.value = 'danger';
          return 'Отменен';
        case 'pending':
          statusClass.value = 'warning';
          return 'Выполняется';
      }
    });
    return {
      name,
      statusClass
    }
  }
}
</script>