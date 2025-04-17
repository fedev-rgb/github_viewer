import { ref } from "vue";

export function useActionState() {
  const isLoading = ref(false);
  const hasError = ref(null);

  const runLoading = (value = true) => {
    isLoading.value = value;
  };

  const setError = (message) => {
    hasError.value = message;
  };

  const stopLoading = () => {
    isLoading.value = false;
  };

  const clearError = () => {
    hasError.value = null;
  };

  return { isLoading, hasError, runLoading, setError, stopLoading, clearError };
}
