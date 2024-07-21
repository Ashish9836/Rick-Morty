"use client";
import { useEffect, useState } from "react";
import { CharacterFilter } from "./filter";
import { Listing } from "./list";
import { getLocations } from "@/services/locations/api";
import { ICharacterFilters } from "@/types";

export default function CharacterListing() {
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
  const [filterValues, setFilterValues] = useState<ICharacterFilters>({
    page: 1,
  });

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
    <div>
      <CharacterFilter
        filteredOptions={filterOptions}
        filterValues={filterValues}
        setLocationSearchTxt={setLocationSearchTxt}
      />
      <Listing filterValues={filterValues} setFilterValues={setFilterValues} />
    </div>
  );
}
