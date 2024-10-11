import React from "react";

// Sample data for biddings
const sampleBiddings = [
  {
    id: 1,
    title: "Bid for Apartment A",
    amount: 50000,
    status: "Winning", // Can be "Winning", "Lost", "Pending"
  },
  {
    id: 2,
    title: "Bid for Apartment B",
    amount: 45000,
    status: "Lost",
  },
  {
    id: 3,
    title: "Bid for Apartment C",
    amount: 60000,
    status: "Pending",
  },
];

export default function OutgoingBiddings() {
  return (
    <div className="p-4 bg-white shadow rounded-md">
      <h2 className="text-xl font-semibold text-gray-800">Outgoing Biddings</h2>
      <p className="text-gray-600">Here are your outgoing biddings:</p>

      <div className="mt-4">
        {sampleBiddings.length === 0 ? (
          <p className="text-gray-500">No outgoing biddings found.</p>
        ) : (
          <ul className="space-y-4">
            {sampleBiddings.map((bid) => (
              <li
                key={bid.id}
                className={`p-4 border rounded-md ${
                  bid.status === "Winning"
                    ? "border-green-500 bg-green-100"
                    : bid.status === "Lost"
                    ? "border-red-500 bg-red-100"
                    : "border-yellow-500 bg-yellow-100"
                }`}
              >
                <h3 className="text-lg font-semibold text-gray-800">{bid.title}</h3>
                <p className="text-gray-600">Amount: ${bid.amount}</p>
                <p className={`font-bold ${bid.status === "Winning" ? "text-green-700" : bid.status === "Lost" ? "text-red-700" : "text-yellow-700"}`}>
                  Status: {bid.status}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}
