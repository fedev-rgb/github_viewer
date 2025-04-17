import { ref } from 'vue';
import { defineStore } from 'pinia';
import { sentRequestToObtainRepos } from '../services/api/GitHubService';
import { useActionState } from '../composables/useActionState';
import { showLoadingToast, closeToast, showFailToast } from 'vant';

export const useGitHubStore = defineStore('gitHubStore', () => {
  const repositories = ref([])
  const { isLoading, runLoading, stopLoading, clearError } = useActionState();
  const page = ref(0);
  const perPage = ref(10);


  const fetchRepositories = async (org) => {
    runLoading();
    showLoadingToast();

    try {
      page.value = (page.value += 1);

      sentRequestToObtainRepos({ org, page: page.value, perPage: perPage.value })
        .then((response) => {
          if (![200, 201].includes(response.status)) {
            showFailToast(`Failed: ${response.status}`);
            throw new Error(`Failed to fetch repositiories: ${response.status}`)
          }

          return response.data
        })
        .then((data) => {
          repositories.value = repositories.value.concat(data);
        })
        .catch((error) => {
          showFailToast(`Failed to fetch repositiories: ${error?.response?.message || error}`);
          throw new Error(`Failed to fetch repositiories: ${error?.response?.message || error}`)
        })
    } catch (error) {
      showFailToast(`Failed to send a fetch to obtain repositiories: ${error?.response?.message || error}`);
      throw new Error(`Failed to send a fetch to obtain repositiories: ${error?.message || error}`)
    } finally {
      stopLoading();
      clearError();
      closeToast();
    }
  }

  return {
    page,
    perPage,
    repositories,
    isLoading,
    fetchRepositories,
  }
},
  {
    persist: { 
      paths: ['page', 'perPage', 'repositories'] 
    }
  }
)
