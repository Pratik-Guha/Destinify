"use client"
import React, { useState } from 'react'
import HotelFilter from './HotelFilter';

export default function FilterPage() {
    const [selectedRoomTypes, setSelectedRoomTypes] = useState<string[]>([]);
  const [selectedPriceRanges, setSelectedPriceRanges] = useState<string[]>([]);
  const [selectedSort, setSelectedSort] = useState<string>("");
  return (
    <div className="flex gap-4">
      <HotelFilter
        selectedRoomTypes={selectedRoomTypes}
        setSelectedRoomTypes={setSelectedRoomTypes}
        selectedPriceRanges={selectedPriceRanges}
        setSelectedPriceRanges={setSelectedPriceRanges}
        selectedSort={selectedSort}
        setSelectedSort={setSelectedSort}
      />
      {/* other UI like hotel results list */}
    </div>
  )
}
