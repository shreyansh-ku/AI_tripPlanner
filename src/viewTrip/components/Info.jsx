import React from 'react'

const Info = ({tripData}) => {
  return (
    <div>
        <img src="/img2.jpg" alt="img"  className="h-[500px] w-full object-cover rounded" />
        <div className="bg-white shadow rounded p-4 mt-4">
        <h2 className="text-3xl font-bold">
          {tripData?.location?.label || tripData?.location}
        </h2>
        <p className="text-gray-600">Duration: {tripData?.duration} 📅</p>
        <p className="text-gray-600">Travelers: {tripData?.travelers} 🧑‍🤝‍🧑</p>
        <p className="text-gray-600">Budget: {tripData?.estimated_budget_range}{tripData?.budget_level}💸</p>
         <p className="text-gray-600">Budget_tips: {tripData?.budget_tips} 🧑‍🤝‍🧑</p>
          <p className="text-gray-600">     total_estimated_budget_excluding_hostel: {tripData?.total_estimated_budget_excluding_hostel} 🧑‍🤝‍🧑</p>
      </div>

    </div>
  )
}

export default Info
