<Header></Header>

<div class="flex min-h-screen px-4 py-12 sm:px-6 lg:px-8 flex-col" style="background-image: url('/img/bg-main.png');">

{#if data.user}
        <h1 class="text-center text-2xl text-white m-4">Bonjour {data.user.username} ! Note un album stp i beg</h1>
        <h2 class="font-thin text-xl text-white m-4">Top albums en ce moment :</h2>
        <div class="flex justify-center">
            <div class="flex flex-row flex-wrap items-center">
                {#if loading}
                    <p>Chargement...</p>
                {:else}
                    {#if listRandomAlbums.error}
                        <p style="color: red;">Erreur: {listRandomAlbums.error}</p>
                    {:else}
                        <div class="flex items-center">
                            <button onclick={prev} class="px-4 py-2 bg-gray-700 text-white rounded">‹</button>

                            {#each visibleAlbums() as album}
                                <div class="border border-solid glass-effect m-2 w-72 h-96 text-center flex flex-col items-center justify-around">
                                    <h2 class="text-center text-white font-thin text-wrap pr-4 pl-4 w-full">{album.title}</h2>
                                    <p class="text-center text-cyan-700 font-bold w-full">{album.artist?.name}</p>
                                    {#if album.cover_medium}
                                        <img src={album.cover_medium} alt="Couverture" class="m-2 w-60 h-60 object-cover rounded-4xl"/>
                                    {/if}
                                </div>
                            {/each}

                            <button onclick={next} class="px-4 py-2 bg-gray-700 text-white rounded">›</button>
                        </div>
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
</div>


<script>
    import Header from './header.svelte';

    let {data} = $props();

    let listRandomAlbums = $state([]);
    let startIndex = $state(0);
    let loading = $state(false);
    const visibleCount = 6;

    async function get5RandAlbum() {
        loading = true;
        listRandomAlbums = [];

        try {
            const response = await fetch('https://corsproxy.io/?https://api.deezer.com/chart/0/albums');
            if (!response.ok) throw new Error(`Erreur HTTP: ${response.status}`);

            const json = await response.json();

            if (json && Array.isArray(json.data)) {
                listRandomAlbums = json.data;
            } else {
                listRandomAlbums = [];
            }
        } catch (error) {
            console.error('Erreur:', error);
            listRandomAlbums = [];
        } finally {
            loading = false;
        }
    }

    get5RandAlbum();

    function next() {
        if (listRandomAlbums.length === 0) return;
        startIndex = (startIndex + 1) % listRandomAlbums.length;
    }

    function prev() {
        if (listRandomAlbums.length === 0) return;
        startIndex = (startIndex - 1 + listRandomAlbums.length) % listRandomAlbums.length;
    }

    function visibleAlbums() {
        if (listRandomAlbums.length === 0) return [];
        const result = [];
        for (let i = 0; i < visibleCount; i++) {
            result.push(listRandomAlbums[(startIndex + i) % listRandomAlbums.length]);
        }
        return result;
    }
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