import React, { useState } from 'react';
import axios from '../api/axios';

export default function UploadImage({ onUploaded }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);

  async function upload() {
    if (!file) return alert('Select image first');
    const form = new FormData();
    form.append('image', file);
    setLoading(true);
    try {
      const res = await axios.post('/pins', form, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      onUploaded(res.data);
    } catch (err) {
      console.error(err);
      alert('Upload failed');
    } finally { setLoading(false); }
  }

  return (
    <div className="space-y-2">
      <input type="file" accept="image/*" onChange={(e) => setFile(e.target.files[0])} />
      <button onClick={upload} disabled={loading} className="px-4 py-2 bg-blue-600 text-white rounded">
        {loading ? 'Uploading...' : 'Upload & Create Pin'}
      </button>
    </div>
  );
}
