<script>
    import { page } from '$app/stores';
    import {onMount} from "svelte";

    let album;

    onMount(async () => {
        const response = await fetch(`https://corsproxy.io/?https://api.deezer.com/album/${$page.params.id}`);
        album = await response.json();
        console.log(album)
    });

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

<div class="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8 text-white">
    {#if album}
        <div class="glass-effect min-h-full w-5/6 flex justify-center flex-col">
            <img src={album.cover_xl} alt="Couverture" class="object-cover mask-t-from-90% mask-b-to-99% mask-r-from-99% mask-l-from-99%"/>
            <div class="absolute bottom-180 bg-white mask-r-from-80%">
                <h1 class="font-extrabold text-black text-4xl m-10 mr-50">{album.title} - {album.artist.name}</h1>
            </div>
            <div class="absolute bg-black mask-t-from-90% mask-b-to-99% mask-r-from-99% mask-l-from-99% w-full flex flex-col justify-center p-10">
                <div class="m-5 w-full">
                    <p>Genre : {#each album.genres.data as genre} {genre.name} {/each}</p>
                    <p>Label : {album.label}</p>
                    <p>Date de sortie : {album.release_date}</p>

                    <div class="m-5 ">
                        <table class="table-auto w-2/3 text-gray-400">
                            <thead class="bg-gray-800 uppercase font-medium">
                            <tr>
                                <th class="px-6 py-3 text-left tracking-wider">Titres</th>
                            </tr>
                            </thead>
                            <tbody class="bg-gray-800">
                            {#each album.tracks.data as track}
                                <tr class="even:bg-slate-100 dark:even:bg-slate-900">
                                    <td></td>
                                    <td class="text-center">{track.title}</td>
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