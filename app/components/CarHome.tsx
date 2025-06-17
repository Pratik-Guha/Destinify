// pages/index.js
import Head from 'next/head';
import CarCard from './CarCard';

export default function Home() {
  const cars = [
    {
      id: 1,
      name: "Tesla Model S",
      image: "/car2.jpeg",
      price: "$99/day",
      rating: 4.8,
      reviews: 120,
    },
    {
      id: 2,
      name: "BMW X5",
      image: "/car3.webp",
      price: "$75/day",
      rating: 4.6,
      reviews: 95,
    },
    {
      id: 3,
      name: "Toyota Corolla",
      image: "/car1.jpg",
      price: "$45/day",
      rating: 4.4,
      reviews: 150,
    },
    {
      id: 4,
      name: "fortes Corolla",
      image: "/car1.jpg",
      price: "$45/day",
      rating: 4.4,
      reviews: 150,
    },
    {
      id: 5,
      name: "Traveler",
      image: "/car3.webp",
      price: "$45/day",
      rating: 4.4,
      reviews: 150,
    },
    {
      id: 6,
      name: "Traveler",
      image: "/car2.jpeg",
      price: "$45/day",
      rating: 4.4,
      reviews: 150,
    },
  ];

  return (
    <div>
      <Head>
        <title>Car Rental Service</title>
        <meta name="description" content="Rent your dream car today!" />
      </Head>

      <header className="bg-blue-600 text-white p-4 text-center">
        <h1 className="text-2xl font-bold">🚗 Car Rental Service</h1>
      </header>

      <main className="p-6">
        <h2 className="text-xl font-semibold mb-4">Available Cars</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      </main>
    </div>
  );
}