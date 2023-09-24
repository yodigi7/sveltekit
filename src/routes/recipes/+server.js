import { SPOONACULAR_API_KEY } from '$env/static/private';
import { PUBLIC_SPOONACULAR_BASE_URL, PUBLIC_ENVIRONMENT } from '$env/static/public';

export async function GET({ url }) {
    if (PUBLIC_ENVIRONMENT === "local") {
        return local_mock_get();
    } else {
        return prod_get(url);
    }
}

/**
 * @param {URL} url
 */
async function prod_get(url) {
    url.searchParams.append("apiKey", SPOONACULAR_API_KEY);
    const spoonacular_url = new URL(`${PUBLIC_SPOONACULAR_BASE_URL}/complexSearch?&${url.searchParams.toString()}`);
    const result = await fetch(spoonacular_url);
    const response = await result.json();
    return new Response(JSON.stringify(response));
}

function local_mock_get() {
    let mock_response = {
        "offset": 0,
        "number": 2,
        "results": [
            {
                "id": 716429,
                "title": "Pasta with Garlic, Scallions, Cauliflower & Breadcrumbs",
                "image": "https://spoonacular.com/recipeImages/716429-312x231.jpg",
                "imageType": "jpg",
            },
            {
                "id": 715538,
                "title": "What to make for dinner tonight?? Bruschetta Style Pork & Pasta",
                "image": "https://spoonacular.com/recipeImages/715538-312x231.jpg",
                "imageType": "jpg",
            }
        ],
        "totalResults": 86
    }
    return new Response(JSON.stringify(mock_response));
}