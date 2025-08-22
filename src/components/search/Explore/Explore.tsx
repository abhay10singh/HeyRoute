'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Search, MapPin, Filter, Grid, List, Star, Heart, Plane, Hotel, Utensils, Camera, Globe, SlidersHorizontal, CalendarDays, Users2, Wifi, Coffee, Car, Dumbbell } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { useRouter } from 'next/navigation';

// Sample data with Indian destinations and Asian countries - matching listing page format
const sampleDestinations = [
  {
    id: 3,
    title: "Heritage Villa in Udaipur",
    category: "destination",
    rating: 4.8,
    reviews: 2148,
    price: 8500,
    originalPrice: 12000,
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop",
    description: "Stunning heritage villa with lake views and royal architecture",
    location: "City Palace Area, Udaipur, Rajasthan",
    country: "India",
    coordinates: { lat: 24.5854, lng: 73.6830 },
    featured: true,
    tags: ["Heritage", "Lake View", "WiFi"],
    amenities: ["Pool", "WiFi", "Kitchen", "Parking"]
  },
  {
    id: 4,
    title: "Luxury Hotel in Goa",
    category: "hotel",
    rating: 4.6,
    reviews: 1892,
    price: 6500,
    originalPrice: 8500,
    image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&h=600&fit=crop",
    description: "Beachfront luxury hotel with world-class amenities",
    location: "Calangute Beach, North Goa",
    country: "India",
    coordinates: { lat: 15.5469, lng: 73.7732 },
    featured: true,
    tags: ["Beach", "Luxury", "Spa"],
    amenities: ["Beach Access", "Spa", "Pool", "Restaurant"]
  },
  {
    id: 5,
    title: "Traditional Ryokan in Kyoto",
    category: "hotel",
    rating: 4.9,
    reviews: 756,
    price: 15000,
    originalPrice: 18000,
    image: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop",
    description: "Authentic Japanese ryokan with tatami rooms and kaiseki dining",
    location: "Gion District, Kyoto",
    country: "Japan",
    coordinates: { lat: 35.0042, lng: 135.7747 },
    featured: true,
    tags: ["Traditional", "Kaiseki", "Hot Springs"],
    amenities: ["Hot Springs", "Traditional Dining", "Garden", "Tea Ceremony"]
  },
  {
    id: 6,
    title: "Himalayan Trek Experience",
    category: "attraction",
    rating: 4.7,
    reviews: 3256,
    price: 25000,
    originalPrice: 30000,
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop",
    description: "Guided trek to Everest Base Camp with experienced Sherpa guides",
    location: "Himalayas, Nepal (via Delhi)",
    country: "India",
    coordinates: { lat: 27.9881, lng: 86.9250 },
    featured: true,
    tags: ["Adventure", "Trekking", "Mountain Views"],
    amenities: ["Guide", "Equipment", "Meals", "Permits"]
  },
  {
    id: 7,
    title: "Modern Apartment in Mumbai",
    category: "destination",
    rating: 4.3,
    reviews: 967,
    price: 4500,
    originalPrice: 6000,
    image: "https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&h=600&fit=crop",
    description: "Contemporary apartment in the heart of financial district",
    location: "Bandra-Kurla Complex, Mumbai",
    country: "India",
    coordinates: { lat: 19.0596, lng: 72.8295 },
    featured: false,
    tags: ["Modern", "Central", "Business District"],
    amenities: ["WiFi", "Kitchen", "Gym", "Security"]
  },
  {
    id: 8,
    title: "Night Market Food Tour",
    category: "restaurant",
    rating: 4.8,
    reviews: 1456,
    price: 2500,
    originalPrice: 3200,
    image: "https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&h=600&fit=crop",
    description: "Authentic street food experience at Taiwan's famous night markets",
    location: "Shilin Night Market, Taipei",
    country: "Taiwan",
    coordinates: { lat: 25.0875, lng: 121.5244 },
    featured: false,
    tags: ["Street Food", "Night Market", "Local Experience"],
    amenities: ["Food Tour", "Local Guide", "Tastings"]
  },
  {
    id: 9,
    title: "Houseboat in Kerala Backwaters",
    category: "destination",
    rating: 4.9,
    reviews: 2789,
    price: 7500,
    originalPrice: 9500,
    image: "https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&h=600&fit=crop",
    description: "Traditional houseboat cruise through scenic Kerala backwaters",
    location: "Alleppey, Kerala",
    country: "India",
    coordinates: { lat: 9.4981, lng: 76.3388 },
    featured: true,
    tags: ["Backwaters", "Traditional", "Peaceful"],
    amenities: ["AC", "Meals", "Fishing", "Sightseeing"]
  },
  {
    id: 10,
    title: "Jeju Island Resort",
    category: "hotel",
    rating: 4.5,
    reviews: 1123,
    price: 12000,
    originalPrice: 15000,
    image: "https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=800&h=600&fit=crop",
    description: "Island resort with volcanic landscapes and pristine beaches",
    location: "Jeju Island, South Korea",
    country: "South Korea",
    coordinates: { lat: 33.4996, lng: 126.5312 },
    featured: false,
    tags: ["Island", "Beach", "Volcanic"],
    amenities: ["Beach Access", "Spa", "Golf", "Hiking"]
  },
  {
    id: 11,
    title: "Golden Temple Tour",
    category: "attraction",
    rating: 4.9,
    reviews: 5678,
    price: 1500,
    originalPrice: 2000,
    image: "https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=800&h=600&fit=crop",
    description: "Spiritual journey to the Golden Temple with langar experience",
    location: "Amritsar, Punjab",
    country: "India",
    coordinates: { lat: 31.6200, lng: 74.8765 },
    featured: true,
    tags: ["Spiritual", "Heritage", "Cultural"],
    amenities: ["Guide", "Langar", "Photography", "History"]
  },
  {
    id: 12,
    title: "Tea Garden Stay in Darjeeling",
    category: "destination",
    rating: 4.6,
    reviews: 1834,
    price: 5500,
    originalPrice: 7000,
    image: "https://images.unsplash.com/photo-1566992283741-8f3c1ac5a5b2?w=800&h=600&fit=crop",
    description: "Colonial-era bungalow amidst rolling tea gardens with mountain views",
    location: "Darjeeling, West Bengal",
    country: "India",
    coordinates: { lat: 27.0360, lng: 88.2627 },
    featured: false,
    tags: ["Tea Gardens", "Mountains", "Colonial"],
    amenities: ["Tea Tasting", "Mountain Views", "Heritage", "Garden Walks"]
  },
  {
    id: 13,
    title: "Traditional Hanok Stay",
    category: "destination",
    rating: 4.7,
    reviews: 892,
    price: 8500,
    originalPrice: 11000,
    image: "https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=600&fit=crop",
    description: "Experience traditional Korean architecture in historic Bukchon village",
    location: "Bukchon Hanok Village, Seoul",
    country: "South Korea",
    coordinates: { lat: 37.5826, lng: 126.9838 },
    featured: false,
    tags: ["Traditional", "Historic", "Cultural"],
    amenities: ["Traditional Architecture", "Cultural Experience", "City Views"]
  },
  {
    id: 14,
    title: "Spice Plantation Tour in Kerala",
    category: "attraction",
    rating: 4.8,
    reviews: 2341,
    price: 3500,
    originalPrice: 4500,
    image: "https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&h=600&fit=crop",
    description: "Guided tour through aromatic spice plantations with cooking class",
    location: "Thekkady, Kerala",
    country: "India",
    coordinates: { lat: 9.5939, lng: 77.1025 },
    featured: false,
    tags: ["Spices", "Nature", "Cooking"],
    amenities: ["Guide", "Cooking Class", "Spice Shopping", "Nature Walk"]
  }
];

const categories = [
  { id: "all", label: "All", icon: Globe, color: "bg-blue-500" },
  { id: "destination", label: "Stays", icon: MapPin, color: "bg-green-500" },
  { id: "hotel", label: "Hotels", icon: Hotel, color: "bg-purple-500" },
  { id: "restaurant", label: "Restaurants", icon: Utensils, color: "bg-orange-500" },
  { id: "attraction", label: "Things to do", icon: Camera, color: "bg-red-500" }
];

const countries = ["All Countries", "India", "Japan", "Taiwan", "South Korea"];
const amenities = ["Pool", "WiFi", "Kitchen", "Parking", "Spa", "Restaurant", "Beach Access", "Hot Springs", "Guide", "Tea Tasting"];

export default function Explore() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedCountry, setSelectedCountry] = useState('All Countries');
  const [selectedAmenities, setSelectedAmenities] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState([0, 30000]);
  const [sortBy, setSortBy] = useState('featured');
  const [viewMode, setViewMode] = useState('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<number[]>([]);

  const filteredDestinations = useMemo(() => {
    let filtered = sampleDestinations.filter(destination => {
      const matchesSearch = destination.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           destination.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           destination.location.toLowerCase().includes(searchTerm.toLowerCase());
      
      const matchesCategory = selectedCategory === 'all' || destination.category === selectedCategory;
      const matchesCountry = selectedCountry === 'All Countries' || destination.country === selectedCountry;
      const matchesPrice = destination.price >= priceRange[0] && destination.price <= priceRange[1];
      const matchesAmenities = selectedAmenities.length === 0 || 
                              selectedAmenities.some(amenity => destination.amenities.includes(amenity));

      return matchesSearch && matchesCategory && matchesCountry && matchesPrice && matchesAmenities;
    });

    switch (sortBy) {
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'reviews':
        filtered.sort((a, b) => b.reviews - a.reviews);
        break;
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'featured':
      default:
        filtered.sort((a, b) => {
          if (a.featured && !b.featured) return -1;
          if (!a.featured && b.featured) return 1;
          return b.rating - a.rating;
        });
        break;
    }

    return filtered;
  }, [searchTerm, selectedCategory, selectedCountry, selectedAmenities, priceRange, sortBy]);

  const toggleFavorite = (id: number) => {
    setFavorites(prev => 
      prev.includes(id) 
        ? prev.filter(fav => fav !== id)
        : [...prev, id]
    );
  };

  const toggleAmenity = (amenity: string) => {
    setSelectedAmenities(prev =>
      prev.includes(amenity)
        ? prev.filter(a => a !== amenity)
        : [...prev, amenity]
    );
  };

  const clearFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setSelectedCountry('All Countries');
    setSelectedAmenities([]);
    setPriceRange([0, 30000]);
    setSortBy('featured');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-background">
      {/* Clean Hero Section */}
      <section className="relative bg-white dark:bg-background text-gray-900 dark:text-white">
        <div className="container mx-auto px-4 py-12">
          {/* Header Text */}
          <div className="text-center mb-8">
            <h1 className="text-3xl md:text-5xl font-bold mb-3 text-gray-900 dark:text-white">
              Explore the world with confidence
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              Get the insights you need to plan your perfect trip, backed by millions of traveler reviews
            </p>
          </div>
          
          {/* Enhanced Search Container */}
          <div className="max-w-5xl mx-auto">
            <div className="bg-white dark:bg-background rounded-xl shadow-lg border border-gray-200 dark:border-gray-700 p-6">
              {/* Search Type Tabs */}
              <div className="flex flex-wrap gap-1 mb-6 bg-gray-50 dark:bg-gray-700 rounded-lg p-1">
                <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-600 rounded-lg shadow-sm text-gray-900 dark:text-white font-medium text-sm border border-gray-200 dark:border-gray-500">
                  <Hotel className="h-4 w-4" />
                  Hotels
                </button>
                <button className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-600/50 rounded-lg text-sm">
                  <Camera className="h-4 w-4" />
                  Things to do
                </button>
                <button className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-600/50 rounded-lg text-sm">
                  <Utensils className="h-4 w-4" />
                  Restaurants
                </button>
                <button className="flex items-center gap-2 px-4 py-2 text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-600/50 rounded-lg text-sm">
                  <Plane className="h-4 w-4" />
                  Flights
                </button>
              </div>

              {/* Main Search Form */}
              <div className="space-y-4">
                {/* Location Search */}
                <div className="relative">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Where to?
                  </label>
                  <div className="relative">
                    <MapPin className="absolute left-4 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
                    <Input
                      placeholder="Enter destination"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-12 h-12 text-gray-900 dark:text-white bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500"
                    />
                  </div>
                </div>

                {/* Date and Guests Row */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Check-in
                    </label>
                    <div className="relative">
                      <CalendarDays className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
                      <Input 
                        type="date" 
                        className="pl-10 h-12 text-gray-900 dark:text-white bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500" 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Check-out
                    </label>
                    <div className="relative">
                      <CalendarDays className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
                      <Input 
                        type="date" 
                        className="pl-10 h-12 text-gray-900 dark:text-white bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500" 
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                      Travelers
                    </label>
                    <div className="relative">
                      <Users2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400 dark:text-gray-500" />
                      <Select>
                        <SelectTrigger className="pl-10 h-12 border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500 text-gray-900 dark:text-white bg-white dark:bg-gray-700">
                          <SelectValue placeholder="2 travelers" />
                        </SelectTrigger>
                        <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                          <SelectItem value="1" className="text-gray-900 dark:text-white focus:bg-gray-100 dark:focus:bg-gray-700">1 traveler</SelectItem>
                          <SelectItem value="2" className="text-gray-900 dark:text-white focus:bg-gray-100 dark:focus:bg-gray-700">2 travelers</SelectItem>
                          <SelectItem value="3" className="text-gray-900 dark:text-white focus:bg-gray-100 dark:focus:bg-gray-700">3 travelers</SelectItem>
                          <SelectItem value="4" className="text-gray-900 dark:text-white focus:bg-gray-100 dark:focus:bg-gray-700">4 travelers</SelectItem>
                          <SelectItem value="5" className="text-gray-900 dark:text-white focus:bg-gray-100 dark:focus:bg-gray-700">5+ travelers</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                {/* Search Button */}
                <Button className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-lg rounded-lg shadow-lg">
                  <Search className="h-5 w-5 mr-2" />
                  Search
                </Button>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div className="mt-8 text-center">
            <p className="text-gray-600 dark:text-gray-400 mb-4 text-sm">Popular destinations</p>
            <div className="flex flex-wrap justify-center gap-3">
              {['Mumbai', 'Delhi', 'Goa', 'Kerala', 'Rajasthan', 'Tokyo', 'Seoul', 'Taipei'].map((city) => (
                <button
                  key={city}
                  className="px-4 py-2 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-full text-gray-700 dark:text-gray-300 text-sm font-medium transition-all duration-200 border border-gray-200 dark:border-gray-600"
                >
                  {city}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      
      <section className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="flex overflow-x-auto py-4">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`flex items-center gap-2 px-6 py-3 rounded-full whitespace-nowrap mr-4 transition-colors ${
                    selectedCategory === category.id
                      ? 'bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-400 border-2 border-blue-200 dark:border-blue-800'
                      : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                  }`}
                >
                  <IconComponent className="h-5 w-5" />
                  <span className="font-medium">{category.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Filters and Results */}
      <section className="py-8 bg-white dark:bg-[#060c12]">
        <div className="container mx-auto px-4">
          {/* Filter Bar */}
          <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
            <div className="flex items-center gap-4">
              <Button
                variant="outline"
                onClick={() => setShowFilters(!showFilters)}
                className="border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800"
              >
                <SlidersHorizontal className="h-4 w-4 mr-2" />
                Filters
              </Button>
              
              <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                <SelectTrigger className="w-[180px] bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  {countries.map(country => (
                    <SelectItem key={country} value={country} className="text-gray-900 dark:text-white focus:bg-gray-100 dark:focus:bg-gray-700">
                      {country}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center gap-4">
              <span className="text-gray-600 dark:text-gray-400">
                {filteredDestinations.length} of {sampleDestinations.length} results
              </span>
              
              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-[200px] bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
                  <SelectItem value="featured" className="text-gray-900 dark:text-white focus:bg-gray-100 dark:focus:bg-gray-700">Recommended</SelectItem>
                  <SelectItem value="rating" className="text-gray-900 dark:text-white focus:bg-gray-100 dark:focus:bg-gray-700">Highest rated</SelectItem>
                  <SelectItem value="price-low" className="text-gray-900 dark:text-white focus:bg-gray-100 dark:focus:bg-gray-700">Price: low to high</SelectItem>
                  <SelectItem value="price-high" className="text-gray-900 dark:text-white focus:bg-gray-100 dark:focus:bg-gray-700">Price: high to low</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg">
                <Button
                  variant={viewMode === 'grid' ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {/* Expandable Filters */}
          {showFilters && (
            <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-6 mb-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                    Price range: ₹{priceRange[0].toLocaleString()} - ₹{priceRange[1].toLocaleString()}
                  </label>
                  <Slider
                    value={priceRange}
                    onValueChange={setPriceRange}
                    max={30000}
                    min={0}
                    step={500}
                    className="mt-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Amenities</label>
                  <div className="space-y-2 max-h-32 overflow-y-auto">
                    {amenities.map(amenity => (
                      <label key={amenity} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedAmenities.includes(amenity)}
                          onChange={() => toggleAmenity(amenity)}
                          className="rounded border-gray-300 dark:border-gray-600 text-blue-600 mr-2 bg-white dark:bg-gray-700"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">{amenity}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <div className="flex items-end">
                  <Button onClick={clearFilters} variant="outline" className="w-full border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800">
                    Clear all filters
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Results Grid */}
          {filteredDestinations.length > 0 ? (
            <div className={
              viewMode === 'grid' 
                ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                : "space-y-4"
            }>
              {filteredDestinations.map((destination) => {
                const isFavorite = favorites.includes(destination.id);
                
                return (
                  <Link key={destination.id} href={`/listings/${destination.id}`}>
                    <Card
                      className={`group cursor-pointer hover:shadow-lg transition-all duration-300 bg-white dark:bg-[#060c12] border-gray-200 dark:border-gray-700 rounded-2xl ${
                        viewMode === 'list' ? 'flex flex-row overflow-hidden' : ''
                      }`}
                    >
                      <div className={`relative ${viewMode === 'list' ? 'w-64 flex-shrink-0' : 'aspect-[4/3]'}`}>
                        <Image
                          src={destination.image}
                          alt={destination.title}
                          fill
                          className="object-cover"
                          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                        
                        {/* Favorite Button */}
                        <Button
                          size="sm"
                          variant="ghost"
                          className="absolute top-3 right-3 bg-white/80 hover:bg-white dark:bg-gray-800/80 dark:hover:bg-gray-800 rounded-full w-8 h-8 p-0"
                          onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            toggleFavorite(destination.id);
                          }}
                        >
                          <Heart className={`h-4 w-4 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600 dark:text-gray-300'}`} />
                        </Button>

                        {/* Category Badge */}
                        <Badge className={`absolute bottom-3 left-3 ${
                          destination.category === 'destination' ? 'bg-blue-500' :
                          destination.category === 'hotel' ? 'bg-green-500' :
                          destination.category === 'restaurant' ? 'bg-orange-500' :
                          'bg-purple-500'
                        } text-white`}>
                          {destination.category.charAt(0).toUpperCase() + destination.category.slice(1)}
                        </Badge>
                      </div>

                      <CardContent className={`p-4 ${viewMode === 'list' ? 'flex-1' : ''}`}>
                        <div className="space-y-2">
                          <div className="flex items-start justify-between">
                            <h3 className="font-semibold text-lg line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors text-gray-900 dark:text-white">
                              {destination.title}
                            </h3>
                          </div>
                          
                          <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400 text-sm">
                            <MapPin className="h-4 w-4" />
                            <span>{destination.location}</span>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="font-medium text-gray-900 dark:text-white">{destination.rating}</span>
                              <span className="text-gray-500 dark:text-gray-400 text-sm">({destination.reviews})</span>
                            </div>
                          </div>

                          <div className="flex flex-wrap gap-1">
                            {destination.tags.slice(0, 3).map(tag => (
                              <Badge key={tag} variant="secondary" className="text-xs bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300">
                                {tag}
                              </Badge>
                            ))}
                          </div>

                          <div className="flex items-center justify-between pt-2">
                            <div className="flex items-center gap-2">
                              {destination.originalPrice && (
                                <span className="text-gray-500 dark:text-gray-400 line-through text-sm">
                                  ₹{destination.originalPrice.toLocaleString()}
                                </span>
                              )}
                              <span className="font-bold text-lg text-blue-600 dark:text-blue-400">
                                ₹{destination.price.toLocaleString()}
                              </span>
                              <span className="text-gray-500 dark:text-gray-400 text-sm">/ night</span>
                            </div>
                          </div>

                          <div className="pt-2">
                            <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
                              View details
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center">
                <Search className="h-12 w-12 text-gray-400 dark:text-gray-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">No results found</h3>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Try adjusting your search or filters to find what you're looking for.
              </p>
              <Button onClick={clearFilters} className="bg-blue-600 hover:bg-blue-700 text-white">
                Clear all filters
              </Button>
            </div>
          )}

          {/* Load More */}
          {filteredDestinations.length > 0 && (
            <div className="text-center mt-12">
              <Button variant="outline" size="lg" className="px-8 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-800">
                Show more results
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-white dark:bg-background text-gray-900 dark:text-white py-8 border-t border-gray-200 dark:border-gray-700">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-4">HeyRoute</div>
              <p className="text-gray-600 dark:text-gray-400">
                Your trusted travel companion for amazing experiences worldwide.
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">Company</h3>
              <div className="space-y-2 text-gray-600 dark:text-gray-400">
                <div className="hover:text-gray-900 dark:hover:text-white cursor-pointer">About us</div>
                <div className="hover:text-gray-900 dark:hover:text-white cursor-pointer">Careers</div>
                <div className="hover:text-gray-900 dark:hover:text-white cursor-pointer">Press</div>
                <div className="hover:text-gray-900 dark:hover:text-white cursor-pointer">Blog</div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">Support</h3>
              <div className="space-y-2 text-gray-600 dark:text-gray-400">
                <div className="hover:text-gray-900 dark:hover:text-white cursor-pointer">Help Center</div>
                <div className="hover:text-gray-900 dark:hover:text-white cursor-pointer">Contact us</div>
                <div className="hover:text-gray-900 dark:hover:text-white cursor-pointer">Safety</div>
                <div className="hover:text-gray-900 dark:hover:text-white cursor-pointer">Terms</div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4 text-gray-900 dark:text-white">Follow us</h3>
              <div className="space-y-2 text-gray-600 dark:text-gray-400">
                <div className="hover:text-gray-900 dark:hover:text-white cursor-pointer">Facebook</div>
                <div className="hover:text-gray-900 dark:hover:text-white cursor-pointer">Twitter</div>
                <div className="hover:text-gray-900 dark:hover:text-white cursor-pointer">Instagram</div>
                <div className="hover:text-gray-900 dark:hover:text-white cursor-pointer">LinkedIn</div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-200 dark:border-gray-700 mt-8 pt-8 text-center text-gray-500 dark:text-gray-400">
            <p>&copy; 2025 HeyRoute. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
