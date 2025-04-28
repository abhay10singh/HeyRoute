import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Star, MapPin } from 'lucide-react';

interface Listing {
  id: string;
  name: string;
  type: string;
  rating: number;
  imageUrl: string;
  location: string;
}

interface FeaturedListingsProps {
  listings: Listing[];
}

export default function FeaturedListings({ listings }: FeaturedListingsProps) {
  return (
    <section className="py-12 md:py-16">
      <div className="container px-4 md:px-6">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-center mb-8">
          Featured Destinations & Listings
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {listings.map((listing) => (
            <Card key={listing.id} className="overflow-hidden transition-shadow hover:shadow-lg">
              <CardHeader className="p-0 relative">
                 <Link href={`/listings/${listing.id}`} aria-label={`View details for ${listing.name}`}>
                    <Image
                      src={listing.imageUrl}
                      alt={`Image of ${listing.name}`}
                      width={400}
                      height={300}
                      className="w-full h-48 object-cover"
                    />
                 </Link>
                <Badge variant="secondary" className="absolute top-2 right-2">{listing.type}</Badge>
              </CardHeader>
              <CardContent className="p-4 space-y-2">
                <CardTitle className="text-lg font-semibold">
                  <Link href={`/listings/${listing.id}`} className="hover:text-primary transition-colors">
                    {listing.name}
                  </Link>
                </CardTitle>
                <div className="flex items-center text-sm text-muted-foreground">
                   <MapPin className="h-4 w-4 mr-1" />
                  <span>{listing.location}</span>
                </div>
              </CardContent>
              <CardFooter className="p-4 pt-0 flex justify-between items-center">
                <div className="flex items-center gap-1 text-sm font-medium">
                  <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                  <span>{listing.rating.toFixed(1)}</span>
                </div>
                <Link href={`/listings/${listing.id}`} className="text-sm text-primary hover:underline">
                  View Details
                </Link>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
