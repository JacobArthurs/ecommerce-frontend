import { ref, onMounted } from 'vue';

export const useTheme = () => {
    const theme = ref<string>('aura-light-green');
    const isDarkMode = ref<boolean>(false);

    const applyTheme = (): void => {
        const themeLink: HTMLLinkElement | null = document.getElementById('theme-css') as HTMLLinkElement;
        if (themeLink) {
            themeLink.href = `/themes/${theme.value}.css`;
            isDarkMode.value = theme.value.includes('dark');
        }
    };

    const loadTheme = (): void => {
        if (typeof window !== 'undefined') {
            const storedTheme = localStorage.getItem('theme');
            theme.value = storedTheme || 'aura-light-green';
            applyTheme();
        }
    };

    const toggleTheme = (): void => {
        if (typeof window !== 'undefined') {
            theme.value = theme.value === 'aura-dark-green' ? 'aura-light-green' : 'aura-dark-green';
            localStorage.setItem('theme', theme.value);
            applyTheme();
        }
    };

    onMounted(() => {
        loadTheme();
    });

    return { toggleTheme, isDarkMode };
};