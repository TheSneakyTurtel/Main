<script lang="ts">
    import absi1 from "../../../static/backgrounds/easter-egg/absi-1.webp";
    import absi2 from "../../../static/backgrounds/easter-egg/absi-2.webp";
    import absi3 from "../../../static/backgrounds/easter-egg/absi-3.webp";
    import absi4 from "../../../static/backgrounds/easter-egg/absi-4.webp";

    import { onMount } from "svelte";

    export let bgm: HTMLAudioElement;
    let dependencies: VisualizerDependencies;

    const absis: HTMLImageElement[] = [];

    onMount(() => {
        bgm && bgm.addEventListener("play", () => {
            dependencies = dependencies || configure();
            update(dependencies);
        });
    });

    function update(dependencies: VisualizerDependencies) {
        const sample = new Uint8Array(dependencies.analyser.frequencyBinCount);
        dependencies.analyser.getByteFrequencyData(sample);

        if (absis && absis.length) for (let i = 0; i < absis.length; i++) {
            const value = sample[i] / 256;
            absis[i].style.setProperty("--value", value.toString());
        }

        requestAnimationFrame(() => update(dependencies));
    }

    function configure(): VisualizerDependencies {
        const audioContext = new AudioContext();
        const audioSource = audioContext.createMediaElementSource(bgm);
        const analyser = audioContext.createAnalyser();

        audioSource.connect(analyser);
        analyser.connect(audioContext.destination);

        analyser.fftSize = 128;

        return { audioContext, audioSource, analyser };
    }

    interface VisualizerDependencies {
        audioContext: AudioContext;
        audioSource: MediaElementAudioSourceNode;
        analyser: AnalyserNode;
    }
</script>

<img aria-hidden="true" role="none" class="absi absi-1" bind:this={absis[0]} src={absi1} alt="" />
<img aria-hidden="true" role="none" class="absi absi-2" bind:this={absis[1]} src={absi2} alt="" />
<img aria-hidden="true" role="none" class="absi absi-3" bind:this={absis[2]} src={absi3} alt="" />
<img aria-hidden="true" role="none" class="absi absi-1" bind:this={absis[3]} src={absi4} alt="" />

<style>
    .absi {
        flex: 0 1 auto;
        width: 320px;
        max-width: 100%;
        max-height: 100%;
        object-fit: contain;
        transform: scale(calc(.75 + var(--value) * 0.25));
        transition: transform 0.15s ease-out;
        will-change: transform;
    }
</style>