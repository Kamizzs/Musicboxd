// src/routes/login/+page.server.js
import { fail, redirect } from '@sveltejs/kit';
import bcrypt from 'bcryptjs';
import prisma from '$lib/prisma';

export const load = async ({ cookies }) => {
    const sessionData = cookies.get('session');
    if (sessionData) {
        throw redirect(303, '/');
    }
    return {};
};

export const actions = {
    login: async ({ request, cookies }) => {
        const data = await request.formData();
        const username = data.get('username');
        const password = data.get('password');

        if (typeof username !== 'string' || typeof password !== 'string' || !username || !password) {
            return fail(400, { error: 'Username and Password must be a string' });
        }

        try {
            const user = await prisma.user.findUnique({
                where: { username }
            });

            if (!user) {
                return fail(400, { error: 'User not found' });
            }

            const userPassword = user.isAdmin ? process.env.ADMIN_PW : user.passwordHash;
            const passwordMatch = await bcrypt.compare(password, userPassword);

            if (!passwordMatch) {
                return fail(400, { error: 'Invalid password' });
            }

            cookies.set('session', user.userAuthToken, {
                path: '/',
                httpOnly: true,
                sameSite: 'strict',
                secure: process.env.NODE_ENV === 'production',
                maxAge: 60 * 60 * 24 * 7 // one week
            });

            throw redirect(303, '/');
        } catch (err) {
            console.error('Error during login:', err);
            return fail(500, { error: 'Internal server error' });
        }
    }
};
