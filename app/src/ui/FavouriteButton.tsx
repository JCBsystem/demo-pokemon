import { ToggleButton } from "react-aria-components";
import { HeartIcon } from "../icons/HeartIcon";
import { useStore } from "../store";

type Props = { id: string; name: string; size?: "sm" | "lg" };

export function FavouriteButton({ id, name, size = "sm" }: Props) {
  const isFavourite = useStore((state) => state.favourites.includes(id));
  const toggleFavourite = useStore((state) => state.toggleFavourite);
  const dimension = size === "lg" ? "size-12" : "size-[26px]";
  return (
    <ToggleButton
      isSelected={isFavourite}
      onChange={() => toggleFavourite(id)}
      aria-label={`${isFavourite ? "Unfavourite" : "Favourite"} ${name}`}
      data-testid="favourite-toggle"
      className={`grid ${dimension} place-items-center rounded-full bg-paper/90 text-[#c9b293] shadow-[0_1px_3px_#0003] outline-none data-focus-visible:ring-2 data-focus-visible:ring-ink data-hovered:text-heart data-selected:text-heart`}
    >
      <HeartIcon filled={isFavourite} size={size === "lg" ? 26 : 14} />
    </ToggleButton>
  );
}
