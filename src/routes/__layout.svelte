<script context="module" lang="ts">
	export const load: import("@sveltejs/kit").Load = async ({ url: { pathname } }) => ({
		props: { pathname },
	});
</script>

<script lang="ts">
	import Navbar from "../lib/components/Navbar.svelte";
    import PageTransition from "../lib/components/PageTransition.svelte";

	export let pathname: string;

    const navbarLinks: { [key: string]: string } = {
        "/": "Landing Page",
        "/works": "Works",
    };
</script>

<div id="layout">
    <Navbar links={navbarLinks} {pathname} />
	<PageTransition {pathname}>
		<slot />
	</PageTransition>
</div>

<style>
	#layout {
		width: 100%;
		height: 100%;
        max-height: 100%;
		margin: 0 auto;
        position: relative;
	}
</style>
