import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Star, MessageSquarePlus, User } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';

interface Review {
  id: string;
  author: string;
  rating: number;
  comment: string;
  date: string; // Consider using Date object and formatting
  avatarUrl?: string;
}

interface ReviewSectionProps {
  listingId: string;
}

// Dummy data fetch function - replace with actual API call
async function getReviews(listingId: string): Promise<Review[]> {
   await new Promise(resolve => setTimeout(resolve, 50)); // Simulate delay
   // Example reviews, fetch based on listingId
   if (listingId === '1') {
    return [
        { id: 'r1', author: 'Alice B.', rating: 5, comment: 'Absolutely stunning hotel! The service was impeccable and the views were breathtaking. Worth every penny.', date: '2024-07-15', avatarUrl: 'https://avatar.vercel.sh/alice.png' },
        { id: 'r2', author: 'Bob C.', rating: 4, comment: 'Great location and comfortable rooms. The pool area was fantastic. Minor issue with room service speed.', date: '2024-07-10' },
        { id: 'r3', author: 'Charlie D.', rating: 5, comment: 'Loved our stay here. Very luxurious and clean. The concierge was extremely helpful in planning our activities.', date: '2024-06-28', avatarUrl: 'https://avatar.vercel.sh/charlie.png' },
    ];
   }
    if (listingId === '2') {
       return [
           { id: 'r4', author: 'Diana E.', rating: 5, comment: 'Best pasta I had in Rome! The atmosphere is cozy and romantic. Highly recommend the Carbonara.', date: '2024-07-18' },
           { id: 'r5', author: 'Ethan F.', rating: 4, comment: 'Good food and friendly staff. It got a bit crowded, but the wait was worth it.', date: '2024-07-12', avatarUrl: 'https://avatar.vercel.sh/ethan.png' },
       ];
   }
   return []; // Default empty
}


export default async function ReviewSection({ listingId }: ReviewSectionProps) {
  const reviews = await getReviews(listingId);
  const averageRating = reviews.length > 0
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : 'N/A';

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
            <CardTitle className="text-2xl">Reviews</CardTitle>
            {reviews.length > 0 && (
                <div className="flex items-center gap-1 mt-1 text-sm text-muted-foreground">
                    <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    <span>{averageRating} average rating ({reviews.length} reviews)</span>
                </div>
            )}
        </div>
        {/* TODO: Link to a review form/modal */}
        <Button variant="outline">
          <MessageSquarePlus className="mr-2 h-4 w-4" /> Write a Review
        </Button>
      </CardHeader>
      <CardContent>
        {reviews.length > 0 ? (
          <div className="space-y-6">
            {reviews.map((review, index) => (
              <div key={review.id}>
                <div className="flex items-start gap-4">
                  <Avatar>
                    <AvatarImage src={review.avatarUrl} alt={review.author} />
                    <AvatarFallback>
                        {review.author.split(' ').map(n => n[0]).join('') || <User size={16}/>}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-1">
                      <p className="font-semibold">{review.author}</p>
                      <span className="text-xs text-muted-foreground">{review.date}</span>
                    </div>
                    <div className="flex items-center mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground'
                          }`}
                        />
                      ))}
                    </div>
                    <p className="text-sm text-foreground leading-relaxed">{review.comment}</p>
                  </div>
                </div>
                {index < reviews.length - 1 && <Separator className="mt-6" />}
              </div>
            ))}
          </div>
        ) : (
          <p className="text-center text-muted-foreground py-4">
            No reviews yet. Be the first to share your experience!
          </p>
        )}
      </CardContent>
    </Card>
  );
}
