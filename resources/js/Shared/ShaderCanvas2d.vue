<script setup>
import { ref, onMounted, onUnmounted, watch } from "vue";
import * as THREE from "three";

const props = defineProps({
    uniforms: {
        type: Object,
        default: () => ({}),
    },
    textures: {
        type: Object,
        default: () => ({}),
    },
    vertexShader: {
        type: String,
        required: true,
    },
    fragmentShader: {
        type: String,
        required: true,
    },
    width: {
        type: [Number, Function],
        default: window.innerWidth,
    },
    height: {
        type: [Number, Function],
        default: window.innerHeight,
    },
});

function getWidth() {
    if (typeof props.width === "function") {
        return props.width();
    }

    return props.width;
}

function getHeight() {
    if (typeof props.height === "function") {
        return props.height();
    }

    return props.height;
}

const canvasRef = ref(null);
let renderer, scene, camera, material;

const textureLoader = new THREE.TextureLoader();

function onResize() {
    const width = getWidth();
    const height = getHeight();
    renderer.setSize(width, height);
    material.uniforms.u_resolution.value.set(width, height);
}

onMounted(() => {
    scene = new THREE.Scene();
    camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    renderer = new THREE.WebGLRenderer();
    renderer.setSize(getWidth(), getHeight());
    canvasRef.value.appendChild(renderer.domElement);

    const mergedUniforms = {
        ...props.uniforms,
        u_time: { value: 0.0 },
        u_resolution: { value: new THREE.Vector2(getWidth(), getHeight()) },
    };

    for (const key in props.textures) {
        mergedUniforms[key] = { value: textureLoader.load(props.textures[key]) };
    }

    material = new THREE.ShaderMaterial({
        uniforms: mergedUniforms,
        vertexShader: props.vertexShader,
        fragmentShader: props.fragmentShader,
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

watch(
    () => props.textures,
    (newTextures) => {
        if (material) {
            for (const key in newTextures) {
                material.uniforms[key].value = textureLoader.load(newTextures[key]);
            }
        }
    },
    { deep: true },
);

onUnmounted(() => {
    window.removeEventListener("resize", onResize);
});
</script>

<template>
    <div ref="canvasRef"></div>
</template>
