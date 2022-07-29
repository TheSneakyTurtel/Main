<script lang="ts">
    import Project from "../lib/components/Project.svelte";
    import { projects } from "../lib/utils/firebase";
</script>

<svelte:head>
    <title>Works</title>
</svelte:head>

<main class="content">
    <header>
        <h1>My Works</h1>
    </header>

    <section class="projects">
        {#await projects}
            <p>Loading...</p>
        {:then awaitedProjects}
            {#each awaitedProjects as project, i (project.id)}
                <Project {project} flyInParams={{ duration: 500, delay: i * 250, y: 20, }} />
            {/each}
        {:catch}
            <p>Error loading projects ¯\_(ツ)_/¯</p>
        {/await}
    </section>
</main>

<style>
    .content {
        padding: 2em 4em;
        width: 100%;
        height: 100%;
        display: flex;
        flex-direction: column;
        gap: 2em;
        background-image: url("../../static/backgrounds/works/bg.webp");
        position: relative;
        isolation: isolate;
        font-size: 1.15em;
        transition: 0.1s ease-out;
    }

    .projects {
        display: flex;
        flex-wrap: wrap;
        gap: 2em;
    }

    :global(body.dark-mode .content) {
        color: white !important;
    }

    .content::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: #ffffffdf;
        z-index: -1;
        transition: 0.1s ease-out;
    }

    :global(body.dark-mode .content::before) {
        filter: brightness(0.1);
    }
</style>