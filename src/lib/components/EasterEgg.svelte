<script lang="ts">
    import { clamp, lerp } from "../utils/math";
    import bgmURL from "../../../static/audio/easter-egg.bgm.mp3";
    import AbsiHeaven from "./AbsiHeaven.svelte";

    import chainImg from "../../../static/environment/easter-egg/chain.webp";
    import handleImg from "../../../static/environment/easter-egg/handle.webp";

    const disappearClass = "disappear";
    const openCloseDuration = 500;

    let el: HTMLElement, bgm: HTMLAudioElement;
    let open: boolean;

    function handleScroll() {
        const disappear = document.body.scrollTop > 0;
        
        disappear && toggleOpenState(false, false);
        el.classList.toggle(disappearClass, disappear);
    }

    function handleClick() {
        toggleOpenState(true, true);
    }

    // HELPER FUNCTIONS

    function animateBGMVolume(targetVolume: number) {
        return new Promise<void>(resolve => {
            const from = bgm.volume;
            const to = targetVolume;

            if (from === to) return resolve();

            const invDuration = 1 / openCloseDuration;

            const update = (time: number, startTime: number) => {
                const deltaTimeSinceStart = time - startTime;
                const newValue = deltaTimeSinceStart * invDuration;

                bgm.volume = lerp(from, to, clamp(newValue, 0, 1));

                if ((from < to && bgm.volume >= to) || (from > to && bgm.volume <= to)) return resolve();

                requestAnimationFrame(newTime => update(newTime, startTime));
            }

            requestAnimationFrame(time => update(time, time));
        })
    }

    function toggleBGM(forcePlaying: boolean, animation?: { targetVolume: number }) {
        let animationEndCb: (() => void) | undefined;

        if (!forcePlaying) animationEndCb = () => bgm.pause();
        else {
            bgm = bgm || new Audio(bgmURL);
            bgm.loop = true;
            bgm.paused && bgm.play();
        }

        animation ? animateBGMVolume(animation.targetVolume).then(animationEndCb) : animationEndCb?.();
    }

    function toggleOpenState(newOpenState: boolean, updateBGM?: boolean) {
        updateBGM !== false && toggleBGM(newOpenState, { targetVolume: newOpenState ? 1 : 0 });

        el.classList.toggle("open", open = newOpenState);
    }
</script>

<svelte:body on:scroll|passive={handleScroll} />

<div class="easter-egg" bind:this={el}>
    <button tabindex={open ? 0 : -1} type="button" class="x" on:click={(ev) => ev.button === 0 && toggleOpenState(false)} title="Close">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="black" focusable="false" role="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.292 9.29196C9.38489 9.19883 9.49524 9.12494 9.61673 9.07453C9.73822 9.02412 9.86847 8.99817 10 8.99817C10.1315 8.99817 10.2618 9.02412 10.3833 9.07453C10.5048 9.12494 10.6151 9.19883 10.708 9.29196L16 14.586L21.292 9.29196C21.385 9.19898 21.4954 9.12523 21.6168 9.07491C21.7383 9.02459 21.8685 8.99869 22 8.99869C22.1315 8.99869 22.2617 9.02459 22.3832 9.07491C22.5046 9.12523 22.615 9.19898 22.708 9.29196C22.801 9.38493 22.8747 9.49531 22.925 9.61679C22.9754 9.73827 23.0013 9.86847 23.0013 9.99996C23.0013 10.1314 22.9754 10.2616 22.925 10.3831C22.8747 10.5046 22.801 10.615 22.708 10.708L17.414 16L22.708 21.292C22.801 21.3849 22.8747 21.4953 22.925 21.6168C22.9754 21.7383 23.0013 21.8685 23.0013 22C23.0013 22.1314 22.9754 22.2616 22.925 22.3831C22.8747 22.5046 22.801 22.615 22.708 22.708C22.615 22.8009 22.5046 22.8747 22.3832 22.925C22.2617 22.9753 22.1315 23.0012 22 23.0012C21.8685 23.0012 21.7383 22.9753 21.6168 22.925C21.4954 22.8747 21.385 22.8009 21.292 22.708L16 17.414L10.708 22.708C10.615 22.8009 10.5046 22.8747 10.3832 22.925C10.2617 22.9753 10.1315 23.0012 10 23.0012C9.86851 23.0012 9.73831 22.9753 9.61683 22.925C9.49535 22.8747 9.38498 22.8009 9.292 22.708C9.19902 22.615 9.12527 22.5046 9.07495 22.3831C9.02463 22.2616 8.99874 22.1314 8.99874 22C8.99874 21.8685 9.02463 21.7383 9.07495 21.6168C9.12527 21.4953 9.19902 21.3849 9.292 21.292L14.586 16L9.292 10.708C9.19887 10.6151 9.12499 10.5047 9.07457 10.3832C9.02416 10.2617 8.99821 10.1315 8.99821 9.99996C8.99821 9.86842 9.02416 9.73818 9.07457 9.61669C9.12499 9.4952 9.19887 9.38485 9.292 9.29196Z" fill="black" />
        </svg>
    </button>

    <button tabindex={open ? -1 : 0} class="handle-container" aria-label="Show easter egg" on:click={handleClick}>
        <img class="chain" role="none" src={chainImg} alt="" />
        <img class="handle" src={handleImg} alt="" role="none" />
    </button>

    <main role="none" aria-hidden="true">
        <slot name="content">
            {#key bgm != null}
                <AbsiHeaven bgm={bgm} />
            {/key}
        </slot>
    </main>
</div>

<style>
    *:not(.handle, main) {
        touch-action: none;
    }

    .easter-egg, .easter-egg::after {
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
    }

    .easter-egg {
		position: absolute;
        display: flex;
        justify-content: center;
        align-items: center;
        isolation: isolate;
        z-index: 50;
        transform: translateY(-100%);
        will-change: transform;
        transition: transform 2s cubic-bezier(0.23, 1, 0.320, 1), opacity 0.65s 0.45s ease-out;
	}

    :global(.easter-egg.open) {
        transform: translateY(0);
    }

    :global(.easter-egg.disappear) {
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.1s ease-out;
    }

    .easter-egg::after {
        content: "";
        position: absolute;
        background-color: white;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        box-shadow: 2px 0 16px hsla(0, 0%, 0%, var(--is-opening));
        z-index: -1;
        transition: box-shadow 0.2s ease-out;
    }

    .handle-container {
        z-index: -2;
        position: absolute;
        transform: translate(-100%, -50%);
        right: 5vw;
        top: 100%;
        padding: 0;
        line-height: 0;
        background-color: transparent;
        cursor: grab;
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
        align-items: center;
        transition: transform 0.5s cubic-bezier(0.23, 1, 0.320, 1);
    }

    .handle-container:hover {
        transform: translate(-100%, -20%);
    }

    .handle-container:active {
        transform: translateX(-100%);
        cursor: grabbing;
    }

    .handle {
        transform: translateY(-50%);
        z-index: 1;
    }

    :global(.easter-egg.open .handle-container) {
        transform: translate(-100%, -100%);
    }

    .x {
        z-index: 1;
        position: absolute;
        top: 2em;
        right: 2em;
        line-height: 0;
        border: none;
        outline: none;
        background-color: transparent;
        cursor: pointer;
        opacity: 0.25;
        transition: 0.1s ease-out;
    }

    .x:is(:hover, :focus-visible) {
        opacity: 0.5;
    }

    main {
        max-width: 100%;
        max-height: 100%;
        overflow: hidden;
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-auto-rows: 1fr;
        align-items: center;
        justify-content: space-between;
        gap: 4vw;
        padding: 4vw;
        overflow: hidden auto;
    }
</style>