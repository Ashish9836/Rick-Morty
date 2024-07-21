"use client";
import React, { useState, useEffect, useRef } from "react";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";

const SearchableSelect = ({
  options,
  placeholder = "Search...",
  label = "label",
  searchCallback=()=>{}
}: {
  options: any[];
  placeholder?: string;
  label?: string;
  searchCallback?:any
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement>(null);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative">
      <div className="text-base font-semibold">{label}</div>
      <Input
        ref={inputRef}
        type="text"
        value={searchTerm}
        onChange={(e: any) => {
          setSearchTerm(e.target.value);
          searchCallback(e.target.value)
        }}
        placeholder={placeholder}
        className="mb-2 border border-gray-300 rounded p-2"
        onFocus={() => setIsMenuOpen(true)}
      />
      {isMenuOpen && filteredOptions.length > 0 && (
        <div className="absolute z-10 w-full bg-white border border-gray-300 rounded shadow-md mt-1 max-h-60 overflow-auto">
          {filteredOptions.map(({ label, value }, idx) => (
            <div
              key={idx}
              onClick={() => {
                setSelectedOption(value);
                setIsMenuOpen(false);
                setSearchTerm(label); // Update searchTerm with the selected label
              }}
              className="cursor-pointer p-2 hover:bg-gray-200"
            >
              {label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchableSelect;
