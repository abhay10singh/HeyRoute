'use client'; // This page requires client-side interactivity for filters and map toggling

import type { ReactNode, SuspenseProps } from 'react';
import { useSearchParams } from 'next/navigation';
import { useState, useEffect, Suspense } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Map as MapIcon, List, Filter, Star, DollarSign, Search as SearchIcon } from 'lucide-react'; // Renamed Map to MapIcon to avoid conflict
import Image from 'next/image';
import Link from 'next/link';
import SearchResultsMap from '@/components/search/search-results-map'; // Component for map view
import { Separator } from '@/components/ui/separator';

// Define types for listings and filters
interface ListingSearchResult {
  id: string;
  name: string;
  type: 'Hotel' | 'Restaurant' | 'Attraction';
  rating: number;
  priceRange?: number; // e.g., 1-5 ($ to $$$$$)
  imageUrl: string;
  location: {
      addressSnippet: string; // Short address or neighborhood (e.g., "Midtown, NY", "Trastevere, Rome")
      city?: string; // Add city for easier filtering simulation
      lat: number;
      lng: number;
  };
  briefDescription: string;
}

interface Filters {
    searchTerm: string;
    location: string;
    category: string[];
    minRating: number;
    priceRange: [number, number];
}

// Fallback for Suspense
function SearchPageFallback() {
  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Filter Sidebar Skeleton */}
      <aside className="w-full lg:w-1/4 xl:w-1/5 space-y-6">
         <Skeleton className="h-12 w-full" />
         <Skeleton className="h-32 w-full" />
         <Skeleton className="h-24 w-full" />
         <Skeleton className="h-20 w-full" />
         <Skeleton className="h-10 w-full" />
      </aside>

      {/* Results Area Skeleton */}
      <div className="flex-1 space-y-6">
        <div className="flex justify-between items-center">
          <Skeleton className="h-8 w-48" />
          <Skeleton className="h-10 w-32" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i}>
              <Skeleton className="h-48 w-full rounded-t-lg" />
              <CardContent className="p-4 space-y-2">
                <Skeleton className="h-6 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
                <Skeleton className="h-4 w-full" />
                 <Skeleton className="h-4 w-1/3" />
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}


function SearchResultsPageContent() {
  const searchParams = useSearchParams();
  const [isMapView, setIsMapView] = useState(false);
  const [results, setResults] = useState<ListingSearchResult[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filters, setFilters] = useState<Filters>({
    searchTerm: searchParams.get('q') || '',
    location: searchParams.get('loc') || '',
    category: [],
    minRating: 0,
    priceRange: [1, 5], // Assuming price range is 1-5
  });

   // TODO: Replace with actual API call based on filters
  useEffect(() => {
    const fetchResults = async () => {
      setIsLoading(true);
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Dummy data - filter this based on 'filters' state in a real app
      const allListings: ListingSearchResult[] = [
        {
          id: '1',
          name: 'Amber Palace',
          type: 'Attraction',
          rating: 4.8,
          priceRange: 1,
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/7/7e/Amber_Fort_Jaipur_01.jpg',
          location: { addressSnippet: 'Devisinghpura, Amer', city: 'Jaipur', lat: 26.9855, lng: 75.8513 },
          briefDescription: 'A stunning Rajput‐Mughal hilltop fortress with ornate courtyards and panoramic Aravalli views.' // :contentReference[oaicite:0]{index=0}
        },
        {
          id: '2',
          name: 'Karavalli Restaurant',
          type: 'Restaurant',
          rating: 4.5,
          priceRange: 3,
          imageUrl: 'https://gateway.tajhotels.com/content/dam/luxury/hotel/P214/p214-karavalli-dining-2480-2480-1.jpg',
          location: { addressSnippet: 'Residency Road', city: 'Bengaluru', lat: 12.9611, lng: 77.6081 },
          briefDescription: 'Authentic coastal cuisine featuring fresh seafood and traditional Kerala specialties.' 
        },
        {
          id: '3',
          name: 'Taj Mahal',
          type: 'Attraction',
          rating: 4.8,
          priceRange: 1,
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/d/da/Taj-Mahal.jpg',
          location: { addressSnippet: 'Taj Ganj', city: 'Agra', lat: 27.1751, lng: 78.0421 },
          briefDescription: 'The white‐marble mausoleum of Shah Jahan—a UNESCO World Heritage and symbol of eternal love.' // :contentReference[oaicite:1]{index=1}
        },
        {
          id: '4',
          name: 'Taj Lake Palace',
          type: 'Hotel',
          rating: 4.7,
          priceRange: 4,
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/f/fb/HotelLakePalace2.jpg',
          location: { addressSnippet: 'Pichola Lake', city: 'Udaipur', lat: 24.5752, lng: 73.6855 },
          briefDescription: 'A floating marble palace on Lake Pichola—luxury suites, royal dining, and sunset vistas.' 
        },
        {
          id: '5',
          name: 'Radhanagar Beach',
          type: 'Attraction',
          rating: 4.6,
          priceRange: 1,
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/8/85/Radhanagar_Beach_03.jpg',
          location: { addressSnippet: 'Havelock Island', city: 'Andaman', lat: 11.9826, lng: 92.9818 },
          briefDescription: 'Powder-white sands and clear blue waters—voted one of the world’s best beaches.' 
        },
        {
          id: '6',
          name: 'Golden Temple',
          type: 'Attraction',
          rating: 4.9,
          priceRange: 1,
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/5/51/Golden_Temple_in_Amritsar.jpg',
          location: { addressSnippet: 'Golden Temple Rd', city: 'Amritsar', lat: 31.6200, lng: 74.8765 },
          briefDescription: 'Sikhism’s holiest shrine—gold-clad sanctum, the sacred Amrit Sarovar, and free community meals.' // :contentReference[oaicite:2]{index=2}
        },
        {
          id: '7',
          name: 'Hawa Mahal',
          type: 'Attraction',
          rating: 4.4,
          priceRange: 1,
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/0/0c/Hawa_Mahal_Jaipur.jpg',
          location: { addressSnippet: 'Johari Bazaar', city: 'Jaipur', lat: 26.9239, lng: 75.8267 },
          briefDescription: 'The “Palace of Winds” with its pink sandstone façade and 953 ornate windows.' 
        },
        {
          id: '8',
          name: 'India Gate',
          type: 'Attraction',
          rating: 4.5,
          priceRange: 1,
          imageUrl: 'https://upload.wikimedia.org/wikipedia/commons/4/47/India_Gate_in_New_Delhi_03-2016.jpg',
          location: { addressSnippet: 'Rajpath', city: 'New Delhi', lat: 28.6129, lng: 77.2295 },
          briefDescription: 'A war memorial arch honoring Indian soldiers, set in lush ceremonial lawns.' 
        },
      ];
      

      // Basic filtering simulation (extend this significantly in a real app)
      const filteredResults = allListings.filter(listing => {
          const searchTermMatch = !filters.searchTerm || listing.name.toLowerCase().includes(filters.searchTerm.toLowerCase());

          // **SIMULATED LOCATION FILTERING**
          // In a real application, the backend API would handle location filtering,
          // likely using geocoding for the text input and performing a database query
          // (e.g., radius search around coordinates).
          // This simulation checks if the input text matches the city or address snippet.
          const locationInputLower = filters.location.toLowerCase().trim();
          const locationMatch = !locationInputLower ||
                                (listing.location.city && listing.location.city.toLowerCase().includes(locationInputLower)) ||
                                listing.location.addressSnippet.toLowerCase().includes(locationInputLower);

          const categoryMatch = filters.category.length === 0 || filters.category.includes(listing.type);
          const ratingMatch = listing.rating >= filters.minRating;
          const priceMatch = listing.priceRange && filters.priceRange ? (listing.priceRange >= filters.priceRange[0] && listing.priceRange <= filters.priceRange[1]) : true; // Handle listings without priceRange

          return searchTermMatch && locationMatch && categoryMatch && ratingMatch && priceMatch;
      });


      setResults(filteredResults);
      setIsLoading(false);
    };

    fetchResults();
  }, [filters]); // Re-fetch when filters change

  const handleFilterChange = (filterName: keyof Filters, value: any) => {
    setFilters(prev => ({ ...prev, [filterName]: value }));
  };

   const handleCategoryChange = (category: string, checked: boolean | 'indeterminate') => {
        setFilters(prev => ({
            ...prev,
            category: checked
                ? [...prev.category, category]
                : prev.category.filter(c => c !== category),
        }));
    };

    const handleApplyFilters = () => {
        // Trigger fetchResults by dependency change (already happens)
        // Or, if debouncing, trigger the fetch here.
        console.log("Applying filters:", filters);
    };


  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Filter Sidebar */}
      <aside className="w-full lg:w-1/4 xl:w-1/5 space-y-6 p-4 border rounded-lg shadow-sm bg-card sticky top-20 self-start">
        <h2 className="text-xl font-semibold flex items-center gap-2"><Filter className="w-5 h-5"/> Filters</h2>

        <Separator/>

         {/* Search within results */}
        <div className="space-y-2">
            <Label htmlFor="search-term-filter">Search within results</Label>
            <div className="relative">
                <SearchIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                 <Input
                    id="search-term-filter"
                    placeholder="e.g., pool, free breakfast"
                    value={filters.searchTerm}
                    onChange={(e) => handleFilterChange('searchTerm', e.target.value)}
                    className="pl-8"
                />
            </div>
        </div>

        {/* Location filter */}
        <div className="space-y-2">
            <Label htmlFor="location-filter">Location</Label>
             <div className="relative">
                <MapIcon className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                    id="location-filter"
                    placeholder="City, neighborhood, address"
                    value={filters.location}
                    onChange={(e) => handleFilterChange('location', e.target.value)}
                    className="pl-8"
                 />
            </div>
             <p className="text-xs text-muted-foreground px-1">Try: New York, Rome, Paris, Miami...</p>
        </div>


        <Separator/>

        {/* Category Filter */}
        <div className="space-y-2">
          <Label>Category</Label>
          <div className="space-y-1">
            {['Hotel', 'Restaurant', 'Attraction'].map(cat => (
              <div key={cat} className="flex items-center gap-2">
                <Checkbox
                  id={`cat-${cat}`}
                  checked={filters.category.includes(cat)}
                  onCheckedChange={(checked) => handleCategoryChange(cat, checked)}
                />
                <Label htmlFor={`cat-${cat}`} className="font-normal">{cat}</Label>
              </div>
            ))}
          </div>
        </div>

         <Separator/>

        {/* Rating Filter */}
        <div className="space-y-2">
            <Label htmlFor="rating-filter">Minimum Rating</Label>
            <div className="flex items-center gap-2">
                 <Select
                    value={filters.minRating.toString()}
                    onValueChange={(value) => handleFilterChange('minRating', parseInt(value, 10))}
                  >
                    <SelectTrigger id="rating-filter">
                      <SelectValue placeholder="Any Rating" />
                    </SelectTrigger>
                    <SelectContent>
                      {[0, 1, 2, 3, 4, 5].map(rating => (
                        <SelectItem key={rating} value={rating.toString()}>
                           <div className="flex items-center">
                                {rating === 0 ? 'Any' : `${rating}+`}
                                {rating > 0 && <Star className="w-4 h-4 ml-1 text-yellow-400 fill-yellow-400" />}
                           </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
            </div>
        </div>

        <Separator/>

        {/* Price Range Filter - Placeholder */}
        <div className="space-y-2">
            <Label>Price Range (Example)</Label>
             <div className="flex items-center justify-between text-sm text-muted-foreground">
                 <span>$</span>
                 <span>$$$$$</span>
             </div>
            <Slider
                defaultValue={[1, 5]} // Default to full range
                min={1}
                max={5}
                step={1}
                value={filters.priceRange}
                onValueChange={(value) => handleFilterChange('priceRange', value)}
                className="my-2"
             />
             <div className="flex items-center justify-center text-sm font-medium">
                 {'$'.repeat(filters.priceRange[0])} - {'$'.repeat(filters.priceRange[1])}
             </div>
        </div>

        <Separator/>

        {/* NOTE: Apply button doesn't do anything extra here as filtering happens onChange */}
        {/* <Button onClick={handleApplyFilters} className="w-full">Apply Filters</Button> */}
      </aside>

      {/* Results Area */}
      <div className="flex-1">
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h1 className="text-2xl font-semibold">
            {isLoading ? <Skeleton className="h-8 w-48 inline-block" /> : `Showing ${results.length} results ${filters.location ? `in/near ${filters.location}` : ''}`}
          </h1>
          <div className="flex items-center gap-2">
             <span className="text-sm mr-2">View:</span>
            <Button
              variant={!isMapView ? 'secondary' : 'outline'}
              size="sm"
              onClick={() => setIsMapView(false)}
              aria-pressed={!isMapView}
            >
              <List className="w-4 h-4 mr-1" /> List
            </Button>
            <Button
              variant={isMapView ? 'secondary' : 'outline'}
              size="sm"
              onClick={() => setIsMapView(true)}
              aria-pressed={isMapView}
            >
              <MapIcon className="w-4 h-4 mr-1" /> Map
            </Button>
          </div>
        </div>

        {isLoading ? (
           // Loading Skeleton for results list/map
           isMapView ? (
                <Skeleton className="h-[600px] w-full rounded-lg" />
           ) : (
             <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {[...Array(6)].map((_, i) => (
                    <Card key={i}>
                        <Skeleton className="h-48 w-full rounded-t-lg" />
                        <CardContent className="p-4 space-y-2">
                            <Skeleton className="h-6 w-3/4" />
                            <Skeleton className="h-4 w-1/2" />
                            <Skeleton className="h-4 w-full" />
                            <Skeleton className="h-4 w-1/3" />
                        </CardContent>
                    </Card>
                  ))}
             </div>
           )
        ) : isMapView ? (
            <div className="h-[600px] w-full rounded-lg overflow-hidden border shadow-sm">
                 {results.length > 0 ? (
                     <SearchResultsMap listings={results} />
                 ) : (
                    <div className="flex items-center justify-center h-full bg-muted text-muted-foreground">
                         No listings found matching your filters.
                    </div>
                 )}
            </div>
        ) : (
          // List View
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {results.length > 0 ? results.map(listing => (
              <Card key={listing.id} className="overflow-hidden transition-shadow hover:shadow-lg flex flex-col">
                  <div className="relative">
                     <Link href={`/listings/${listing.id}`}>
                        <Image
                          src={listing.imageUrl}
                          alt={listing.name}
                          width={400}
                          height={250}
                          className="w-full h-48 object-cover"
                        />
                     </Link>
                     <Badge variant="secondary" className="absolute top-2 right-2">{listing.type}</Badge>
                 </div>
                <CardContent className="p-4 space-y-2 flex-grow flex flex-col">
                    <h3 className="text-lg font-semibold">
                         <Link href={`/listings/${listing.id}`} className="hover:text-primary">{listing.name}</Link>
                    </h3>
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                         <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                         <span>{listing.rating.toFixed(1)}</span>
                         {listing.priceRange && <span className="ml-2 text-xs"><DollarSign className="inline h-3 w-3" />{'$'.repeat(listing.priceRange)}</span>}
                    </div>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                        <MapIcon className="h-4 w-4 flex-shrink-0" /> {listing.location.addressSnippet}
                    </p>
                  <p className="text-sm text-foreground mt-1 flex-grow">{listing.briefDescription}</p>
                </CardContent>
                 <div className="p-4 pt-0 mt-auto">
                      <Button variant="outline" size="sm" asChild className="w-full">
                         <Link href={`/listings/${listing.id}`}>View Details</Link>
                      </Button>
                 </div>
              </Card>
            )) : (
                <p className="col-span-full text-center text-muted-foreground py-10">No results match your current filters.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}


// Use Suspense to handle loading state triggered by searchParams
export default function SearchPage() {
    return (
        <Suspense fallback={<SearchPageFallback />}>
            <SearchResultsPageContent />
        </Suspense>
    )
}
