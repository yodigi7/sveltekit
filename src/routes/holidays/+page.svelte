<script>
    import Holiday from '$lib/Holiday.svelte';
    import { countries } from '$lib/consts.js';
    /**@type {string}*/
    let selectedCountry = "us";
    let year = "2023";
    /**@type {any[]?}*/
    let all_holidays = null
    /**@type {any[]?}*/
    let holidays = null;
    /**@type {any[]}*/
    let primary_types = [];
    let filterToggle = false;
    function filterList () {
        const name_primary_types = primary_types?.filter(type => type.value).map(type => type.name)
        holidays = all_holidays?.filter(holiday => {
            return name_primary_types?.includes(holiday.primary_type);
        }) ?? [];
    }
    function selectAll() {
        primary_types?.forEach((_, i) => {
            primary_types[i].value = true;
        });
        filterList();
    }
    function deselectAll() {
        primary_types?.forEach((_, i) => {
            primary_types[i].value = false;
        });
        filterList();
    }
    async function submit() {
        holidays = (await (await fetch(`/holidays?${new URLSearchParams({ year: year, country: selectedCountry })}`)).json()).holidays;
        holidays = holidays?.filter((holiday) => {
            return holiday.locations === "All";
        }) ?? [];
        all_holidays = holidays;
        primary_types = [];
        [...new Set(holidays?.map(holiday => {
            return holiday.primary_type;
        }) ?? [])].forEach((val, _) => {
            primary_types?.push({
                name: val,
                value: true
            });
        });
    };
</script>

<div>
    <label for="country">Country: </label>
    <select name="country" id="country" bind:value={selectedCountry}>
        {#each countries as country}
            <option value={country.iso}>{country.name}</option>
        {/each}
    </select>

    <label for="country">Year: </label>
    <input type="text" bind:value={year}>

    <button on:click={submit}>Submit</button>
    {#if primary_types.length}
        <div id="filterToggle">
            {#if filterToggle}
                <button on:click={() => filterToggle = !filterToggle}>Hide Filters</button>
                <button on:click={selectAll}>Select All</button>
                <button on:click={deselectAll}>Deselect All</button>
                <br>
                {#each primary_types as {name, value}}
                    <input type="checkbox" name={name} id={name} bind:checked={value} on:change={filterList}>
                    <label for={name}>{name}</label>
                    <br>
                {/each}
            {:else}
                <button on:click={() => filterToggle = !filterToggle}>Show Filters</button>
            {/if}
            <br>
        </div>
    {/if}
</div>

{#if holidays}
    {#each holidays as holiday}
        <Holiday holiday={holiday} />
    {/each}
{/if}

<style>
    #filterToggle {
        border: 1px black;
        display: inline-block;
    }
</style>