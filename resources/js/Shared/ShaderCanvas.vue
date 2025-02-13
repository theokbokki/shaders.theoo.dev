<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import * as THREE from "three";

const { vertexShader, fragmentShader } = defineProps({
    vertexShader: String,
    fragmentShader: String,
});

const canvasRef = ref(null);
let renderer, scene, camera, material;

function onResize() {
    const width = window.innerWidth;
    const height = window.innerHeight;
    renderer.setSize(width, height);
    material.uniforms.u_resolution.value.set(width, height);
}

onMounted(() => {
    scene = new THREE.Scene();
    camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(window.innerWidth / 2, window.innerHeight / 2);
    canvasRef.value.appendChild(renderer.domElement);

    material = new THREE.ShaderMaterial({
        uniforms: {
            u_time: { value: 0.0 },
            u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
        },
        vertexShader,
        fragmentShader,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const quad = new THREE.Mesh(geometry, material);
    scene.add(quad);

    window.addEventListener("resize", onResize);

    function animate(time) {
        material.uniforms.u_time.value = time * 0.001;
        renderer.render(scene, camera);
    }
    renderer.setAnimationLoop(animate);
});

// Cleanup
onUnmounted(() => {
    window.removeEventListener("resize", onResize);
});
</script>

<template>
    <div ref="canvasRef" class="overflow-hidden rounded-xl w-max"></div>
</template>
