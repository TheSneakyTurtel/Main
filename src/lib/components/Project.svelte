<script lang="ts">
    import type { Project as ProjectModel } from "../models/Project";

    export let project: ProjectModel;
    export let mostRecent: boolean;

    function open() {
        
    }
</script>

<section class="project">
    <header>
        <h2>{project.name}</h2>
        {#if mostRecent}
            <small>Most recent project</small>
        {/if}
    </header>
    <p class="paragraph">
        {project.summary}
    </p>
    <footer>
        <button class="open three-d" type="button">Open</button>
        <section class="tags">
            {#each project.tags as tag (tag)}
                <div class="tag">{tag}</div>
            {/each}
        </section>
    </footer>
</section>

<style>
    .project {
		padding: 2em;
        max-width: 100%;
        background-color: white;
        border: 1px solid hsl(0, 0%, 91%);
        border-radius: 3px;
        box-shadow: 0 4px 8px -2px hsla(0, 0%, 0%, 0.175);

		transition: 0.125s cubic-bezier(0.165, 0.84, 0.44, 1);
		transition-property: transform;
	}
	
	small, .tags {
		opacity: .6;
	}

    header, footer {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 1em;
    }

    footer {
        gap: 2em;
    }

    .tags {
        max-height: 100%;
        overflow-y: hidden;
        line-height: 0;
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        font-size: 0.675em;
        gap: 1.5em;
    }

    .tag {
        padding: 0.35em 0.9em;
        border-radius: 9999px;
        background-color: #00000020;
        border: 2px solid #00000010;
    }
</style>