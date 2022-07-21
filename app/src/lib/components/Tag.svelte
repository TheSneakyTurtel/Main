<script lang="ts">
    export let type: string;

    let logoURLPromise = import(`../../../assets/logos/${type}.svg?url`);
</script>

{#await logoURLPromise then logoURLModule}
    <img src={logoURLModule.default} alt="" role="none" />
{:catch error}
    {@debug error}
{/await}
