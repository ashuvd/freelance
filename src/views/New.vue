<template>
  <form class="card" @submit="submit">
    <h1>Создать новую задачу</h1>

    <div class="form-control" :class="{invalid: !form.name.valid && form.name.touched}">
      <label for="title">Название</label>
      <input v-model="form.name.value" type="text" id="title" @blur="form.name.blur">
      <small v-if="form.name.errors.required && form.name.touched">Введите название задачи</small>
    </div>

    <div class="form-control">
      <label for="date">Дата дэдлайна</label>
      <input :value="$filters.date(form.date.value)" @change="changeDate" type="date" id="date">
    </div>

    <div class="form-control" :class="{invalid: !form.desc.valid && form.desc.touched}">
      <label for="description">Описание</label>
      <textarea v-model="form.desc.value" id="description" @blur="form.desc.blur"></textarea>
      <small v-if="form.desc.errors.required && form.desc.touched">Введите описание задачи</small>
    </div>

    <button type="submit" class="btn primary" :disabled="!form.valid">Создать</button>
  </form>
</template>


<script>
import {useStore} from "vuex";
import {useRouter} from "vue-router";
import {useForm} from "@/use/form";

const required = val => !!val;

export default {
  setup() {
    const store = useStore();
    const router = useRouter();
    const form = useForm({
      name: {
        value: '',
        validators: {
          required
        }
      },
      date: {
        value: new Date().toLocaleDateString(),
      },
      desc: {
        value: '',
        validators: {
          required
        }
      }
    });
    // const formData = reactive({
    //   id: '',
    //   name: '',
    //   date: new Date().toLocaleDateString(),
    //   desc: '',
    //   status: 'pending'
    // });
    function submit(e) {
      e.preventDefault();
      store.dispatch('createTask', form);
      router.push('/');
    }
    function changeDate(e) {
      form.date.value = new Date(e.target.value).toLocaleDateString();
    }
    return {
      changeDate,
      form,
      submit
    }
  }
}
</script>