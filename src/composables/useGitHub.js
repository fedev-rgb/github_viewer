import { storeToRefs } from "pinia";
import { useGitHubStore } from "@/store/github";

export function useGitHub() {
    const gitHubStoreInstance = useGitHubStore();

    const { fetchRepositories } = gitHubStoreInstance;
    const { repositories } = storeToRefs(gitHubStoreInstance);

    return {
        repositories,
        fetchRepositories
    };
}