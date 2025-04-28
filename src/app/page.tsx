import type { Metadata } from 'next';
import SearchSection from '@/components/home/search-section';
import FeaturedListings from '@/components/home/featured-listings';
import Testimonials from '@/components/home/testimonials';
import { Separator } from '@/components/ui/separator';
import ChatbotWidget from '@/components/chatbot/chatbot-widget';

export const metadata: Metadata = {
  title: 'HeyRoute - Find Your Next Adventure',
  description: 'Search for hotels, restaurants, and attractions. Read reviews and plan your perfect trip.',
};


export default function Home() {
  // Dummy data for featured listings - replace with API call
  // Using more descriptive seeds for Picsum to simulate specific images
  const featured = [
    {
      id: '1',
      name: 'Amber Palace',
      type: 'Attraction',
      rating: 4.8,
      imageUrl: 'https://res.cloudinary.com/dua2hi3qc/image/upload/v1745821615/caption_ncz2yn.jpg',
      location: 'Amer, Jaipur, Rajasthan'
    },
    {
      id: '2',
      name: 'Karavalli Restaurant',
      type: 'Restaurant',
      rating: 4.5,
      imageUrl: 'https://res.cloudinary.com/dua2hi3qc/image/upload/v1745821683/karavalli-garden_zc8pne.jpg',
      location: 'Residency Road, Bengaluru, Karnataka'
    },
    {
      id: '3',
      name: 'Taj Mahal',
      type: 'Attraction',
      rating: 4.8,
      imageUrl: 'https://res.cloudinary.com/dua2hi3qc/image/upload/v1745821333/Taj-Mahal_msmcdv.jpg',
      location: 'Agra, Uttar Pradesh'
    },
    {
      id: '4',
      name: 'Taj Lake Palace',
      type: 'Hotel',
      rating: 4.7,
      imageUrl: 'https://res.cloudinary.com/dua2hi3qc/image/upload/v1745821850/photo0jpg_x2bcar.jpg',
      location: 'Lake Pichola, Udaipur, Rajasthan'
    },
  ];
  
  // Dummy data for testimonials - replace with API call
  const testimonialsData = [
    { id: '1', quote: 'HeyRoute helped me find the perfect hidden gem for my vacation!', author: 'Oggy' },
    { id: '2', quote: 'The reviews are so helpful and genuine. Made planning easy.', author: 'Sasuke' },
    { id: '3', quote: 'Love the map feature! It made exploring the city a breeze.', author: 'Kira' },
  ];
  


  return (
    <div className="space-y-12">
      <SearchSection />
      <Separator />
      <FeaturedListings listings={featured} />
       <Separator />
      <Testimonials testimonials={testimonialsData} />
      <ChatbotWidget />
    </div>
  );
}
