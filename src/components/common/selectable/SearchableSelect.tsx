"use client";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Select } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

const SearchableSelect = ({
  options,
  placeholder = "Search...",
  label = "label",
  searchCallback = () => {},
  selectCallback = () => {},
}: {
  options: any[];
  placeholder?: string;
  label?: string;
  searchCallback?: any;
  selectCallback?: any;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedOption, setSelectedOption] = useState<any>(null);
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);

  const filteredOptions = options.filter((option) =>
    option.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  /*close menu handler*/
  const closeMenu = useCallback((value: string, isValue = false) => {
    if (isValue) {
      setSelectedOption(value);
      selectCallback(value);
      setSearchTerm(label);
    }
    setIsMenuOpen(false);
  }, []);

  return (
    <div className="relative">
      <div className="text-base font-semibold">{label}</div>
      <Input
        type="text"
        value={searchTerm}
        onChange={(e: any) => {
          setSearchTerm(e.target.value);
          searchCallback(e.target.value);
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
              onClick={() => closeMenu(value, true)}
              className="cursor-pointer p-2 hover:bg-gray-200"
            >
              {label}
            </div>
          ))}
        </div>
      )}
      {true && (
        <div className="flex items-center justify-between p-2 mt-2 bg-gray-100 rounded border border-gray-300">
          <div>{selectedOption}</div>
          <button
            onClick={() => {
              setSelectedOption(null);
              selectCallback("");
            }}
            className="text-gray-500 hover:text-gray-700 focus:outline-none"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      )}
    </div>
  );
};

export default SearchableSelect;
