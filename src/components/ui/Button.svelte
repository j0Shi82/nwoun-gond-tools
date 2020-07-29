<script>
export let click = () => {};
export let text;
export let invisible = false;
</script>

<div class="p-2 rounded-md border-red-700 bg-black text-red-700 font-bold leading-4 border-2 cursor-pointer" class:invisible="{invisible}" on:click="{click}">{text}</div>