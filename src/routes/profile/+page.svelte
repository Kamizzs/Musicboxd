<script>
    export let data;
    import Header from '../header.svelte';
</script>

<div class="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8 text-white">
    {#if data.user}
        <p>Bonjour {data.user.username} !</p>
    {:else}
        <p>Non connecté</p>
    {/if}
</div>
