import type { Metadata } from 'next';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin, Phone, Globe, Image as ImageIcon } from 'lucide-react';
import ListingMap from '@/components/listings/listing-map';
import ReviewSection from '@/components/listings/review-section'; // Placeholder for reviews
import { Separator } from '@/components/ui/separator';

// Dummy data fetch function - replace with actual API call
async function getListingData(id: string) {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 50));

  // In a real app, fetch data based on the ID from your backend/database
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
      priceRange: '$'
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
        // High-res exterior shot (from Taj Hotels media gallery)  
        'https://gateway.tajhotels.com/content/dam/luxury/hotel/P214/p214-karavalli-dining-2480-2480-1.jpg',  
        // Interior dining view (from Taj Hotels media gallery)  
        'https://gateway.tajhotels.com/content/dam/luxury/hotel/P214/p214-karavalli-dining-2480-2480-2.jpg',  
      ],
      amenities: ['Outdoor Seating', 'Reservations', 'Vegetarian & Vegan Options'],
      contact: { 
        phone: '+91 80 2225 1122', 
        website: 'https://gateway.tajhotels.com/en-in/bengaluru/the-gateway-hotel-residency-road/dine/karavalli/' 
      },
      priceRange: '$$$'
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
        // Iconic front view at sunrise :contentReference[oaicite:0]{index=0}  
        'https://upload.wikimedia.org/wikipedia/commons/d/da/Taj-Mahal.jpg',  
        // Closer detail of main dome :contentReference[oaicite:1]{index=1}  
        'https://upload.wikimedia.org/wikipedia/commons/a/af/Taj_Mahal_in_March_2004.jpg',  
        // Evening lights view :contentReference[oaicite:2]{index=2}  
        'https://upload.wikimedia.org/wikipedia/commons/1/1f/Taj_Mahal_Agra_India_3.jpg',  
      ],
      amenities: ['Guided Tours', 'Audio Guide', 'Photography Allowed'],
      contact: { 
        website: 'https://asiatica.in/monuments/taj-mahal-agra' 
      },
      priceRange: '$'
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
        // Wide shot of the palace at dawn :contentReference[oaicite:3]{index=3}  
        'https://upload.wikimedia.org/wikipedia/commons/f/fb/HotelLakePalace2.jpg',  
        // Reflected in Pichola Lake :contentReference[oaicite:4]{index=4}  
        'https://upload.wikimedia.org/wikipedia/commons/0/0d/Taj_Lake_Palace_2010.jpg',  
      ],
      amenities: ['Boating Access', 'Spa', 'Fine Dining', 'Live Music'],
      contact: { 
        phone: '+91 294 242 9100', 
        website: 'https://taj.tajhotels.com/en-in/taj-lake-palace-udaipur/' 
      },
      priceRange: '$$$$'
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
        // Panoramic view at sunset :contentReference[oaicite:5]{index=5}  
        'https://upload.wikimedia.org/wikipedia/commons/8/85/Radhanagar_Beach_03.jpg',  
        // Low-tide and rock formations :contentReference[oaicite:6]{index=6}  
        'https://upload.wikimedia.org/wikipedia/commons/4/42/Radhanagar_Beach.jpg',  
        // Aerial shot highlighting white sand :contentReference[oaicite:7]{index=7}  
        'https://upload.wikimedia.org/wikipedia/commons/0/0f/Radhanagar_Beach_Aerial_View.jpg',  
      ],
      amenities: ['Beach Loungers', 'Lifeguard Patrol', 'Local Food Stalls'],
      contact: { 
        website: 'https://andaman.gov.in/radhanagar-beach' 
      },
      priceRange: '$'
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
        // Main sanctum reflection in the sarovar :contentReference[oaicite:8]{index=8}  
        'https://upload.wikimedia.org/wikipedia/commons/5/51/Golden_Temple_in_Amritsar.jpg',  
        // Evening-lit view with pilgrims :contentReference[oaicite:9]{index=9}  
        'https://upload.wikimedia.org/wikipedia/commons/4/45/Golden_Temple_Amritsar_night.jpg',  
      ],
      amenities: ['Langar (Free Meals)', 'Guided Heritage Tours', 'Evening Aarti'],
      contact: { 
        website: 'https://www.goldentempleamritsar.org/' 
      },
      priceRange: '$'
    };
  }
  

  // Listing not found
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
    notFound(); // Triggers the not-found.tsx page
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content Column */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header Section */}
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

          {/* Image Gallery Placeholder */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2"><ImageIcon className="h-5 w-5" /> Gallery</CardTitle>
            </CardHeader>
            <CardContent>
               <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                 {listing.images.slice(0, 6).map((img, index) => ( // Show limited images
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
                 {/* TODO: Add a "View All Photos" button/modal */}
               </div>
            </CardContent>
          </Card>

          {/* Review Section */}
          <ReviewSection listingId={listing.id} />
        </div>

        {/* Sidebar Column */}
        <div className="lg:col-span-1 space-y-6">
          {/* Map Section */}
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

          {/* Amenities Section */}
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

          {/* Contact Info Section */}
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

// Simple Check Icon component
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
