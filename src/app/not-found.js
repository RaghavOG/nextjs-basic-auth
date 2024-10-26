"use client";
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';

export default function NotFound() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h1 className="text-4xl font-bold mb-4">404 - Page Not Found</h1>
      <p className="text-xl mb-8">Oops! The page you&apos;re looking for doesn&apos;t exist.</p>
      <div className="flex gap-4">
        <Button onClick={() => router.back()}>
          Go Back
        </Button>
        <Link href="/">
          <Button>
            Go to Home Page
          </Button>
        </Link>
      </div>
    </div>
  );
}
