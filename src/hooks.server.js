import prisma from '$lib/prisma';

/** @type {import('@sveltejs/kit').Handle} */
export async function handle({ event, resolve }) {
    const sessionToken = event.cookies.get('session');

    if (sessionToken) {
        const user = await prisma.user.findUnique({
            where: { userAuthToken: sessionToken }
        });

        if (user) {
            event.locals.user = {
                id: user.id,
                username: user.username,
                isAdmin: user.isAdmin
            };
        }
    }

    return resolve(event);
}
