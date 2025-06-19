import { useState } from 'react';
import Card from './components/Card';

const products = [
  {
    id: 1,
    name: 'Kettle',
    image:
      'https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRgplzMhEb6LR_NwPxCx2FqD5J0pz_O0CsVrvRS-2APtzDR2zoFqphIbVQZaIUSolNBXZ67cqYOBvfJNTEA6qqv2H-r_NkRrQYVaad9q2bY5qZa43dBgqBM'
  },
  {
    id: 2,
    name: 'Bat',
    image:
      'https://contents.mediadecathlon.com/p2410169/49d374ab443b1ffdcde34d9bec3362a7/p2410169.jpg'
  },
  {
    id: 3,
    name: 'Badminton',
    image:
      'https://contents.mediadecathlon.com/p1831411/26f2cd935668f52c5d7b3034d1567fd3/p1831411.jpg?format=auto&quality=70&f=2520x0'
  }
];

function App() {
  const [userId, setUserId] = useState('');

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Product Reviews</h1>

      <div className="mb-6">
        <label className="block text-sm font-medium mb-1">Enter your User ID:</label>
        <input
          type="number"
          className="border rounded w-full p-2"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="e.g. 1"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map(product => (
          <Card key={product.id} product={product} userId={userId} />
        ))}
      </div>

    </div>
  );
}

export default App;
