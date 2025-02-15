<script setup>
import DolorgPixelShader from "@/Shaders/DolorgPixelShader/DolorgPixelShader.vue";
import BasicShader from "@/Shaders/BasicShader/BasicShader.vue";
</script>

<template>
    <main class="flex flex-col gap-120 mx-40 my-120">
        <BasicShader />
        <DolorgPixelShader />
    </main>
</template>
