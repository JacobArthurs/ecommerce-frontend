import { ref } from 'vue';

type ActionWithEvent = (event?: MouseEvent) => void;

export function useHoverDelay(
    actionOnHover: ActionWithEvent,
    actionOnLeave: ActionWithEvent,
    delay: number = 300
): { onHover: ActionWithEvent; onLeave: ActionWithEvent; cancelTimer: ActionWithEvent; isMenuDisplayed: Ref<boolean> } {
    const timer: Ref<number | null> = ref(null);
    const isMenuDisplayed = ref(false);

    const onHover = (event?: MouseEvent) => {
        if (timer.value !== null) {
            clearTimeout(timer.value);
            timer.value = null;
        }
        actionOnHover(event);
        isMenuDisplayed.value = true;
    };

    const onLeave = (event?: MouseEvent) => {
        timer.value = window.setTimeout(() => {
            actionOnLeave(event);
            isMenuDisplayed.value = false;
            timer.value = null;
        }, delay);
    };

    const cancelTimer = () => {
        if (timer.value !== null) {
            clearTimeout(timer.value);
            isMenuDisplayed.value = true;
            timer.value = null;
        }
    };

    return { onHover, onLeave, cancelTimer, isMenuDisplayed };
}