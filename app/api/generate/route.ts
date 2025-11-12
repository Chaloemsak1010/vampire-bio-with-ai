import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server"; 

// --- New Constants and Helper Function ---
const MAX_RETRIES = 5;
const INITIAL_DELAY_MS = 1000; // 1 second

// Helper function to pause execution
const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));
// ------------------------------------------

// The GoogleGenAI client will automatically pick up the GEMINI_API_KEY from environment variables.
const ai = new GoogleGenAI({});

// Define the expected shape of the request body
interface RequestBody {
  name: string;
  interests: string;
}

interface GeminiApiError extends Error {
    status: number;
}

export async function POST(req: NextRequest) {
  try {
    const { name, interests }: RequestBody = await req.json();

    const systemInstruction = `
      You are a creative vampire novelist writing dating profiles for ancient vampires.
      Write a short, romantic, and funny dating profile (80–100 words).
      It should sound centuries old, dramatic, and poetic — but with a modern dating twist.
      Include the name at the top in vampire title style.
    `;
    
    // The user's prompt containing the dynamic data
    const userPrompt = `
      User info:
      Name: ${name}
      Interests: ${interests}
    `;

    let response;

    // --- Exponential Backoff and Retry Loop Implementation ---
    for (let attempt = 1; attempt <= MAX_RETRIES; attempt++) {
        try {
            // Call the Gemini API
            response = await ai.models.generateContent({
                model: "gemini-2.5-flash",
                contents: [{ role: "user", parts: [{ text: userPrompt }] }],
                config: {
                    systemInstruction: systemInstruction,
                    maxOutputTokens: 8192, 
                },
            });
            
            // If the call succeeds, break the loop
            break; 

        } catch (err) {
            // Check if the error is a 503 (Service Unavailable)
            const error = err as GeminiApiError;
            if (error.status === 503 && attempt < MAX_RETRIES) {
                const backoffTime = INITIAL_DELAY_MS * Math.pow(2, attempt - 1);
                console.warn(`Attempt ${attempt} failed with 503. Retrying in ${backoffTime}ms...`);
                await delay(backoffTime);
            } else if (error.status === 503 && attempt === MAX_RETRIES) {
                // Throw the error if it's the last attempt and it failed
                throw new Error("Gemini API is unavailable after multiple retries.");
            } else {
                // If it's a different error (like 400 Bad Request, 401 Auth error, etc.), throw it immediately
                throw err;
            }
        }
    }

    // --- Defensive Check (Original FIX) ---
    if (!response || !response.text) {
        console.error("Gemini API returned no text content.", response);
        return NextResponse.json(
            { error: "Content generation failed or was blocked by safety settings." },
            { status: 500 }
        );
    }
    // --- END Defensive Check ---

    const result = response.text.trim();
    return NextResponse.json({ result }, { status: 200 });

  } catch (err) {
    console.error(err);
    // If the error is thrown from the retry loop or a general exception
    return NextResponse.json(
      { error: `Something went wrong with the API process: ${err instanceof Error ? err.message : "Unknown error"}` }, 
      { status: 500 }
    );
  }
}