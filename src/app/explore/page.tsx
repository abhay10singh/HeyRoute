import { Metadata } from 'next';
import Explore from '@/components/search/Explore/Explore';

export const metadata: Metadata = {
  title: 'Explore - HeyRoute | Discover Amazing Places',
  description: 'Explore the world with HeyRoute. Discover amazing destinations, luxury hotels, fine dining restaurants, and must-see attractions worldwide.',
  keywords: 'explore, travel, destinations, hotels, restaurants, attractions, vacation, holiday',
};

export default function ExplorePage() {
  return <Explore />;
}
