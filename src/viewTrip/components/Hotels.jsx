import React from "react";

const Hotels = ({ hotels }) => {
  if (!hotels || hotels.length === 0) {
    return <p>No hotels available</p>;
  }

  return (
    <div className="mt-8">
      <h3 className="text-xl font-semibold">🏨 Recommended Hotels</h3>
      <ul className="gap-y-4 mt-4">
        {hotels.map((hotel, i) => {
          const mapsUrl =
            "https://www.google.com/maps/search/?api=1&query=" +
              encodeURIComponent(`${hotel.name}, ${hotel.location}`);

          return (
            <li
              key={i}
              className="bg-white shadow rounded mb-4 p-4 hover:shadow-md hover:scale-105 transition-all cursor-pointer"
            >
              <a
                href={mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <h4 className="font-bold text-lg">{hotel.name} 🛏️</h4>
                <p className="text-gray-600">estimated_price_per_night:
                  {hotel.estimated_price_per_night} 💰
                </p>
                <p className="text-gray-500">
                  {Array.isArray(hotel.features)
                    ? hotel.features.join(", ")
                    : hotel.features} {hotel.description}🔎
                </p>

                Click to open in Google Maps 📍
              </a>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Hotels;