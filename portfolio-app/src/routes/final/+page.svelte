<script>
    import {onMount} from 'svelte';
    import {World} from './World/World.js';
    
    let container;
    let world;
    let background;

    let showTitle = false;
    let showRequirements = false;
    let showControls = false;
    let gameWon = false;
    let gameOver = false;
    let gameStarted = false;
    let score = 0;

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

        world.render();
        world.animate();

        window.addEventListener('gameWon', (event) => {
            gameWon = event.detail;
        });
        window.addEventListener('gameOver', (event) => {
            gameOver = event.detail;
        });
        window.addEventListener('gameStarted', (event) => {
            gameStarted = event.detail;
        });
        window.addEventListener('score', (event) => {
            score = event.detail;
        });
    });

    </script>
    
    <div class="assignment-2-body">
        <div class="background" bind:this={background}></div>
        <a href="/" class="escape" aria-label="Go back"></a>
        {#if showTitle}
            <div class="title">
                <h1><center>Final Project</center></h1>
                <hr/>
                <p>CS407 final project. I chose to create a cube stack game.</p>
            </div>
        {/if}

        {#if !gameStarted}
            <div class="start">
                <p>Press space to start the game</p>
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
                    <li>LEFT CLICK + DRAG: Adjust camera</li>
                </ul>
            </div>
        {/if}

        {#if gameOver}
            <div class="game-over">
                <h1>Game Over 😭😭😭😭</h1>
                <p><img src="https://pbs.twimg.com/media/F6ILlHFbMAEmlpt.jpg" /></p>
                <p>Press R to restart.</p>
            </div>
        {/if}

        {#if gameWon}
            <div class="game-won">
                <h1>GAME WON YIPPEE 🎉🎉🎉🎉</h1>
                <p><img src="https://upload.wikimedia.org/wikipedia/en/9/94/Autism_Creature.webp" /></p>
                <p>Press R to restart.</p>
            </div>
        {/if}

            <div class="buttons">
                <p class="score">SCORE: {score}/15</p>
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

    .title, .requirements, .controls, .game-won, .game-over{
        position: absolute;
        top: 0;
        left: 0;
        background-color: rgba(0, 0, 0, 0.85);
        padding: 20px;
        width: 50%;
        border-radius: 8px;
        color: lightgray;
        z-index: 200;
        margin-left: 25%;
        margin-top: 11%;
        text-align: center;
    }

    .start {
        position: absolute;
        top: 0;
        left: 0;
        padding: 20px;
        width: 50%;
        border-radius: 8px;
        color: lightgray;
        z-index: 200;
        margin-left: 24%;
        margin-top: 19%;
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
        filter: invert(39%) sepia(100%) saturate(2000%) hue-rotate(243deg) brightness(100%) contrast(120%);
        z-index: 100;
    }

    .buttons {
        margin-top: 155px;
        margin-left: 32px;
        display: flex;
        flex-direction: column;
        align-items: center;
        z-index: 100;
        width: 7%;
        height: 40%;
    }

    .score {
        color: white;
        z-index: 100;
    }

    .btn {
        background-color: rgb(165, 55, 255);
        padding: 20px;
        border: none;
        border-radius: 8px;
        color: lightgray;
        font-size: 20px;
        margin-bottom: 10px;
        width: 120%;
        cursor: pointer;
        box-shadow: 0 0 8px rgb(198, 55, 255), 0 0 10px rgb(49, 6, 129);
    }

    .btn:hover, .btn:focus, .btn:active {
        background-color: rgb(110, 28, 218);
        box-shadow: 0 0 8px rgb(142, 55, 255), 0 0 10px rgb(49, 6, 129);
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