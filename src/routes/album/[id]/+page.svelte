<script>
    import { page } from '$app/stores';
    import {onMount} from "svelte";
    import Header from '../../header.svelte';

    let album;

    onMount(async () => {
        const response = await fetch(`https://corsproxy.io/?https://api.deezer.com/album/${$page.params.id}`);
        album = await response.json();
        console.log(album)
    });

    function formatDuration(seconds) {
        const min = Math.floor(seconds / 60);
        const sec = seconds % 60;
        return `${min}:${sec.toString().padStart(2, '0')}`;
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

<Header></Header>
<div class="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8 text-white">
    {#if album}
        <div class="relative glass-effect min-h-full w-5/6 flex justify-center flex-col" >
            <img src={album.cover_xl} alt="Couverture" class="object-cover mask-t-from-90% mask-b-to-99% mask-r-from-99% mask-l-from-99%"/>
            <div class="absolute top-50 left-0 bg-pink-50/95 mask-r-from-80%">
                <h1 class="font-extrabold text-black text-4xl m-10 mr-50">{album.title} - {album.artist.name}</h1>
            </div>
            <div class="absolute top-100 left-0 bottom-0 w-full p-10 pt-20 bg-gray-950/80 border-b rounded-4xl mask-t-from-90%">
                <div class="m-5 p-5 w-full">
                    <p>Genre : {#each album.genres.data as genre}   {genre.name} /  {/each}</p>
                    <p>Label : {album.label}</p>
                    <p>Date de sortie : {album.release_date}</p>

                    <div class="mt-10 overflow-y">
                        <table class="table-auto w-2/3 text-gray-400 overflow-y-scroll">
                            <thead class="bg-neutral-900 uppercase font-medium border-b">
                            <tr>
                                <th class="px-6 py-3 text-left tracking-wider">Titres</th>
                                <th class="px-6 py-3 text-right tracking-wider">Durée</th>
                            </tr>
                            </thead>
                            <tbody class="bg-neutral-800">
                            {#each album.tracks.data as track, index}
                                <tr class="even:bg-zinc-900 dark:even:bg-zinc-900">
                                    <td class="p-5 font-medium">{index + 1} - {track.title}</td>
                                    <td class="p-5 font-medium text-right">{formatDuration(track.duration)}</td>
                                </tr>
                            {/each}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    {/if}
</div>