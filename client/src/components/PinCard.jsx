import React from 'react';

export default function PinCard({ pin }) {
  return (
    <div className="bg-white rounded shadow overflow-hidden hover:scale-105 transition-transform">
     <img
       src={`http://localhost:5000/uploads/${pin.image}`}
       alt={pin.title}
       className="w-full h-48 md:h-64 object-cover h-64"
     />

      <div className="p-2">
        <h3 className="font-semibold text-sm">{pin.title}</h3>
        <p className="text-xs text-gray-500">{pin.postedBy}</p>
      </div>
    </div>
  );
}
