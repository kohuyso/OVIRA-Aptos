'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { Button } from 'shadcn/button';

export default function ButtonToggleMode() {
    const { theme, resolvedTheme, setTheme } = useTheme();

    // Toggle theme between light and dark. If current theme is 'system', use resolvedTheme as the source of truth.
    const handleToggleTheme = () => {
        const effectiveTheme = (theme === 'system' ? resolvedTheme : theme) ?? 'light';
        setTheme(effectiveTheme === 'dark' ? 'light' : 'dark');
    };

    return (
        <Button variant="outline" size="icon" onClick={handleToggleTheme} aria-label="Toggle theme">
            <Moon className="h-[1.2rem] w-[1.2rem] scale-100 rotate-0 transition-all dark:scale-0 dark:-rotate-90" />
            <Sun className="absolute h-[1.2rem] w-[1.2rem] scale-0 rotate-90 transition-all dark:scale-100 dark:rotate-0" />
        </Button>
    );
}
