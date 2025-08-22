import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Phone, Globe, Image as ImageIcon } from 'lucide-react';
import ListingMap from '@/components/listings/listing-map';
import ReviewSection from '@/components/listings/review-section';
import { Separator } from '@/components/ui/separator';

async function getListingData(id: string) {
  await new Promise(resolve => setTimeout(resolve, 50));
  if (id === '1') {
    return{
      id: '1',
      name: 'Amber Palace',
      type: 'Historical Monument',
      rating: 4.8,
      reviewCount: 1250,
      location: { 
        address: 'Devisinghpura, Amer, Jaipur, Rajasthan 302001, India', 
        lat: 26.9855, 
        lng: 75.8513 
      },
      description: 'Discover the timeless grandeur of Amber Palace in Jaipur — a magnificent fusion of Rajput and Mughal architecture. Explore its sprawling courtyards, ornate halls, and breathtaking views of the Aravalli hills, all steeped in centuries of royal history.',
      images: [
        'https://upload.wikimedia.org/wikipedia/commons/4/40/Amber_Fort_Jaipur_01.jpg',
        'https://upload.wikimedia.org/wikipedia/commons/b/bb/Inside_Amer_Fort.jpg',  
        'https://upload.wikimedia.org/wikipedia/commons/6/61/An_incredible_view_of_amber_fort_from_Jaigarh.jpg',  
        'https://upload.wikimedia.org/wikipedia/commons/d/d2/Amber_Fort_from_Jaigarh_Fort_Jaipur_Rajasthan_India_%282%29.JPG'
],

      amenities: ['Guided Tours', 'Light and Sound Show', 'Elephant Rides', 'Photography Spots'],
      contact: { 
        phone: '+91-141-2530293', 
        website: 'https://tourism.rajasthan.gov.in/amber-palace.html' 
      },
      priceRange: '₹500'
    }
    
  }
  if (id === '2') {
    return {
      id: '2',
      name: 'Karavalli Restaurant',
      type: 'Restaurant',
      rating: 4.5,
      reviewCount: 980,
      location: { 
        address: 'The Gateway Hotel, Residency Road, Bengaluru, Karnataka 560025, India', 
        lat: 12.9611, 
        lng: 77.6081 
      },
      description: 'Savour the authentic coastal flavours of South India at Karavalli—fresh seafood, traditional Kerala specialties, and an ambiance that evokes the backwaters.',
      images: [
        'https://gateway.tajhotels.com/content/dam/luxury/hotel/P214/p214-karavalli-dining-2480-2480-1.jpg',  
        'https://gateway.tajhotels.com/content/dam/luxury/hotel/P214/p214-karavalli-dining-2480-2480-2.jpg',  
      ],
      amenities: ['Outdoor Seating', 'Reservations', 'Vegetarian & Vegan Options'],
      contact: { 
        phone: '+91 80 2225 1122', 
        website: 'https://gateway.tajhotels.com/en-in/bengaluru/the-gateway-hotel-residency-road/dine/karavalli/' 
      },
      priceRange: '₹2,500'
    };
  }
  
  if (id === '3') {
    return {
      id: '3',
      name: 'Taj Mahal',
      type: 'Attraction',
      rating: 4.8,
      reviewCount: 200000,
      location: { 
        address: 'Dharmapuri, Forest Colony, Tajganj, Agra, Uttar Pradesh 282001, India', 
        lat: 27.1751, 
        lng: 78.0421 
      },
      description: 'The world-famous white-marble mausoleum built by Emperor Shah Jahan—an eternal symbol of love, UNESCO World Heritage Site, and architectural marvel.',
      images: [
        'https://upload.wikimedia.org/wikipedia/commons/d/da/Taj-Mahal.jpg',  
        'https://upload.wikimedia.org/wikipedia/commons/a/af/Taj_Mahal_in_March_2004.jpg',  
        'https://upload.wikimedia.org/wikipedia/commons/1/1f/Taj_Mahal_Agra_India_3.jpg',  
      ],
      amenities: ['Guided Tours', 'Audio Guide', 'Photography Allowed'],
      contact: { 
        website: 'https://asiatica.in/monuments/taj-mahal-agra' 
      },
      priceRange: '₹50'
    };
  }
  
  if (id === '4') {
    return {
      id: '4',
      name: 'Taj Lake Palace',
      type: 'Hotel',
      rating: 4.7,
      reviewCount: 620,
      location: { 
        address: 'Pichola Lake, Udaipur, Rajasthan 313001, India', 
        lat: 24.5752, 
        lng: 73.6855 
      },
      description: 'A stunning marble palace in the middle of Lake Pichola—opulent rooms, royal dining, and views of the Aravalli hills at sunrise and sunset.',
      images: [
        'https://upload.wikimedia.org/wikipedia/commons/f/fb/HotelLakePalace2.jpg',  
        'https://upload.wikimedia.org/wikipedia/commons/0/0d/Taj_Lake_Palace_2010.jpg',  
      ],
      amenities: ['Boating Access', 'Spa', 'Fine Dining', 'Live Music'],
      contact: { 
        phone: '+91 294 242 9100', 
        website: 'https://taj.tajhotels.com/en-in/taj-lake-palace-udaipur/' 
      },
      priceRange: '₹45,000'
    };
  }
  
  if (id === '5') {
    return {
      id: '5',
      name: 'Radhanagar Beach',
      type: 'Attraction',
      rating: 4.6,
      reviewCount: 5400,
      location: { 
        address: 'Havelock Island, Andaman and Nicobar Islands 744211, India', 
        lat: 11.9826, 
        lng: 92.9818 
      },
      description: 'Voted one of the world’s best beaches—crystal-clear water, powder-white sands, and spectacular sunset views over the Bay of Bengal.',
      images: [
        'https://upload.wikimedia.org/wikipedia/commons/8/85/Radhanagar_Beach_03.jpg',  
        'https://upload.wikimedia.org/wikipedia/commons/4/42/Radhanagar_Beach.jpg',  
        'https://upload.wikimedia.org/wikipedia/commons/0/0f/Radhanagar_Beach_Aerial_View.jpg',  
      ],
      amenities: ['Beach Loungers', 'Lifeguard Patrol', 'Local Food Stalls'],
      contact: { 
        website: 'https://andaman.gov.in/radhanagar-beach' 
      },
      priceRange: '₹200'
    };
  }
  
  if (id === '6') {
    return {
      id: '6',
      name: 'Golden Temple',
      type: 'Attraction',
      rating: 4.9,
      reviewCount: 150000,
      location: { 
        address: 'Golden Temple Rd, Amritsar, Punjab 143006, India', 
        lat: 31.6200, 
        lng: 74.8765 
      },
      description: 'The holiest Gurdwara of Sikhism—gleaming gold-clad sanctum, serene pool (Amrit Sarovar), and free community kitchen welcoming all.',
      images: [
        'https://upload.wikimedia.org/wikipedia/commons/5/51/Golden_Temple_in_Amritsar.jpg',  
        'https://upload.wikimedia.org/wikipedia/commons/4/45/Golden_Temple_Amritsar_night.jpg',  
      ],
      amenities: ['Langar (Free Meals)', 'Guided Heritage Tours', 'Evening Aarti'],
      contact: { 
        website: 'https://www.goldentempleamritsar.org/' 
      },
      priceRange: 'Free'
    };
  }
  
  if (id === '3') {
    return {
      id: '3',
      name: 'Heritage Villa in Udaipur',
      type: 'Villa',
      rating: 4.8,
      reviewCount: 2148,
      location: { 
        address: 'City Palace Area, Udaipur, Rajasthan', 
        lat: 24.5854, 
        lng: 73.6830 
      },
      description: 'Stunning heritage villa with lake views and royal architecture. Experience the grandeur of Rajasthani royalty in this beautifully restored villa overlooking Lake Pichola.',
      images: [
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1520637836862-4d197d17c43a?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=800&h=600&fit=crop'
      ],
      amenities: ['Pool', 'WiFi', 'Kitchen', 'Parking', 'Heritage', 'Lake View'],
      contact: { 
        phone: '+91-294-241-3200', 
        website: 'https://heyroute.com/heritage-villa-udaipur' 
      },
      priceRange: '₹8,500'
    };
  }
  
  if (id === '4') {
    return {
      id: '4',
      name: 'Luxury Hotel in Goa',
      type: 'Hotel',
      rating: 4.6,
      reviewCount: 1892,
      location: { 
        address: 'Calangute Beach, North Goa', 
        lat: 15.5469, 
        lng: 73.7732 
      },
      description: 'Beachfront luxury hotel with world-class amenities. Wake up to the sound of waves and enjoy pristine beaches just steps from your room.',
      images: [
        'https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?w=800&h=600&fit=crop'
      ],
      amenities: ['Beach Access', 'Spa', 'Pool', 'Restaurant', 'Luxury', 'WiFi'],
      contact: { 
        phone: '+91-832-227-1234', 
        website: 'https://heyroute.com/luxury-hotel-goa' 
      },
      priceRange: '$$$$'
    };
  }
  
  if (id === '5') {
    return {
      id: '5',
      name: 'Traditional Ryokan in Kyoto',
      type: 'Hotel',
      rating: 4.9,
      reviewCount: 756,
      location: { 
        address: 'Gion District, Kyoto, Japan', 
        lat: 35.0042, 
        lng: 135.7747 
      },
      description: 'Authentic Japanese ryokan with tatami rooms and kaiseki dining. Experience traditional Japanese hospitality in the heart of historic Kyoto.',
      images: [
        'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&h=600&fit=crop'
      ],
      amenities: ['Hot Springs', 'Traditional Dining', 'Garden', 'Tea Ceremony', 'Kaiseki', 'Tatami Rooms'],
      contact: { 
        phone: '+81-75-561-1234', 
        website: 'https://heyroute.com/ryokan-kyoto' 
      },
      priceRange: '$$$$$'
    };
  }
  
  if (id === '6') {
    return {
      id: '6',
      name: 'Himalayan Trek Experience',
      type: 'Adventure',
      rating: 4.7,
      reviewCount: 3256,
      location: { 
        address: 'Himalayas, Nepal (via Delhi)', 
        lat: 27.9881, 
        lng: 86.9250 
      },
      description: 'Guided trek to Everest Base Camp with experienced Sherpa guides. The adventure of a lifetime through stunning mountain landscapes.',
      images: [
        'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1506020647804-b04ee956dc04?w=800&h=600&fit=crop'
      ],
      amenities: ['Guide', 'Equipment', 'Meals', 'Permits', 'Adventure', 'Trekking', 'Mountain Views'],
      contact: { 
        phone: '+977-1-441-4979', 
        website: 'https://heyroute.com/himalayan-trek' 
      },
      priceRange: '₹85,000'
    };
  }
  
  if (id === '7') {
    return {
      id: '7',
      name: 'Modern Apartment in Mumbai',
      type: 'Apartment',
      rating: 4.3,
      reviewCount: 967,
      location: { 
        address: 'Bandra-Kurla Complex, Mumbai', 
        lat: 19.0596, 
        lng: 72.8295 
      },
      description: 'Contemporary apartment in the heart of financial district. Perfect for business travelers with modern amenities and city views.',
      images: [
        'https://images.unsplash.com/photo-1570168007204-dfb528c6958f?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1484154218962-a197022b5858?w=800&h=600&fit=crop'
      ],
      amenities: ['WiFi', 'Kitchen', 'Gym', 'Security', 'Modern', 'Central', 'Business District'],
      contact: { 
        phone: '+91-22-6111-1234', 
        website: 'https://heyroute.com/apartment-mumbai' 
      },
      priceRange: '₹3,500'
    };
  }
  
  if (id === '8') {
    return {
      id: '8',
      name: 'Night Market Food Tour',
      type: 'Experience',
      rating: 4.8,
      reviewCount: 1456,
      location: { 
        address: 'Shilin Night Market, Taipei, Taiwan', 
        lat: 25.0875, 
        lng: 121.5244 
      },
      description: 'Authentic street food experience at Taiwan\'s famous night markets. Discover local flavors and culinary traditions with expert guides.',
      images: [
        'https://images.unsplash.com/photo-1551218808-94e220e084d2?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800&h=600&fit=crop'
      ],
      amenities: ['Food Tour', 'Local Guide', 'Tastings', 'Street Food', 'Night Market', 'Local Experience'],
      contact: { 
        phone: '+886-2-2881-5557', 
        website: 'https://heyroute.com/taiwan-food-tour' 
      },
      priceRange: '₹1,200'
    };
  }
  
  if (id === '9') {
    return {
      id: '9',
      name: 'Houseboat in Kerala Backwaters',
      type: 'Houseboat',
      rating: 4.9,
      reviewCount: 2789,
      location: { 
        address: 'Alleppey, Kerala', 
        lat: 9.4981, 
        lng: 76.3388 
      },
      description: 'Traditional houseboat cruise through scenic Kerala backwaters. Experience the tranquil beauty of Kerala\'s famous waterways.',
      images: [
        'https://images.unsplash.com/photo-1602216056096-3b40cc0c9944?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1566676877355-1f7b21d8fa44?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1544967882-9c5c3bce44ba?w=800&h=600&fit=crop'
      ],
      amenities: ['AC', 'Meals', 'Fishing', 'Sightseeing', 'Backwaters', 'Traditional', 'Peaceful'],
      contact: { 
        phone: '+91-477-225-1234', 
        website: 'https://heyroute.com/kerala-houseboat' 
      },
      priceRange: '₹6,500'
    };
  }
  
  if (id === '10') {
    return {
      id: '10',
      name: 'Jeju Island Resort',
      type: 'Resort',
      rating: 4.5,
      reviewCount: 1123,
      location: { 
        address: 'Jeju Island, South Korea', 
        lat: 33.4996, 
        lng: 126.5312 
      },
      description: 'Island resort with volcanic landscapes and pristine beaches. Discover unique natural beauty and luxury amenities on Korea\'s paradise island.',
      images: [
        'https://images.unsplash.com/photo-1506197603052-3cc9c3a201bd?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1540541338287-41700207dee6?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop'
      ],
      amenities: ['Beach Access', 'Spa', 'Golf', 'Hiking', 'Island', 'Beach', 'Volcanic'],
      contact: { 
        phone: '+82-64-738-1234', 
        website: 'https://heyroute.com/jeju-island-resort' 
      },
      priceRange: '₹18,000'
    };
  }
  
  if (id === '11') {
    return {
      id: '11',
      name: 'Golden Temple Tour',
      type: 'Cultural Experience',
      rating: 4.9,
      reviewCount: 5678,
      location: { 
        address: 'Amritsar, Punjab', 
        lat: 31.6200, 
        lng: 74.8765 
      },
      description: 'Spiritual journey to the Golden Temple with langar experience. Discover the spiritual heart of Sikhism and participate in community service.',
      images: [
        'https://images.unsplash.com/photo-1571115764595-644a1f56a55c?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1544967882-9c5c3bce44ba?w=800&h=600&fit=crop'
      ],
      amenities: ['Guide', 'Langar', 'Photography', 'History', 'Spiritual', 'Heritage', 'Cultural'],
      contact: { 
        phone: '+91-183-255-3954', 
        website: 'https://heyroute.com/golden-temple-tour' 
      },
      priceRange: 'Free'
    };
  }
  
  if (id === '12') {
    return {
      id: '12',
      name: 'Tea Garden Stay in Darjeeling',
      type: 'Heritage Stay',
      rating: 4.6,
      reviewCount: 1834,
      location: { 
        address: 'Darjeeling, West Bengal', 
        lat: 27.0360, 
        lng: 88.2627 
      },
      description: 'Colonial-era bungalow amidst rolling tea gardens with mountain views. Experience the legacy of British tea plantations in the Himalayas.',
      images: [
        'https://images.unsplash.com/photo-1566992283741-8f3c1ac5a5b2?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1544735716-392fe2489ffa?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=800&h=600&fit=crop'
      ],
      amenities: ['Tea Tasting', 'Mountain Views', 'Heritage', 'Garden Walks', 'Tea Gardens', 'Mountains', 'Colonial'],
      contact: { 
        phone: '+91-354-225-4321', 
        website: 'https://heyroute.com/darjeeling-tea-garden' 
      },
      priceRange: '₹4,500'
    };
  }
  
  if (id === '13') {
    return {
      id: '13',
      name: 'Traditional Hanok Stay',
      type: 'Traditional Accommodation',
      rating: 4.7,
      reviewCount: 892,
      location: { 
        address: 'Bukchon Hanok Village, Seoul, South Korea', 
        lat: 37.5826, 
        lng: 126.9838 
      },
      description: 'Experience traditional Korean architecture in historic Bukchon village. Stay in an authentic hanok and immerse yourself in Korean culture.',
      images: [
        'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1528360983277-13d401cdc186?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?w=800&h=600&fit=crop'
      ],
      amenities: ['Traditional Architecture', 'Cultural Experience', 'City Views', 'Traditional', 'Historic', 'Cultural'],
      contact: { 
        phone: '+82-2-2133-1234', 
        website: 'https://heyroute.com/hanok-stay-seoul' 
      },
      priceRange: '₹2,800'
    };
  }
  
  if (id === '14') {
    return {
      id: '14',
      name: 'Spice Plantation Tour in Kerala',
      type: 'Nature Experience',
      rating: 4.8,
      reviewCount: 2341,
      location: { 
        address: 'Thekkady, Kerala', 
        lat: 9.5939, 
        lng: 77.1025 
      },
      description: 'Guided tour through aromatic spice plantations with cooking class. Learn about exotic spices and traditional cooking methods.',
      images: [
        'https://images.unsplash.com/photo-1545558014-8692077e9b5c?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1566676877355-1f7b21d8fa44?w=800&h=600&fit=crop',
        'https://images.unsplash.com/photo-1544967882-9c5c3bce44ba?w=800&h=600&fit=crop'
      ],
      amenities: ['Guide', 'Cooking Class', 'Spice Shopping', 'Nature Walk', 'Spices', 'Nature', 'Cooking'],
      contact: { 
        phone: '+91-486-922-4567', 
        website: 'https://heyroute.com/kerala-spice-tour' 
      },
      priceRange: '₹1,500'
    };
  }

  return null;
}

export async function generateMetadata({ params }: { params: { id: string } }): Promise<Metadata> {
  const listing = await getListingData(params.id);

  if (!listing) {
    return {
      title: 'Listing Not Found | HeyRoute',
    };
  }

  return {
    title: `${listing.name} | HeyRoute`,
    description: `Details, reviews, and map for ${listing.name}. ${listing.description.substring(0, 150)}...`,
  };
}


export default async function ListingPage({ params }: { params: { id: string } }) {
  const listing = await getListingData(params.id);

  if (!listing) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <div className="flex flex-col sm:flex-row justify-between items-start gap-4">
                  <div>
                      <Badge variant="secondary" className="mb-2">{listing.type}</Badge>
                      <CardTitle className="text-3xl font-bold">{listing.name}</CardTitle>
                      <div className="flex items-center text-sm text-muted-foreground mt-1">
                         <MapPin className="h-4 w-4 mr-1 flex-shrink-0" />
                         <span>{listing.location.address}</span>
                       </div>
                  </div>
                 <div className="flex flex-col items-end flex-shrink-0 mt-2 sm:mt-0">
                    <div className="flex items-center gap-1 text-lg font-semibold mb-1">
                        <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                        <span>{listing.rating.toFixed(1)}</span>
                    </div>
                    <span className="text-sm text-muted-foreground">({listing.reviewCount} reviews)</span>
                    <span className="text-lg font-semibold mt-1">{listing.priceRange}</span>
                 </div>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-foreground leading-relaxed">{listing.description}</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><ImageIcon className="h-5 w-5" /> Gallery</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                 {listing.images.slice(0, 6).map((img, index) => (
                    <div key={index} className="aspect-video overflow-hidden rounded-lg border">
                         <Image
                           src={img}
                           alt={`${listing.name} - Image ${index + 1}`}
                           width={400}
                           height={300}
                           className="object-cover w-full h-full transition-transform hover:scale-105"
                         />
                    </div>
                 ))}
               </div>
            </CardContent>
          </Card>

          <ReviewSection listingId={listing.id} />
        </div>

        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><MapPin className="h-5 w-5"/> Location</CardTitle>
            </CardHeader>
            <CardContent className="h-64 md:h-80 p-0 rounded-b-lg overflow-hidden">
              <ListingMap
                lat={listing.location.lat}
                lng={listing.location.lng}
                title={listing.name}
              />
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Amenities</CardTitle>
            </CardHeader>
            <CardContent>
               <ul className="grid grid-cols-2 gap-2 text-sm">
                 {listing.amenities?.map((amenity, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <CheckIcon className="h-4 w-4 text-green-500" />
                      {amenity}
                    </li>
                 ))}
               </ul>
               {!listing.amenities && <p className="text-sm text-muted-foreground">No amenities listed.</p>}
            </CardContent>
          </Card>

          <Card>
             <CardHeader>
               <CardTitle>Contact Info</CardTitle>
             </CardHeader>
             <CardContent className="space-y-2 text-sm">
               {listing.contact?.phone && (
                 <div className="flex items-center gap-2">
                   <Phone className="h-4 w-4 text-muted-foreground" />
                   <a href={`tel:${listing.contact.phone}`} className="hover:text-primary">{listing.contact.phone}</a>
                 </div>
               )}
               {listing.contact?.website && (
                 <div className="flex items-center gap-2">
                   <Globe className="h-4 w-4 text-muted-foreground" />
                   <a href={listing.contact.website.startsWith('http') ? listing.contact.website : `https://${listing.contact.website}`} target="_blank" rel="noopener noreferrer" className="hover:text-primary truncate">
                      {listing.contact.website.replace(/^https?:\/\//, '')}
                   </a>
                 </div>
               )}
                {!listing.contact?.phone && !listing.contact?.website && (
                    <p className="text-muted-foreground">No contact information available.</p>
                )}
             </CardContent>
           </Card>
        </div>
      </div>
    </div>
  );
}

function CheckIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}
