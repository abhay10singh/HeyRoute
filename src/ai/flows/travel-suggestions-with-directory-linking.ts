
'use server';
/**
 * @fileOverview A travel suggestion AI agent that links to the directory, powered by Gemini.
 *
 * - getTravelSuggestionsWithDirectoryLinking - A function that handles the travel suggestion process.
 * - TravelSuggestionsWithDirectoryLinkingInput - The input type for the getTravelSuggestionsWithDirectoryLinking function.
 * - TravelSuggestionsWithDirectoryLinkingOutput - The return type for the getTravelSuggestionsWithDirectoryLinking function.
 */

import {ai} from '@/ai/ai-instance';
import {z} from 'genkit';
import {getMapMarkers} from '@/services/map'; // Keep direct import for Location type
import type { Location } from '@/services/map'; // Use type import for Location

const TravelSuggestionsWithDirectoryLinkingInputSchema = z.object({
  query: z.string().describe('The user query for travel suggestions.'),
  location: z
    .object({
      lat: z.number().describe('The latitude of the location.'),
      lng: z.number().describe('The longitude of the location.'),
    })
    .describe('The current location of the user. Required for nearby place suggestions.'),
});

export type TravelSuggestionsWithDirectoryLinkingInput =
  z.infer<typeof TravelSuggestionsWithDirectoryLinkingInputSchema>;

const TravelSuggestionsWithDirectoryLinkingOutputSchema = z.object({
  suggestions: z
    .string()
    .describe('Travel suggestions based on the user query and location.'),
  directoryLinks: z
    .array(z.string())
    .describe(
      'A list of names of relevant business listings found nearby using the getNearbyPlaces tool. These names should be used by the frontend to create links.'
    ),
});

export type TravelSuggestionsWithDirectoryLinkingOutput =
  z.infer<typeof TravelSuggestionsWithDirectoryLinkingOutputSchema>;

export async function getTravelSuggestionsWithDirectoryLinking(
  input: TravelSuggestionsWithDirectoryLinkingInput
): Promise<TravelSuggestionsWithDirectoryLinkingOutput> {
   console.log("[AI Flow] Received input:", input);
  return travelSuggestionsWithDirectoryLinkingFlow(input);
}

const getNearbyPlaces = ai.defineTool({
  name: 'getNearbyPlaces',
  description: 'Retrieves a list of names for nearby places (like hotels, restaurants, attractions) based on a location and a search radius. Use this when the user asks for specific types of places near them.',
  inputSchema: z.object({
    location: z
      .object({
        lat: z.number().describe('The latitude of the location.'),
        lng: z.number().describe('The longitude of the location.'),
      })
      .describe('The current location of the user.'),
    radius: z.number().min(1).max(50).default(10).describe('The search radius around the location in kilometers (default 10km, max 50km).'),
     // Optional: Add category filtering if needed
     // category: z.enum(['hotel', 'restaurant', 'attraction']).optional().describe('Filter by place category.'),
  }),
  outputSchema: z.array(z.string().describe('The name of a nearby place.')),
},
async input => {
   console.log("[AI Tool] getNearbyPlaces called with:", input);
   // TODO: In a real app, filter markers based on input.category if provided
  const markers = await getMapMarkers(input.location, input.radius);
  const placeNames = markers.map(marker => marker.title);
  console.log("[AI Tool] getNearbyPlaces returning:", placeNames);
  return placeNames;
});

const prompt = ai.definePrompt({
  name: 'travelSuggestionsWithDirectoryLinkingPrompt',
  input: {
    schema: TravelSuggestionsWithDirectoryLinkingInputSchema, // Use the defined schema
  },
  output: {
    schema: TravelSuggestionsWithDirectoryLinkingOutputSchema, // Use the defined schema
  },
  tools: [getNearbyPlaces],
  prompt: `You are HeyRoute, a friendly and insightful travel assistant chatbot powered by Google Gemini.
A user is asking for travel suggestions.

User's Approximate Location:
Latitude: {{location.lat}}
Longitude: {{location.lng}}

User's Query: "{{query}}"

Your Task:
1.  Carefully analyze the user's query: "{{query}}".
2.  Determine if the user is asking for specific types of places nearby (e.g., "restaurants near me", "hotels in the area", "things to do around here").
3.  If the query asks for nearby places:
    *   Use the 'getNearbyPlaces' tool to find relevant places. Use a sensible default radius (like 10km or 20km) if the user doesn't specify one.
    *   Formulate a helpful, conversational response in the 'suggestions' field. You can mention one or two examples from the tool's results naturally if it fits the conversation.
    *   Crucially, list ALL the place names returned by the 'getNearbyPlaces' tool in the 'directoryLinks' output field. The frontend will use this list to create clickable links. Do NOT put the full list of names directly into the 'suggestions' text.
4.  If the query is for general travel advice (e.g., "best time to visit Paris", "tips for packing light", "is Tokyo expensive?"):
    *   Provide a comprehensive and helpful answer in the 'suggestions' field based on your knowledge.
    *   Do NOT use the 'getNearbyPlaces' tool.
    *   Leave the 'directoryLinks' output field as an empty array ([]).
5.  Always maintain a friendly, helpful, and slightly enthusiastic tone suitable for a travel assistant.

Example Interaction 1 (Nearby Places):
User Query: "Find good sushi restaurants near me"
Tool Call: getNearbyPlaces({ location: { lat: ..., lng: ... }, radius: 10 }) -> returns ["Sushi Star", "Tokyo Bites"]
Output: { suggestions: "Okay, I found a couple of sushi spots nearby that might interest you! Take a look at the list.", directoryLinks: ["Sushi Star", "Tokyo Bites"] }

Example Interaction 2 (General Advice):
User Query: "What's the weather like in Rome during May?"
Tool Call: None
Output: { suggestions: "May is a wonderful time to visit Rome! Expect pleasant spring weather, usually warm during the day (around 20-25°C or 68-77°F) and cooler in the evenings. It's mostly sunny, but packing a light jacket or sweater and maybe a small umbrella is always a good idea!", directoryLinks: [] }

Respond now based on the user's query: "{{query}}". Ensure your output strictly follows the format defined in the output schema.`,
});

const travelSuggestionsWithDirectoryLinkingFlow = ai.defineFlow<
  typeof TravelSuggestionsWithDirectoryLinkingInputSchema,
  typeof TravelSuggestionsWithDirectoryLinkingOutputSchema
>({
  name: 'travelSuggestionsWithDirectoryLinkingFlow',
  inputSchema: TravelSuggestionsWithDirectoryLinkingInputSchema,
  outputSchema: TravelSuggestionsWithDirectoryLinkingOutputSchema,
},
async input => {
  const llmResponse = await prompt(input);
  const output = llmResponse.output; // Get the structured output

    if (!output) {
        console.error("[AI Flow] LLM response did not contain valid output.");
        throw new Error("Failed to get a valid response from the AI model.");
    }

   console.log("[AI Flow] Generated output:", output);
  return output; // Return the structured output
});

