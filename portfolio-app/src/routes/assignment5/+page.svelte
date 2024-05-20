<script>
    import {onMount} from 'svelte';
    import {World} from './World/World.js';
    
    let container;
    let world;
    let background;
    let isAnimating = false;
    let isWireframe = false;
    
    onMount(() => {
        world = new World(container);
        world.render();
        world.animate();
    });

    function toggleAnimation() {
        isAnimating = !isAnimating;
        world.toggleAnimation();
    }

    function toggleWireframe() {
        isWireframe = !isWireframe;
        world.toggleWireframe();
    }

    </script>
    
    <div class="assignment-2-body">
        <div class="background" bind:this={background}></div>
        <a href="/" class="escape" aria-label="Go back"></a>
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="title">
                        <h1><center>Custom Geometry with Per-Vertex Colors & Camera Controls</center></h1>
                        <hr />
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-2">
                    <div class="buttons">
                        <button class="btns" on:click={toggleAnimation}>{#if isAnimating}Stop Animation{:else}Start Animation{/if}</button>
                        <button class="btns" on:click={toggleWireframe}>{#if isWireframe}Hide Wireframe{:else}Show Wireframe{/if}</button>
                    </div>
                </div>
                <div class="col-md-8">
                    <div class="scene" id="scene-container" bind:this={container}>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="information">
                        <p>The goal of this assignment is to learn how geometries are organized, represented and delivered to OpenGL and the graphics card.</p>
                        <p>Requirements are:</p>
                        <ul>
                            <li>Construct a custom geometry object manually by specifying vertices and faces in an indexed buffer geometry.</li>
                            <li>Use per-vertex colors so we can pass custom attribute data to the vertex shader</li>
                            <li>Implement orbit and optionally camera navigation through the scene</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <style>
    
    .escape {
        display: inline-block;
        width: 30px;
        height: 30px;
        background: url('/node_modules/bootstrap-icons/icons/arrow-left-circle.svg') no-repeat;
        background-size: contain;
        margin-top: 11px;
        margin-left: 12px;
        filter: invert(100%) sepia(50%) saturate(2000%) hue-rotate(0deg) brightness(100%) contrast(100%);
    }
    
    .assignment-2-body {
        background-repeat: repeat;
        color: white;
        background: linear-gradient(to bottom, rgb(15, 99, 255), deepskyblue, white);
        text-shadow: 0 0 10px rgb(0, 24, 160);
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        position: relative;
        overflow: hidden;
    }
    
    .title {
        margin-top: 15px;
        margin-bottom: 25px;
    }
    
    #scene-container {
        width: 100%;
        height: 730px;
    }
    
    .scene {
        flex-grow: 1;
        overflow: hidden;
        box-shadow: 0 0 24px white;
    }

    .btns {
        background: linear-gradient(to bottom, #2dc787, rgb(54, 209, 163));
        border: none;
        color: white;
        border-radius: 15px;
        padding: 10px 25px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
        font-size: 16px;
        margin: 4px 2px;
        cursor: pointer;
        box-shadow: 0 0 2px white;
    }

    .btns:hover, .btns:active {
        background: linear-gradient(to bottom, #18b3a6, #39d5e0);
    }
    
    </style>