import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import Layout from './components/Layout';

export default function Dashboard() {
  const [code, setCode] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const userId = localStorage.getItem('userId');
    if (!userId) {
      router.push('/login');
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const userId = localStorage.getItem('userId');
      const res = await axios.post('http://localhost:5000/api/promotion/check-code', { code, userId });
      setMessage(`${res.data.msg} ${res.data.prize > 0 ? `$${res.data.prize}` : ''}`);
    } catch (error) {
      console.error(error);
      setMessage(error.response.data.msg || 'Error al verificar el código');
    }
  };

  return (
    <Layout>
      <h1>Gana como Loco</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Ingrese el código de 3 dígitos"
          value={code}
          onChange={(e) => setCode(e.target.value)}
          maxLength={3}
          required
        />
        <button type="submit">Verificar Código</button>
      </form>
      {message && <p>{message}</p>}
    </Layout>
  );
}