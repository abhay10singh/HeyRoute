'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, MapPin, Hotel, Utensils, MapPinIcon, Plane, Camera } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useTypingAnimation } from './TypingAnimation';

export default function SearchSection() {
  const [searchTerm, setSearchTerm] = useState('');
  const [location, setLocation] = useState('');
  const [activeTab, setActiveTab] = useState('all');
  const router = useRouter();
  const typingText = useTypingAnimation([
    'Want to go somewhere?',
    'HeyRoute is here for you!',
    'Find your next adventure!',
    'Explore the world!'
  ], 100, 50, 2000);
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const queryParams = new URLSearchParams();
    if (searchTerm) queryParams.set('q', searchTerm);
    if (location) queryParams.set('loc', location);
    if (activeTab !== 'all') queryParams.set('category', activeTab);

    router.push(`/search?${queryParams.toString()}`);
  };

  const searchCategories = [
    { id: 'all', label: 'Search All', icon: Search },
    { id: 'hotels', label: 'Hotels', icon: Hotel },
    { id: 'restaurants', label: 'Restaurants', icon: Utensils },
    { id: 'attractions', label: 'Things to Do', icon: Camera },
    { id: 'flights', label: 'Flights', icon: Plane },
  ];

  return (
    <section className="bg-white dark:bg-background py-16 lg:py-24">
      <div className="container max-w-6xl mx-auto px-4">
      
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6 tracking-tight">
          {typingText}
          </h1>
        </div>

        {/* Search Categories */}
        <div className="flex justify-center mb-8">
          <div className="flex bg-gray-50 dark:bg-gray-800 rounded-full p-1 gap-1">
            {searchCategories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setActiveTab(category.id)}
                  className={`
                    flex items-center gap-2 px-4 py-3 rounded-full font-medium text-sm transition-all duration-200
                    ${activeTab === category.id 
                      ? 'bg-white dark:bg-gray-700 text-gray-900 dark:text-white shadow-sm' 
                      : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                    }
                  `}
                >
                  <Icon className="h-4 w-4" />
                  <span className="hidden sm:inline">{category.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Search Form */}
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSearch}>
            <div className="bg-white dark:bg-gray-800 rounded-full shadow-xl border border-gray-200 dark:border-gray-700 p-2">
              <div className="flex flex-col lg:flex-row gap-2">
                {/* Search Input */}
                <div className="relative flex-1">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Places to go, things to do, hotels..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="
                      pl-14 pr-6 py-4 h-14 text-base border-0 bg-transparent 
                      focus:ring-0 focus:outline-none placeholder:text-gray-500
                      rounded-full
                    "
                    aria-label="Search places, hotels, restaurants"
                  />
                </div>

                {/* Location Input */}
                <div className="relative flex-1 lg:max-w-xs">
                  <MapPin className="absolute left-6 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder="Where?"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="
                      pl-14 pr-6 py-4 h-14 text-base border-0 bg-transparent 
                      focus:ring-0 focus:outline-none placeholder:text-gray-500
                      rounded-full lg:border-l lg:border-gray-200 dark:lg:border-gray-600
                    "
                    aria-label="Location"
                  />
                </div>

                {/* Search Button */}
                <Button 
                  type="submit"
                  className="
                    h-14 px-8 bg-green-600 hover:bg-green-700 text-white font-semibold text-base
                    rounded-full shadow-md transition-all duration-200 hover:shadow-lg
                    flex items-center gap-2 whitespace-nowrap
                  "
                >
                  <Search className="h-5 w-5" />
                  <span>Search</span>
                </Button>
              </div>
            </div>
          </form>
        </div>

        {/* Quick Links */}
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          {[
            'Popular destinations',
            'Top hotels',
            'Best restaurants',
            'Must-see attractions',
            'Weekend getaways'
          ].map((link) => (
            <button
              key={link}
              onClick={() => setSearchTerm(link)}
              className="
                text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white
                underline transition-colors duration-200
              "
            >
              {link}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
}
