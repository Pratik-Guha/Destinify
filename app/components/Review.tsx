// components/Review.js
export default function Review({ review }: any) {
  return (
    <div className="border-t pt-3">
      <p className="font-semibold">{review.user}</p>
      <p className="text-yellow-500">⭐ {review.rating}/5</p>
      <p className="text-gray-700">{review.comment}</p>
    </div>
  );
}