<script>
    /**@type {any}*/
    export let holiday;
    let date = new Date(holiday.date.iso);
</script>


<a href={holiday.canonical_url}>{holiday.name}</a>
<br>
Date: {`${date.toDateString()}`}
<br>
Type: {holiday.primary_type}
<br>
{holiday.description}
<br>
<br>