import { CharacterFilter } from "./filter";
import { Listing } from "./list";

export default function CharacterListing() {
  return (
    <div>
      <CharacterFilter/>
      <Listing/>
    </div>
  );
}
