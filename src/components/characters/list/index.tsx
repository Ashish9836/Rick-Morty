"use client";
import { getCharacters } from "@/services/characters/api";
import { ICharacterFilters } from "@/types";
import { useCallback, useEffect, useState } from "react";
import CharacterCard from "../card";
import CustomSkeletonLoader from "@/components/common/loader";

export const Listing = () => {
  /**
   * state declarations
   * >characters : to sore characters ([])
   * >filter : filter state
   * >tPages : to track max pages
   */
  const [characters, setCharacters] = useState<any[]>([]);
  const [filter, setFilter] = useState<ICharacterFilters>({
    page: 1,
  });
  const [tPages, setTpages] = useState<number>(0);

  /**
   * @purpose : to get characters based on filter
   */
  const getCharacterList = async () => {
    try {
      const result = await getCharacters(filter);
      setTpages(result?.data?.info?.pages || 0);
      const updatedChars: any[] =
        filter.page === 1
          ? [...result?.data?.results]
          : [...characters, ...result?.data?.results];
      setCharacters(() => updatedChars);
    } catch (err) {
      setCharacters(() => []);
    }
  };

  /*rerender logic for filter change*/
  useEffect(() => {
    getCharacterList();
  }, [JSON.stringify(filter)]);

  /**
   * @purpose : load more callback during inf-scroll
   */
  const loadMoreCallback = useCallback(() => {
    if (characters.length && tPages > filter.page)
      setFilter((prev) => ({ ...prev, page: prev.page + 1 }));
  }, [characters.length]);

  return (
    <div className="grid gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {characters.map((character, idx) => (
        <CharacterCard key={idx} {...character} />
      ))}
      <CustomSkeletonLoader callback={loadMoreCallback} />
    </div>
  );
};
