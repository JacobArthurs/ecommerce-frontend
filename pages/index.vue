<script setup lang='ts'>
    import { ref } from 'vue';
    import Rating from 'primevue/rating';
    
    let value = ref(3);
</script>

<template>
    <div>
        <h1>Welcome to the homepage</h1>
        <Rating v-model="value" />
    </div>
</template>