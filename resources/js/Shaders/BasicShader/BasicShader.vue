<script setup>
// External
import { ref, onMounted, nextTick } from "vue";
import { Pane } from "tweakpane";

// Components
import ShaderCanvas2d from "@/Shared/ShaderCanvas2d.vue";
import PaneContainer from "@/Shared/PaneContainer.vue";

// Assets
import vertexShader from "./basic-shader.vert?raw";
import fragmentShader from "./basic-shader.frag?raw";

// Scripts
const width = ref(window.innerWidth / 2);
const height = ref(window.innerHeight / 2);

const uniforms = ref({
    u_redAmount: { value: 0.5 },
    u_greenAmount: { value: 0.5 },
    u_blueAmount: { value: 0.5 },
});

const getWidth = () => width.value;
const getHeight = () => height.value;

let pane;

function initPane() {
    nextTick(() => {
        const container = document.getElementById("basic-shader");

        if (container) {
            pane = new Pane({
                title: "Basic shader",
                container: container
            });

            const PARAMS = {
                redAmount: 0.5,
                blueAmount: 0.5,
                greenAmount: 0.5,
            };

            pane
                .addBinding(PARAMS, "redAmount", { label: "Red amount", min: 0, max: 1, step: 0.1 })
                .on("change", (e) => {
                    uniforms.value.u_redAmount.value = e.value;
                });

            pane
                .addBinding(PARAMS, "greenAmount", { label: "Green amount", min: 0, max: 1, step: 0.1 })
                .on("change", (e) => {
                    uniforms.value.u_greenAmount.value = e.value;
                });

            pane
                .addBinding(PARAMS, "blueAmount", { label: "Blue amount", min: 0, max: 1, step: 0.1 })
                .on("change", (e) => {
                    uniforms.value.u_blueAmount.value = e.value;
                });
        } else {
            console.warn("Container #basic-shader not found.");
        }
    });
}

onMounted(() => {
    initPane();
});
</script>

<template>
    <div class="relative w-full py-80 flex items-center justify-center">
        <PaneContainer id="basic-shader" />
        <ShaderCanvas2d
            :vertex-shader="vertexShader"
            :fragment-shader="fragmentShader"
            :width="getWidth"
            :height="getHeight"
            :uniforms="uniforms"
        />
    </div>
</template>
