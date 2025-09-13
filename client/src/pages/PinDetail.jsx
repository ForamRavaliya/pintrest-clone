import React, { useEffect, useState, useContext } from 'react';
import axios from '../api/axios';
import { useParams } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function PinDetail() {
  const { id } = useParams();
  const [pin, setPin] = useState(null);
  const { user } = useContext(AuthContext);

  useEffect(() => {
    axios.get(`/pins/${id}`).then(res => setPin(res.data)).catch(console.error);
  }, [id]);

  async function toggleSave() {
    try {
      await axios.post(`/pins/${id}/save`);
      const res = await axios.get(`/pins/${id}`);
      setPin(res.data);
    } catch (err) { console.error(err); }
  }

  if (!pin) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded shadow">
      <img src={pin.imageUrl.startsWith('/') ? `http://localhost:5000${pin.imageUrl}` : pin.imageUrl} alt={pin.title} className="w-full mb-4" />
      <h2 className="text-2xl">{pin.title}</h2>
      <p className="text-gray-600">{pin.description}</p>
      <div className="mt-4">
        <button onClick={toggleSave} className="px-3 py-1 bg-blue-600 text-white rounded">
          {pin.saves?.includes(user?._id) ? 'Unsave' : 'Save'} ({pin.saves?.length || 0})
        </button>
      </div>
    </div>
  );
}
