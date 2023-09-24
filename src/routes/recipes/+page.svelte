<script>
    import { cuisines, diets } from '$lib/consts.js';
    /**@type {any[]}*/
    let recipes = [];
    let query = "";
    let cuisine = "";
    let diet = "";
    async function submit() {
        let searchParams = new URLSearchParams();
        if (query) {
            searchParams.append("query", query);
        }
        if (cuisine) {
            searchParams.append("cuisine", cuisine);
        }
        if (diet) {
            searchParams.append("diet", diet);
        }
        recipes = (await (await fetch(`/recipes?${searchParams}`)).json()).results;
    }
</script>

<label for="query">Query: </label>
<input type="text" bind:value={query}>
<label for="cuisine">Cuisine: </label>
<select name="cuisine" id="cuisine" bind:value={cuisine}>
    {#each cuisines as cuisine}
        <option value={cuisine}>{cuisine}</option>
    {/each}
</select>
<label for="diet">Diet: </label>
<select name="diet" id="diet" bind:value={diet}>
    {#each diets as diet}
        <option value={diet}>{diet}</option>
    {/each}
</select>
<button on:click={submit}>Retrieve</button>
<br>
{#each recipes as { id, title, image }}
    {title}
    <br>
    <img src={image} alt={title}>
    <br>
{/each}