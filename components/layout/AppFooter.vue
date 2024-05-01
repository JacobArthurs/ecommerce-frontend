<script setup lang="ts">
    import '@/assets/styles/layout/AppFooter.scss';
    import Divider from 'primevue/divider';
    import Button from 'primevue/button';

    // Placeholder functions for actions
    const openTerms = () => console.log('open terms');
    const openPrivacy = () => console.log('open privacy');
    const openCookies = () => console.log('open cookies');
</script>

<template>
    <div class="app-footer flex flex-column bg-primary py-4 mt-auto h-fit justify-content-center">
        <div class="flex flex-column lg:flex-row justify-content-between align-items-center gap-4">
            <div class="flex gap-4">
                <NuxtLink to="https://facebook.com" target="_blank" rel="noopener">
                    <Button icon="pi pi-facebook text-primary-color" rounded outlined aria-label="Facebook" />
                </NuxtLink>
                <NuxtLink to="https://twitter.com" target="_blank" rel="noopener">
                    <Button icon="pi pi-twitter text-primary-color" rounded outlined aria-label="Twitter" />
                </NuxtLink>
                <NuxtLink to="https://instagram.com" target="_blank" rel="noopener">
                    <Button icon="pi pi-instagram text-primary-color" rounded outlined aria-label="Instagram" />
                </NuxtLink>
                <NuxtLink to="https://linkedin.com" target="_blank" rel="noopener">
                    <Button icon="pi pi-linkedin text-primary-color" rounded outlined aria-label="LinkedIn" />
                </NuxtLink>
            </div>
            <div class="flex gap-1">
                <Button label="Terms of Service" class="text-sm text-primary-color" text @click="openTerms" />
                <Button label="Privacy Policy" class="text-sm text-primary-color" text @click="openPrivacy" />
                <Button label="Cookie Policy" class="text-sm text-primary-color" text @click="openCookies" />
            </div>
        </div>
        <Divider />
        <div class="flex justify-content-center align-items-center">
            <div class="text-sm">© {{new Date().getFullYear()}} Jacob Arthurs. All Rights Reserved.</div>
        </div>
    </div>
</template>