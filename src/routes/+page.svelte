<svelte:component this={Header}></svelte:component>

{#if data.user}
        <h1 class="font-thin text-center text-2xl text-white m-10">Bonjour {data.user.username} ! Note un album stp i beg</h1>
        <h2 class="font-thin text-xl text-white m-10">Ce qu'on te propose :</h2>
        <div class="flex justify-center">
            <div class="flex flex-row flex-wrap items-center">
                {#if loading}
                <p>Chargement...</p>
                {/if}
                {#if listRandomAlbums !== undefined}
                    {#if listRandomAlbums.error}
                        <p style="color: red;">Erreur: {album.error}</p>
                    {:else}
                        {#each listRandomAlbums.data as album}
                            <div class="border border-solid glass-effect m-2 w-max text-center flex flex-col items-center">
                                <h2 class="text-center text-white font-thin text-wrap pr-4 pl-4">{album.title}</h2>
                                <p class="text-center text-cyan-700 font-bold">{album.artist?.name}</p>
                                {#if album.cover_medium}
                                    <img 
                                        src={album.cover_medium} 
                                        alt="Couverture de l'album" 
                                        class="m-2 w-70 h-70 object-cover rounded-4xl" 
                                    />
                                {/if}
                            </div>
                        {/each}
                    {/if}
                {/if}
            </div>
        </div>
{:else}
    <h1 class="font-thin text-center font-5xl text-white m-10">Bonjour ! Veuillez vous connecter ou créer un compte pour utiliser ce banger de site.</h1>
    <div style="display: flex; justify-content: center; align-items: center;">
        <video width="500" height="600" autoplay loop muted>
            <source src="https://media.tenor.com/shAoPZEW4q4AAAPo/sonic-sonic-the-hedgehog.mp4" type="video/mp4" />
            Votre navigateur ne supporte pas la vidéo.
        </video>
    </div>
{/if}

<script>
    import Header from './header.svelte';

    let {data} = $props();

    let loading = $state(false);
    let listRandomAlbums = $state([]);
    
    async function get5RandAlbum() {
        loading = true;
        listRandomAlbums = undefined;
        
        try {
            // Alternative avec corsproxy.io
            const response = await fetch('https://corsproxy.io/?https://api.deezer.com/chart/0/albums');
            
            if (!response.ok) {
                throw new Error(`Erreur HTTP: ${response.status}`);
            }
            
            listRandomAlbums = await response.json();
            listRandomAlbums.data.splice(5,5)
            console.log('Albums récupéré:', listRandomAlbums);
            
        } catch (error) {
            console.error('Erreur:', error);
            listRandomAlbums = { error: `Impossible de récupérer l'album: ${error.message}` };
        } finally {
            loading = false;
        }
    }

    get5RandAlbum()


</script>

<style>
    .glass-effect {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0));
    -webkit-backdrop-filter: blur(20px);
    backdrop-filter: blur(20px);
    box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.37);
    border: 1px solid rgba(255, 255, 255, 0.18);
    border-radius: 32px;
}
</style>