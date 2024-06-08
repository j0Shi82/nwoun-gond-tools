<script>
    import { Modal } from "@/utils/imports/components";
    import {
        AsyncComponentLoader,
        RouterComponent,
        isLocalizationLoading,
        localize,
        routerOnRouteLoaded,
        routes,
        setupLocalization,
    } from "@/utils/imports/core";
    import { images, menuItems } from "@/utils/imports/data";
    import {
        currentRouteLocation,
        currentRouteName,
        currentRouteQuerystring,
        currentRouteTitleKey,
        infohubWhoamiTagTitle,
    } from "@/utils/imports/store";
    import {
        svelteLifecycleOnMount,
        svelteSetContext,
        svelteTick,
    } from "@/utils/imports/svelte";

    import { faBars } from "@fortawesome/free-solid-svg-icons";

    import { Icon, MenuItem } from "@/utils/imports/components";

    import "@/assets/style/global.scss";
    import "@/assets/style/tailwind.scss";

    let menuOpen = false;

    // modal logic
    let modalComponent = null;
    let modalProps = null;
    let modalHeadlineLocaleIdent = "modal.defaultHeadline";
    $: titleAppendix =
        $currentRouteName === "infohub" && $infohubWhoamiTagTitle !== null
            ? ` about ${$infohubWhoamiTagTitle}`
            : "";

    const modalOpen = (
        component,
        props = {},
        headlineLocaleIdent = "modal.defaultHeadline",
    ) => {
        modalComponent = component;
        modalProps = props;
        modalHeadlineLocaleIdent = headlineLocaleIdent;
    };

    const modalClose = () => {
        modalComponent = null;
        modalProps = null;
    };

    svelteSetContext("modal", { modalOpen, modalClose });
    // modal logic

    setupLocalization();

    // const observer = new IntersectionObserver(((entries) => {
    //   entries.forEach((entry) => {
    //     if (entry.isIntersecting) {
    //       showSmallLogo = false;
    //     } else {
    //       showSmallLogo = true;
    //     }
    //   });
    // }));

    svelteLifecycleOnMount(() => () => {
        // observer.unobserve(document.querySelector('#header'));
    });

    isLocalizationLoading.subscribe(async (value) => {
        if (!value) {
            await svelteTick();
            // observer.observe(document.querySelector('#header'));
        }
    });

    function scrollToTop() {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth",
        });
    }
</script>

<svelte:head>
    <meta
        property="og:url"
        content="{import.meta.env
            .SITE_URL}/#{$currentRouteLocation}{$currentRouteQuerystring
            ? `?${$currentRouteQuerystring}`
            : ''}"
    />
    <link
        rel="canonical"
        href="{import.meta.env
            .SITE_URL}/#{$currentRouteLocation}{$currentRouteQuerystring
            ? `?${$currentRouteQuerystring}`
            : ''}"
    />
    <title
        >Neverwinter Gond Tools{$currentRouteTitleKey !== ""
            ? ` - ${$localize($currentRouteTitleKey)}`
            : ""}{titleAppendix}</title
    >
</svelte:head>

{#if modalComponent !== null}
    <AsyncComponentLoader
        loader={Modal}
        content={modalComponent}
        props={modalProps}
        headlineLocaleIdent={modalHeadlineLocaleIdent}
        unloader
    />
{/if}
{#if !$isLocalizationLoading}
    <img src={images.backgroundImage} id="background" alt="Showing a vampire" />
    <div id="page-wrapper">
        <!-- <div id="header" class="flex flex-col lg:flex-row justify-center items-center lg:justify-start p-2">
    <img src="{images.headerBanner}" id="headerBanner" class="h-16 md:h-32" alt="logo of Neverwinter Uncensored" />
    <div id="subtitle" class="text-center w-full text-sm md:text-lg lg:text-2xl">{$localize('header.subtitle')}</div>
  </div> -->
        <div id="sticky" class="sticky px-2 py-2 z-20 top-0 bg-nwoun min-h-16">
            <div id="mainMenu" class="flex justify-start w-full h-12">
                <div
                    class="py-1 mr-2"
                    on:keypress={scrollToTop}
                    on:click={scrollToTop}
                >
                    <img
                        src={images.headerBannerSmall}
                        class="h-full w-auto cursor-pointer"
                        on:keypress={scrollToTop}
                        on:click={scrollToTop}
                        alt="Small logo of Neverwinter Gond Tools"
                    />
                </div>
                <div id="menu-links" class="flex-1 flex">
                    {#each menuItems.filter((i) => i.type !== "talk") as item}
                        <MenuItem
                            id={item.id}
                            mobile={false}
                            flexAuto={false}
                            icon={item.icon}
                            textLocaleKey={item.textLocaleKey}
                            linkType={item.external ? "external" : "internal"}
                            link={item.link}
                        />
                    {/each}
                </div>
                <div id="menu-talk" class="flex-none flex">
                    {#each menuItems.filter((i) => i.type === "talk") as item}
                        <MenuItem
                            id={item.id}
                            condensed
                            mobile={false}
                            flexAuto={false}
                            icon={item.icon}
                            textLocaleKey={item.textLocaleKey}
                            linkType={item.external ? "external" : "internal"}
                            link={item.link}
                        />
                        <MenuItem
                            id={`${item.id}Mobile`}
                            condensed
                            mobile={true}
                            flexAuto={false}
                            icon={item.icon}
                            textLocaleKey={item.textLocaleKey}
                            linkType={item.external ? "external" : "internal"}
                            link={item.link}
                        />
                    {/each}
                    <div
                        class="flex lg:hidden justify-end h-full items-center cursor-pointer pl-2 pr-2 flex-0"
                        on:keypress={() => {
                            menuOpen = !menuOpen;
                        }}
                        on:click={() => {
                            menuOpen = !menuOpen;
                        }}
                    >
                        <Icon data={faBars} scale={2} class="w-8" />
                    </div>
                </div>
            </div>
            <div
                id="mobileMenu"
                class="px-2 flex-col"
                class:hidden={!menuOpen}
                class:flex={menuOpen}
                on:keypress={() => {
                    menuOpen = false;
                }}
                on:click={() => {
                    menuOpen = false;
                }}
            >
                {#each menuItems.filter((i) => i.type !== "talk") as item}
                    <MenuItem
                        id={`${item.id}Mobile`}
                        mobile={true}
                        icon={item.icon}
                        textLocaleKey={item.textLocaleKey}
                        linkType={item.external ? "external" : "internal"}
                        link={item.link}
                    />
                {/each}
            </div>
        </div>
        <main class="main-content" id="main-content">
            <RouterComponent {routes} on:routeLoaded={routerOnRouteLoaded} />
        </main>
    </div>
{/if}

<style lang="scss">
    #background {
        @apply w-full h-auto min-h-full fixed top-0 left-0 z-0 opacity-25 object-left object-cover;
    }

    #page-wrapper {
        @apply relative z-10 mt-0 mr-auto mb-0 ml-auto;
    }

    #main-content {
        @apply p-2 max-w-screen-xl mx-auto;
    }

    #sticky {
        box-shadow: 0 5px 20px 0 rgba(0, 0, 0, 0.75);
    }
</style>
