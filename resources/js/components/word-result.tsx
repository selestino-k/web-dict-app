import { Volume2, ExternalLink } from 'lucide-react';
import React from 'react';

interface Phonetic {
    text?: string;
    audio?: string;
}

interface Definition {
    definition: string;
    synonyms?: string[];
    antonyms?: string[];
    example?: string;
}

interface Meaning {
    partOfSpeech: string;
    definitions: Definition[];
    synonyms?: string[];
    antonyms?: string[];
}

interface WordResult {
    word: string;
    phonetic?: string;
    phonetics?: Phonetic[];
    meanings?: Meaning[];
    sourceUrls?: string[];
    license?: {
        name: string;
        url: string;
    };
}

interface WordResultComponentProps {
    data: WordResult[];
    onWordClick?: (word: string) => void;  

}

export default function WordResultComponent({ data, onWordClick }: WordResultComponentProps) {
    if (!data || data.length === 0) {
        return null;
    }

    const handleWordClick = (word: string) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        onWordClick?.(word);
    };

    const word = data[0];

    const playAudio = (audioUrl: string) => {
        const audio = new Audio(audioUrl);
        audio.play().catch(() => {
            console.error('Failed to play audio');
        });
    };

    return (
        <div className="mt-8 space-y-8 max-w-2xl mx-auto font-sans">
            {/* Word Header */}
            <div className="border-b pb-8">
                <div className="flex items-center justify-between mb-4">
                    <div>
                        <h2 className="text-5xl font-bold mb-2">{word.word}</h2>
                        <p className="text-xl text-blue-600 dark:text-blue-400">
                            {word.phonetic}
                        </p>
                    </div>
                    {word.phonetics && word.phonetics[0]?.audio && (
                        <button
                            onClick={() => playAudio(word.phonetics![0].audio!)}
                            className="p-3 bg-blue-600 hover:bg-blue-700 text-white rounded-full transition-colors"
                            aria-label="Play pronunciation"
                        >
                            <Volume2 className="w-6 h-6" />
                        </button>
                    )}
                </div>
            </div>

            {/* Meanings */}
            {word.meanings && word.meanings.length > 0 && (
                <div className="space-y-6">
                    {word.meanings.map((meaning, idx) => (
                        <div key={idx}>
                            <div className="flex items-center gap-4 mb-4">
                                <h3 className="text-xl italic font-semibold">
                                    {meaning.partOfSpeech}
                                </h3>
                                <hr className="flex-1" />
                            </div>

                            {/* Definitions */}
                            {meaning.definitions && meaning.definitions.length > 0 && (
                                <div className="mb-6 text-pretty">
                                    <h4 className="text-gray-600 dark:text-gray-400 mb-3">
                                        Meaning
                                    </h4>
                                    <ul className="space-y-3 list-disc list-inside">
                                        {meaning.definitions.map((def, defIdx) => (
                                            <li key={defIdx} className="text-gray-700 dark:text-gray-300">
                                                {def.definition}
                                                {def.example && (
                                                    <p className="text-gray-500 dark:text-gray-400 italic mt-1 ml-4">
                                                        "{def.example}"
                                                    </p>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}

                            {/* Synonyms */}
                            {meaning.synonyms && meaning.synonyms.length > 0 && (
                                <div className="mb-6">
                                    <h4 className="text-gray-600 dark:text-gray-400 mb-3">
                                        Synonyms
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {meaning.synonyms.map((synonym, synIdx) => (
                                            <span
                                                key={synIdx}
                                                onClick={() => handleWordClick(synonym)}
                                                className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-full text-sm cursor-pointer hover:opacity-80 transition-opacity"
                                            >
                                                {synonym}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}

                            {/* Antonyms */}
                            {meaning.antonyms && meaning.antonyms.length > 0 && (
                                <div>
                                    <h4 className="text-gray-600 dark:text-gray-400 mb-3">
                                        Antonyms
                                    </h4>
                                    <div className="flex flex-wrap gap-2">
                                        {meaning.antonyms.map((antonym, antIdx) => (
                                            <span
                                                key={antIdx}
                                                onClick={() => handleWordClick(antonym)}
                                                className="px-3 py-1 bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-200 rounded-full text-sm cursor-pointer hover:opacity-80 transition-opacity"
                                            >
                                                {antonym}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            )}

            {/* Source URLs */}
            {word.sourceUrls && word.sourceUrls.length > 0 && (
                <div className="border-t pt-6">
                    <h4 className="text-gray-600 dark:text-gray-400 mb-3">Sources</h4>
                    <div className="space-y-2">
                        {word.sourceUrls.map((url, idx) => (
                            <a
                                key={idx}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:underline"
                            >
                                {url}
                                <ExternalLink className="w-4 h-4" />
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}