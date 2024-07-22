"use client";
import React from "react";
import { Input } from "@/components/ui/input";
import { ICharacterFilters, ILocationFilters } from "@/types";

export const LocationFilter = ({
  setFilterValues,
}: {
  setFilterValues: any;
}) => {
  return (
    <div className="p-4">
      <div className="font-semibold text-3xl mb-2">Locations</div>
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search for characters..."
          className="w-full border border-gray-300 rounded p-2"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setFilterValues((prev: ILocationFilters) => ({
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
