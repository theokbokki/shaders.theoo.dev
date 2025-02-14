<script setup>
import { ref } from "vue";
import ShaderCanvas2d from "@/Shared/ShaderCanvas2d.vue";
import vertexShader from "./basic.vert?raw";
import fragmentShader from "./basic.frag?raw";
import textureUrl from '@img/dolorg.gif';

// Create reactive references for width and height and a flag for loading state
const width = ref(0);
const height = ref(0);
const imageLoaded = ref(false);

const image = new Image();
image.src = textureUrl;
image.onload = () => {
  // Update the refs once the image loads
  width.value = image.naturalWidth;
  height.value = image.naturalHeight;
  imageLoaded.value = true;
};

const textures = {
  u_texture: textureUrl,
};

// Define functions that return the current width and height
const getWidth = () => width.value;
const getHeight = () => height.value;
</script>

<template>
  <!-- Option 1: Only render the shader when the image has loaded -->
  <div v-if="imageLoaded">
    <ShaderCanvas2d
      :vertex-shader="vertexShader"
      :fragment-shader="fragmentShader"
      :width="getWidth"
      :height="getHeight"
      :textures="textures"
    />
  </div>
  <div v-else>
    Loading...
  </div>
</template>
