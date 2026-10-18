import { ToggleButton } from "react-aria-components";
import { Heart } from "../icons/heart";
import { useStore } from "../store";

export function FavouriteButton({ id, className = "" }: { id: string; className?: string }) {
  const isSelected = useStore((s) => s.favourites.includes(id));
  const toggleFavourite = useStore((s) => s.toggleFavourite);
  return (
    <ToggleButton
      isSelected={isSelected}
      onChange={() => toggleFavourite(id)}
      aria-label={isSelected ? "Remove from favourites" : "Add to favourites"}
      data-testid="fav-toggle"
      className={`grid cursor-pointer place-items-center rounded-full ${isSelected ? "text-fav" : "text-white/90 hover:text-white"} ${className}`}
    >
      <Heart
        animate={isSelected}
        fill={isSelected ? "currentColor" : "none"}
        aria-hidden
        className="size-[55%]"
      />
    </ToggleButton>
  );
}
