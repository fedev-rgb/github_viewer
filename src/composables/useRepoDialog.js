import { showConfirmDialog, closeDialog } from "vant";

export function useRepoDialog() {
    const openTheUrl = (url) => {
        if (!url) {
            throw new Error("Invalid URL provided.");
        }
        window.open(url, "_blank");
    };

    const handleEventToShowDialog = (urls) => {
        showConfirmDialog({
            title: "Navigate to Repository or Owner?",
            message:
                "Would you like to go to the repository page or the owner's page?",
            confirmButtonText: "Visit Repository",
            cancelButtonText: "Visit Owner",
            closeOnClickOverlay: true,
            onConfirm: () => {
                openTheUrl(urls.repo);
                closeDialog();
            },
            onCancel: () => {
                openTheUrl(urls.owner);
                closeDialog();
            },
        });
    };

    return {
        handleEventToShowDialog
    }
}