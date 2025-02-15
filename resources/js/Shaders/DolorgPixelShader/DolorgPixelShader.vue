<script setup>
// External
import { ref, onMounted, watch, nextTick } from "vue";
import { Pane } from "tweakpane";

// Components
import ShaderCanvas2d from "@/Shared/ShaderCanvas2d.vue";
import PaneContainer from "@/Shared/PaneContainer.vue";

// Assets
import vertexShader from "./dolorg-pixel-shader.vert?raw";
import fragmentShader from "./dolorg-pixel-shader.frag?raw";
import texture0Url from "@img/DolorgPixelShader/frame-1.gif";
import texture1Url from "@img/DolorgPixelShader/frame-2.gif";
import texture2Url from "@img/DolorgPixelShader/frame-3.gif";
import texture3Url from "@img/DolorgPixelShader/frame-4.gif";
import texture4Url from "@img/DolorgPixelShader/frame-5.gif";
import texture5Url from "@img/DolorgPixelShader/frame-6.gif";

// Scripts
const width = ref(0);
const height = ref(0);
const imageLoaded = ref(false);

const image = new Image();
image.src = texture1Url;
image.onload = () => {
    width.value = image.naturalWidth;
    height.value = image.naturalHeight;
    imageLoaded.value = true;
};

const textures = {
    u_texture0: texture0Url,
    u_texture1: texture1Url,
    u_texture2: texture2Url,
    u_texture3: texture3Url,
    u_texture4: texture4Url,
    u_texture5: texture5Url,
};

const uniforms = ref({
    u_pixelSize: { value: 8.0 },
});

const getWidth = () => width.value;
const getHeight = () => height.value;

let pane;

function initPane() {
    nextTick(() => {
        const container = document.getElementById("dolorg-pixel-shader");

        if (container) {
            pane = new Pane({
                title: "Dolorg pixel shader",
                container: container,
            });

            const PARAMS = {
                pixelSize: 8.0,
            };

            pane.addBinding(PARAMS, "pixelSize", { label: "Pixel size", min: 2, max: 20, step: 2 }).on(
                "change",
                (e) => {
                    uniforms.value.u_pixelSize.value = e.value;
                },
            );
        } else {
            console.warn("Container #dolorg-pixel-shader not found.");
        }
    });
}

watch(imageLoaded, (newVal) => {
    if (newVal) {
        initPane();
    }
});

// In case imageLoaded is already true at onMounted time.
onMounted(() => {
    if (imageLoaded.value) {
        initPane();
    }
});
</script>

<template>
    <div v-if="imageLoaded" class="relative w-full py-80 flex items-center justify-center">
        <PaneContainer id="dolorg-pixel-shader" />
        <ShaderCanvas2d
            :vertex-shader="vertexShader"
            :fragment-shader="fragmentShader"
            :width="getWidth"
            :height="getHeight"
            :textures="textures"
            :uniforms="uniforms"
        />
    </div>
    <div v-else>Loading...</div>
</template>
