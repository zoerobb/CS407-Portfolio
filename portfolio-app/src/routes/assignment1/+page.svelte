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

<head>
  <title>Discoverthreejs.com - The Structure of a three.js App</title>

  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta charset="UTF-8" />

  <link rel="icon" href="https://discoverthreejs.com/favicon.ico" type="image/x-icon">
</head>

<body>
  <h1 style="color: white;">Discoverthreejs.com</h1>

  <div id="scene-container" bind:this={container}>
    <!-- Our <canvas> will be inserted here -->
  </div>
</body>

<style>
    body {
  /* remove margins and scroll bars */
  margin: 0;
  overflow: hidden;

  /* style text */
  text-align: center;
  font-size: 12px;
  font-family: Sans-Serif;

  /* color text */
  color: #444;
}

h1 {
  /* position the heading */
  position: absolute;
  width: 100%;

  /* make sure that the heading is drawn on top */
  z-index: 1;
}

#scene-container {
  /* tell our scene container to take up the full page */
  position: absolute;
  width: 100%;
  height: 100%;

  /*
    Set the container's background color to the same as the scene's
    background to prevent flashing on load
  */
  background-color: skyblue;
}
</style>