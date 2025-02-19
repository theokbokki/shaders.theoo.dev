<script setup>
// External
import { ref, onMounted, nextTick } from "vue";

// Components
import ShaderCanvas2d from "@/Shared/ShaderCanvas2d.vue";

// Assets
import vertexShader from "./header-shader.vert?raw";
import fragmentShader from "./header-shader.frag?raw";

// Scripts
const width = ref(window.innerWidth - 80);
const height = ref(window.innerHeight);

const getWidth = () => width.value;
const getHeight = () => height.value;
</script>

<template>
    <div class="w-full rounded-md overflow-hidden">
        <ShaderCanvas2d
            :vertex-shader="vertexShader"
            :fragment-shader="fragmentShader"
            :width="getWidth"
            :height="getHeight"
        />
    </div>
</template>
