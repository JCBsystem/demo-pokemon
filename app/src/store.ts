import { create } from "zustand";
import { persist } from "zustand/middleware";

const MAX_RECENT_SEARCHES = 10;

type State = {
  favourites: string[];
  recentSearches: string[];
  toggleFavourite: (id: string) => void;
  addRecentSearch: (query: string) => void;
};

export const useStore = create<State>()(
  persist(
    (set) => ({
      favourites: [],
      recentSearches: [],
      toggleFavourite: (id) =>
        set((state) => ({
          favourites: state.favourites.includes(id)
            ? state.favourites.filter((favourite) => favourite !== id)
            : [...state.favourites, id],
        })),
      addRecentSearch: (query) => {
        const trimmed = query.trim();
        if (trimmed === "") return;
        set((state) => ({
          recentSearches: [
            trimmed,
            ...state.recentSearches.filter((search) => search !== trimmed),
          ].slice(0, MAX_RECENT_SEARCHES),
        }));
      },
    }),
    { name: "store" },
  ),
);
