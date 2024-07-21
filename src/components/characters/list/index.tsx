"use client";
import { getCharacters } from "@/services/characters/api";
import { ICharacterFilters } from "@/types";
import { useCallback, useEffect, useState } from "react";
import CharacterCard from "../card";
import CustomSkeletonLoader from "@/components/common/loader";
import Spinner from "@/components/common/loader/Spinner";

export const Listing = ({
  filterValues,
  setFilterValues,
}: {
  filterValues: any;
  setFilterValues: any;
}) => {
  /**
   * state declarations
   * >characters : to sore characters ([])
   * >filter : filter state
   * >tPages : to track max pages
   */
  const [characters, setCharacters] = useState<any[]>([]);
  const [tPages, setTpages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  /**
   * @purpose : to get characters based on filter
   */
  const getCharacterList = async () => {
    try {
      setIsLoading(true)
      const result = await getCharacters(filterValues);
      setTpages(result?.data?.info?.pages || 0);
      const updatedChars: any[] =
        filterValues.page === 1
          ? [...result?.data?.results]
          : [...characters, ...result?.data?.results];
      setCharacters(() => updatedChars);
    } catch (err) {
      setCharacters(() => []);
    }
    setIsLoading(false)
  };

  /*rerender logic for filter change*/
  useEffect(() => {
    getCharacterList();
  }, [JSON.stringify(filterValues)]);

  /**
   * @purpose : load more callback during inf-scroll
   */
  const loadMoreCallback = useCallback(() => {
    if (characters.length && tPages > filterValues.page)
      setFilterValues((prev: ICharacterFilters) => ({
        ...prev,
        page: prev.page + 1,
      }));
  }, [characters.length]);

  return (
    <div>
      {isLoading && (
        <div className="p-2 flex justify-center">
          <div><Spinner /></div>
        </div>
      )}
      <div className="grid gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {characters.map((character, idx) => (
          <CharacterCard key={idx} {...character} />
        ))}
        <CustomSkeletonLoader callback={loadMoreCallback} />
      </div>
    </div>
  );
};
