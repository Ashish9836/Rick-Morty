"use client";
import { useCallback, useEffect, useMemo, useState } from "react";
import { LocationCard } from "../card";
import CustomSkeletonLoader from "@/components/common/loader";
import Spinner from "@/components/common/loader/Spinner";
import { CustomDrawer } from "@/components/common/drawer";
import { LocationDetails } from "../LocationDetails";
import { ILocation, ILocationFilters } from "@/types";
import { getLocationsByFilter } from "@/services/locations/api";

export const ListingSection = ({
  filterValues,
  setFilterValues,
}: {
  filterValues: any;
  setFilterValues: any;
}) => {
  /**
   * state declarations
   * >locations : to sore locations ([])
   * >filter : filter state
   * >tPages : to track max pages
   */
  const [locations, setLocations] = useState<any[]>([]);
  const [tPages, setTpages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openDrawer, setOpenDrawer] = useState<ILocation | null>(null);

  /**
   * @purpose : to get locations based on filter
   */
  const getLocationList = async () => {
    try {
      setIsLoading(true);
      const result = await getLocationsByFilter(filterValues);
      setTpages(result?.data?.info?.pages || 0);
      const updatedChars: any[] =
        filterValues.page === 1
          ? [...result?.data?.results]
          : [...locations, ...result?.data?.results];
      setLocations(() => updatedChars);
    } catch (err) {
      setLocations(() => []);
    }
    setIsLoading(false);
  };



  /*rerender logic for filter change*/
  useEffect(() => {
    getLocationList();
  }, [JSON.stringify(filterValues)]);


  /**
   * @purpose : load more callback during inf-scroll
   */
  const loadMoreCallback = useCallback(() => {
    if (locations.length && tPages > filterValues.page)
      setFilterValues((prev: ILocationFilters) => ({
        ...prev,
        page: prev.page + 1,
      }));
  }, [locations.length]);

  const isMore = tPages == 0 || tPages > filterValues.page;
  return (
    <div>
      {isLoading && (
        <div className="p-2 flex justify-center">
          <div>
            <Spinner />
          </div>
        </div>
      )}
      <div className="grid gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {locations.map((location, idx) => (
          <LocationCard
            key={idx}
            {...location}
            setOpenDrawer={setOpenDrawer}
          />
        ))}
        {isMore && <CustomSkeletonLoader callback={loadMoreCallback} />}
      </div>
      {openDrawer && (
        <CustomDrawer
          open={Boolean(openDrawer)}
          body={
            <LocationDetails
              {...(openDrawer || {})}
            />
          }
          title="Location Details"
          closeHandler={() => {
            setOpenDrawer(null);
          }}
        />
      )}
    </div>
  );
};
