<script setup>
import { ref, onMounted, onUnmounted, nextTick } from 'vue';

const props = defineProps({
    id: String,
});

const container = ref(null);
const header = ref(null);
const isDragging = ref(false);
const position = ref({ x: 0, y: 0 });
const offset = ref({ x: 0, y: 0 });

const startDrag = (event) => {
    isDragging.value = true;
    offset.value.x = event.clientX - position.value.x;
    offset.value.y = event.clientY - position.value.y;
};

const onMouseMove = (event) => {
    if (!isDragging.value) return;
    position.value.x = event.clientX - offset.value.x;
    position.value.y = event.clientY - offset.value.y;
};

const stopDrag = () => {
    isDragging.value = false;
};

onMounted(() => {
    nextTick(() => {
        const el = container.value;
        if (el && el.parentElement) {
            const parentWidth = el.parentElement.offsetWidth;
            const containerWidth = el.offsetWidth;
            position.value.x = parentWidth - containerWidth;
            position.value.y = el.offsetTop;
        }
    });

    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', stopDrag);
});

onUnmounted(() => {
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', stopDrag);
});
</script>

<template>
  <div
    :id="props.id"
    ref="container"
    class="absolute top-0 w-max select-none"
    :style="{ left: position.x + 'px', top: position.y + 'px' }"
  >
    <div
      ref="header"
      class="h-16 cursor-grab flex justify-center items-center before:block before:h-4 before:rounded-full before:w-80/100  transition-all before:bg-neutral-200 active:cursor-grabbing hover:before:bg-neutral-300"
      @mousedown="startDrag"
    ></div>
  </div>
</template>
