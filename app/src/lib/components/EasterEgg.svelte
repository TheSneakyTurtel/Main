<script lang="ts">
    import { onDestroy, onMount } from "svelte";
    import { clamp, lerp } from "../utils/math";

    import bgmURL from "../../../assets/audio/easter-egg.bgm.mp3?url";

    import absi1 from "../../../assets/backgrounds/easter-egg/absi-1.webp?url";
    import absi2 from "../../../assets/backgrounds/easter-egg/absi-2.webp?url";
    import absi3 from "../../../assets/backgrounds/easter-egg/absi-3.webp?url";

    const disappearClass = "disappear";
    const openCloseDuration = 500;

    let el: HTMLElement;
    let rightArrow: SVGElement;
    let bgm: HTMLAudioElement;

    let lastMouseDownData: {
        mouseX: number;
        time: number;
    } | undefined;

    onMount(() => {
        window.addEventListener("pointermove", pointerMove);
        document.body.addEventListener("scroll", scroll, { passive: true });
    });

    onDestroy(() => {
        bgm.pause();
        bgm = undefined;

        window.removeEventListener("pointermove", pointerMove);
        document.body.removeEventListener("scroll", scroll);
    });

    function scroll() {
        const disappear = document.body.scrollTop > 0;
        
        disappear && toggleIsOpen(false);
        el.classList.toggle(disappearClass, disappear);
    }

    function pointerDown(ev: PointerEvent) {
        lastMouseDownData = { mouseX: ev.clientX, time: performance.now() };

        toggleBGM(true);
        bgm.volume = 0;
        
        window.addEventListener("pointerup", pointerUp, { once: true });
    }

    function pointerMove(ev: PointerEvent) {
        if (!lastMouseDownData) return;

        const right = clamp(ev.clientX - lastMouseDownData.mouseX, 0, window.innerWidth);
        bgm.volume = right / window.innerWidth;

        el.style.left = `${right - window.innerWidth}px`;
        el.style.setProperty("--is-opening", right > 0 ? "1" : "0");
    }

    function pointerUp() {
        const doOpen = parseFloat(getComputedStyle(el).left) + window.innerWidth > 200;
        const click = performance.now() - lastMouseDownData.time < 140;

        click && showArrow();
        lastMouseDownData = undefined;
        el.style.setProperty("--is-opening", "0");

        toggleBGM(doOpen, { targetVolume: doOpen ? 1 : 0 });
        toggleIsOpen(doOpen);
    }

    // HELPER FUNCTIONS

    function showArrow() {
        const showClass = "show";

        rightArrow.classList.add(showClass);
        rightArrow.addEventListener("animationend", () => rightArrow.classList.remove(showClass));
    }

    function toggleBGM(forcePlaying?: boolean, animation?: { targetVolume: number }) {
        forcePlaying == null && toggleBGM(bgm.paused, animation);

        let timingFunction: (x: number) => number;
        let animationEndCb: () => void | undefined;

        if (!forcePlaying) {
            if (!animation) return bgm.pause();

            timingFunction = x => 1 - x;
            animationEndCb = () => bgm.pause();
        } else {
            bgm = bgm || new Audio(bgmURL);
            bgm.loop = true;
            bgm.paused && bgm.play();

            timingFunction = x => x;
        }

        if (!animation) return;

        const from = bgm.volume;
        const to = animation.targetVolume;

        const update = (time: number, startTime: number) => {
            const deltaTimeSinceStart = time - startTime;
            const progress = deltaTimeSinceStart / openCloseDuration;

            bgm.volume = clamp(lerp(from, to, timingFunction(progress)), from, to);

            deltaTimeSinceStart < openCloseDuration ? requestAnimationFrame(newTime => update(newTime, startTime)) : animationEndCb?.();
        }

        requestAnimationFrame(time => update(time, time));
    }

    function toggleIsOpen(forceOpen?: boolean) {
        const openValue = "0";
        const closeValue = "-100%";
        const currentlyOpen = el.style.left === openValue;

        if (forceOpen == null) return toggleIsOpen(!currentlyOpen);

        el.style.left = forceOpen ? openValue : closeValue;
        bgm && toggleBGM(forceOpen, { targetVolume: forceOpen ? 1 : 0 });

        el.style.transitionDuration = `${openCloseDuration}ms`;
        el.addEventListener("transitionend", () => el.style.transitionDuration = "", { once: true });
    }
</script>

<div class="easter-egg" bind:this={el} role="none">
    <div class="handle" on:pointerdown={pointerDown}></div>
    <svg bind:this={rightArrow} focusable="false" xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="white" class="right-arrow" viewBox="0 0 16 16">
        <path fill-rule="evenodd" d="M6 8a.5.5 0 0 0 .5.5h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 0 0-.708.708L12.293 7.5H6.5A.5.5 0 0 0 6 8zm-2.5 7a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 1 0v13a.5.5 0 0 1-.5.5z"/>
    </svg>

    <main>
        <button type="button" class="x" on:pointerdown={(ev) => ev.button === 0 && toggleIsOpen(false)} title="Close">
            <svg width="32" height="32" viewBox="0 0 32 32" fill="black" focusable="false" role="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.292 9.29196C9.38489 9.19883 9.49524 9.12494 9.61673 9.07453C9.73822 9.02412 9.86847 8.99817 10 8.99817C10.1315 8.99817 10.2618 9.02412 10.3833 9.07453C10.5048 9.12494 10.6151 9.19883 10.708 9.29196L16 14.586L21.292 9.29196C21.385 9.19898 21.4954 9.12523 21.6168 9.07491C21.7383 9.02459 21.8685 8.99869 22 8.99869C22.1315 8.99869 22.2617 9.02459 22.3832 9.07491C22.5046 9.12523 22.615 9.19898 22.708 9.29196C22.801 9.38493 22.8747 9.49531 22.925 9.61679C22.9754 9.73827 23.0013 9.86847 23.0013 9.99996C23.0013 10.1314 22.9754 10.2616 22.925 10.3831C22.8747 10.5046 22.801 10.615 22.708 10.708L17.414 16L22.708 21.292C22.801 21.3849 22.8747 21.4953 22.925 21.6168C22.9754 21.7383 23.0013 21.8685 23.0013 22C23.0013 22.1314 22.9754 22.2616 22.925 22.3831C22.8747 22.5046 22.801 22.615 22.708 22.708C22.615 22.8009 22.5046 22.8747 22.3832 22.925C22.2617 22.9753 22.1315 23.0012 22 23.0012C21.8685 23.0012 21.7383 22.9753 21.6168 22.925C21.4954 22.8747 21.385 22.8009 21.292 22.708L16 17.414L10.708 22.708C10.615 22.8009 10.5046 22.8747 10.3832 22.925C10.2617 22.9753 10.1315 23.0012 10 23.0012C9.86851 23.0012 9.73831 22.9753 9.61683 22.925C9.49535 22.8747 9.38498 22.8009 9.292 22.708C9.19902 22.615 9.12527 22.5046 9.07495 22.3831C9.02463 22.2616 8.99874 22.1314 8.99874 22C8.99874 21.8685 9.02463 21.7383 9.07495 21.6168C9.12527 21.4953 9.19902 21.3849 9.292 21.292L14.586 16L9.292 10.708C9.19887 10.6151 9.12499 10.5047 9.07457 10.3832C9.02416 10.2617 8.99821 10.1315 8.99821 9.99996C8.99821 9.86842 9.02416 9.73818 9.07457 9.61669C9.12499 9.4952 9.19887 9.38485 9.292 9.29196Z" fill="black" />
            </svg>
        </button>

        <slot name="content">
            <img class="absi absi-1" src={absi1} alt="" />
            <img class="absi absi-2" src={absi2} alt="" />
            <img class="absi absi-3" src={absi3} alt="" />
        </slot>
    </main>
</div>

<style>
    .easter-egg {
		position: fixed;
		width: 100%;
		height: 100%;
		left: -100%;
		top: 0;
        transition: left 0.05s ease-out, opacity 0.1s ease-out;
        isolation: isolate;
        z-index: 9999;
        --handle-width: 1em;
	}

    .easter-egg::after {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: white;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        box-shadow: 2px 0 16px hsla(0, 0%, 0%, var(--is-opening));
        z-index: -1;
        transition: box-shadow 0.2s ease-out;
    }

    :global(.easter-egg.disappear) {
        opacity: 0;
        pointer-events: none;
    }

    .handle, .right-arrow {
        position: absolute;
        top: 50%;
        left: 100%;
        transform: translateY(-50%);
    }

    .handle {
        width: var(--handle-width);
        height: 3em;
        background-color: white;
        opacity: 0.2;
        border-top-right-radius: 5px;
        border-bottom-right-radius: 5px;
        transition: opacity 0.05s ease-out;
    }

    .right-arrow {
        pointer-events: none;
        opacity: 0;
    }

    :global(.right-arrow.show) {
        animation: arrow 0.5s ease-out;
    }

    .handle:hover {
        opacity: 0.4;
    }

    .handle:active {
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
        width: 100%;
        height: 100%;
        overflow: hidden;
        position: relative;
        display: grid;
        padding: 2em;
        grid-template-columns: repeat(2, minmax(0, 1fr));
    }

    :global(main > .absi) {
        width: 100%;
        height: 100%;
        object-fit: contain;
        min-height: 0px;
    }

    :global(main > .absi-3) {
        grid-column: span 2;
    }

    @keyframes arrow {
        from {
            opacity: 0;
            left: calc(100% + var(--handle-width) + 0.5em);
        }

        50% {
            opacity: 1;
        }

        to {
            opacity: 0;
            left: calc(100% + var(--handle-width) + 1.5em);
        }
    }
</style>