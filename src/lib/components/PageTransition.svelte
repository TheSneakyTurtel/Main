<script lang="ts">
	import { fade, type FadeParams } from "svelte/transition";
    import { quintOut } from "svelte/easing";

	export let pathname = "";

    const transitionSettings: FadeParams = {
        duration: 350,
        easing: quintOut,
    };
</script>

{#key pathname}
	<div class="page" transition:fade={transitionSettings}>
		<slot />
	</div>
{/key}

<style>
    .page {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        max-height: 100%;
        overflow: hidden auto;
    }
</style>
