import { AppRouter } from "./router/AppRouter";
import { AppTheme } from "./theme/AppTheme";

export function JournalApp() {
    return (
        <AppTheme>
            <AppRouter />
        </AppTheme>
    )
}
