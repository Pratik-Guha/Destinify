"use client";
import React, { useState } from "react";

type CheckBoxProps = {
  label: string;
  selected?: boolean;
  onChange?: (checked: boolean, label: string) => void;
};

interface HotelFilterProps {
  selectedRoomTypes: string[];
  setSelectedRoomTypes: React.Dispatch<React.SetStateAction<string[]>>;
  selectedPriceRanges: string[];
  setSelectedPriceRanges: React.Dispatch<React.SetStateAction<string[]>>;
  selectedSort: string;
  setSelectedSort: React.Dispatch<React.SetStateAction<string>>;
}

const CheckBox: React.FC<CheckBoxProps> = ({
  label,
  selected = false,
  onChange = () => {},
}) => {
  return (
    <label className="flex gap-3 items-center cursor-pointer mt-2">
        {" "}
      <input
        type="checkbox"
        checked={selected}
        onChange={(e) => onChange(e.target.checked, label)}
      />
         <span className="select-none font-light">{label}</span> {" "}
    </label>
  );
};

type RadioButtonProps = {
  label: string;
  selected?: boolean;
  onChange?: (label: string) => void;
};

const RadioButton: React.FC<RadioButtonProps> = ({
  label,
  selected = false,
  onChange = () => {},
}) => {
  return (
    <label className="flex gap-3 items-center cursor-pointer mt-2">
        {" "}
      <input
        type="radio"
        name="sortOption"
        checked={selected}
        onChange={() => onChange(label)}
      />
         <span className="select-none font-light">{label}</span> {" "}
    </label>
  );
};

const HotelFilter: React.FC<HotelFilterProps> = ({
  selectedRoomTypes = [],
  setSelectedRoomTypes,
  selectedPriceRanges = [],
  setSelectedPriceRanges,
  selectedSort = "",
  setSelectedSort,
}) => {
  const [openFilters, setOpenFilters] = useState<boolean>(false);

  const roomTypes = ["Single Bed", "Double Bed", "Luxury Room", "Family Suite"];
  const priceRanges = [
    "0 to 500",
    "500 to 1500",
    "1500 to 2500",
    "2500 to 4000",
  ];
  const sortOptions = [
    "Price Low to High",
    "Price High to Low",
    "Newest First",
  ];

  return (
    <div className="w-80 border-2 border-yellow-300 max-lg:mb-8 mt-0 lg:mt-16">
        {" "}
      <div
        className={`flex items-center justify-between px-5 py-2.5 lg:border-b-2 border-yellow-300 ${
          openFilters && "border-b-2"
        }`}
      >
            <p className="font-medium text-lg">FILTERS</p>   {" "}
        <div className="cursor-pointer text-xs">
              {" "}
          <span
            onClick={() => setOpenFilters(!openFilters)}
            className="lg:hidden"
          >
                  {openFilters ? "HIDE" : "SHOW"}    {" "}
          </span>
              {" "}
          <span
            className="hidden lg:block"
            onClick={() => {
              setSelectedRoomTypes([]);
              setSelectedPriceRanges([]);
              setSelectedSort("");
            }}
          >
            CLEAR
          </span>
             {" "}
        </div>
          {" "}
      </div>
        {" "}
      <div
        className={`${
          openFilters ? "h-auto" : "h-0 lg:h-auto"
        } overflow-hidden transition-all duration-400`}
      >
           {" "}
        <div className="px-5 pt-5">
               <p className="font-medium pb-2">Popular filters</p>    {" "}
          {roomTypes.map((type, index) => (
            <CheckBox
              key={index}
              label={type}
              selected={(selectedRoomTypes ?? []).includes(type)}
              onChange={(checked, label) => {
                setSelectedRoomTypes((prev) =>
                  checked
                    ? [...prev, label]
                    : prev.filter((item) => item !== label)
                );
              }}
            />
          ))}
             {" "}
        </div>
           {" "}
        <div className="px-5 pt-5">
               <p className="font-medium pb-2">Price Range</p>    {" "}
          {priceRanges.map((range, index) => (
            <CheckBox
              key={index}
              label={range}
              selected={(selectedPriceRanges ?? []).includes(range)}
              onChange={(checked, label) => {
                setSelectedPriceRanges((prev) =>
                  checked
                    ? [...prev, label]
                    : prev.filter((item) => item !== label)
                );
              }}
            />
          ))}
             {" "}
        </div>
           {" "}
        <div className="px-5 pt-5 pb-7">
               <p className="font-medium pb-2">Sorted By</p>    {" "}
          {sortOptions.map((option, index) => (
            <RadioButton
              key={index}
              label={option}
              selected={selectedSort === option}
              onChange={(label) => setSelectedSort(label)}
            />
          ))}
             {" "}
        </div>
          {" "}
      </div>
       {" "}
    </div>
  );
};

export default HotelFilter;
