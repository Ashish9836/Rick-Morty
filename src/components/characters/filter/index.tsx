"use client";
import React from "react";
import SearchableSelect from "@/components/common/selectable/SearchableSelect";
import { Input } from "@/components/ui/input";

export const CharacterFilter = ({
  filteredOptions,
  setLocationSearchTxt,
  filterValues
}: {
  filteredOptions: any;
  setLocationSearchTxt: any;
  filterValues:any
}) => {

  return (
    <div className="p-4">
      <div className="mb-4">
        <Input
          type="text"
          placeholder="Search for characters..."
          className="w-full border border-gray-300 rounded p-2"
        />
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <SearchableSelect
          options={filteredOptions?.location || []}
          placeholder="Location..."
          label="Filter by location"
          searchCallback={(value: string) => {
            setLocationSearchTxt(value);
          }}
        />
        <SearchableSelect
          options={filteredOptions?.status || []}
          placeholder="Status..."
          label="Filter by status"
        />
        <SearchableSelect
          options={filteredOptions?.gender || []}
          placeholder="Gender..."
          label="Filter by gender"
        />
        <SearchableSelect
          options={filteredOptions?.species || []}
          placeholder="Species..."
          label="Filter by species"
        />
        {/* <SearchableSelect
          options={[
            { label: "hello", value: "hello" },
            { label: "world", value: "world" },
          ]}
          placeholder="Type..."
          label="Filter by type"
        /> */}
      </div>
    </div>
  );
};

export default CharacterFilter;
