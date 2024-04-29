<script setup lang="ts">
    import '@/assets/styles/layout/AppHeader.scss';
    import { ref, nextTick } from 'vue';
    import Image from 'primevue/image';
    import Button from 'primevue/button';
    import Menubar from 'primevue/menubar';
    import IconField from 'primevue/iconfield';
    import InputText from 'primevue/inputtext';
    import InputIcon from 'primevue/inputicon';

    const items = ref([
        { label: 'Shop', items: [{ label: 'Shop All', route: '/' }] },
        { label: 'Explore', route: '/' },
        { label: 'About Us', route: '/' }
    ]);
    let searchInput = ref();
    let searchText = ref('');
    let searchExpanded = ref(false);

    const expandSearch = () => {
        searchExpanded.value = true;
        nextTick(() => searchInput.value.$el.focus());
    };

    const search = () => {
        console.log(searchText.value);
        searchExpanded.value = false;
        searchText.value = '';
    };

    // Placeholder functions for actions
    const openCart = () => console.log('open cart');
    const openMobileMenu = () => console.log('open mobile menu');
    const openMobileSearch = () => console.log('open mobile search');
    const enableDarkMode = () => console.log('enable dark mode');
</script>

<template>
    <!-- Desktop Header -->
    <Menubar :model="items" class="app-header shadow-1 h-6rem border-none xl:flex hidden">
        <template #start>
            <div class="text-3xl font-bold flex align-items-center">
                <Image src="/greengrove.png" alt="Green Grove Market Logo" width="40" height="40"/>
                &nbsp;<div class="text-primary">Green</div>&nbsp;Grove Market
            </div>
        </template>
        <template #item="{ item, props, hasSubmenu }">
            <router-link v-if="item.route" v-slot="{ href, navigate }" :to="item.route" custom>
                <a v-ripple :href="href" v-bind="props.action" @click="navigate">
                    <span class="text-xl font-bold">{{ item.label }}</span>
                </a>
            </router-link>
            <a v-else v-ripple :href="item.url" :target="item.target" v-bind="props.action">
                <span class="text-xl font-bold">{{ item.label }}</span>
                <span v-if="hasSubmenu" class="pi pi-fw pi-angle-down ml-2" />
            </a>
        </template>
        <template #end>
            <div class="flex align-items-center gap-2">
                    <Button icon="pi pi-search text-xl text-color" text rounded aria-label="Search Products" @click="expandSearch" v-show="!searchExpanded"/>
                    <Transition>
                        <IconField iconPosition="left" v-if="searchExpanded" class="overflow-hidden">
                            <InputIcon class="pi pi-search" />
                            <InputText v-model="searchText" placeholder="Search" ref="searchInput" @focusout="searchExpanded = false" @keyup.enter="search"/>
                        </IconField>
                    </Transition>
                <router-link to="/">
                    <Button icon="pi pi-user text-xl text-color" text rounded aria-label="Profile" />
                </router-link>
                <Button icon="pi pi-moon text-xl text-color" text rounded aria-label="Dark Mode" @click="enableDarkMode" />
                <Button icon="pi pi-shopping-cart text-xl text-color" text rounded aria-label="Shopping Cart" @click="openCart"/>
            </div>
        </template>
    </Menubar>

    <!-- Mobile Header -->
    <div class="app-header shadow-1 h-6rem justify-content-between align-items-center flex xl:hidden">
        <div class="flex align-items-center sm:gap-2">
            <Button icon="pi pi-bars sm:text-xl text-color" text rounded aria-label="Menu" @click="openMobileMenu" />
            <Button icon="pi pi-search sm:text-xl text-color" text rounded aria-label="Search Products" @click="openMobileSearch" />
        </div>
        <div class=" sm:text-3xl font-bold flex align-items-center">
            <Image src="/greengrove.png" alt="Green Grove Market Logo" width="40" height="40" class="hidden sm:block" />
            <Image src="/greengrove.png" alt="Green Grove Market Logo" width="30" height="30" class="sm:hidden" />
            &nbsp;<div class="text-primary">Green</div>&nbsp;Grove Market
        </div>
        <div class="flex align-items-center sm:gap-2">
            <router-link to="/" class="hidden sm:block">
                <Button icon="pi pi-user text-xl text-color" text rounded aria-label="Profile" />
            </router-link>
            <Button icon="pi pi-shopping-cart sm:text-xl text-color" text rounded aria-label="Shopping Cart" @click="openCart"/>
        </div>
    </div>
</template>