"use client";
import React from "react";
import SearchableSelect from "@/components/common/selectable/SearchableSelect";
import { Input } from "@/components/ui/input";
import { ICharacterFilters } from "@/types";

export const CharacterFilter = ({
  filteredOptions,
  setLocationSearchTxt,
  filterValues,
  setFilterValues,
}: {
  filteredOptions: any;
  setLocationSearchTxt: any;
  filterValues: any;
  setFilterValues: any;
}) => {
  return (
    <div className="p-4">
      <div className="font-bold text-3xl mb-2">Characters</div>
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
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <SearchableSelect
          options={filteredOptions?.location || []}
          placeholder="Location..."
          label="Filter by location"
          searchCallback={(value: string) => {
            setLocationSearchTxt(value);
          }}
          selectCallback={(value: string) => {
            setFilterValues((prev: any) => ({
              ...prev,
              page: 1,
              location: value,
            }));
          }}
        />
        <SearchableSelect
          options={filteredOptions?.status || []}
          placeholder="Status..."
          label="Filter by status"
          selectCallback={(value: string) => {
            setFilterValues((prev: any) => ({
              ...prev,
              page: 1,
              status: value,
            }));
          }}
        />
        <SearchableSelect
          options={filteredOptions?.gender || []}
          placeholder="Gender..."
          label="Filter by gender"
          selectCallback={(value: string) => {
            setFilterValues((prev: any) => ({
              ...prev,
              page: 1,
              gender: value,
            }));
          }}
        />
        <SearchableSelect
          options={filteredOptions?.species || []}
          placeholder="Species..."
          label="Filter by species"
          selectCallback={(value: string) => {
            setFilterValues((prev: any) => ({
              ...prev,
              page: 1,
              species: value,
            }));
          }}
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
