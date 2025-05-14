import { genAI } from "./ai";
import { GenerateSyntheticDataProps, SyntheticDataResponse } from "@/types";


const model = genAI.getGenerativeModel({
    model : "gemini-2.0-flash",
})



export async function generateSyntheticData (props : GenerateSyntheticDataProps) {
    try {
        
        console.log(`Generating data for ${props.songName} ...`);

        const prompt = `You are a knowledgeable music metadata agent specialized in Bollywood songs. Given the following details:
Song Name: ${props.songName}
Album Name: ${props.albumName}
Release Year: ${props.releaseYear}
Artists: ${props.artists.join(', ')}
Your task is to return a JSON object with these fields:
{
  "language": "string",               // Primary language of the song (e.g., Hindi, Punjabi)
  "genre": "string",                  // Main genre (e.g., Romantic, Hip-Hop, Devotional)
  "explicit": boolean,                // True if the song contains explicit content, otherwise false
  "director": "string",               // Name of the music director
  "lyricist": "string",               // Name of the lyricist
  "tempo": "string",                  // Describes tempo (e.g., slow, medium, fast)
  "description": "string",            // A detailed summary (max 500 tokens) about the song
  "mood": ["string"],                 // List of moods conveyed by the song (e.g., ["uplifting", "romantic"])
  "instrumentation": ["string"]       // List of key instruments used (e.g., ["guitar", "tabla", "synth"])
}

If the song is not found, respond with:
{
  "error": "Song not found with the provided details."
}
Make sure the data is as accurate and complete as possible, and that all string values are in plain English.
`;

        const chatResponse = await model.generateContent(prompt);

        if (chatResponse.response.text()) {
            const responseContent = chatResponse.response.text();
            const jsonResponse = responseContent.replace(/```json|```/g, '').trim();
            const parsedResponse = JSON.parse(jsonResponse);
            if (parsedResponse.error) {
                return null;
            }

            const response : SyntheticDataResponse = parsedResponse;
            return response;
            
        }

    } catch (error) {
        console.error("Error generating data:",error);
        return null;
    }
}
