const cleanupMap = new WeakMap();

const longPressDirective = {
    mounted(el, binding) {
        let pressTimer = null;
        const timeout = binding.value?.timeout ?? 1500;

        const startPress = (event) => {
            if (pressTimer !== null) return;

            pressTimer = setTimeout(() => {
                let parent = event.target.closest(".van-card");
                let cardDataId = parent?.dataset?.id || null;

                if (!cardDataId) return;

                const repo = binding.value?.repositories?.find(el => el.id == cardDataId);

                if (repo && typeof binding.value?.onLongPress === 'function') {
                    binding.value.onLongPress({
                        repo: repo.html_url,
                        owner: repo.owner.html_url,
                    });
                }
            }, timeout);
        };

        const cancelPress = () => {
            if (pressTimer !== null) {
                clearTimeout(pressTimer);
                pressTimer = null;
            }
        };

        el.addEventListener("mousedown", startPress);
        el.addEventListener("mouseup", cancelPress);
        el.addEventListener("mouseleave", cancelPress);
        el.addEventListener("touchstart", startPress);
        el.addEventListener("touchend", cancelPress);
        el.addEventListener("touchcancel", cancelPress);

        cleanupMap.set(el, () => {
            el.removeEventListener("mousedown", startPress);
            el.removeEventListener("mouseup", cancelPress);
            el.removeEventListener("mouseleave", cancelPress);
            el.removeEventListener("touchstart", startPress);
            el.removeEventListener("touchend", cancelPress);
            el.removeEventListener("touchcancel", cancelPress);
        });
    },

    unmounted(el) {
        const cleanup = cleanupMap.get(el);
        if (cleanup) {
            cleanup();
            cleanupMap.delete(el);
        }
    }
};

export default longPressDirective;
