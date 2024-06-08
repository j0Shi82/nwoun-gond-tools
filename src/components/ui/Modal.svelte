<script>
    import {
        BackgroundOverlay,
        Icon,
        Spinner,
    } from "@/utils/imports/components";
    import { AsyncComponentLoader, localize } from "@/utils/imports/core";
    import { appBackgroundOverlayActive } from "@/utils/imports/store";
    import {
        svelteGetContext,
        svelteLifecycleOnMount,
    } from "@/utils/imports/svelte";

    import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

    export let content;
    export let props = {};
    export let headlineLocaleIdent;

    svelteLifecycleOnMount(() => {
        appBackgroundOverlayActive.set(true);

        return () => {
            appBackgroundOverlayActive.set(false);
        };
    });

    const { modalClose } = svelteGetContext("modal");

    const handleKeydown = (e) => {
        const evt = e || window.event;
        let isEscape = false;
        if ("key" in evt) {
            isEscape = evt.key === "Escape" || evt.key === "Esc";
        } else {
            isEscape = evt.keyCode === 27;
        }
        if (isEscape && $appBackgroundOverlayActive) {
            modalClose();
        }
    };

    const handleBackgroundClick = () => {
        modalClose();
    };
</script>

<svelte:window on:keydown={handleKeydown} />

<BackgroundOverlay on:click={handleBackgroundClick}>
    <span class="hidden sm:inline-block sm:align-middle sm:h-screen"
    ></span>&#8203;
    <div
        class="inline-block align-bottom bg-gray-300 border-nwoun border-2 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
    >
        <div
            class="absolute top-0 right-0 rounded-full cursor-pointer"
            on:click={handleBackgroundClick}
            on:keypress={handleBackgroundClick}
        >
            <Icon scale="3" data={faTimesCircle}></Icon>
        </div>
        <div
            class="h-12 mx-12 font-bold text-2xl flex content-center justify-center"
        >
            <span>{$localize(headlineLocaleIdent)}</span>
        </div>
        <div class="px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <AsyncComponentLoader loader={content} unloader {...props}>
                <div slot="loading"><Spinner /></div>
            </AsyncComponentLoader>
        </div>
    </div>
</BackgroundOverlay>
