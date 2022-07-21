<script lang="ts">
	import ContentSection from "../components/ContentSection.svelte";
	import Tag from "../components/Tag.svelte";
	import EasterEgg from "../components/EasterEgg.svelte";

	import heroBGNear600 from "../../../assets/backgrounds/hero/near.w600.webp?url";
	import heroBGFar600 from "../../../assets/backgrounds/hero/far.w600.webp?url";
	import heroBGNear1920 from "../../../assets/backgrounds/hero/near.w1920.webp?url";
	import heroBGFar1920 from "../../../assets/backgrounds/hero/far.w1920.webp?url";

	import { onDestroy, onMount } from "svelte";

	const heroElements: { [key: string]: HTMLElement } = {};

	onMount(() => document.body.addEventListener("scroll", updateParallax, { passive: true }));
	onDestroy(() => document.body.removeEventListener("scroll", updateParallax));

	function updateParallax() {
		const scrollY = document.body.scrollTop;
		const { content, bgFar, bgNear } = heroElements;

		content.style.transform = `translateY(${scrollY * 0.5}px)`;
		content.style.opacity = (1 - Math.max((scrollY - 250) * 0.002, 0)).toString();

		bgNear.style.transform = `translateY(${scrollY * 0.725}px)`;

		bgFar.style.transform = `translateY(${scrollY * 0.925}px)`;
	}
</script>

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
		<section class="most-recent-project three-d">
			<header>
				<h2>Testing Project</h2>
				<small>-</small>
				<small>Most recent project</small>
			</header>
			<p class="paragraph">
				A project that doesn’t actually exist, and is just used as means to test the current design of projects
			</p>
			<footer>
				<button class="open three-d" type="button">Open</button>
				<section class="tags">
					<Tag type="css" />
					<Tag type="html" />
					<Tag type="typescript" />
				</section>
			</footer>
		</section>
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

	button {
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

	button:is(:focus-visible) {
		outline: 1px dashed var(--focus-outline, #00000074);
		outline-offset: 2px;
	}

	button:active::before,
	button:active {
		transform: none;
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
		color: white;
	}

	:global(#hero-section),
	:global(#intro-section),
	:global(#all-projects-invite-section) {
		padding: calc(4em + var(--irregularity-size)) min(2.3vw + 1em, 10em) 4em;
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
		background-color: var(--intro-section-bg);
		clip-path: polygon(0 100%, 100% 100%, 100% 0, 0 var(--irregularity-size));
    }

	#intro-content {
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		gap: 5em;
	}

	#intro-content > * {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: center;
		flex: 1 1 360px;
		gap: 2em;
		text-align: start;
	}

	#intro-content .most-recent-project {
		padding: 2em;
        --bg: white;
        --shadow: black;
        --hover-delta-x: -8px;
        --hover-delta-y: -8px;

		transition: 0.125s cubic-bezier(0.165, 0.84, 0.44, 1);
		transition-property: transform;
	}
	
	#intro-content .most-recent-project small {
		opacity: .6;
	}

	#intro-content .most-recent-project header, #intro-content .most-recent-project footer {
		display: flex;
		align-items: center;
		gap: 1em;
	}

	#intro-content .most-recent-project footer .tags {
		max-height: 100%;
		overflow-y: hidden;
		line-height: 0;
		display: flex;
		gap: 0.5em;
	}

	:global(#intro-content .most-recent-project footer .tags img) {
		min-height: 22px;
		flex: 1 0 0;
		max-height: 32px;
	}

    #all-projects-invite-bg {
        background-color: var(--intro-section-bg);
		transform: translateY(-1px);
    }

    #all-projects-invite-bg::after {
        background-color: var(--all-projects-invite-section-bg);
		clip-path: polygon(0 100%, 100% 100%, 100% var(--irregularity-size), 0 0);
		transform: translateY(1px);
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