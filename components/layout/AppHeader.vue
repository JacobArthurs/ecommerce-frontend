<script setup lang="ts">
    import '@/assets/styles/layout/AppHeader.scss';
    import { ref, nextTick, onMounted, onUnmounted } from 'vue';
    import Image from 'primevue/image';
    import Button from 'primevue/button';
    import Menubar from 'primevue/menubar';
    import IconField from 'primevue/iconfield';
    import InputText from 'primevue/inputtext';
    import InputIcon from 'primevue/inputicon';
    import { useTheme } from '~/composables/useTheme';

    const { toggleTheme, isDarkMode } = useTheme();
    const items = ref([
        { label: 'Shop', items: [{ label: 'Shop All', route: '/' }] },
        { label: 'Explore', route: '/' },
        { label: 'About Us', route: '/' }
    ]);
    const profileMenu = ref();
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
    
    const isVisible = ref(true);
    const lastScrollPosition = ref(0);
    const threshold = 100;

    function handleScroll() {
        const currentScrollPosition = window.scrollY;
        if (currentScrollPosition < threshold) {
            isVisible.value = true;
        }
        else if (currentScrollPosition > lastScrollPosition.value && currentScrollPosition > threshold) {
            isVisible.value = false;
        }
        else {
            isVisible.value = true;
        }
        lastScrollPosition.value = currentScrollPosition;
    }

    onMounted(() => {
        window.addEventListener('scroll', handleScroll);
    });

    onUnmounted(() => {
        window.removeEventListener('scroll', handleScroll);
    });

    const openProfile = (event) => {
        profileMenu.value.toggle(event);
    };

    // Placeholder functions for actions
    const openCart = () => console.log('open cart');
    const openMobileMenu = () => console.log('open mobile menu');
    const openMobileSearch = () => console.log('open mobile search');
</script>

<template>
    <!-- Desktop Header -->
    <Transition name="scroll">
        <Menubar :model="items" class="app-header shadow-1 h-6rem border-none xl:flex hidden" v-if="isVisible">
            <template #start>
                <router-link to="/" class="text-3xl font-bold flex align-items-center">
                    <Image src="/greengrove.png" alt="Green Grove Market Logo" width="40" height="40"/>
                    &nbsp;<div class="text-primary">Green</div>&nbsp;Grove Market
                </router-link>
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
                    <Transition name="search">
                        <IconField iconPosition="left" v-if="searchExpanded" class="overflow-hidden">
                            <InputIcon class="pi pi-search" />
                            <InputText v-model="searchText" placeholder="Search" ref="searchInput" @focusout="searchExpanded = false" @keyup.enter="search"/>
                        </IconField>
                    </Transition>
                    <Button icon="pi pi-user text-xl text-color" text rounded aria-label="Profile" @click="openProfile"/>
                    <Menu ref="profileMenu" :popup="true">
                        <!-- Signed In Profile Menu -->
                        <template #start v-if="false">
                            <div class="flex flex-column align-items-start justify-content-center my-3">
                                <span class="font-bold ml-3">Hello, Jacob</span>
                                <Divider />
                                <router-link to="/" class="w-full mb-2">
                                    <Button v-ripple label="View Orders" text icon="pi pi-receipt text-color" class="w-full text-color text-left" />
                                </router-link>
                                <router-link to="/" class="w-full my-2">
                                    <Button v-ripple label="View Reviews" text icon="pi pi-star text-color" class="w-full text-color text-left" />
                                </router-link>
                                <router-link to="/" class="w-full mt-2">
                                    <Button v-ripple label="Sign Out" text icon="pi pi-sign-out text-color" class="w-full text-color text-left" />
                                </router-link>
                            </div>
                        </template>
                        <!-- Not Signed In Profile Menu -->
                        <template #start v-if="true">
                            <div class="flex flex-column align-items-center justify-content-center my-3">
                                <router-link to="/">
                                    <Button v-ripple label="Sign In" icon="pi pi-sign-in" rounded/>
                                </router-link>
                                <Divider />
                                <span class="mb-2 text-sm">New customer?</span>
                                <router-link to="/">
                                    <Button v-ripple text label="Start here" class="text-sm"/>
                                </router-link>
                            </div>
                        </template>
                    </Menu>
                    <Button :icon="isDarkMode ? 'pi pi-moon text-xl text-color' : 'pi pi-sun text-xl text-color'" text rounded aria-label="Dark Mode" @click="toggleTheme" />
                    <Button icon="pi pi-shopping-cart text-xl text-color" text rounded aria-label="Shopping Cart" @click="openCart"/>
                </div>
            </template>
        </Menubar>
    </Transition>

    <!-- Mobile Header -->
    <div class="app-header shadow-1 h-6rem justify-content-between align-items-center flex xl:hidden">
        <div class="flex align-items-center sm:gap-2">
            <Button icon="pi pi-bars sm:text-xl text-color" text rounded aria-label="Menu" @click="openMobileMenu" />
            <Button icon="pi pi-search sm:text-xl text-color" text rounded aria-label="Search Products" @click="openMobileSearch" />
        </div>
        <router-link to="/" class="sm:text-3xl font-bold flex align-items-center" >
            <Image src="/greengrove.png" alt="Green Grove Market Logo" width="40" height="40" class="hidden sm:block" />
            <Image src="/greengrove.png" alt="Green Grove Market Logo" width="30" height="30" class="sm:hidden" />
            &nbsp;<div class="text-primary">Green</div>&nbsp;Grove Market
        </router-link>
        <div class="flex align-items-center sm:gap-2">
            <router-link to="/" class="hidden sm:block">
                <Button icon="pi pi-user text-xl text-color" text rounded aria-label="Profile" />
            </router-link>
            <Button icon="pi pi-shopping-cart sm:text-xl text-color" text rounded aria-label="Shopping Cart" @click="openCart"/>
        </div>
    </div>
</template>