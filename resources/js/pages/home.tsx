import { Head } from '@inertiajs/react';
import { Search } from 'lucide-react';
import Navbar from '@/components/navbar';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';


export default function HomePage() {
    return (
        <>
            <Head title="Laravel Dictionary App" />
            <Navbar />
            <div className="flex min-h-screen flex-col items-center justify-center bg-[#FDFDFC] p-6 text-[#1b1b18] dark:bg-[#0a0a0a] dark:text-[#EDEDEC]">
                <div className="max-w-md text-center">
                    <h1 className="text-4xl font-bold mb-4">Laravel Dictionary App</h1>
                    <p className="text-lg text-[#706f6c] dark:text-[#A1A09A] mb-5">
                        This is a new Inertia page written in TSX.
                    </p>
                    <div className="mb-5 items-center justify-center space-x-4">
                     

                    </div>
                    <div className="mb-5 flex items-center justify-center">
                        
                    </div>
                    <div className="flex items-center justify-center space-x-2">
                    <Input
                        type="text"
                        placeholder="Enter a word"
                        className="w-full"
                    />
                    <Button
                        type="submit"
                        className="flex items-center justify-center"
                        tabIndex={4}
                        data-test="login-button"
                    >
                        <Search className="mr-2 h-4 w-4" />Search

                    </Button>
                    </div>
                    
                </div>
            </div>
        </>
    );
}
