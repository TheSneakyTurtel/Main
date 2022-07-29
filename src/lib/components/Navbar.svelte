<script lang="ts">
    export let links: { [key: string]: string };
    export let pathname: string;

    let darkMode: boolean;

    $: linkEntries = Object.entries(links);

    function toggleDarkMode() {
        darkMode = document.body.classList.toggle("dark-mode");
    }
</script>

<nav id="main-navigation">
    <section class="links">
        {#each linkEntries as linkEntry (linkEntry[0])}
            {@const active = pathname === linkEntry[0]}
            <a href={linkEntry[0]} tabindex={active ? -1 : 0} disabled={active}>{linkEntry[1]}</a>
        {/each}
    </section>
    <section class="options">
        <button class="option" title="Toggle Dark Mode" on:click={toggleDarkMode}>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                <path class="{darkMode ? "hide" : ""}" d="M6 .278a.768.768 0 0 1 .08.858 7.208 7.208 0 0 0-.878 3.46c0 4.021 3.278 7.277 7.318 7.277.527 0 1.04-.055 1.533-.16a.787.787 0 0 1 .81.316.733.733 0 0 1-.031.893A8.349 8.349 0 0 1 8.344 16C3.734 16 0 12.286 0 7.71 0 4.266 2.114 1.312 5.124.06A.752.752 0 0 1 6 .278z"/>
                <path class="{!darkMode ? "hide" : ""}" style="position: absolute" d="M8 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8zM8 0a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 0zm0 13a.5.5 0 0 1 .5.5v2a.5.5 0 0 1-1 0v-2A.5.5 0 0 1 8 13zm8-5a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2a.5.5 0 0 1 .5.5zM3 8a.5.5 0 0 1-.5.5h-2a.5.5 0 0 1 0-1h2A.5.5 0 0 1 3 8zm10.657-5.657a.5.5 0 0 1 0 .707l-1.414 1.415a.5.5 0 1 1-.707-.708l1.414-1.414a.5.5 0 0 1 .707 0zm-9.193 9.193a.5.5 0 0 1 0 .707L3.05 13.657a.5.5 0 0 1-.707-.707l1.414-1.414a.5.5 0 0 1 .707 0zm9.193 2.121a.5.5 0 0 1-.707 0l-1.414-1.414a.5.5 0 0 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .707zM4.464 4.465a.5.5 0 0 1-.707 0L2.343 3.05a.5.5 0 1 1 .707-.707l1.414 1.414a.5.5 0 0 1 0 .708z"/>
            </svg>
        </button>
    </section>
</nav>

<style>
    #main-navigation {
        position: absolute;
        top: 1em;
        left: 50%;
        transform: translateX(-50%);
        z-index: 100;
        font-size: 0.85em;
        display: flex;
        gap: 2em;
    }

    #main-navigation > * {
        border-radius: 999px;
        background-color: #ffffffd0;
        box-shadow: 0 2px 12px #00000030;
        padding: 1.25em 2em;
        display: flex;
        align-items: center;
        gap: 2em;
        transition: 0.1s ease-out;
    }

    :global(body.dark-mode #main-navigation > *) {
        background-color: #121316d0 !important;
    }

    #main-navigation * {
        line-height: 1;
    }

    #main-navigation .options .option {
        background-color: transparent;
        position: relative;
        padding: 0;
        border: none;
        cursor: pointer;
        transition: 0.1s ease-out;
        color: black;
    }

    :global(body.dark-mode #main-navigation .options .option) {
        color: white !important;
    }

    #main-navigation .options .option * {
        transition: 0.1s ease-out;
    }

    #main-navigation .options .option *.hide {
        opacity: 0;
    }

    #main-navigation a {
        text-decoration: none;
        opacity: .5;
        transition: 0.1s ease-out;
        color: black;
        white-space: nowrap;
    }

    :global(body.dark-mode #main-navigation a) {
        color: white !important;
    }

    nav a[disabled="true"] {
        cursor: default;
        opacity: .95 !important;
        font-weight: bold;
        letter-spacing: .5px;
    }

    nav a[disabled="false"]:hover {
        opacity: .7;
        letter-spacing: 1px;
    }

    nav a[disabled="false"]:active {
        opacity: .85;
    }
</style>