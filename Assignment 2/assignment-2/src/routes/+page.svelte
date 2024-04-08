<script>
    import { onMount } from 'svelte';
    import {
        BoxGeometry,
        Color,
        Mesh,
        MeshBasicMaterial,
        PerspectiveCamera,
        Scene,
        WebGLRenderer,
    } from 'three';

    let container;
    let scene;
    let camera;
    let cube;

    // This function will be called once the component and the DOM element are mounted
    onMount(() => {
        scene = new Scene();
        scene.background = new Color('#a494f2');

        const fov = 43;
        const aspect = container.clientWidth / container.clientHeight;
        const near = 0.1;
        const far = 100;

        camera = new PerspectiveCamera(fov, aspect, near, far);
        camera.position.set(5, 2.1, 11);

        const length = 1.5;
        const width = 2.4;
        const depth = 3;

        const geometry = new BoxGeometry(length, width, depth);
        const material = new MeshBasicMaterial();
        cube = new Mesh(geometry, material);

        scene.add(cube);
        const renderer = new WebGLRenderer();
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);
        renderer.render(scene, camera);
    });
</script>
    
<div>
    <h1>Hello World using three.js</h1>
</div>
<div>
    <button>Start Animation</button>
    <button>Show Wireframe</button>
</div>

<div id="scene-container" bind:this={container}>
</div>

<style>
    #scene-container {
        width: 100%;
        height: 100vh;
    }
</style>