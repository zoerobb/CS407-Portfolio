<script>
    import {onMount} from 'svelte';
    import {World} from './World/World.js';
    
    let container;
    let world;
    let background;

    let showTitle = false;
    let showRequirements = false;
    let showControls = false;

    function toggleDiv(div) {
        if (div === 'title') showTitle = !showTitle;
        else if (div === 'requirements') showRequirements = !showRequirements;
        else if (div === 'controls') showControls = !showControls;
    }
    
    onMount(async () => {
        let scene = document.querySelector('.scene');
        let rect = scene.getBoundingClientRect();
        let width = rect.width;
        let height = rect.height;
        world = new World(container, width, height);

        await world.init();
        world.render();
        world.animate();
    });

    </script>
    
    <div class="assignment-2-body">
        <div class="background" bind:this={background}></div>
        <a href="/" class="escape" aria-label="Go back"></a>
        {#if showTitle}
            <div class="title">
                <h1><center>Load Pre-Build #D Model and Use Animation</center></h1>
                <hr/>
                <p>This work is based on "Tarisland - Dragon (High Poly)" (https://sketchfab.com/3d-models/tarisland-dragon-high-poly-ecf63885166c40e2bbbcdf11cd14e65f) by Doctor A. (https://sketchfab.com/doctorA) licensed under CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)</p>
            </div>
        {/if}


        {#if showRequirements}
            <div class="requirements">
                <p>"Create something you find interesting or fun, and show it to us at the regularly scheduled Final Exam time.We don't have as much time as I had hoped so this isn't expected to be some grand project, but you should still try to do something new.  A game, a new shading effect, new interaction, new models, new effects, ... You get the picture."</p>
            </div>
        {/if}

        {#if showControls}
            <div class="controls">
                <p>Controls</p>
                <hr/>
                <ul>
                    <li>SPACE: Stop block</li>
                    <li>R: Restart</li>
                    <li>MOUSE BUTTONS + DRAG: Adjust camera</li>
                    <li>MOUSE WHEEL: Zoom camera</li>
                </ul>
            </div>
        {/if}

            <div class="buttons">
                <button id="information" class="btn btn-primary"on:click={() => toggleDiv('title')}>Information</button>
                <button id="requirements" class="btn btn-primary"on:click={() => toggleDiv('requirements')}>Requirements</button>
                <button id="controls" class="btn btn-primary"on:click={() => toggleDiv('controls')}>Controls</button>
            </div>

            <div class="scene" id="scene-container" bind:this={container}>
            </div>
        </div>
    <style>
    .requirements ul, .controls ul {
        list-style-type: none;
    }

    .title, .requirements, .controls {
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.62);
        padding: 20px;
        width: 50%;
        border-radius: 8px;
        color: lightgray;
        z-index: 200;
        margin-left: 25%;
        margin-top: 5%;
        text-align: center;
    }

    .escape {
        display: inline-block;
        width: 30px;
        height: 30px;
        background: url('/node_modules/bootstrap-icons/icons/arrow-left-circle.svg') no-repeat;
        background-size: contain;
        margin-top: 11px;
        margin-left: 12px;
        filter: invert(39%) sepia(100%) saturate(2000%) hue-rotate(352deg) brightness(80%) contrast(120%);
        z-index: 100;
    }

    .buttons {
        margin-top: 90px;
        margin-left: 22px;
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 100;
        width: 7%;
        height: 40%;
    }

    .btn {
        background-color: rgb(44, 44, 44);
        padding: 20px;
        border: none;
        border-radius: 8px;
        color: lightgray;
        font-size: 20px;
        margin-bottom: 10px;
        width: 120%;
        cursor: pointer;
    }

    .btn:hover, .btn:focus, .btn:active {
        background-color: rgb(31, 31, 31);
    }
    
    .assignment-2-body {
        background-repeat: repeat;
        background: black;
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        position: relative;
        overflow: hidden;
    }
    

    .scene {
        width: 100%;
        height: 100vh;
        position: absolute;
        top: 0;
        left: 0;
    }
    </style>