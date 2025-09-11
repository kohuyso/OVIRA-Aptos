import Link from 'next/link';
import { Button } from 'src/components/ui/button';

export default function NotFoundPage() {
    return (
        <div className="min-h-[calc(100vh-4rem)] w-full flex items-center justify-center">
            <div className="text-center space-y-4">
                <div>
                    <h1 className="text-4xl font-bold tracking-tight">404</h1>
                    <p className="text-muted-foreground mt-1">Not Found</p>
                </div>
                <Button asChild>
                    <Link href="/">Back to Home</Link>
                </Button>
            </div>
        </div>
    );
}
