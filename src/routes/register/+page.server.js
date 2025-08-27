import { redirect, fail } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import prisma from '$lib/prisma';

export const load = async ({ cookies }) => {
    const sessionData = cookies.get('session');
    if (sessionData) {
        throw redirect(303, '/');
    }
    return {};
};

const register = async ({ request, cookies }) => {
    const data = await request.formData();
    const username = data.get('username');
    const password = data.get('password');

    if (typeof username !== 'string' || typeof password !== 'string' || !username || !password) {
        return fail(400, { error: 'Username and Password must be a string' });
    }
    try {
        const existingUser = await prisma.user.findUnique({
            where: { username }
        });

        if (existingUser) {
            return fail(400, { userExists: true });
        }

        await createUser(username, password, cookies);

        // Redirection après enregistrement réussi
        throw redirect(303, '/');
    } catch (err) {
        // Ne log pas les redirections comme des erreurs
        if (err?.status === 303 && err?.location) {
            throw err;
        }

        console.error('Error during user registration:', err);
        return fail(500, { error: 'Internal server error from code' });
    }
};

async function createRoleIfNotExists(roleName) {
    const existingRole = await prisma.roles.findUnique({
        where: { name: roleName }
    });

    if (!existingRole) {
        await prisma.roles.create({
            data: { name: roleName }
        });
    }
}

async function createUser(username, password, cookies) {
    const passwordHash = await bcrypt.hash(password, 10);
    const roleName = 'USER';

    await createRoleIfNotExists(roleName);

    const role = await prisma.roles.findUnique({
        where: { name: roleName }
    });

    if (!role) throw new Error('Role creation failed');

    await prisma.user.create({
        data: {
            username,
            passwordHash,
            userAuthToken: crypto.randomUUID(),
            roleId: role.id
        }
    });
    const user = await prisma.user.findUnique({
                where: { username }
            });
    cookies.set('session', user.userAuthToken, {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 7 // one week
            });

    console.log(`User ${username} registered successfully. Redirecting to profile...`);
}

export const actions = { register };
