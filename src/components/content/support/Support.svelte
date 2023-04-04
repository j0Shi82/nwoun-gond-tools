<script>
    import { faHeartCirclePlus } from "@fortawesome/free-solid-svg-icons";
    import { Icon } from "utils/imports/components";
    import { getLocalizedRouteMatcher } from "utils/imports/core";
    import { images } from "utils/imports/data";
</script>

<div class="min-w-screen flex items-center justify-center px-5 mt-5 pt-16">
    <div
        class="w-full mx-auto rounded-lg bg-gray-300 bg-opacity-70 shadow-lg p-5 text-black border-nwoun border"
        style="max-width: 600px"
    >
        <div class="w-full pt-1 pb-5">
            <div
                class="bg-nwoun overflow-hidden rounded-full w-20 h-20 -mt-16 mx-auto shadow-lg flex justify-center items-center"
            >
                <Icon data={faHeartCirclePlus} scale="3" class="text-black" />
            </div>
        </div>
        <div class="mb-10">
            <h1 class="text-center font-bold text-xl uppercase">
                Support Neverwinter Gond Tools
            </h1>
        </div>
        <div class="">
            <p class="mb-2">
                Neverwinter Gond Tools is an open source project available on <a
                    class="underline font-medium"
                    href="https://github.com/j0Shi82/nwoun-gond-tools"
                    target="_blank"
                    rel="noreferrer">Github</a
                > and the website itself will never need funding. The server costs
                are marginal and the fun creating the tools enough incentive. The
                source is completely free to use and develop. You can even copy the
                site, make changes, and host your own version as long as the project
                and all forks stay open source. If you really like to support me
                you can always buy me a coffee or sponsor me on Github (soon).
            </p>
            <p class="mb-2">
                <a
                    href="https://www.buymeacoffee.com/j0Shi"
                    target="_blank"
                    rel="noreferrer"
                    ><img
                        src={images.buyMeCoffee}
                        alt="buy me a coffee"
                        style="max-width: 250px"
                        class="mx-auto"
                    /></a
                >
            </p>

            <p class="mb-2">
                The project however does indeed need funding to power the <a
                    class="underline font-medium"
                    href="/#{getLocalizedRouteMatcher('auction')}"
                    >crawl engine</a
                >
                for reasons outlined
                <a
                    href="https://www.patreon.com/posts/welcome-faqs-71737051"
                    target="_blank"
                    rel="noreferrer"
                    class="underline font-medium">here</a
                >. So if you like that particular tool strongly consider
                donating towards keeping the data as updated as possible. Plans
                start as low as $1.30.
            </p>
            <p class="mb-2">
                <a
                    href="https://www.patreon.com/nw_gond_tools"
                    target="_blank"
                    rel="noreferrer"
                    ><img
                        src={images.patreon}
                        alt="visit patreon.com"
                        style="max-width: 250px; background-color: #FF424D"
                        class="mx-auto rounded-lg py-2 px-7"
                    /></a
                >
            </p>
        </div>
    </div>
</div>
