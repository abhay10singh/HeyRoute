'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Bot, Send, User, X, Loader2, Link as LinkIcon } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { useToast } from "@/hooks/use-toast";
import { getTravelSuggestionsWithDirectoryLinking, TravelSuggestionsWithDirectoryLinkingInput } from '@/ai/flows/travel-suggestions-with-directory-linking'; // Import the server action
import { getCurrentLocation, Location } from '@/services/geo-location'; // Import location service


interface Message {
  id: string;
  text: React.ReactNode; 
  sender: 'user' | 'bot';
  links?: string[]; 
}

export default function ChatbotWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userLocation, setUserLocation] = useState<Location | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
   const { toast } = useToast();

  useEffect(() => {
     
     const fetchLocation = async () => {
         try {
             const location = await getCurrentLocation();
             setUserLocation(location);
           
             setMessages([
                { id: 'init', text: `Hello! I'm your HeyRoute assistant. How can I help you plan your trip today? I see you're near latitude ${location.lat.toFixed(4)}, longitude ${location.lng.toFixed(4)}.`, sender: 'bot' }
             ]);
         } catch (error) {
             console.error("Error fetching location:", error);
              setMessages([
                 { id: 'init-error', text: "Hello! I'm your HeyRoute assistant. I couldn't get your exact location, but how can I help you plan your trip?", sender: 'bot' }
              ]);
              toast({
                 title: "Location Error",
                 description: "Could not retrieve your current location. Some features might be limited.",
                 variant: "destructive",
             });
         }
     };

     if (isOpen && !userLocation) {
         fetchLocation();
     }
  }, [isOpen, userLocation, toast]); // Depend on isOpen and userLocation


  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollAreaRef.current) {
        const scrollElement = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
         if (scrollElement) {
             scrollElement.scrollTop = scrollElement.scrollHeight;
         }
    }
  }, [messages]);


  const handleSendMessage = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = { id: Date.now().toString(), text: input, sender: 'user' };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

     if (!userLocation) {
         setMessages(prev => [...prev, { id: 'loc-error-msg', text: "I need your location to provide the best suggestions. Please ensure location services are enabled.", sender: 'bot' }]);
         setIsLoading(false);
         return;
     }

    try {
        const requestPayload: TravelSuggestionsWithDirectoryLinkingInput = {
            query: input,
            location: userLocation,
        };
        console.log("Sending to AI:", requestPayload); // Debugging
        const response = await getTravelSuggestionsWithDirectoryLinking(requestPayload);
        console.log("Received from AI:", response); // Debugging

        const botMessage: Message = {
             id: (Date.now() + 1).toString(),
             text: response.suggestions,
             sender: 'bot',
             links: response.directoryLinks, // Store the links
         };

       
         if (response.directoryLinks && response.directoryLinks.length > 0) {
          
             const linksNode = (
                 <div className="mt-2 space-y-1">
                     <p className="text-xs font-semibold text-muted-foreground">Relevant places nearby:</p>
                     <ul className="list-none pl-0 space-y-1">
                         {response.directoryLinks.map((linkText, index) => {
                             // Basic search link - replace with actual listing page link if possible
                             const searchLink = `/search?q=${encodeURIComponent(linkText)}&loc=${userLocation?.lat},${userLocation?.lng}`;
                             return (
                                 <li key={index} className="text-xs">
                                     <Link href={searchLink} className="text-primary hover:underline flex items-center gap-1">
                                         <LinkIcon size={12} /> {linkText}
                                     </Link>
                                 </li>
                             );
                         })}
                     </ul>
                 </div>
             );
             botMessage.text = <> {response.suggestions} {linksNode} </>;
         }


        setMessages(prev => [...prev, botMessage]);

    } catch (error) {
      console.error('Error calling AI flow:', error);
        const errorMessage: Message = { id: (Date.now() + 1).toString(), text: "Sorry, I encountered an error. Please try again.", sender: 'bot' };
        setMessages(prev => [...prev, errorMessage]);
         toast({
            title: "Chatbot Error",
            description: "Could not get a response from the AI assistant.",
            variant: "destructive",
        });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Action Button */}
      <Button
        size="icon"
        className={cn(
          "fixed bottom-6 right-6 rounded-full h-14 w-14 shadow-lg z-50 transition-transform duration-300 ease-out",
           isOpen ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
        )}
        onClick={() => setIsOpen(true)}
        aria-label="Open Chatbot"
      >
        <Bot className="h-6 w-6" />
      </Button>

      {/* Chat Window */}
      <Card
        className={cn(
          "fixed bottom-6 right-6 w-full max-w-sm h-[60vh] max-h-[500px] shadow-xl z-50 flex flex-col transition-all duration-300 ease-out origin-bottom-right",
          isOpen ? 'scale-100 opacity-100 translate-y-0' : 'scale-95 opacity-0 translate-y-4 pointer-events-none'
        )}
      >
        <CardHeader className="flex flex-row items-center justify-between py-3 px-4 border-b">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
             <Bot className="h-5 w-5 text-primary" /> HeyRoute Assistant
          </CardTitle>
          <Button variant="ghost" size="icon" onClick={() => setIsOpen(false)} className="h-7 w-7">
            <X className="h-5 w-5" />
            <span className="sr-only">Close Chat</span>
          </Button>
        </CardHeader>
        <CardContent className="flex-grow p-0 overflow-hidden">
           <ScrollArea className="h-full p-4" ref={scrollAreaRef}>
            <div className="space-y-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={cn(
                    'flex items-end gap-2',
                    message.sender === 'user' ? 'justify-end' : 'justify-start'
                  )}
                >
                  {message.sender === 'bot' && <Bot className="h-6 w-6 text-primary flex-shrink-0 mb-1" />}
                  <div
                    className={cn(
                      'max-w-[75%] rounded-lg px-3 py-2 text-sm',
                      message.sender === 'user'
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-muted text-muted-foreground'
                    )}
                  >
                     {/* Render text which might include React nodes */}
                     {typeof message.text === 'string' ? <p>{message.text}</p> : message.text}
                  </div>
                   {message.sender === 'user' && <User className="h-6 w-6 text-muted-foreground flex-shrink-0 mb-1" />}
                </div>
              ))}
               {isLoading && (
                    <div className="flex items-end gap-2 justify-start">
                        <Bot className="h-6 w-6 text-primary flex-shrink-0 mb-1" />
                        <div className="bg-muted rounded-lg px-3 py-2 text-sm text-muted-foreground">
                            <Loader2 className="h-4 w-4 animate-spin" />
                        </div>
                    </div>
                )}
            </div>
          </ScrollArea>
        </CardContent>
        <CardFooter className="p-4 border-t">
          <form onSubmit={handleSendMessage} className="flex w-full items-center gap-2">
            <Textarea
              placeholder="Ask about destinations, hotels..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                 if (e.key === 'Enter' && !e.shiftKey) {
                     e.preventDefault();
                     handleSendMessage();
                 }
              }}
              className="flex-grow resize-none h-10 min-h-[40px] max-h-24 text-sm"
              rows={1}
              disabled={isLoading}
            />
            <Button type="submit" size="icon" disabled={isLoading || !input.trim()}>
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
               <span className="sr-only">Send Message</span>
            </Button>
          </form>
        </CardFooter>
      </Card>
    </>
  );
}
