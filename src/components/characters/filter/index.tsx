"use client";
import React, { useEffect, useState } from "react";
import SearchableSelect from "@/components/common/selectable/SearchableSelect";
import { Input } from "@/components/ui/input";
import { getLocations } from "@/services/locations/api";

export const CharacterFilter = () => {
  const [filterOptions, setFilterOptions] = useState<any>({
    location: [],
    status: [
      { label: "Alive", value: "alive" },
      { label: "Dead", value: "dead" },
      { label: "Unknown", value: "unknown" },
    ],
    type: [],
    gender: [
      { label: "Male", value: "male" },
      { label: "Female", value: "female" },
      { label: "Genderless", value: "genderless" },
      { label: "Unknown", value: "unknown" },
    ],
    species: [
      { label: "Human", value: "human" },
      { label: "Alien", value: "alien" },
    ],
  });
  const [locationSearchTxt, setLocationSearchTxt] = useState("");

  /*location list by name*/
  const getLocationByName = async () => {
    try {
      const result = await getLocations(locationSearchTxt);
      setFilterOptions((prev: any) => ({
        ...prev,
        location: [
          ...result?.data?.results?.map(({ name }: any) => ({
            value: name,
            label: name,
          })),
        ],
      }));
    } catch (err) {}
  };

  useEffect(() => {
    getLocationByName();
  }, [locationSearchTxt]);

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
          options={filterOptions.location}
          placeholder="Location..."
          label="Filter by location"
          searchCallback={(value: string) => {
            setLocationSearchTxt(value);
          }}
        />
        <SearchableSelect
          options={filterOptions.status}
          placeholder="Status..."
          label="Filter by status"
        />
        <SearchableSelect
          options={filterOptions.gender}
          placeholder="Gender..."
          label="Filter by gender"
        />
        <SearchableSelect
          options={filterOptions.species}
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
