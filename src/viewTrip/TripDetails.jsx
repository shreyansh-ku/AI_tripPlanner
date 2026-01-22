import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../service/firebaseConfig";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { AiOutlineLoading } from "react-icons/ai";
import Hotels from '../viewTrip/components/Hotels'
import Info from "../viewTrip/components/Info"
import Places from './components/Places'
import {AIchat} from '../service/AIchat'
const TripDetails = () => {
  const { id } = useParams();
  const [tripData, setTripData] = useState(null);

  useEffect(() => {
    const fetchTrip = async () => {
      const docRef = doc(db, "trips", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setTripData(docSnap.data());
      } else {
        console.log("No such trip!");
        toast('NO Trip exist')
      }
    };

    fetchTrip();
  }, [id]);
  console.log(tripData)
  
  if (!tripData) {
    return (
      <div className="flex justify-center items-center h-screen">
        <AiOutlineLoading className="animate-spin text-4xl text-blue-500" />
      </div>
    );
  }
    // ✅ Fallback resolvers for inconsistent structures
 const resolvedItinerary =
    tripData?.travel_plan?.itinerary || tripData?.itinerary;
  const resolvedInfo = tripData?.travel_plan || tripData;

  const resolvedHotels = tripData?.travel_plan?.hotel_options || tripData?.hotel_options;

  
  return (
   <>
   <div className=" p-10 md:px-20 lg:px-44 xl:px-50">
    {/* Information Section */}
    <Info tripData={resolvedInfo} />
    {/* recomeneded Hotels */}
      <Hotels hotels={resolvedHotels} />
    {/* Daily Plan */}
    <Places places={resolvedItinerary} />
     {/*AIchat*/}
    <AIchat />
    </div>
   </>
  );
};

export default TripDetails;