import { Card, CardContent } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'; // Assuming Avatar component exists

interface Testimonial {
  id: string;
  quote: string;
  author: string;
  avatarUrl?: string; // Optional avatar URL
}

interface TestimonialsProps {
  testimonials: Testimonial[];
}

export default function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <section className="py-12 md:py-16 bg-secondary/50 rounded-lg">
      <div className="container px-4 md:px-6">
        <h2 className="text-2xl font-bold tracking-tight sm:text-3xl text-center mb-8">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.id} className="flex flex-col justify-between">
              <CardContent className="p-6 space-y-4">
                <blockquote className="text-lg italic text-muted-foreground">
                  "{testimonial.quote}"
                </blockquote>
                <div className="flex items-center gap-3 pt-4">
                  <Avatar>
                    {/* I have to yet put image or actual avatar */}
                    <AvatarImage src={testimonial.avatarUrl || `https://avatar.vercel.sh/${testimonial.author.replace(' ','')}.png`} alt={testimonial.author} />
                    <AvatarFallback>{testimonial.author.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <p className="text-sm font-medium text-foreground">{testimonial.author}</p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
