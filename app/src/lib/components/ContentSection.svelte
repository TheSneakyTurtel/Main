<script lang="ts">
    export let id: string | undefined = undefined;
</script>

<section class="content-section" {id}>
    <slot />
    <div class="bg-container"><slot name="bg" class="bg" /></div>
    <slot name="content" class="content" />
</section>

<style>
    .content-section {
        width: 100%;
        isolation: isolate;
        position: relative;
        text-align: center;
    }

    :global(.bg-container *, .bg-container) {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        background-size: cover;
        background-position: center center;
    }
</style>