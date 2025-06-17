"use client";

import { assets } from '@/public/assets/assets';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

export default function Booking() {
  const [bookings, setBookings] = useState<any[]>([]);
  const router = useRouter();

  useEffect(() => {
    const stored = localStorage.getItem("userBookings");
    if (stored) {
      const parsed = JSON.parse(stored);
      if (parsed.length === 0) {
        toast.error("No bookings found. Please book a room first.");
        router.push("/");
      } else {
        setBookings(parsed);
      }
    } else {
      toast.error("No bookings found. Please book a room first.");
      router.push("/");
    }
  }, []);

  const handlePayment = (bookingId: string) => {
    toast.success("Your booking is confirmed");

    const updatedBookings = bookings.map(item =>
      item._id === bookingId ? { ...item, isPaid: true } : item
    );

    setBookings(updatedBookings);
    localStorage.setItem("userBookings", JSON.stringify(updatedBookings));

    setTimeout(() => {
      router.push('/');
    }, 2000);
  };

  return (
    <>
      {bookings.map((item) => (
        <div
          key={item._id}
          className='grid grid-cols-1 md:grid-cols-[3fr_2fr_1fr] gap-1 w-full border-b-2 border-yellow-300 first:border-t-2 p-4'
        >
          {/* Hotel Details */}
          <div className='flex flex-col md:flex-row'>
            <Image
              src={item.room.images[0]}
              width={400}
              height={400}
              alt={item.room.hotel.name}
              className='rounded object-cover shadow'
            />
            <div className='flex flex-col gap-1.5 max-md:mt-3 ml-0 md:ml-4'>
              <p className='font-bold text-2xl'>
                {item.hotel.name}
                <span className='text-sm'> ({item.room.roomType})</span>
              </p>
              <div className='flex items-center gap-1 text-sm'>
                <Image
                  src={assets.locationIcon}
                  alt='location'
                  width={16}
                  height={16}
                />
                <span>{item.hotel.address}</span>
              </div>
              <div className='flex items-center gap-1 text-sm'>
                <Image
                  src={assets.guestsIcon}
                  alt='guests'
                  width={16}
                  height={16}
                />
                <span>Guests: {item.guests}</span>
              </div>
              <p className='text-base'>Total: ${item.totalPrice}</p>
            </div>
          </div>

          {/* Date Info */}
          <div className='flex flex-row md:items-center md:gap-12 mt-3 gap-8'>
            <div>
              <p>Check-In:</p>
              <p>{new Date(item.checkInDate).toDateString()}</p>
            </div>
            <div>
              <p>Check-Out:</p>
              <p>{new Date(item.checkOutDate).toDateString()}</p>
            </div>
          </div>

          {/* Payment Section */}
          <div className='flex flex-col items-start justify-center pt-3'>
            <div className='flex items-center gap-4'>
              <div
                className={`h-3 w-3 rounded-full ${item.isPaid ? "bg-green-500" : "bg-red-500"}`}
              ></div>
              <p className={`text-sm ${item.isPaid ? "text-green-500" : "text-red-500"}`}>
                {item.isPaid ? "Paid" : "Unpaid"}
              </p>
            </div>
            {!item.isPaid && (
              <button
                onClick={() => handlePayment(item._id)}
                className='px-4 py-1.5 mt-4 text-xs border-2 border-yellow-300 rounded-full hover:bg-yellow-600 transition-all cursor-pointer duration-300'
              >
                Pay Now
              </button>
            )}
          </div>
        </div>
      ))}
    </>
  );
}
