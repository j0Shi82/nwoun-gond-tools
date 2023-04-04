<script>
    export let click = () => {};
    export let cssClasses = "";
    export let borderSize = 2;
    export let text;
    export let invisible = false;
    export let colorClasses =
        "border-nwoun bg-gray-300 bg-opacity-50 text-nwoun";

    const borderClass =
        parseInt(borderSize, 10) === 1 ? "border" : "border-" + borderSize;
</script>

<div
    class="p-3 rounded-md text-center {colorClasses} {cssClasses} font-bold leading-tight {borderClass} cursor-pointer"
    class:invisible
    on:keypress={click}
    on:click={click}
>
    <slot>{text}</slot>
</div>

<style lang="scss">
    div {
        user-select: none;
    }
</style>
