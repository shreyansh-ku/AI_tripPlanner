import React from "react";

const Places = ({ places }) => {
  if (!places || places.length === 0) return null;

  const isArrayFormat = Array.isArray(places);

  return (
    <div className="mt-8">
      <h2 className="font-bold text-lg">📍 Places To Visit</h2>
      <div className="mt-4 overflow-x-auto">
        {isArrayFormat ? (
          <ul className="list-disc list-inside text-gray-800 mt-2 bg-white shadow rounded p-4">
            {places.map((item, i) => (
              <li key={i} className="mb-2">
                <span className="font-medium">{item.time || "Time"}:</span>{" "}
                <span className="text-gray-800">{item.activity}</span>
                {item.budget_tip && (
                  <p className="text-sm text-green-600 mt-1">
                    💡 Budget Tip: {item.budget_tip}
                  </p>
                )}
                {item.details && (
                  <p className="text-sm text-gray-600 mt-1">
                    📝 {item.details}
                  </p>
                )}
                {item.cost && (
                  <p className="text-sm text-blue-600 mt-1">
                    💰 Cost: {item.cost}
                  </p>
                )}
              </li>
            ))}
          </ul>
        ) : (
          Object.entries(places).map(([day, activities], i) => (
            <div key={i} className="mb-6">
              <h3 className="text-xl font-semibold">
                {day.replace("_", " ").toUpperCase()}
              </h3>
              <hr className="my-4 border-gray-300" />
              <ul className="list-disc list-inside text-gray-800 mt-2 bg-white shadow rounded p-4">
                {Object.entries(activities).map(([time, detail], j) => (
                  <li key={j} className="mb-2">
                    <span className="font-medium">{time}:</span>{" "}
                    <span className="text-gray-800">{detail.activity}</span>
                    {detail.budget_tip && (
                      <p className="text-sm text-green-600 mt-1">
                        💡 Budget Tip: {detail.budget_tip}
                      </p>
                    )}
                    {detail.details && (
                      <p className="text-sm text-gray-600 mt-1">
                        📝 {detail.details}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Places;
