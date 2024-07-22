import { ILocation } from "@/types";

export interface IPropType extends ILocation {
  setOpenDrawer: any;
}

export const LocationCard = ({
  name,
  dimension,
  type,
  residents,
  setOpenDrawer,
}: IPropType) => {
  const cardClickHandler = () => {
    setOpenDrawer(() => ({
      name,
      dimension,
      type,
      residents
    }));
  };
  return (
    <div
      className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer"
      onClick={cardClickHandler}
    >
      <div className="flex items-center space-x-4 p-4">
        <div>
          <h2 className="text-2xl font-bold">{name}</h2>
        </div>
      </div>
      <div className="p-4">
        <p>
          <span className="font-semibold">Type:</span> {type}
        </p>
        <p>
          <span className="font-semibold">Dimension:</span> {dimension}
        </p>
      </div>
    </div>
  );
};

export default LocationCard;
