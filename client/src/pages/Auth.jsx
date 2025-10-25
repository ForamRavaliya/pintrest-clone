import React, { useState, useContext } from 'react';
import axios from '../api/axios';
import { AuthContext } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function Auth() {
  const [isLogin, setIsLogin] = useState(true);
  const [form, setForm] = useState({});
  const { save } = useContext(AuthContext);
  const nav = useNavigate();

  async function submit(e) {
    e.preventDefault();
    try {
      const url = isLogin ? '/auth/login' : '/auth/register';
      const res = await axios.post(url, form);
      save(res.data.user, res.data.token);
      nav('/');
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || 'Auth error');
    }
  }

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-xl mb-4">{isLogin ? 'Login' : 'Register'}</h2>
      <form onSubmit={submit} className="space-y-3">
        {!isLogin && (
          <input placeholder="Username" onChange={(e)=>setForm({...form, username: e.target.value})} className="w-full p-2 border rounded" />
        )}
        <input placeholder="Email" onChange={(e)=>setForm({...form, email: e.target.value})} className="w-full p-2 border rounded" />
        <input type="password" placeholder="Password" onChange={(e)=>setForm({...form, password: e.target.value})} className="w-full p-2 border rounded" />
        <button className="w-full py-2 bg-blue-600 text-white rounded">{isLogin ? 'Login' : 'Register'}</button>
      </form>
      <button onClick={()=>setIsLogin(!isLogin)} className="mt-3 text-sm text-blue-600">
        {isLogin ? 'Create new account' : 'Already have an account? Login'}
      </button>
    </div>
  );
}
