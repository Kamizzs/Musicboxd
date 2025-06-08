<!-- src/routes/login/+page.svelte -->
<script>
    export let form;
    let showPassword = false;
    $: passwordType = showPassword ? 'text' : 'password';
</script>

<div class="flex min-h-screen items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
    <div class="w-full max-w-md space-y-8">
        <div>
            <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">
                Sign In
            </h2>
        </div>
        <form action="?/login" method="POST" class="mt-8 space-y-6">
            <div class="-space-y-px rounded-md shadow-sm">
                <div>
                    <label for="username" class="sr-only">Username</label>
                    <input
                        id="username"
                        name="username"
                        type="text"
                        required
                        placeholder="Username"
                        class="relative block w-full appearance-none rounded-none rounded-t-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                </div>
                <div>
                    <label for="password" class="sr-only">Password</label>
                    <input
                        id="password"
                        name="password"
                        type={passwordType}
                        required
                        placeholder="Password"
                        class="relative block w-full appearance-none rounded-none rounded-b-md border border-gray-300 px-3 py-2 text-gray-900 placeholder-gray-500 focus:z-10 focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                    />
                </div>
                <div class="flex items-center py-5">
                    <input
                        type="checkbox"
                        bind:checked={showPassword}
                        id="showPassword"
                        class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                    />
                    <label for="showPassword" class="ml-2 block text-sm text-gray-900">
                        Show Password
                    </label>
                </div>
            </div>

            {#if form?.error}
                <p class="text-red-500 text-sm">{form.error}</p>
            {/if}

            <div>
                <button
                    type="submit"
                    class="group relative flex w-full justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                    Sign In
                </button>
            </div>
        </form>
        <div class="text-center mt-4">
            <a href="/register" class="text-indigo-600 hover:text-indigo-500">Register</a>
        </div>
    </div>
</div>
