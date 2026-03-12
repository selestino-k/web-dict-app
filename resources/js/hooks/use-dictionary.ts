import { useState } from 'react';

export function useDictionary() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [result, setResult] = useState(null);

    const search = async (word: string) => {
        if (!word.trim()) {
            setResult(null);
            return;
        }

        setLoading(true);
        setError(null);

        try {
            const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${encodeURIComponent(word)}`);
            
            if (!response.ok) {
                throw new Error('Word not found');
            }

            const data = await response.json();
            setResult(data);
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Search failed');
            setResult(null);
        } finally {
            setLoading(false);
        }
    };

    return { search, result, loading, error };
}