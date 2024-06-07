<script>
import wNumb from 'wnumb';
import {onMount} from 'svelte';
import {World} from '../../lib/World/World.js'
import ColorPicker from 'simple-color-picker';

let container;
let world;
let background;
let isAnimating = false;
let isLighting = true;
let firstSlider;
let secondSlider;
let thirdSlider;

onMount(() => {
    world = new World(container);
    const firstColorPicker = new ColorPicker({
        color: '#FF00ED',
        el: firstSlider,
        width: 200,
        height: 200,
    });

    firstColorPicker.onChange(hexStringColor => {
        world.setDirectionalLightColor(hexStringColor);
        world.render();
    });

    const secondColorPicker = new ColorPicker({
        color: '#0059ff',
        el: secondSlider,
        width: 200,
        height: 200,
    });

    secondColorPicker.onChange(hexStringColor => {
        world.setAmbientLightColor(hexStringColor);
        world.render();
    });

    const thirdColorPicker = new ColorPicker({
        color: '#D41F09',
        el: thirdSlider,
        width: 200,
        height: 200,
    });

    thirdColorPicker.onChange(hexStringColor => {
        world.setSecondDirectionalLightColor(hexStringColor);
        world.render();
    });

    setInterval(() => {
        background.style.setProperty('--x', Math.random() * 100 + '%');
        background.style.setProperty('--y', Math.random() * 100 + '%');
    }, 4000);
    world.render();
});

function toggleAnimation() {
    isAnimating = !isAnimating;
    if (isAnimating) {
        world.startAnimation();
    } else {
        world.stopAnimation();
    }
    world.render();
}

function toggleLighting() {
    isLighting = !isLighting;
    world.toggleLighting(isLighting);
    world.render();
}

function toggleLightingColor() {
    world.setLightColor(color);
    world.render();
}
</script>

<div class="assignment-2-body">
    <div class="background" bind:this={background}></div>
    <a href="/" class="escape" aria-label="Go back"></a>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="title">
                    <h1><center>Hello World App & Lighting</center></h1>
                    <hr />
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-2">
                <div class="buttons">
                    <button class="btn btn-primary" on:click={toggleAnimation}>{#if isAnimating}Stop Animation{:else}Start Animation{/if}</button>
                    <button class="btn btn-secondary" on:click={toggleLighting}>{#if isLighting}Hide Lighting{:else}Show Lighting{/if}</button>
                    <p class="change-lighting-title">Lighting</p>
                    <p class="change-lighting">Directional (right)</p>
                    <div class="color-slider" bind:this={firstSlider}></div>
                    <p class="change-lighting">Ambient</p>
                    <div class="color-slider"  bind:this={secondSlider}></div>
                    <p class="change-lighting">Directional (left)</p>
                    <div class="color-slider"  bind:this={thirdSlider}></div>
                </div>
            </div>
            <div class="col-md-8">
                <div class="scene" id="scene-container" bind:this={container}>
                </div>
            </div>
            <div class="col-md-2">
                <div class="information">
                    <p>The goal of this assignment is to use the World App architecture from Discover three.js book to:</p>
                    <ul>
                        <li>Wrap the three.js scene in a World class that hides its implementation</li>
                        <li>refactor the design into separate modules for the scene, camera, objects, renderer, lights, ...</li>
                        <li>and that does a little more than the last assignment, in terms of objects and specifically a lighting effect</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</div>

<style>

.change-lighting, .change-lighting-title {
    margin-bottom: 8px;
}

.change-lighting-title {
    border-bottom: 1px solid rgb(248, 42, 255);
    width: 83px;
    text-align: center;
}

.color-slider {
    margin-bottom: 10px;
}

.escape {
    display: inline-block;
    width: 30px;
    height: 30px;
    background: url('/node_modules/bootstrap-icons/icons/arrow-left-circle.svg') no-repeat;
    background-size: contain;
    margin-top: 11px;
    margin-left: 12px;
    filter: invert(73%) sepia(50%) saturate(2000%) hue-rotate(283deg) brightness(100%) contrast(100%);
}

.assignment-2-body {
    background-repeat: repeat;
    color: rgb(248, 42, 255);
    background: linear-gradient(to bottom, #06060e, rgb(0, 12, 37), rgb(0, 12, 37), rgb(25, 7, 75), rgb(31, 1, 102), rgb(58, 1, 131), rgb(154, 2, 214));
    text-shadow: 0 0 10px rgb(95, 4, 122);
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
    box-shadow: 0 0 30px rgb(46, 48, 158);
}

.buttons {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    height: 100%;
}

.buttons .btn {
    background: #483d8b;
    width: 100%;
    font-size: 1.2em;
    margin-bottom: 10px;
    border: none;
    color: white;
    box-shadow: 0 0 10px #2e2755;
}

.buttons .btn:hover {
    background: #ff69b4;
    box-shadow: 0 0 10px #ff69b4;
}
</style>