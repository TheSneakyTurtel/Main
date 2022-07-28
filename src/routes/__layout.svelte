<script context="module" lang="ts">
	export const load: import("@sveltejs/kit").Load = async ({ url: { pathname } }) => ({
		props: { pathname },
	});
</script>

<script lang="ts">
	import PageTransition from "../lib/components/PageTransition.svelte";

	export let pathname: string;

    const navbarItems: { [key: string]: string } = {
        "/": "Landing Page",
        "/works": "Works",
    }

    $: navbarItemsEntries = Object.entries(navbarItems);
</script>

<div id="layout">
	<nav class="navbar">
        {#each navbarItemsEntries as navbarItemEntry (navbarItemEntry[0])}
            {@const active = pathname === navbarItemEntry[0]}
		    <a href={navbarItemEntry[0]} tabindex={active ? -1 : 0} disabled={active}>{navbarItemEntry[1]}</a>
        {/each}
	</nav>

	<PageTransition {pathname}>
		<slot />
	</PageTransition>
</div>

<style>
    .navbar {
        position: absolute;
        top: 1em;
        left: 50%;
        transform: translateX(-50%);
        border-radius: 999px;
        z-index: 100;
        padding: 1.25em 2em;
        background-color: #ffffffd0;
        box-shadow: 0 2px 12px #00000030;
        display: flex;
        font-size: 0.85em;
        gap: 2em;
    }

    .navbar a {
        line-height: 1;
        text-decoration: none;
        color: black;
        opacity: .5;
        transition: 0.1s ease-out;
    }

    .navbar a[disabled="true"] {
        cursor: default;
        opacity: .95 !important;
        font-weight: bold;
    }

    .navbar a[disabled="false"]:hover {
        opacity: .7;
    }

    .navbar a[disabled="false"]:active {
        opacity: .85;
    }

	#layout {
		width: 100%;
		height: 100%;
        max-height: 100%;
		margin: 0 auto;
        position: relative;
	}
</style>
