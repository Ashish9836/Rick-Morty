"use client";
import { getCharacters } from "@/services/characters/api";
import { ICharacter, ICharacterFilters } from "@/types";
import { useCallback, useEffect, useMemo, useState } from "react";
import CharacterCard from "../card";
import CustomSkeletonLoader from "@/components/common/loader";
import Spinner from "@/components/common/loader/Spinner";
import { CustomDrawer } from "@/components/common/drawer";
import { CharacterDetails } from "../CharacterDetails";
import { getEpisodes } from "@/services/episodes/api";

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
  const [episode, setEpisodes] = useState<any>([]);
  const [tPages, setTpages] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [openDrawer, setOpenDrawer] = useState<ICharacter | null>(null);

  /**
   * @purpose : to get characters based on filter
   */
  const getCharacterList = async () => {
    try {
      setIsLoading(true);
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
    setIsLoading(false);
  };

  /**
   * @purpose : to get episode based
   */
  const getEpisodeList = async (pg: number) => {
    try {
      const result = await getEpisodes(pg);
      setEpisodes((prev: any) => [...prev, ...result.data.results]);
    } catch (err) {
      setEpisodes(() => []);
    }
  };

  /*rerender logic for filter change*/
  useEffect(() => {
    getCharacterList();
  }, [JSON.stringify(filterValues)]);

  /*api call to episode list*/
  useEffect(() => {
    getEpisodeList(1);
    getEpisodeList(2);
    getEpisodeList(3);
  }, []);

  /*non duplicated episode*/
  const allEpisodesList = useMemo(() => {
    let nonDuplicated: any = new Set(
      episode.map((ep: any) => JSON.stringify(ep))
    );
    nonDuplicated = Array.from(nonDuplicated);
    return nonDuplicated.map((_e: any) => JSON.parse(_e));
  }, [JSON.stringify(episode)]);

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
          <div>
            <Spinner />
          </div>
        </div>
      )}
      <div className="grid gap-4 p-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {characters.map((character, idx) => (
          <CharacterCard
            key={idx}
            {...character}
            setOpenDrawer={setOpenDrawer}
          />
        ))}
        {tPages > filterValues.page && (
          <CustomSkeletonLoader callback={loadMoreCallback} />
        )}
      </div>
      {openDrawer && (
        <CustomDrawer
          open={Boolean(openDrawer)}
          body={
            <CharacterDetails
              {...(openDrawer || {})}
              allEpisodesList={allEpisodesList}
            />
          }
          closeHandler={() => {
            setOpenDrawer(null);
          }}
        />
      )}
    </div>
  );
};
