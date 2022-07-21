<script lang="ts">
    import type { Project as ProjectModel } from "../models/Project";

    export let projects: ProjectModel[] = [];
</script>

<main class="all-projects">
    {#each projects as project}

    {/each}
</main>