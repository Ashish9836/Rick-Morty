import {ILocation } from "@/types";
import { useMemo, useState } from "react";

export const LocationDetails = ({
  name,
  type,
  dimension,
  residents
}: ILocation) => {
  const [seeResidents, setSeeResidents] = useState<boolean>(false);
  /*character's episode names*/
  const episodeNames:any[] = [];

  return (
    <div className="w-[400px] p-4">
      <div>
        <h2 className="text-2xl font-bold">{name}</h2>
      </div>
      <div className="p-4 border-t border-gray-200">
        <p>
          <span className="font-semibold">Type:</span> {type}
        </p>
        <p>
          <span className="font-semibold">Dimension:</span> {dimension}
        </p>
        <p className="font-semibold">
          Residents:
          {episodeNames.length}{" "}
          {
            <span
              className="font-medium text-blue-500 cursor-pointer"
              onClick={() => setSeeResidents((p) => !p)}
            >
              {seeResidents ? "hide list" : "see now"}
            </span>
          }
          {seeResidents && (
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
