"use client";
import { useState } from "react";
import { LocationFilter } from "./filter";
import { ListingSection } from "./list";
import { ILocationFilters } from "@/types";

export default function LocationListing() {
  const [filterValues, setFilterValues] = useState<ILocationFilters>({
    page: 1,
  });

  return (
    <div>
      <LocationFilter setFilterValues={setFilterValues} />
      <ListingSection
        filterValues={filterValues}
        setFilterValues={setFilterValues}
      />
    </div>
  );
}
