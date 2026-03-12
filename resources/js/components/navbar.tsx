import { Link, usePage } from '@inertiajs/react';
import { DarkSwitch } from '@/components/dark-switch';
import { login, dashboard } from '@/routes';

export default function Navbar() {
    const { auth } = usePage().props;

    return (
        <nav className="fixed top-0 right-0 p-6 flex items-center space-x-4">
            {auth.user ? (
                <Link href={dashboard()} className="...">Dashboard</Link>
            ) : (
                <Link href={login()} className="...">Log in</Link>
            )}
            <DarkSwitch />
        </nav>
    );
}