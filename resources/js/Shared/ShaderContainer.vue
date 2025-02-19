<script setup>
const props = defineProps({
    title: String,
});
</script>

<template>
    <article class="mt-64 pb-80 border-b border-stone-200">
        <h2 class="absolute ml-64 font-chicago text-2xl text-stone-500">{{ props.title }}</h2>
        <slot />
    </article>
</template>
