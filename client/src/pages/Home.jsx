import React, { useEffect, useState } from 'react';
import PinCard from '../components/PinCard';
import api from '../api/axios';

export default function Home() {
  const [pins, setPins] = useState([]);

  useEffect(() => {
    api.get('/pins')
      .then((res) => setPins(res.data))
      .catch((err) => console.error(err));
  }, []);

  return (
    <section className="px-6 py-12">
      <h2 className="text-3xl font-bold mb-6 text-gray-800">Explore</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {pins.map((pin) => (
          <PinCard key={pin._id} pin={pin} />
        ))}
      </div>

    </section>
  );
}
