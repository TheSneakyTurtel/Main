<script lang="ts">
	import ContentSection from "../lib/components/ContentSection.svelte";
	import EasterEgg from "../lib/components/EasterEgg.svelte";

	import heroBGNear600 from "../../static/backgrounds/hero/near.w600.webp";
	import heroBGFar600 from "../../static/backgrounds/hero/far.w600.webp";
	import heroBGNear1920 from "../../static/backgrounds/hero/near.w1920.webp";
	import heroBGFar1920 from "../../static/backgrounds/hero/far.w1920.webp";

	const heroElements: { element?: HTMLElement, speed: number, endingOpacity?: number }[] = [{ speed: .9 }, { speed: .6 }, { speed: .5, endingOpacity: 0 }];

	function update(ev: UIEvent) {
		const target = ev.target as HTMLElement | undefined;
		if (target) for (const heroElement of heroElements) {
			if (!heroElement.element) continue;

			heroElement.element.style.transform = `translateY(${heroElement.speed * target.scrollTop}px)`;
		}
	}
</script>

<svelte:window on:scroll|passive|capture={update} />

<ContentSection id="hero-section">
	<EasterEgg />
	<div slot="bg" id="hero-bg">
		<img class="far" alt="" bind:this={heroElements[0].element} srcset="{heroBGFar600} 600w, {heroBGFar1920} 1920w" sizes="(max-width: 800px) 600px, 1920px" />
		<img class="near" alt="" bind:this={heroElements[1].element} srcset="{heroBGNear600} 600w, {heroBGNear1920} 1920w" sizes="(max-width: 800px) 600px, 1920px" />
	</div>
	<div slot="content" id="hero-content" bind:this={heroElements[2].element}>
		<h1>Welcome to my <span class="highlight" style="--highlight-dark: #d87cfc; --highlight-light: #e98eff;">personal website</span></h1>
		<span>This is where you can find <span class="highlight" style="--highlight-light: #8bcbff; --highlight-dark: #7cbafc; font-weight: bold;">cool stuff</span> I make</span>
	</div>
</ContentSection>

<ContentSection id="greeting-section">
	<div slot="bg" id="greeting-bg">
	</div>
	<div slot="content" id="greeting-content">
		<h2>Greetings!</h2>
		<span>and welcome to this fine website made just for me!</span>
	</div>
</ContentSection>

<svelte:head>
	<title>My personal website</title>
</svelte:head>

<style>
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
		--shadow: var(--darker-accent-color);
		--hover-delta-x: 0px;
		--hover-delta-y: -3px;
		--shadow-shrink: 0px;

		transition: 0.075s cubic-bezier(0.165, 0.84, 0.44, 1);
		transition-property: transform;
	}

	:global(button:is(:focus-visible)) {
		outline: 1px dashed var(--focus-outline, #00000074);
		outline-offset: 2px;
	}

	:global(button.three-d:active::before),
	:global(button.three-d:active) {
		transform: none !important;
	}

	h1 {
		font-size: 2.65em;
	}

	:global(.content-section) {
		padding: 8vh 8vw;
	}

	:global(#hero-section) {
		height: 100%;
		margin-bottom: -2em;
	}

	#hero-bg * {
		object-fit: cover;
		image-rendering: pixelated;
		will-change: transform;
	}

	#hero-bg .near {
		z-index: 1;
	}

	#hero-bg::after {
		content: "";
		position: fixed;
		top: 0;
		left: 0;
		width: 100%;
        height: 100%;
        z-index: 5;
		background-color: #00000050;
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
        text-align: center;
	}

	:global(#greeting-section) {
		width: max-content;
		color: white;
	}

	#greeting-bg {
		background-image: url("../../static/environment/bricks.svg");
		background-position: top left;
		background-color: transparent;
	}

	#greeting-content {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
	}
</style>