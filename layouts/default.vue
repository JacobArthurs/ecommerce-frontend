<script setup lang='ts'>
    import AppHeader from '@/components/layout/AppHeader.vue';
    import AppFooter from '@/components/layout/AppFooter.vue';
</script>

<template>
    <div class="flex flex-column min-h-screen">
        <link id="theme-css" rel="stylesheet" href="/themes/aura-light-green.css">
        <AppHeader />
        <div class="page-padding">
            <slot  />
        </div>
        <AppFooter />
    </div>
</template>