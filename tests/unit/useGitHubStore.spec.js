import { ref } from 'vue';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { createPinia } from 'pinia';
import { useActionState } from '../../src/composables/useActionState';
import { useGitHubStore } from '../../src/store/github';
import { sentRequestToObtainRepos } from '../../src/services/api/GitHubService';

// Mock the fetchRepos API call and useActionState composable
vi.mock('../../src/composables/useActionState');
vi.mock('../../src/services/api/GitHubService');

describe('useGitHubStore', () => {
    let store;
    let isLoading;

    beforeEach(() => {
        // Create a new Pinia instance and useGitHubStore
        const pinia = createPinia();
        store = useGitHubStore(pinia);

        // Initialize isLoading as a ref
        isLoading = ref(false);

        // Mock the return value of useActionState with all necessary properties
        const runLoading = vi.fn();
        const stopLoading = vi.fn();
        const clearError = vi.fn();

        global.localStorage = {
            getItem: vi.fn(() => JSON.stringify({ page: 1, perPage: 10, repositories: [] })),
            setItem: vi.fn(),
            removeItem: vi.fn(),
            clear: vi.fn(),
        };

        // Ensure useActionState is mocked to return the expected values
        vi.mock('../../src/composables/useActionState', () => ({
            useActionState: vi.fn(() => ({
                isLoading: ref(false),
                hasError: ref(false),
                runLoading: vi.fn(),
                stopLoading: vi.fn(),
                clearError: vi.fn(),
            })),
        }));

        vi.clearAllMocks(); // Reset mocks
    });

    it('should initialize with empty repositories, default page, and perPage', () => {
        expect(store.repositories).toEqual([]); // Ensure repositories are empty initially
        expect(store.page).toBe(0); // Default page is 1
        expect(store.perPage).toBe(10); // Default perPage is 10
    });

    it('should handle API errors gracefully', async () => {
        // Mock the actions to simulate loading state
        const runLoading = vi.fn();
        const stopLoading = vi.fn();
        const clearError = vi.fn();

        // Simulate API failure
        sentRequestToObtainRepos.mockRejectedValue(new Error('API Error'));

        try {
            await store.fetchRepositories('nodejs');
        } catch (e) {
            expect(e.message).toBe('Failed to fetch repositiories: API Error');
            expect(stopLoading).toHaveBeenCalled();
            expect(clearError).toHaveBeenCalled();
        }
    });

    it('should paginate the page correctly when fetching repositories', async () => {
        const runLoading = vi.fn();
        const stopLoading = vi.fn();
        const clearError = vi.fn();

        useActionState.mockReturnValue({
            isLoading,
            runLoading,
            stopLoading,
            clearError,
        });

        // Simulate the API response for page 1
        sentRequestToObtainRepos.mockResolvedValueOnce({
            status: 200,
            data: [
                { id: 1, name: 'repo1', description: 'lorem ipsum', owner: { login: 'login' }, hasWiki: false },
                { id: 2, name: 'repo2', description: 'lorem ipsum', owner: { login: 'login' }, hasWiki: false },
                { id: 3, name: 'repo3', description: 'lorem ipsum', owner: { login: 'login' }, hasWiki: false },
                { id: 4, name: 'repo4', description: 'lorem ipsum', owner: { login: 'login' }, hasWiki: false },
            ],
        });

        // Call the fetchRepositories action for page 1
        await store.fetchRepositories('test-org');

        expect(sentRequestToObtainRepos).toHaveBeenCalledWith({
            org: 'test-org',
            page: 1,
            perPage: 10
        });

        sentRequestToObtainRepos.mockResolvedValueOnce({
            status: 200,
            data: [
                { id: 5, name: 'repo5', description: 'lorem ipsum', owner: { login: 'login' }, hasWiki: false },
                { id: 6, name: 'repo6', description: 'lorem ipsum', owner: { login: 'login' }, hasWiki: false },
                { id: 7, name: 'repo7', description: 'lorem ipsum', owner: { login: 'login' }, hasWiki: false },
                { id: 8, name: 'repo8', description: 'lorem ipsum', owner: { login: 'login' }, hasWiki: false },
            ],
        });

        await store.fetchRepositories('test-org');

        expect(sentRequestToObtainRepos).toHaveBeenCalledWith({
            org: 'test-org',
            page: 2,
            perPage: 10
        });
    });


    it('should persist the state in localStorage', () => {
        // Check the persisted state in localStorage
        const persistedState = JSON.parse(localStorage.getItem('pinia__gitHubStore'));

        expect(persistedState).toBeDefined();
        expect(persistedState.page).toBe(1);
        expect(persistedState.perPage).toBe(10);
        expect(persistedState.repositories).toEqual([]);
    });
});
