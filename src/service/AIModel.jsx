// import React, { useState } from "react";
// import { GoogleGenerativeAI } from "@google/generative-ai";
// To run this code you need to install the following dependencies:
// npm install @google/genai mime
// npm install -D @types/node
// AIModel.jsx
import { GoogleGenAI } from '@google/genai';

export default async function AIModel(prompt) {
  const ai = new GoogleGenAI({
    apiKey: import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY, // Vite env variable
  });

  const response = await ai.models.generateContentStream({
    model: 'gemini-3-flash-preview',
    config: {
      thinkingConfig: { thinkingLevel: 'HIGH' },
      tools: [{ googleSearch: {} }],
    },
    contents: [
      { role: 'user', parts: [{ text: prompt }] },
    ],
  });

  let output = "";
  for await (const chunk of response) {
    output += chunk.text;
  }

  return output; // return full response text
}
// const AIModel = () => {
//   const [responseText, setResponseText] = useState("");
//   const [loading, setLoading] = useState(false);

//   const handleGenerate = async () => {
//     setLoading(true);
//     setResponseText("");

//     try {
//       const ai = new GoogleGenAI({
//         apiKey: import.meta.env.VITE_GOOGLE_GEMINI_AI_API_KEY,
//       });

//       const tools = [{ googleSearch: {} }];
//       const config = {
//         thinkingConfig: { thinkingLevel: "LOW" },
//         tools,
//       };

//         const model = ai.getGenerativeModel({ model: "gemini-pro" });
//  // instead of gemini-3-pro-preview
//       const contents = [
//         {
//           role: "user",
//           parts: [
//             {
//               text:
//                 "Generate Travel Plan for Location: Las Vegas, for 3 Days for Couple with a Cheap budget. Give me a Hotels options list with HotelName, Hotel address, Price, hotel image url, geo coordinates, rating, descriptions and suggest itinerary with placeName, Place Details, Place Image Url, Geo Coordinates, ticket Pricing, rating, Time to spend at each of the location for 3 days with each day plan with best time to visit in JSON format.",
//             },
//           ],
//         },
//       ];

//       const response = await ai.models.generateContentStream({
//         model,
//         config,
//         contents,
//       });

//       let output = "";
//       for await (const chunk of response) {
//         output += chunk.text;
//         setResponseText(output);
//       }
//     } catch (err) {
//       console.error("Error generating travel plan:", err);
//       setResponseText("Something went wrong.");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="p-6">
//       <h2 className="text-xl font-bold mb-4">AI Trip Planner</h2>
//       <button
//         onClick={handleGenerate}
//         className="px-4 py-2 bg-blue-600 text-white rounded"
//       >
//         Generate Travel Plan
//       </button>

//       {loading && <p className="mt-4">Generating...</p>}

//       {responseText && (
//         <pre className="mt-4 p-4 bg-gray-100 rounded text-sm whitespace-pre-wrap">
//           {responseText}
//         </pre>
//       )}
//     </div>
//   );
// };

// export default AIModel;