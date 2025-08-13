// src/routes/api/album/[id]/+server.js
export async function GET({ params }) {
    console.log('Tentative de récupération de l\'album:', params.id);
    
    try {
        const deezerUrl = `https://api.deezer.com/album/${params.id}`;
        console.log('URL Deezer:', deezerUrl);
        
        const response = await fetch(deezerUrl);
        
        if (!response.ok) {
            console.error('Erreur Deezer API:', response.status, response.statusText);
            throw new Error(`Deezer API error: ${response.status}`);
        }
        
        const album = await response.json();
        console.log('Album récupéré depuis Deezer:', album);
        
        return new Response(JSON.stringify(album), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*'
            }
        });
    } catch (error) {
        console.error('Erreur dans l\'API route:', error);
        
        return new Response(JSON.stringify({ 
            error: 'Erreur lors de la récupération de l\'album',
            details: error.message 
        }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    }
}