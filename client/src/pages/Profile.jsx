import React, { useEffect, useState } from 'react';
import axios from '../api/axios';
import { useParams } from 'react-router-dom';
import PinCard from '../components/PinCard';

export default function Profile() {
  const { id } = useParams();
  const [pins, setPins] = useState([]);
  useEffect(() => {
    axios.get(`/pins/user/${id}`).then(res => setPins(res.data)).catch(console.error);
  }, [id]);

  return (
    <div>
      <h1 className="text-2xl mb-4">Profile</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {pins.map(p => <PinCard key={p._id} pin={p} />)}
      </div>
    </div>
  );
}
