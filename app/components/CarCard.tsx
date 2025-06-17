// components/CarCard.js
import Image from 'next/image';
import Review from './Review';

export default function CarCard({ car }: any) {
  return (
    <div className="border rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
      <div className="relative h-48 w-full">
        <Image
          src={car.image}
          alt={car.name}
          layout="fill"
          className='object-cover w-full h-full'
        />
      </div>
      <div className="p-4">
        <h2 className="text-xl font-bold">{car.name}</h2>
        <p className="text-green-600 font-semibold">{car.price}</p>
        <p className="text-sm text-gray-600 mt-1">
          ⭐ {car.rating} ({car.reviews} Reviews)
        </p>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
          Rent Now
        </button>
      </div>
      {/* Sample Reviews */}
<section className="mt-10">
  <h2 className="text-xl font-semibold mb-4">Customer Reviews</h2>
  <div className="space-y-4">
    <Review review={{ user: "John Doe", rating: 5, comment: "Amazing experience! The Tesla was clean and well-maintained." }} />
    <Review review={{ user: "Sarah Lee", rating: 4, comment: "Good service, but pickup took a bit longer than expected." }} />
  </div>
</section>
    </div>
  );
}