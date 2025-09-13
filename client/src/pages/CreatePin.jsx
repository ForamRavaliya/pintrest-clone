import React from 'react';
import UploadImage from '../components/UploadImage';
import { useNavigate } from 'react-router-dom';

export default function CreatePin() {
  const nav = useNavigate();
  async function onUploaded(pin) {
    // After upload, navigate to pin detail
    nav(`/pin/${pin._id}`);
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl mb-4">Create Pin</h2>
      <UploadImage onUploaded={onUploaded} />
    </div>
  );
}
