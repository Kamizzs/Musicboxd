<!-- src/routes/login/+page.svelte -->
<script>
    export let form;
    let showPassword = false;
    $: passwordType = showPassword ? 'text' : 'password';
    import Header from '../header.svelte';
</script>

<Header></Header>
<div class="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8" style="background-image: url('/img/bg-inscr.png');">
    <div class="bg-slate-50/90 p-6 pl-30 pr-30 rounded">
        <div class="w-full max-w-md space-y-8">
        <div>
            <h2 class="mt-6 text-center text-3xl text-gray-900" style="font-weight: bold;">
                Se connecter
            </h2>
        </div>
        <form action="?/login" method="POST" class="mt-8 space-y-4 mb-2 w-100">
                <div class="mb-4">
                    <label for="username" class="sr-only">Nom d'utilisateur</label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        required
                        placeholder="Username"
                        class="relative block w-full appearance-none rounded border border-gray-500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-pink-500 focus:outline-none focus:ring-pink-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label for="password" class="sr-only">Mot de passe</label>
                    <input
                        id="password"
                        name="password"
                        type={passwordType}
                        required
                        placeholder="Password"
                        class="relative block w-full appearance-none rounded border border-gray-500 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-pink-500 focus:outline-none focus:ring-pink-500 sm:text-sm"
                    />
                </div>
                <div class="flex items-center justify-center py-5">
                    <input
                        type="checkbox"
                        bind:checked={showPassword}
                        id="showPassword"
                        class="check_box h-4 w-4 text-pink-600 focus:ring-pink-500 border-gray-300 rounded"
                    />
                    <label for="showPassword" class="ml-2 block text-sm text-gray-900 pl-10 pb-5">
                        Afficher le mot de passe
                    </label>
                </div>

            {#if form?.error}
                <p class="text-red-500 text-sm">{form.error}</p>
            {/if}

            <div>
                <button
                    type="submit"
                    class="group relative flex w-full justify-center rounded-md border border-transparent bg-pink-600 px-4 py-2 text-sm font-medium text-white hover:bg-pink-700 focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-offset-2"
                >
                    Se connecter
                </button>
            </div>
        </form>
        <div class="text-center mt-4">
            <a href="/register" class="text-pink-600 hover:text-pink-500">S'inscrire</a>
        </div>
    </div>
    </div>
</div>
