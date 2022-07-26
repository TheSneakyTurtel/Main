<script lang="ts">
    import { clamp, lerp } from "../utils/math";
    import bgmURL from "../../../static/audio/easter-egg.bgm.mp3";
    import AbsiHeaven from "./AbsiHeaven.svelte";

    const disappearClass = "disappear";
    const openCloseDuration = 500;

    let el: HTMLElement, handle: HTMLElement, rightArrow: SVGElement, bgm: HTMLAudioElement;

    let mouseData: {
        mouseX: number;
        mouseY: number;
    } | undefined;

    function scroll() {
        const disappear = document.body.scrollTop > 0;
        
        disappear && setOpenedState(false);
        el.classList.toggle(disappearClass, disappear);
    }

    function pointerDown(ev: PointerEvent) {
        mouseData = { mouseX: ev.clientX, mouseY: ev.clientY };

        toggleBGM(true, { targetVolume: 0 });
        showArrow();
        
        window.addEventListener("pointerup", pointerUp, { once: true });
    }

    function pointerMove(ev: PointerEvent) {
        if (!mouseData) return;

        const bottom = clamp(ev.clientY - mouseData.mouseY, 0, window.innerHeight);

        bgm.volume = bottom / window.innerHeight;

        el.style.setProperty("--bottom", `${bottom}px`);
        el.style.setProperty("--is-opening", bottom > 0 ? "1" : "0");
    }

    function pointerUp() {
        const doOpen = el.getBoundingClientRect().bottom > 200;

        mouseData = undefined;
        el.style.setProperty("--is-opening", "0");

        setOpenedState(doOpen);
    }

    // HELPER FUNCTIONS

    function showArrow() {
        const showClass = "show";

        rightArrow.classList.add(showClass);
        rightArrow.addEventListener("animationend", () => rightArrow.classList.remove(showClass));
    }

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

        if (!forcePlaying) {
            if (!animation) return bgm.pause();

            animationEndCb = () => bgm.pause();
        } else {
            bgm = bgm || new Audio(bgmURL);
            bgm.loop = true;
            bgm.paused && bgm.play();
        }

        animation && animateBGMVolume(animation.targetVolume).then(animationEndCb);
    }

    function setOpenedState(newOpenState: boolean, updateBGM?: boolean) {
        el.style.setProperty("--bottom", newOpenState ? "0" : "");
        bgm && updateBGM !== false && toggleBGM(newOpenState, { targetVolume: newOpenState ? 1 : 0 });

        el.style.transitionDuration = `${openCloseDuration}ms`;
        el.addEventListener("transitionend", () => el.style.transitionDuration = "", { once: true });
    }
</script>

<svelte:window on:pointermove={pointerMove} />
<svelte:body on:scroll|passive={scroll} />

<div class="easter-egg" bind:this={el} role="none">
    <div bind:this={handle} class="handle" on:pointerdown={pointerDown}></div>
    <svg bind:this={rightArrow} focusable="false" xmlns="http://www.w3.org/2000/svg" fill="white" class="arrow" width="32" height="32" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M1 3.5a.5.5 0 0 1 .5-.5h13a.5.5 0 0 1 0 1h-13a.5.5 0 0 1-.5-.5zM8 6a.5.5 0 0 1 .5.5v5.793l2.146-2.147a.5.5 0 0 1 .708.708l-3 3a.5.5 0 0 1-.708 0l-3-3a.5.5 0 0 1 .708-.708L7.5 12.293V6.5A.5.5 0 0 1 8 6z"/>
    </svg>
    <button type="button" class="x" on:pointerdown={(ev) => ev.button === 0 && setOpenedState(false)} title="Close">
        <svg width="32" height="32" viewBox="0 0 32 32" fill="black" focusable="false" role="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.292 9.29196C9.38489 9.19883 9.49524 9.12494 9.61673 9.07453C9.73822 9.02412 9.86847 8.99817 10 8.99817C10.1315 8.99817 10.2618 9.02412 10.3833 9.07453C10.5048 9.12494 10.6151 9.19883 10.708 9.29196L16 14.586L21.292 9.29196C21.385 9.19898 21.4954 9.12523 21.6168 9.07491C21.7383 9.02459 21.8685 8.99869 22 8.99869C22.1315 8.99869 22.2617 9.02459 22.3832 9.07491C22.5046 9.12523 22.615 9.19898 22.708 9.29196C22.801 9.38493 22.8747 9.49531 22.925 9.61679C22.9754 9.73827 23.0013 9.86847 23.0013 9.99996C23.0013 10.1314 22.9754 10.2616 22.925 10.3831C22.8747 10.5046 22.801 10.615 22.708 10.708L17.414 16L22.708 21.292C22.801 21.3849 22.8747 21.4953 22.925 21.6168C22.9754 21.7383 23.0013 21.8685 23.0013 22C23.0013 22.1314 22.9754 22.2616 22.925 22.3831C22.8747 22.5046 22.801 22.615 22.708 22.708C22.615 22.8009 22.5046 22.8747 22.3832 22.925C22.2617 22.9753 22.1315 23.0012 22 23.0012C21.8685 23.0012 21.7383 22.9753 21.6168 22.925C21.4954 22.8747 21.385 22.8009 21.292 22.708L16 17.414L10.708 22.708C10.615 22.8009 10.5046 22.8747 10.3832 22.925C10.2617 22.9753 10.1315 23.0012 10 23.0012C9.86851 23.0012 9.73831 22.9753 9.61683 22.925C9.49535 22.8747 9.38498 22.8009 9.292 22.708C9.19902 22.615 9.12527 22.5046 9.07495 22.3831C9.02463 22.2616 8.99874 22.1314 8.99874 22C8.99874 21.8685 9.02463 21.7383 9.07495 21.6168C9.12527 21.4953 9.19902 21.3849 9.292 21.292L14.586 16L9.292 10.708C9.19887 10.6151 9.12499 10.5047 9.07457 10.3832C9.02416 10.2617 8.99821 10.1315 8.99821 9.99996C8.99821 9.86842 9.02416 9.73818 9.07457 9.61669C9.12499 9.4952 9.19887 9.38485 9.292 9.29196Z" fill="black" />
        </svg>
    </button>

    <main>
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

    .easter-egg {
		position: fixed;
		width: 100%;
		height: 100%;
		left: 0;
		top: 0;
        display: flex;
        justify-content: center;
        align-items: center;
        isolation: isolate;
        z-index: 9999;
        transform: translateY(calc(var(--bottom, 0px) - 100%));
        will-change: transform;
        isolation: isolate;
        --handle-width: 60px;
        --handle-height: 30px;
        transition: opacity 0.01s ease-out;
	}

    :global(.easter-egg.disappear) {
        opacity: 0;
        pointer-events: none;
        transition: opacity 0.5s ease-out;
    }

    .easter-egg::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: white;
        border-bottom-left-radius: 5px;
        border-bottom-right-radius: 5px;
        box-shadow: 2px 0 16px hsla(0, 0%, 0%, var(--is-opening));
        z-index: -2;
        transition: box-shadow 0.2s ease-out;
    }

    .handle, .arrow {
        position: absolute;
        right: 2em;
        top: 100%;
        transform: translateX(-100%);
    }

    .handle {
        width: var(--handle-width);
        height: var(--handle-height);
        border-bottom-right-radius: 5px;
        border-bottom-left-radius: 5px;
        top: 100%;
        background-color: white;
        opacity: calc(var(--is-opening, 0) * 0.8 + 0.2);
        transition: opacity 0.05s ease-out;
    }

    .arrow {
        pointer-events: none;
        opacity: 0;
    }

    :global(.arrow.show) {
        animation: arrow 0.5s ease-out;
    }

    .handle:hover {
        opacity: 0.4;
    }

    .handle:is(:active, :focus-visible) {
        opacity: 1;
    }

    .x {
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

    .x:hover {
        opacity: 0.5;
    }

    main {
        z-index: -1;
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

    @keyframes arrow {
        from {
            opacity: 0;
            transform: translate(calc(var(--handle-width) * -1.25), calc(var(--handle-height) + 0.5em));
        }

        50% {
            opacity: 1;
        }

        to {
            opacity: 0;
            transform: translate(calc(var(--handle-width) * -1.25), calc(var(--handle-height) + 1.5em));
        }
    }
</style>