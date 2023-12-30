import { useState, useEffect } from "react";

interface MediaQueryList {
    matches: boolean;
    addEventListener(
        type: string,
        listener: (event: MediaQueryListEvent) => void
    ): void;
    removeEventListener(
        type: string,
        listener: (event: MediaQueryListEvent) => void
    ): void;
}

export function useMediaQuery(query: string): boolean {
    const [matches, setMatches] = useState(false);

    useEffect(() => {
        const media = window.matchMedia(query) as MediaQueryList;
        setMatches(media.matches);

        const listener = () => {
            setMatches(media.matches);
        };
        media.addEventListener("change", listener);

        return () => media.removeEventListener("change", listener);
    }, [query]);

    return matches;
}
