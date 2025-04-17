import { ref, onMounted, onUnmounted } from "vue";

export function useInfiniteScrollTrigger(callback, options = {}) {
  console.log("🚀 ~ useInfiniteScrollTrigger ~ callback:", callback)
  const observer = ref(null);
  const loadMoreTriggerRef = ref(null);

  onMounted(() => {
    if (!loadMoreTriggerRef.value) return;

    observer.value = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          callback();
        }
      },
      {
        root: null,
        rootMargin: options.rootMargin || "0px",
        threshold: options.threshold || 0.1,
      }
    );

    observer.value.observe(loadMoreTriggerRef.value);
  });

  onUnmounted(() => {
    if (observer.value) {
      observer.value.disconnect();
    }
  });

  return { observer, loadMoreTriggerRef };
}
