<script>
export let click = () => {};
export let text;
export let invisible = false;
</script>

<div class="p-3 rounded-md border-nwoun bg-black text-nwoun font-bold leading-tight border-2 cursor-pointer" class:invisible="{invisible}" on:click="{click}">{text}</div>