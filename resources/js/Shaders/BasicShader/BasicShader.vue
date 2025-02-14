<script setup>
import { ref } from "vue";
import ShaderCanvas2d from "@/Shared/ShaderCanvas2d.vue";
import vertexShader from "./basic.vert?raw";
import fragmentShader from "./basic.frag?raw";
import texture0Url from "@img/DolorgPixelShader/frame-1.gif";
import texture1Url from "@img/DolorgPixelShader/frame-2.gif";
import texture2Url from "@img/DolorgPixelShader/frame-3.gif";
import texture3Url from "@img/DolorgPixelShader/frame-4.gif";
import texture4Url from "@img/DolorgPixelShader/frame-5.gif";
import texture5Url from "@img/DolorgPixelShader/frame-6.gif";

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

const getWidth = () => width.value;
const getHeight = () => height.value;
</script>

<template>
    <div v-if="imageLoaded">
        <ShaderCanvas2d
            :vertex-shader="vertexShader"
            :fragment-shader="fragmentShader"
            :width="getWidth"
            :height="getHeight"
            :textures="textures"
        />
    </div>
    <div v-else>Loading...</div>
</template>
