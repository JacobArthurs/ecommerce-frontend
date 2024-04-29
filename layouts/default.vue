<script setup lang='ts'>
    import AppHeader from '@/components/layout/AppHeader.vue';
    import AppFooter from '@/components/layout/AppFooter.vue';
</script>

<template>
    <div class="flex flex-column min-h-screen">
        <AppHeader />
        <div class="page-container">
            <slot  />
        </div>
        <AppFooter />
    </div>
</template>