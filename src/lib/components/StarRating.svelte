<script>
    export let rating = 0;       // note actuelle, peut être un demi (ex: 3.5)
    export let max = 5;          // nombre d'étoiles
    export let readonly = false; // si true, l'utilisateur ne peut pas cliquer
    let tempRating = rating;

    function setRating(value) {
        if (!readonly) {
            rating = value;
            tempRating = value;
        }
    }

    function handleMouseEnter(value) {
        if (!readonly) tempRating = value;
    }

    function handleMouseLeave() {
        if (!readonly) tempRating = rating;
    }
</script>

<div class="flex space-x-1">
    {#each Array(max) as _, i}
        <button
                type="button"
                class="relative w-6 h-6 cursor-pointer"
                on:click={() => setRating(i + 1)}
                on:mousemove={(e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    handleMouseEnter(i + (x > rect.width / 2 ? 1 : 0.5));
  }}
                on:mouseleave={handleMouseLeave}
                aria-label="Étoile {i + 1}"
        >

        <!-- Etoile vide -->
            <svg class="w-6 h-6 text-gray-300 absolute top-0 left-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 00-.364 1.118l1.286 3.955c.3.921-.755 1.688-1.54 1.118l-3.36-2.44a1 1 0 00-1.175 0l-3.36 2.44c-.784.57-1.838-.197-1.539-1.118l1.285-3.955a1 1 0 00-.364-1.118L2.075 9.382c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.955z"/>
            </svg>

            <!-- Etoile pleine ou demi -->
            <svg
                    class="w-6 h-6 absolute top-0 left-0 text-yellow-400 overflow-hidden"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    style="width: {Math.min(100, (tempRating - i) * 100)}%"
            >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.955a1 1 0 00.95.69h4.15c.969 0 1.371 1.24.588 1.81l-3.36 2.44a1 1 0 00-.364 1.118l1.286 3.955c.3.921-.755 1.688-1.54 1.118l-3.36-2.44a1 1 0 00-1.175 0l-3.36 2.44c-.784.57-1.838-.197-1.539-1.118l1.285-3.955a1 1 0 00-.364-1.118L2.075 9.382c-.783-.57-.38-1.81.588-1.81h4.15a1 1 0 00.95-.69l1.286-3.955z"/>
            </svg>
        </button>
    {/each}
</div>
