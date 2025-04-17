<script>
import { defineComponent, onMounted } from "vue";
import { useGitHub } from "@/composables/useGitHub";
import { useInfiniteScrollTrigger } from "@/composables/useInfiniteScrollTrigger";
import { useRepoDialog } from "@/composables/useRepoDialog";
import longPressDirective from "@/directives/longPress";
import Card from "@/components/Card.vue";

export default defineComponent({
  name: "App",
  directives: {
    longPress: longPressDirective,
  },
  components: {
    Card,
  },
  setup() {
    const { loadMoreTriggerRef } = useInfiniteScrollTrigger();
    const { handleEventToShowDialog } = useRepoDialog();
    const { repositories, fetchRepositories } = useGitHub();

    const handleTriggerToFetchRepos = () => {
      fetchRepositories("nodejs");
    };

    useInfiniteScrollTrigger(handleTriggerToFetchRepos, {
      rootMargin: "80px",
    });

    onMounted(async () => {
      const persistedRepos = localStorage.getItem("gitHubStore");
      if (!persistedRepos?.length) {
        fetchRepositories("nodejs");
      }
    });

    return {
      loadMoreTriggerRef,
      repositories,
      handleEventToShowDialog,
    };
  },
});
</script>

<template>
  <div
    v-long-press="{
      repositories,
      onLongPress: handleEventToShowDialog,
      timeout: 300,
    }"
  >
    <Card
      v-for="repo in repositories"
      :data-id="repo.id"
      :key="repo.id"
      :repo="repo"
      :name="repo.name"
      :description="repo.description"
      :owner="repo.owner"
      :hasWiki="repo.has_wiki"
    />
    <div ref="loadMoreTriggerRef" class="h-10px"></div>
  </div>
</template>

<style>
.h-10px {
  height: 10px !important;
}
</style>
