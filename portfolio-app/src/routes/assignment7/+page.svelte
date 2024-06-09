<script>
    import {onMount} from 'svelte';
    import {World} from './World/World.js';
    import { javascript } from "../../../node_modules/@codemirror/lang-javascript";
    import { oneDark } from "@codemirror/theme-one-dark";
	import CodeMirror from 'svelte-codemirror-editor';
    
    let container;
    let world;
    let background;
    let isWireframe = false;
    let vertex = `
uniform float time;
varying vec3 vNormal;
out float hemisphere;

void main() {
    vec3 newPosition = position;
    newPosition.x += 0.1 * sin(2.0 * 3.1415926 * (position.y + time));
    newPosition.y += 0.1 * sin(2.0 * 3.1415926 * (position.x + time));
    vNormal = normalize(newPosition);
    hemisphere = smoothstep(-2.0,2.0,position.y);
    gl_Position = projectionMatrix * modelViewMatrix * vec4( newPosition, 1.0 );
}
`;

let fragment = `
uniform vec3 objColor;
uniform vec3 invColor;
in vec3 vNormal;
in float hemisphere;

void main() {
    vec3 objColor = vec3(1.0, 0.75, 0.5);
    vec3 invColor = vec3(1.0, 0.71, 0.76);
    vec3 ambientLight = vec3(0.1, 0.3, 0.3);
    vec3 lightDirection = vec3(1.0, 0.0, 0.0);
    vec3 lightColor = vec3(1.0, 0.5, 0.0);
    float directionalLight = max(dot(vNormal, lightDirection), 0.0);
    vec3 color = mix(objColor, invColor, 1.0 - hemisphere);
    color += ambientLight * 0.1;
    color += lightColor * 0.3 * directionalLight; 
    gl_FragColor = vec4(color, 1.0);
}
`;



    
    onMount(() => {
        world = new World(container);
        world.render();
        world.animate();
    });

    function toggleWireframe() {
        isWireframe = !isWireframe;
        world.toggleWireframe();
    }

    function compileShaders() {
        world.compileShaders(vertex, fragment);
    }

    </script>
    
    <div class="assignment-2-body">
        <div class="background" bind:this={background}></div>
        <a href="/" class="escape" aria-label="Go back"></a>
        <div class="container">
            <div class="row">
                <div class="col-12">
                    <div class="title">
                        <h1><center>Shaders!</center></h1>
                        <hr />
                    </div>
                </div>
            </div>
            <div>
            </div>

            <div class="code">
                <h2><center>Vertex Shader</center></h2>
                <div class="code-editor">
                    <CodeMirror bind:value={vertex} theme={oneDark} lang={javascript()}>
                    </CodeMirror>
                </div>
                <h2><center>Fragment Shader</center></h2>
                <div class="code-editor">
                    <CodeMirror bind:value={fragment} theme={oneDark} lang={javascript()}>
                    </CodeMirror>
                </div>
            </div>

            <article> 
                <center><button id="compile-btn" class="btns" on:click={compileShaders}>Compile</button></center>
            </article>
            
            <div class="row">
                <div class="col-md-2">
                    <div class="buttons">
                        <button class="btns" on:click={toggleWireframe}>{#if isWireframe}Hide Wireframe{:else}Show Wireframe{/if}</button>
                    </div>
                </div>
                <div class="col-md-8">
                    <div class="scene" id="scene-container" bind:this={container}>
                    </div>
                </div>
                <div class="col-md-2">
                    <div class="information">
                        <p>The goal of this assignment is to do something cool with shaders.</p>
                        <p>Requirements are:</p>
                        <ul>
                            <li>Write your own shaders to do something interesting. Feel free to find some inspiration online, but you'll need to build a big part of it yourself. Remember to attribute where you got the idea from, if that's what you did.</li>
                            <li>Include interaction of some kind that sends uniforms or attributes to your custom shader.</li>
                            <li>Include more than one object in your scene, but only have your shaders applied to one of those objects. This will enable you to see how different "materials" (and thus shaders) are used for different objects</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    <style>

    .code-editor{
        width: 100%;
        height: 100%;
        min-height: 100px;
        text-align: left;
        margin-bottom: 25px;
    }
    
    #compile-btn {
        margin-top: -2px;
        transform: scale(1.23);
        margin-bottom: 55px;

    }
    .escape {
        display: inline-block;
        width: 30px;
        height: 30px;
        background: url('/node_modules/bootstrap-icons/icons/arrow-left-circle.svg') no-repeat;
        background-size: contain;
        margin-top: 11px;
        margin-left: 12px;
        filter: invert(60%) sepia(50%) saturate(2000%) hue-rotate(193deg) brightness(80%) contrast(90%);
    }
    
    .assignment-2-body {
        background-repeat: repeat;
        color: rgb(6, 26, 104);
        background: linear-gradient(to bottom, rgb(27, 255, 122), rgb(91, 255, 192), rgb(179, 255, 245));
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
        margin-bottom: 50px;
    }

    .btns {
        background: linear-gradient(to bottom, #20bb53, rgb(47, 224, 106));
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