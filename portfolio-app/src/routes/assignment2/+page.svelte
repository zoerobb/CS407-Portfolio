<script>
    import 'bootstrap/dist/css/bootstrap.min.css';
    import { onMount } from 'svelte';
    import {
        ConeGeometry,
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
    let cone;
    let wireframeCone;
    let renderer;
    let isAnimating = false;
    let isWireframe = false;

    onMount(() => {
        scene = new Scene();
        scene.background = new Color('#483D8B');

        const fov = 40;
        const aspect = container.clientWidth / container.clientHeight;
        const near = 0.1;
        const far = 100;

        camera = new PerspectiveCamera(fov, aspect, near, far);
        camera.position.set(0, .2, 5);

        const length = 1.5;
        const width = 0.5;
        const depth = 8;

        const geometry = new ConeGeometry(length, width, depth);
        const material = new MeshBasicMaterial({ color: '#FF69B4', transparent: true });
        const wireframeMaterial = new MeshBasicMaterial({ color: 'cyan', wireframe: true });
        cone = new Mesh(geometry, material);
        wireframeCone = new Mesh(geometry, wireframeMaterial);
        wireframeCone.visible = isWireframe;

        scene.add(cone);
        scene.add(wireframeCone);
        renderer = new WebGLRenderer();
        renderer.setSize(container.clientWidth, container.clientHeight);
        renderer.setPixelRatio(window.devicePixelRatio);
        container.appendChild(renderer.domElement);

        renderer.render(scene, camera);
    });

    function animate() {
        if (!isAnimating) return;

        requestAnimationFrame(animate);

        cone.rotation.y += 0.01;
        wireframeCone.rotation.y += 0.01;

        renderer.render(scene, camera);
    }

    function toggleAnimation() {
        isAnimating = !isAnimating;
        if (isAnimating) animate();
    }

    function toggleWireframe() {
        isWireframe = !isWireframe;
        wireframeCone.visible = isWireframe;
        cone.material.opacity = isWireframe ? 0 : 1;
        renderer.render(scene, camera);
    }
</script>

<body>
    <a href="/" class="escape"></a>
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="title">
                    <h1><center>Hello World using three.js</center></h1>
                    <hr />
                </div>
            </div>
        </div>
        <div class="row">
            <div class="col-md-2">
                <div class="buttons">
                    <button class="btn btn-primary" on:click={toggleAnimation}>{#if isAnimating}Stop Animation{:else}Start Animation{/if}</button>
                    <button class="btn btn-secondary" on:click={toggleWireframe}>
                        {#if isWireframe}Hide Wireframe{:else}Show Wireframe{/if}
                    </button>
                </div>
            </div>
            <div class="col-md-8">
                <div class="scene" id="scene-container" bind:this={container}>
                </div>
            </div>
            <div class="col-md-2">
                <div class="information">
                    <p>The goal of this assignment is to prove the architecture we'll be using to display WebGL 3D graphics in a web application. We want to show that we can successfully:</p>
                    <ul>
                        <li>Use the three.js library to create a 3D scene</li>
                        <li>Render the scene to a cameras element</li>
                        <li>Control the animation of the scene</li>
                        <li>All in a Svelte app</li>
                        <li>Deployed to the Web</li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</body>

<style>
    .escape {
        display: inline-block;
        width: 30px;
        height: 30px;
        background: url('/node_modules/bootstrap-icons/icons/arrow-left-circle.svg') no-repeat;
        background-size: contain;
        margin-top: 11px;
        margin-left: 12px;
        filter: invert(73%) sepia(50%) saturate(2000%) hue-rotate(133deg) brightness(102%) contrast(102%);
    }

    body {
        background: linear-gradient(to bottom, #06060e, rgb(31, 20, 56));
        background-repeat: repeat;
        color: rgb(37, 236, 236);
        text-shadow: 0 0 10px rgb(14, 80, 80);
        display: flex;
        flex-direction: column;
        min-height: 100vh;
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
        box-shadow: 0 0 10px #2f2858;
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