<script lang="ts">
	import ContentSection from "../lib/components/ContentSection.svelte";
	import EasterEgg from "../lib/components/EasterEgg.svelte";

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
		<img class="far" alt="" bind:this={scrollAnimatedElements[0].element} srcset="../../static/backgrounds/hero/far.w600.webp 600w, ../../static/backgrounds/hero/far.w1920.webp" sizes="(max-width: 800px) 600px, 1920px" />
		<img class="near" alt="" bind:this={scrollAnimatedElements[1].element} srcset="../../static/backgrounds/hero/near.w600.webp 600w, ../../static/backgrounds/hero/near.w1920.webp" sizes="(max-width: 800px) 600px, 1920px" />
	</div>
	<div slot="content" id="hero-content" bind:this={scrollAnimatedElements[2].element}>
		<h1>Welcome to my <span class="highlight full-opacity" style="--highlight-dark: #532a85; --highlight-light: #7347a8;">personal website</span></h1>
		<span class="subtitle">This is where you can find <span class="highlight full-opacity" style="--highlight-light: #cc50ab; --highlight-dark: #b84098;">cool stuff</span> I make</span>
	</div>
</ContentSection>

<ContentSection id="greeting-section">
	<div slot="bg" id="greeting-bg" />
	<div slot="content" id="greeting-content">
		<section class="greeting">
			<h2>Greetings!</h2>
			<span>And welcome to this awesome website!</span>
		</section>
		<section class="short-qna">
			<section tabindex="0">
				<h3>What's this website for?</h3>
				<p>for showcasing my masterpieces</p>
			</section>
			<section tabindex="0">
				<h3>Is this website finished?</h3>
				<p>the website is currently in early access</p>
			</section>
		</section>
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

	:global(body.dark-mode #hero-bg) {
		filter: brightness(.25);
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

	:global(body.dark-mode #hero-content) {
		color: white;
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
		background-image: linear-gradient(to top, #fff 50px, #ffffffea);
		box-shadow: 0 -2px 18px #00000086;
		border-top-left-radius: 8px;
		border-top-right-radius: 8px;
		transition: 0.1s ease-out;
	}

	:global(body.dark-mode #greeting-bg) {
		filter: brightness(0.1);
	}

	#greeting-content {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		gap: 4em 4em;
		color: black;
		transition: 0.1s ease-out;
	}

	:global(body.dark-mode #greeting-content) {
		color: white !important;
	}

	#greeting-content .greeting {
		display: flex;
		flex-direction: column;
		gap: 1em;
	}

	#greeting-content .short-qna {
		display: flex;
		flex-wrap: wrap;
		flex-direction: column;
		gap: 2em;
	}

	#greeting-content .short-qna > * {
		background-color: #f0f2f5;
		padding: 1.5em;
		border-radius: 5px;
		box-shadow: 0 1px 4px #00000020;
		transition: 0.1s ease-out;
	}

	:global(body.dark-mode #greeting-content .short-qna > *) {
		background-color: #494b4e !important;
	}

	#greeting-content .short-qna * {
		line-height: 1;
		transition: line-height 0.2s ease-out, opacity 0.1s ease-out, margin-top 0.2s, color 0.1s ease-out;
	}

	#greeting-content .short-qna > * * + * {
		margin-top: 1em;
	}

	#greeting-content .short-qna > *:not(:is(:hover, :focus-visible)) p {
		line-height: 0;
		opacity: 0;
		margin-top: 0;
	}
</style>