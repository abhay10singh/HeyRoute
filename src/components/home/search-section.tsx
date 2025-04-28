'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin } from 'lucide-react';
import { useRouter } from 'next/navigation'; // Use next/navigation for App Router

export default function SearchSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Navigate to the search results page with query parameters
    const queryParams = new URLSearchParams();
    if (searchTerm) queryParams.set('q', searchTerm);
    if (location) queryParams.set('loc', location);

    router.push(`/search?${queryParams.toString()}`);
  };

  return (
    <section className="py-12 md:py-16 bg-gradient-to-b from-primary/10 to-background rounded-lg shadow-sm">
      <div className="container px-4 md:px-6 text-center">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl text-primary mb-4">
          Find Your Next Adventure
        </h1>
        <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl mb-8">
          Search for hotels, restaurants, attractions, and more. Read reviews and plan your perfect trip with HeyRoute.
        </p>
        <form
          onSubmit={handleSearch}
          className="mx-auto max-w-2xl flex flex-col sm:flex-row items-center gap-4 p-4 bg-card rounded-lg border shadow-md"
        >
          <div className="relative flex-grow w-full sm:w-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Search for hotels, restaurants..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-2 w-full h-11"
              aria-label="Search term"
            />
          </div>
          <div className="relative flex-grow w-full sm:w-auto">
             <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
            <Input
              type="text"
              placeholder="Location (e.g., city, zip)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-10 pr-4 py-2 w-full h-11"
              aria-label="Location"
            />
          </div>
          <Button type="submit" size="lg" className="w-full sm:w-auto h-11">
            <Search className="mr-2 h-5 w-5" /> Search
          </Button>
        </form>
      </div>
    </section>
  );
}
