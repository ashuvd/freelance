import {ref, reactive, watch} from "vue";

export function useField(field) {
  const valid = ref(true);
  const value = ref(field.value);
  const touched = ref(false);
  const errors = reactive({});

  const reassign = val => {
    valid.value = true;
    Object.keys(field.validators ?? {}).map(name => {
      const isValid = field.validators[name](val);
      valid.value = isValid;
      errors[name] = !isValid;
    })
  }

  watch(value, reassign);
  reassign(value.value);

  return {
    value,
    valid,
    errors,
    touched,
    blur: () => touched.value = true
  }
}