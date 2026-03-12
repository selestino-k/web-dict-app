import { Switch } from "@/components/ui/switch";
import { useAppearance } from "@/hooks/use-appearance";

export function DarkSwitch() {
    const { appearance, updateAppearance } = useAppearance();

    return (
        <div className="flex items-center space-x-2">
            <Switch
                id="dark-mode"
                checked={appearance === "dark"}
                onCheckedChange={(checked) => updateAppearance(checked ? "dark" : "light")}
                aria-label="Toggle dark mode"
            />
        </div>
    );
}
