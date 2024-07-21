import { ICharacter } from "@/types";

export interface IPropType extends ICharacter {
  setOpenDrawer: any; // New property added
  location:any;
  origin:any;
}
export const CharacterCard = ({
  image,
  name,
  status,
  species,
  type,
  gender,
  origin,
  location,
  episode,
  setOpenDrawer,
}: IPropType) => {
  const cardClickHandler = () => {
    setOpenDrawer(() => ({
      image,
      name,
      status,
      species,
      type,
      gender,
      location,
      origin,
      episode
    }));
  };
  return (
    <div
      className="bg-white shadow-md rounded-lg overflow-hidden cursor-pointer"
      onClick={cardClickHandler}
    >
      <div className="flex items-center space-x-4 p-4">
        <img
          src={image}
          alt={name}
          className="w-24 h-24 rounded-full object-cover"
        />
        <div>
          <h2 className="text-2xl font-bold">{name}</h2>
          <p className="text-gray-600">{status}</p>
        </div>
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
      </div>
    </div>
  );
};

export default CharacterCard;
