import { useState } from "react";
import { ToggleButton } from "react-aria-components";
import { useStore } from "../store";
import { Heart } from "./icons/heart";

type Props = { id: string; name: string; className?: string; testId?: string };

export function FavouriteButton({ id, name, className = "", testId = "favourite-toggle" }: Props) {
  const isSelected = useStore((s) => s.favourites.includes(id));
  const toggleFavourite = useStore((s) => s.toggleFavourite);
  const [pressed, setPressed] = useState(false);

  return (
    <ToggleButton
      isSelected={isSelected}
      onChange={() => {
        setPressed(true);
        toggleFavourite(id);
      }}
      aria-label={`Favourite ${name}`}
      data-testid={testId}
      className={`cursor-pointer text-current hover:text-accent data-selected:text-accent [&_path]:fill-none data-selected:[&_path]:fill-current motion-safe:transition-colors ${className}`}
    >
      <Heart size={20} strokeWidth={1.6} aria-hidden animate={pressed && isSelected} />
    </ToggleButton>
  );
}
