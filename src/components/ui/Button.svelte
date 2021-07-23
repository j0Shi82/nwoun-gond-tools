<script>
export let click = () => {};
export let cssClasses = '';
export let borderSize = 2;
export let text;
export let invisible = false;
export let colorClasses = 'border-nwoun bg-gray-300 bg-opacity-50 text-nwoun';
</script>

<div class="p-3 rounded-md text-center {colorClasses} {cssClasses} font-bold leading-tight border-{borderSize} cursor-pointer" class:invisible="{invisible}" on:click="{click}">
    <slot>{text}</slot>
</div>