export async function load({ locals }) {
    return {
        user: locals.user // si connecté, sinon undefined
    };
}