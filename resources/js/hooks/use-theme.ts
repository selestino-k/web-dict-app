import { usePage } from "@inertiajs/react";

export function useTheme() {
    const { appearance } = usePage().props;
    return {
        theme: appearance,
        setTheme: (theme: string) => {
            
                

        },
    };
}