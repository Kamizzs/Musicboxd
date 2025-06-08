import { redirect, fail } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import prisma from '$lib/prisma';

const ADMIN_PW = process.env.ADMIN_PW;

export const load = async ({ cookies }) => {
    const sessionData = cookies.get('session');
    if (sessionData) {
        throw redirect(303, '/profile');
    }
    return {};
};

const register = async ({ request }) => {
    const data = await request.formData();
    const username = data.get('username');
    const password = data.get('password');
    const admin = data.get('admin');

    if (typeof username !== 'string' || typeof password !== 'string' || !username || !password) {
        return fail(400, { error: 'Username and Password must be a string' });
    }

    const isAdmin = admin === 'on' && bcrypt.compareSync(password, ADMIN_PW);

    try {
        const existingUser = await prisma.user.findUnique({
            where: { username }
        });

        if (existingUser) {
            return fail(400, { userExists: true });
        }

        await createUser(username, password, isAdmin);

        if (admin === 'on' && !isAdmin) {
            return fail(400, { error: 'Wrong admin password' });
        }

        // Redirection après enregistrement réussi
        throw redirect(303, '/profile');
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

async function createUser(username, password, isAdmin) {
    const passwordHash = isAdmin ? ADMIN_PW : await bcrypt.hash(password, 10);
    const roleName = isAdmin ? 'ADMIN' : 'USER';

    await createRoleIfNotExists(roleName);

    const role = await prisma.roles.findUnique({
        where: { name: roleName }
    });

    if (!role) throw new Error('Role creation failed');

    await prisma.user.create({
        data: {
            username,
            passwordHash,
            isAdmin,
            userAuthToken: crypto.randomUUID(),
            roleId: role.id
        }
    });

    console.log(`User ${username} registered successfully. Redirecting to profile...`);
}

export const actions = { register };
