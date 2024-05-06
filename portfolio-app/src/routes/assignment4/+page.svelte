<script>
    import {onMount} from 'svelte';
    import {World} from './World/World.js'
    
    let container;
    let world;
    let isAnimating = false;
    let isLighting = true;
    
    onMount(async () => {
        world = new World(container);
    
        await world.init();
        world.render();
        world.animate();
    });
    </script>
    
    <div class="assignment-2-body">
        <div class="background"></div>
        <a href="/" class="escape" aria-label="Go back"></a>
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="title">
                        <h1><center>Hierarchical Scene & Transformations with Animation</center></h1>
                        <hr />
                    </div>
                </div>
            </div>
            <div class="row">
                <div class="col-md-1">
                    <div class="buttons">
                    </div>
                </div>
                <div class="col-md-10">
                    <div class="scene" id="scene-container" bind:this={container}>
                    </div>
                </div>
                <div class="col-md-1">
                    <div class="information">
                       <p>The goal of this assignment is to create a simple scene using a hierarchical scene graph as shown in Transformations, Coordinate Systems,
                        and the Scene Graph in the Discover three.js book.
                       </p>
                       <p>Requirements are:</p>
                          <ul>
                            <li>Construct a compound model composed of a primary object and multiple child objects.</li>
                            <li>Place those child objects relative to the parent using transformations, at least one of which we create 
                                manually using vector or matrix algebra
                            </li>
                            <li>Have interactivity that moves both the entire object as well as the children</li>
                        </ul>
                        <p>For the axes: X (red), Y (green) and Z (blue)</p>
                        <p>Keyboard controls: WASD to move the fox. Space to jump. Only works if the canvas element has focus. Click it if key presses doesn't do anything.</p>
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
        filter: invert(33%) sepia(50%) saturate(2000%) hue-rotate(190deg) brightness(110%) contrast(100%);
    }
    
    .assignment-2-body {
    background-repeat: repeat;
    animation: gradient 15s ease infinite;
    background: linear-gradient(0deg, #0245c4, #020063, #020157, #0f0233, #000c25, #09001d, #06060e);
    background-size: 100% 200%;
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    position: relative;
    overflow: hidden;
    color: #020c49;
    text-shadow: 
    1px 0 0 #0976f3, 
    -1px 0 0 #0976f3, 
    0 1px 0 #0976f3, 
    0 -1px 0 #0976f3, 
    1px 1px #0976f3, 
    -1px -1px 0 #0976f3, 
    1px -1px 0 #0976f3, 
    -1px 1px 0 #0976f3;
    }

    @keyframes gradient {
        0% {background-position: 0% 60%;}
        50% {background-position: 0% 0%;}
        70% {background-position: 0% 60%;}
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
    }
    
    .buttons {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        height: 100%;
    }
    
    </style>