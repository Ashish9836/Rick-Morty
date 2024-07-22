"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { ICharacterFilters } from "@/types";

export const LocationFilter = ({
  setFilterValues,
}: {
  setFilterValues: any;
}) => {
  return (
    <div className="p-4">
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search for characters..."
          className="w-full border border-gray-300 rounded p-2"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFilterValues((prev: ICharacterFilters) => ({
              ...prev,
              page: 1,
              name: e.target.value,
            }));
          }}
        />
      </div>
    </div>
  );
};

export default LocationFilter;
