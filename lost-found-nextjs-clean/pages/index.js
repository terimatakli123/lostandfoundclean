import { useState, useEffect } from 'react';
import Head from 'next/head';

export default function Home() {
  const [photoUrl, setPhotoUrl] = useState('');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('');
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch('/api/items')
      .then(res => res.json())
      .then(data => setItems(data.items || []));
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch('/api/report', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ photoUrl, description, location }),
    });
    if (res.ok) {
      const newItem = { photoUrl, description, location };
      setItems([newItem, ...items]);
      setPhotoUrl('');
      setDescription('');
      setLocation('');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6 font-sans">
      <Head>
        <title>Lost & Found</title>
      </Head>
      <div className="max-w-xl mx-auto bg-white p-6 rounded shadow">
        <h1 className="text-3xl font-bold mb-4">Lost & Found</h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input type="url" placeholder="Photo URL" value={photoUrl} onChange={(e) => setPhotoUrl(e.target.value)} className="w-full p-2 border rounded" required />
          <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border rounded" required />
          <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} className="w-full p-2 border rounded" required />
          <button type="submit" className="bg-black text-white px-4 py-2 rounded">Report</button>
        </form>
      </div>

      <div className="max-w-xl mx-auto mt-8">
        <h2 className="text-2xl font-semibold mb-4">Reported Items</h2>
        <ul className="space-y-4">
          {items.map((item, i) => (
            <li key={i} className="bg-white p-4 rounded shadow">
              <img src={item.photoUrl} alt="Item" className="w-full h-48 object-cover mb-2 rounded" />
              <p><strong>Description:</strong> {item.description}</p>
              <p><strong>Location:</strong> {item.location}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
