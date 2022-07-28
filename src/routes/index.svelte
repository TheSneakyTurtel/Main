<script lang="ts">
	import ContentSection from "../lib/components/ContentSection.svelte";
	import EasterEgg from "../lib/components/EasterEgg.svelte";

	import heroBGNear600 from "../../static/backgrounds/hero/near.w600.webp";
	import heroBGFar600 from "../../static/backgrounds/hero/far.w600.webp";
	import heroBGNear1920 from "../../static/backgrounds/hero/near.w1920.webp";
	import heroBGFar1920 from "../../static/backgrounds/hero/far.w1920.webp";

	const scrollAnimatedElements: ScrollAnimatedElement[] = [{ speed: 0.1, alreadyFixed: true }, { speed: 0.3, alreadyFixed: true }, { speed: 0.5, alreadyFixed: false }];

	function update(ev: UIEvent) {
		const target = ev.target as HTMLElement | undefined;
		if (target) for (const scrollAnimated of scrollAnimatedElements) {
			if (!scrollAnimated.element) continue;

			scrollAnimated.element.style.transform = !scrollAnimated.alreadyFixed ? `translateY(${scrollAnimated.speed * target.scrollTop}px)` : `translateY(-${scrollAnimated.speed * target.scrollTop}px)`;
		}
	}

	interface ScrollAnimatedElement {
		element?: HTMLElement,
		speed: number,
		alreadyFixed?: boolean,
	}
</script>

<svelte:window on:scroll|passive|capture={update} />

<ContentSection id="hero-section">
	<EasterEgg />
	<div slot="bg" id="hero-bg">
		<img class="far" alt="" bind:this={scrollAnimatedElements[0].element} srcset="{heroBGFar600} 600w, {heroBGFar1920} 1920w" sizes="(max-width: 800px) 600px, 1920px" />
		<img class="near" alt="" bind:this={scrollAnimatedElements[1].element} srcset="{heroBGNear600} 600w, {heroBGNear1920} 1920w" sizes="(max-width: 800px) 600px, 1920px" />
	</div>
	<div slot="content" id="hero-content" bind:this={scrollAnimatedElements[2].element}>
		<h1>Welcome to my <span class="highlight" style="--highlight-dark: #532a85; --highlight-light: #7347a8;">personal website</span></h1>
		<span class="subtitle">This is where you can find <span class="highlight" style="--highlight-light: #cc50ab; --highlight-dark: #b84098;">cool stuff</span> I make</span>
	</div>
</ContentSection>

<ContentSection id="greeting-section">
	<div slot="bg" id="greeting-bg">
	</div>
	<div slot="content" id="greeting-content">
		<h2>Greetings!</h2>
		<span>And welcome to this fine website made just for me!</span>
	</div>
</ContentSection>

<svelte:head>
	<title>My personal website</title>
</svelte:head>

<style>
	:global(.highlight) {
		display: inline-block;
		transition: 0.125s ease;
	}

	:global(.highlight:hover) {
		filter: brightness(1.2);
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

	:global(.content-section) {
		padding: 8vh 8vw;
		font-size: 1.5em;
	}

	h1 {
		font-size: 2em;
	}

	:global(#hero-section) {
		height: 100%;
	}

	#hero-bg {
		max-height: 100%;
		overflow: hidden;
		position: fixed;
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
		/* background-color: #00000050; */
	}
	
	#hero-content {
		display: flex;
		align-items: center;
		justify-content: flex-start;
		flex-direction: column;
		padding-top: 25vh;
		gap: 1em;
		height: 100%;
		position: relative;
	}

	#hero-content .subtitle {
		opacity: .6;
	}

	:global(#hero-content *) {
		will-change: transform;
        text-align: center;
	}

	:global(#greeting-section) {
		color: white;
	}

	#greeting-bg {
		background-color: #ffffffea;
		box-shadow: 0 -2px 18px #00000086;
		border-top-left-radius: 8px;
		border-top-right-radius: 8px;
	}

	#greeting-content {
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		gap: 2em;
		color: black;
	}

	#greeting-content span {
		opacity: .6;
	}
</style>