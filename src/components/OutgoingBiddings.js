import React from "react";

// Sample data for biddings
const sampleBiddings = [
  {
    id: 1,
    title: "Bieding op : Appartement A",
    amount: 50000,
    status: "Aan het winnen",
    imageUrl: "https://images.pexels.com/photos/123456/pexels-photo-123456.jpeg", // Foto-URL
    link: "https://example.com/appartement-a", // Link naar huis
  },
  {
    id: 2,
    title: "Bieding op : Appartement B",
    amount: 45000,
    status: "Aan het winnen",
    imageUrl: "https://images.pexels.com/photos/654321/pexels-photo-654321.jpeg", // Foto-URL
    link: "https://example.com/appartement-b", // Link naar huis
  },
  {
    id: 3,
    title: "Bieding op : Appartement C",
    amount: 60000,
    status: "Aan het verliezen",
    imageUrl: "https://images.pexels.com/photos/789012/pexels-photo-789012.jpeg", // Foto-URL
    link: "https://example.com/appartement-c", // Link naar huis
  },
];

function OutgoingBiddings() {
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
                className={`p-4 border rounded-md flex items-center space-x-4 ${
                  bid.status === "Aan het winnen"
                    ? "border-green-500 bg-green-100"
                    : bid.status === "Aan het verliezen"
                    ? "border-red-500 bg-red-100"
                    : "border-red-500 bg-red-100"
                }`}
              >
                {/* Foto en Link */}
                <div className="flex-shrink-0">
                  <img
                    className="w-16 h-16 object-cover rounded-md"
                    src={bid.imageUrl}
                    alt="Bid property"
                  />
                </div>
                
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-800">{bid.title}</h3>
                  <p className="text-gray-600">Uw bieding: ${bid.amount}</p>
                  <p className="text-gray-600">Hoogste bieding: ${bid.amount}</p>
                  <p
                    className={`font-bold ${
                      bid.status === "Aan het winnen"
                        ? "text-green-700"
                        : bid.status === "Aan het verliezen"
                        ? "text-red-700"
                        : "text-gray-700"
                    }`}
                  >
                    Status: {bid.status}
                  </p>
                </div>

                {/* Link naar huis */}
                <div className="ml-4">
                  <a
                    href={bid.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline text-sm"
                  >
                    Bekijk huis
                  </a>
                </div>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default OutgoingBiddings;
