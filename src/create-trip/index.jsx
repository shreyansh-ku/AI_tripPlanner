import React, { useEffect } from 'react'
import { doc, setDoc } from "firebase/firestore";
import { db } from '../service/firebaseConfig';
import { toast } from "sonner"
import { Input } from "@/components/ui/input"
import { useState } from 'react';
import AIModel from '../service/AIModel'
import GooglePlacesAutocomplete from 'react-google-places-autocomplete';
import { SelectBudgetList, SelectTravelsList } from '../constants/Option';
import { Button } from '../components/ui/button';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate, useNavigation} from 'react-router-dom'
const Createtrip = () => {
  const[place,setPlace]=useState(null);
const [formData, setFormdata] = useState({
  location: null,
  noOfdays: '',
  budget: '',
  people: ''
});
const router=useNavigate();
const [loading,setLoading]=useState(false);
  const [tripPlan, setTripPlan] = useState(null);
  const handleInputChange=(name,value)=>{
    setFormdata ({
      ...formData,
      [name]:value
    })
  }
  useEffect(()=>{
    console.log(formData);
  },[formData])
  
    const ONGenerateTrip = async() => {
    if (!formData.location || !formData.noOfdays || !formData.budget || !formData.people) {
      toast("Please fill all details to Generate trip")
    }
    if (formData.noOfdays > 7) {
      alert("Trips longer than 7 days are not supported yet.");
      return;
    }

    console.log("Generated Trip:", formData);
    try {
      setLoading(true);
    // Build the prompt dynamically from user input
    const prompt = `Generate Travel Plan for Location: ${formData.location.label}, 
      for ${formData.noOfdays} Days for ${formData.people} 
      with a ${formData.budget} budget. 
      Give me Hotels options list and itinerary in JSON format.
      Respond only with valid JSON inside markdown fences. Do not include any explanation or extra text.
      Generate a travel plan in the following JSON format. Do not include markdown, explanation, or extra text. Respond with valid JSON only.
      taking example like this

{
  "location": "City, State",
  "duration": "X Days",
  "currency": "INR",
  "budget_level": "Low/Medium/High",
  "traveler_count": X,
  "total_estimated_budget_excluding_hostel": "₹X",
  "budget_tips": [ "...", "...", "...", "..." ],
  "hotel_options": [
    {
      "name": "",
      "type": "",
      "location": "",
      "estimated_price_per_night": "",
      "features": [],
      "description": ""
    }
  ],
  "itinerary": [
    {
      "time": "HH:MM AM/PM",
      "activity": "",
      "cost": "₹X" // optional
    }
  ]
}`;
;

    // Call your Gemini service
    const result = await AIModel(prompt)

    // Save or display the AI output
    const validateTripSchema = (trip) => {
  if (!trip.trip_overview || !trip.hotel_options || !trip.itinerary) {
    throw new Error("Trip schema is invalid");
  }
};
    setTripPlan(result); // e.g. store in state
    setLoading(false);
    console.log("Generated Trip:", result);
    await saveTrip(result);

  } catch (err) {
    console.error("Error generating trip:",err);
    toast("Error generating trip plan");
  }
  };
   // result is the JSON string returned by Gemini
async function saveTrip(result) {
  try {
    setLoading(true);
    // Clean Gemini output: remove markdown fences if present
    const cleaned = result
      .replace(/```json/g, '')   // remove opening ```json
      .replace(/```/g, '')       // remove closing ```
      .trim();

    // Parse JSON string into object
    const tripData = JSON.parse(cleaned);
    // ✅ Generate unique ID using location + timestamp
    const docId = `${formData.location.label.toLowerCase().replace(/\s+/g, '-')}-${Date.now()}`;


    // Save to Firestore under "trips" collection
        await setDoc(doc(db, "trips", docId), tripData);

    setLoading(false);
    console.log("Trip saved successfully with ID:", docId);
    router(`/trip/${docId}`);

  } catch (err) {
    console.error("Error saving trip:", err);
  }
}

  return (
    <div className='sm:px-10 md:px-32 lg:px-56 xl:px-10 px-5 mt-10'>
      <h2 className='font-bold text-3xl'>Tell us Your Travel preferences</h2>
      <p className='mt-3 text-gray-500'>Share what you love—adventure, 
        culture, or relaxation—and let AI design the perfect trip
</p>
<div>
  <div className='mt-5 flex flex-col'>
    <h2 className='text-xl font-medium my-2 mt-10 '>Enter your Destination 🖼️</h2>
    <GooglePlacesAutocomplete 
    apiKey={import.meta.env.VITE_GOOGLE_PLACE_API_KEY}
    selectProps={{
      place,onChange:(v)=>{
        setPlace(v); handleInputChange('location' ,v)
      }
    }}/>
  </div>
</div>

<div>
  <h2 className='text-xl font-medium my-2 mt-10 '>How many days are you planing your trip?💭</h2>
  <Input placeholder='Ex-3' type='number' 
  onChange={(e)=>handleInputChange('noOfdays', Number(e.target.value))}/>
</div>
<div>
   <h2 className='text-xl font-medium my-2 mt-10 '>Whats your budget??</h2>
   <div className='grid grid-cols-3 gap-5 mt-5'>
    {SelectBudgetList.map((item,index)=>{
      return(
      <div key={index} onClick={()=>handleInputChange('budget', item.title)} className={`p-4 border rounded-lg hover:shadow-lg
      ${formData?.budget==item.title && 'shadow-lg border-black'}
      `}>
        <h2 className='text-3xl'>{item.icon}</h2>
        <h2>{item.title}</h2>
        <h2>{item.desc}</h2>
        <h2>{item.range}</h2>
      </div>
      )
    }
  )}
   </div>
</div>
<div>
   <h2 className='text-xl font-medium my-2 mt-10 '>Who do you plan to travel with?</h2>
   <div className='grid grid-cols-3 gap-5 mt-5'>
    {SelectTravelsList.map((item,index)=>{
      return(
      <div key={index} onClick={()=>handleInputChange('people', item.people)} className={`p-4 border rounded-lg hover:shadow-lg
            ${formData?.people==item.people && 'shadow-lg border-black'}
      `}>
        <h2 className='text-3xl'>{item.icon}</h2>
        <h2>{item.title}</h2>
        <h2>{item.desc}</h2>
         <h2>{item.people}</h2>
      </div>
      )
    }
  )}
   </div>
</div>
<div className='my-10  flex justify-end hover:shadow-amber-400'>
  <Button
  disabled={loading} 
  onClick={ONGenerateTrip}>
    {loading ?<AiOutlineLoading3Quarters className='animate-spin h-5 w-5' />:'Generate trip'
}
  </Button>
  {tripPlan && (
  <pre className="mt-4 p-4 bg-gray-100 rounded text-sm whitespace-pre-wrap">
    {tripPlan}
  </pre>
)}
</div>
    </div>
  )
 
} 


export default Createtrip
