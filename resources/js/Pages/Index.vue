<script setup>
import ShaderCanvas from "@/Shared/ShaderCanvas.vue";
import vertexShader from "@/Shaders/basic.vert?raw";
import fragmentShader from "@/Shaders/basic.frag?raw";
</script>

<template>
    <main class="flex h-screen items-center justify-center">
        <ShaderCanvas :vertexShader="vertexShader" :fragmentShader="fragmentShader" />
    </main>
</template>
