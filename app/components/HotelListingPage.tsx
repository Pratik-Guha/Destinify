"use client";
import React, { useEffect, useRef, useState } from "react";
import HotelFilter from "@/app/components/HotelFilter";
import HotelDetails from "../spots/hotels/HotelDetails"; // assume this renders multiple rooms
import { roomsDummyData } from "@/public/assets/assets"; // ✅ Correct

export default function HotelListingPage() {
  const [selectedRoomTypes, setSelectedRoomTypes] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState<string>(""); // or your default sort
  const hotelListRef = useRef<HTMLDivElement>(null); 
  const filteredRooms = roomsDummyData.filter((room) => {
    const matchesType =
      selectedRoomTypes.length === 0 ||
      selectedRoomTypes.includes(room.roomType); // ✅ FIXED: use room.roomType instead of room.type

    const matchesPrice =
      selectedPriceRanges.length === 0 ||
      selectedPriceRanges.some((range) => {
        const [min, max] = range.split(" to ").map(Number);
        return room.pricePerNight >= min && room.pricePerNight <= max;
      });

    return matchesType && matchesPrice;
  }); // Sorting
  useEffect(() => {
    if (hotelListRef.current) {
      hotelListRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [selectedRoomTypes, selectedPriceRanges, selectedSort]); 

  if (selectedSort === "Price Low to High") {
    filteredRooms.sort((a, b) => a.pricePerNight - b.pricePerNight);
  } else if (selectedSort === "Price High to Low") {
    filteredRooms.sort((a, b) => b.pricePerNight - a.pricePerNight);
  }

  return (
    <div className="flex gap-6 px-4">
      <HotelFilter
        selectedRoomTypes={selectedRoomTypes}
        setSelectedRoomTypes={setSelectedRoomTypes}
        selectedPriceRanges={selectedPriceRanges}
        setSelectedPriceRanges={setSelectedPriceRanges}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
      />

      <div className="flex flex-col gap-4 w-full" ref={hotelListRef}> {/* 👈 ref added */}
        {filteredRooms.length > 0 ? (
          filteredRooms.map((room) => (
            <HotelDetails
              key={room._id}
              room={{
                ...room,
                images: room.images.map((img) =>
                  typeof img === "string" ? img : img.src
                ),
              }}
            />
          ))
        ) : (
          <p>No rooms found matching your filters.</p>
        )}
      </div>
    </div>
  );
}
