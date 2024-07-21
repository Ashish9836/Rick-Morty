import { ICharacter } from "@/types";
import { useMemo, useState } from "react";

export interface IProps extends ICharacter {
  allEpisodesList: any[];
}
export const CharacterDetails = ({
  name,
  status,
  gender,
  image,
  type,
  species,
  location,
  origin,
  episode,
  allEpisodesList,
}: IProps) => {
  const [seeEpisode, setSeeEpisode] = useState<boolean>(false);
  /*character's episode names*/
  const episodeNames = useMemo(() => {
    const ids =
      episode?.map((ep) => {
        return Number(ep.split("/")[ep.split("/").length - 1]);
      }) || [];

    const epNames =
      allEpisodesList
        .filter((epi) => ids.includes(epi.id))
        .map((filteredEpi) => filteredEpi.name) || [];

    return epNames;
  }, [JSON.stringify(episode || [])]);

  return (
    <div className="w-[400px] p-4">
      <div>
        <img
          src={image}
          alt={name}
          className="w-24 h-24 rounded-full object-cover"
        />
      </div>
      <div>
        <h2 className="text-2xl font-bold">{name}</h2>
        <p className="text-gray-600">{status}</p>
      </div>
      <div className="p-4 border-t border-gray-200">
        <p>
          <span className="font-semibold">Species:</span> {species}
        </p>
        {type && (
          <p>
            <span className="font-semibold">Type:</span> {type}
          </p>
        )}
        <p>
          <span className="font-semibold">Gender:</span> {gender}
        </p>
        <p>
          <span className="font-semibold">Location:</span> {location?.name}
        </p>
        <p>
          <span className="font-semibold">Origin:</span> {origin?.name}
        </p>
        <p className="font-semibold">
          Episodes:
          {episodeNames.length}{" "}
          {
            <span
              className="font-medium text-blue-500 cursor-pointer"
              onClick={() => setSeeEpisode((p) => !p)}
            >
              {seeEpisode ? "hide list" : "see now"}
            </span>
          }
          {seeEpisode && (
            <div className="mt-1 max-h-[200px] overflow-y-auto border border-gray-300 p-2 rounded shadow-lg">
              {episodeNames.map((eName, _idx) => (
                <div
                  key={_idx}
                  className="py-2 px-4 mb-2 bg-blue-100 border border-blue-300 rounded text-blue-700 font-medium"
                >
                  {"(" + (_idx + 1) + ") "}
                  {eName}
                </div>
              ))}
            </div>
          )}
        </p>
      </div>
    </div>
  );
};
