<script setup>
import { ref, onMounted, onUnmounted } from "vue";
import { SvgGradient } from "@/utils/gradient";
import ShaderContainer from "@/Shared/ShaderContainer.vue";
import HeaderShader from "@/Shaders/HeaderShader/HeaderShader.vue";
import DolorgPixelShader from "@/Shaders/DolorgPixelShader/DolorgPixelShader.vue";

const titleContainer = ref(null);
const titleText = "Shaders";
const classes = "font-chicago text-8.5xl leading-120 text-neutral-500 uppercase";
const spanWidth = calculateSpanWidth();

onMounted(() => {
    generateTitleContent();

    window.addEventListener("resize", () => generateTitleContent());
});

function generateTitleContent() {
    titleContainer.value.innerHTML = "";
    titleContainer.value.appendChild(newTitleEl());
    titleContainer.value.appendChild(newTitleEl(true, "h1"));

    fillScreen();

    const count = titleContainer.value.childElementCount;
    for (let i = 0; i < count; i++) {
        titleContainer.value.appendChild(newTitleEl());
    }

    titleContainer.value.style.transform = `translate3d(-${spanWidth / 2}px, 0, 0)`;
}

function fillScreen() {
    if (titleContainer.value.offsetWidth < window.innerWidth) {
        titleContainer.value.appendChild(newTitleEl());

        return fillScreen();
    }

    return;
}

function newTitleEl(withGradient = false, tagName = "span") {
    const el = document.createElement(tagName);
    el.className = classes;
    el.innerText = titleText;

    if (withGradient) {
        addElementGradient(el);
    }

    return el;
}

function calculateSpanWidth() {
    const tempEl = document.createElement("span");
    tempEl.textContent = titleText;
    tempEl.className = classes;
    document.body.appendChild(tempEl);
    const width = tempEl.offsetWidth;
    document.body.removeChild(tempEl);

    return width;
}

function addElementGradient(el) {
    const gradientURI = new SvgGradient().generate(spanWidth, 120);
    el.style.backgroundImage = `url("${gradientURI}")`;
    el.style.backgroundClip = "text";
    el.style.webkitBackgroundClip = "text";
    el.style.color = "transparent";
}
</script>

<template>
    <header class="overflow-hidden mt-64 border-b border-neutral-200">
        <div ref="titleContainer" class="w-max flex whitespace-nowrap" id="title-container"></div>
        <p class="font-instrument text-2xl/36 text-right mx-40 text-neutral-500">
            A collection of pixels arranged in pretty, playful and interacive ways.
        </p>
        <div class="width-full px-40 mt-64 mb-80">
            <HeaderShader />
        </div>
    </header>
    <main class="mb-80">
        <ShaderContainer title="Dolorg Pixel Shader">
            <DolorgPixelShader />
        </ShaderContainer>
    </main>
</template>
