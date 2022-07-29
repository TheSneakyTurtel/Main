<script lang="ts">
    import { goto } from "$app/navigation";

    import { fly, type FlyParams } from "svelte/transition";
    import { quartOut } from "svelte/easing";

    import type { Project } from "../models/Project";

    export let project: Project;
    export let flyInParams: FlyParams | undefined = undefined;

    function open() {
        goto(project.url);
    }
</script>

<section class="project" transition:fly={{ easing: quartOut, ...flyInParams }}>
    <header>
        <h2>{project.name}</h2>
        <div class="metadata">
            <span>Created on {project.createdAt.toDate().toLocaleDateString()}</span>
            <span>Made using {project.madeUsing.join(", ")}</span>
        </div>
    </header>
    <p class="summary">
        {project.summary}
    </p>
    <button on:click={open} class="open" type="button">Open</button>
</section>

<style>
    .project {
        flex: 1 1 auto;
		padding: 2em;
        background-color: white;
        border-radius: 4px;
        box-shadow: 0 4px 8px -2px hsla(0, 0%, 0%, 0.175);
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 2em;
		transition: 0.1s ease-out;
	}

    :global(body.dark-mode .project) {
        background-color: #36383b !important;
    }

    header {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 1em 2em;
    }

    .metadata {
        display: flex;
        flex-direction: column;
    }

    .open {
        padding: 0.25em 0.75em;
        border: none;
        border-radius: 2px;
        background-color: #AAC7FF;
        color: white;
        cursor: pointer;
        transform: translateY(-1px);
        box-shadow: 0 1px 3px #00000020;
        transition: 0.1s ease-out;
    }

    .open:is(:hover, :focus-visible) {
        transform: translateY(-2px);
        box-shadow: 0 2px 7px #00000020;
    }

    .open:active {
        transform: translateY(1px);
        box-shadow: 0 0 1px #00000020;
    }
</style>