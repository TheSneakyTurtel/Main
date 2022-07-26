<script lang="ts">
	import ContentSection from "../lib/components/ContentSection.svelte";
	import EasterEgg from "../lib/components/EasterEgg.svelte";
	import Project from "../lib/components/Project.svelte";

	import { projects } from "../lib/utils/firebase";

	import heroBGNear600 from "../../static/backgrounds/hero/near.w600.webp";
	import heroBGFar600 from "../../static/backgrounds/hero/far.w600.webp";
	import heroBGNear1920 from "../../static/backgrounds/hero/near.w1920.webp";
	import heroBGFar1920 from "../../static/backgrounds/hero/far.w1920.webp";

	const heroElements: { [key: string]: HTMLElement } = {};

	function updateParallax() {
		const scrollY = document.body.scrollTop;
		const { content, bgFar, bgNear } = heroElements;

		content.style.transform = `translateY(${scrollY * 0.5}px)`;
		content.style.opacity = (1 - Math.max((scrollY - 250) * 0.002, 0)).toString();

		bgNear.style.transform = `translateY(${scrollY * 0.725}px)`;

		bgFar.style.transform = `translateY(${scrollY * 0.925}px)`;
	}
</script>

<svelte:body on:scroll|passive={updateParallax} />

<ContentSection id="hero-section">
	<EasterEgg />
	<div slot="bg" id="hero-bg">
		<img class="near" alt="" bind:this={heroElements.bgNear} srcset="{heroBGNear600} 600w, {heroBGNear1920} 1920w" sizes="(max-width: 800px) 600px, 1920px" />
		<img class="far" alt="" bind:this={heroElements.bgFar} srcset="{heroBGFar600} 600w, {heroBGFar1920} 1920w" sizes="(max-width: 800px) 600px, 1920px" />
	</div>
	<div slot="content" id="hero-content" bind:this={heroElements.content}>
		<h1>Welcome to my <span class="highlight" style="color: #7cbafc">personal website</span></h1>
		<span>This is where you can find <span class="highlight" style="color: #d87cfc">cool stuff</span> I make</span>
	</div>
</ContentSection>

<ContentSection id="intro-section">
	<div slot="bg" id="intro-bg" />
	<div slot="content" id="intro-content">
		<section class="text">
			<h2>Hello, and welcome to my personal website</h2>
			<p class="paragraph">
				This is where I keep records of the hobby projects that I’ve made, you’re free to take a look, for inspiration if you’re a developer, for confirmation that i know how to code, or for any other reason too!
			</p>
		</section>
		{#await projects then retrievedProjects}
			<Project project={retrievedProjects[0]} mostRecent={true} />
		{/await}
	</div>
</ContentSection>

<ContentSection id="all-projects-invite-section">
	<div slot="bg" id="all-projects-invite-bg" />
	<div slot="content" id="all-projects-invite-content">
		<h2>
            So what are you waiting for? Take a look!
        </h2>
        <p class="paragraph">
            Check these projects out! After all, you’ve been interested enough to scroll down here.
        </p>
        <button type="button" class="view-all-projects three-d">View all projects</button>
	</div>
</ContentSection>

<svelte:head>
	<title>My personal website</title>
</svelte:head>

<style>
    :global(:root) {
        --hero-section-bg: #00000045;
        --intro-section-bg: #f2f2f4;
        --all-projects-invite-section-bg: #22242C;
		--irregularity-size: 1.75em;
    }

	:global(.highlight) {
		display: inline-block;
		transition: 0.125s cubic-bezier(0.165, 0.84, 0.44, 1);
	}

	:global(.highlight:hover) {
		transform: translateY(-2px);
		filter: grayscale(.5) brightness(1.2) drop-shadow(0 8px 6px #0000006b);
	}

	:global(button) {
		padding: 0.25em 1em;
		border: none;
		cursor: pointer;
		color: white;
		--bg: var(--accent-color);
		--shadow: black;
		--hover-delta-x: -3px;
		--hover-delta-y: -3px;
		--shadow-shrink: 0px;

		transition: 0.075s cubic-bezier(0.165, 0.84, 0.44, 1);
		transition-property: transform;
	}

	:global(button:is(:focus-visible)) {
		outline: 1px dashed var(--focus-outline, #00000074);
		outline-offset: 2px;
	}

	:global(button:active::before),
	:global(button:active) {
		transform: none !important;
	}

	:global(#hero-section) {
		height: 100%;
	}

	#hero-bg * {
		width: 100%;
		height: 100%;
		object-fit: cover;
		filter: saturate(1.5);
		image-rendering: pixelated;
		will-change: transform;
	}

	#hero-bg .near {
		z-index: 1;
	}

	#hero-bg::after {
		content: "";
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
        height: 100%;
        z-index: 5;
		background-color: var(--hero-section-bg);
	}
	
	#hero-content {
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		gap: 1em;
		height: 100%;
		position: relative;
	}

	:global(#hero-content *) {
		will-change: transform;
		color: white;
	}

	:global(#hero-section),
	:global(#intro-section),
	:global(#all-projects-invite-section) {
		padding: calc(4em + var(--irregularity-size)) min(5vw + 1.5em, 10em) 4em;
	}

    #intro-bg::after, #all-projects-invite-bg::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

	#intro-bg {
        background-color: var(--hero-section-bg);
	}

	#intro-bg::after {
		filter: drop-shadow(0 -4px 14px red);
		clip-path: polygon(0 100%, 100% 100%, 100% 0, 0 var(--irregularity-size));
	}

    #intro-bg::after, #all-projects-invite-bg {
		background-color: var(--intro-section-bg);
		background-image: url("../../static/stickers/x.svg");
		background-size: 1em 1em;
		background-repeat: space;
    }

	#intro-content {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 5em;
	}

	:global(#intro-content > *) {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		flex: 1 1 25em;
		gap: 2em;
		text-align: start;
	}

    #all-projects-invite-bg {
		transform: translateY(-1px);
    }

    #all-projects-invite-bg::after {
		transform: translateY(1px);
        background-color: var(--all-projects-invite-section-bg);
		clip-path: polygon(0 100%, 100% 100%, 100% var(--irregularity-size), 0 0);
		box-shadow: 0 1px 0 var(--all-projects-invite-section-bg);
    }

    #all-projects-invite-content {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        gap: 2em;
    }

    #all-projects-invite-content * {
        color: white;
		text-align: start;
    }

	#all-projects-invite-content .view-all-projects {
		--hover-delta-x: 3px;
		--focus-outline: #ffffff74;
	}
</style>