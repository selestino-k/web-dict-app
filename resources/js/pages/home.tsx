import { Head } from '@inertiajs/react';
import { Search } from 'lucide-react';
import { useState } from 'react';
import Navbar from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/spinner';

import WordResultComponent from '@/components/word-result';
import { useDictionary } from '@/hooks/use-dictionary';

export default function HomePage() {
    const [searchInput, setSearchInput] = useState('');
    const { search, result, loading, error } = useDictionary();

    const handleSearch = async (e: React.FormEvent) => {
        e.preventDefault();
        await search(searchInput);
    };

    return (
        <>
            <Head title="Laravel Dictionary App" />
            <Navbar />
            <div className="flex min-h-screen flex-col items-center justify-center bg-[#FDFDFC] p-6 text-[#1b1b18] dark:bg-[#0a0a0a] dark:text-[#EDEDEC]">
                <div className=" max-w-lg text-center w-full">
                    <h1 className="text-5xl font-bold mb-4">Laravel Dictionary App</h1>
                    <p className="text-lg text-[#706f6c] dark:text-[#A1A09A] mb-5">
                        Search for word definitions
                    </p>

                    <form onSubmit={handleSearch} className="flex items-center justify-center space-x-2">
                        <Input
                            type="text"
                            placeholder="Enter a word"
                            value={searchInput}
                            onChange={(e) => setSearchInput(e.target.value)}
                            className="w-full"
                        />
                        <Button
                            type="submit"
                            disabled={loading}
                            className="flex items-center justify-center"
                        >
                            {loading ? (
                                <>
                                    <Spinner className="mr-2 h-4 w-4" />
                                    Searching...
                                </>
                            ) : (
                                <>
                                    <Search className="mr-2 h-4 w-4" />
                                    Search
                                </>
                            )}
                        </Button>
                    </form>
                </div>
                <div className="max-w-2xl text-wrap w-full mt-6">
                    {error && <p className="text-red-500 mt-4">{error}</p>}

                    {result && (
                        <div className="mt-6 text-left">
                            {/* Display results from dictionary API */}
                            <pre className="bg-gray-100 dark:bg-gray-900 p-4">
                                {result && <WordResultComponent data={result} onWordClick={(word) => search(word)} />}                            </pre>
                        </div>
                    )}
                </div>
            </div>
        </>
    );
}
