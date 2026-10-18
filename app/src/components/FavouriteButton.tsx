import { ToggleButton } from "react-aria-components";
import { useStore } from "../store";
import { Star } from "./icons/Star";

const sizes = {
  sm: "size-8",
  md: "size-9 border border-zinc-200",
};

export function FavouriteButton({ id, size = "sm" }: { id: string; size?: keyof typeof sizes }) {
  const selected = useStore((state) => state.favourites.includes(id));
  const toggleFavourite = useStore((state) => state.toggleFavourite);

  return (
    <ToggleButton
      isSelected={selected}
      onChange={() => toggleFavourite(id)}
      aria-label="Favourite"
      data-testid="favourite-toggle"
      data-card-id={id}
      data-favourited={selected}
      className={`inline-flex shrink-0 items-center justify-center rounded hover:bg-zinc-100 ${selected ? "text-amber-500" : "text-zinc-300 hover:text-zinc-500"} ${sizes[size]}`}
    >
      <Star size={16} animateOnTap fill={selected ? "currentColor" : "none"} />
    </ToggleButton>
  );
}
