<script>
export let click = () => {};
export let cssClasses = '';
export let text;
export let invisible = false;
export let colorClasses = 'border-nwoun bg-black text-nwoun';
</script>

<div class="p-3 rounded-md text-center {colorClasses} {cssClasses} font-bold leading-tight border-2 cursor-pointer" class:invisible="{invisible}" on:click="{click}">
    <slot>{text}</slot>
</div>