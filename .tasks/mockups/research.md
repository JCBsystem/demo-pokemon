# UI research: Ash's Pokémon Card Collection

Routes that exist (from `01-scaffold.md`): `/`, `/cards`, `/card/:id`. Every direction below uses only these.

## Sources

### (a) Card / collection grids

1. LEGO Builder (Refero), https://refero.design/screens/049a024f-2632-4674-b144-06a25bf39af4: collectibles home with search pill in the header, a 2-column grid of large rounded tiles and a floating bottom pill for nav.
2. Pinterest search grid (Refero), https://refero.design/screens/5540027d-383e-4885-82f2-34c337963fad: search plus filter button above a 2-column image grid, with a bottom tab bar.
3. Alta closet (Mobbin), https://mobbin.com/screens/4df70884-f9b9-40ba-9043-7afbcff778ca: edge-to-edge 3-column item grid with no gutters, a sort label, an item count and a chip row above.
4. Oku collections (Refero), https://refero.design/pages/c4e36b4a-4fff-4c92-a109-a4cf4323b4d3: collection tiles with a count and stacked cover thumbnails, a good fit for set/type/rarity entry points.
5. Pokedesk, Pokémon Card App Collector (Dribbble), https://dribbble.com/shots/22539361-Pokedesk-Pok-mon-Card-App-Collector: digital portfolio modelled on a physical binder.
6. Pokemon Pokedex, Rajan Neupane (Dribbble), https://dribbble.com/shots/16486690-Pokemon-Pokedex: card border and corner blob coloured by Pokémon type.

### (b) Search with filters

1. IKEA catalogue (Refero), https://refero.design/pages/f3805cd7-8791-4f7c-8bc7-a3a90a3b5015: dropdown filter row, removable active-filter chips, and a side panel whose button says "View 3" (live result count).
2. Zendesk Marketplace (Refero), https://refero.design/pages/227126bc-53a8-49d5-b6e3-161f75d6500e: persistent left filter sidebar, active filter pills and a sort dropdown above a 3-column grid.
3. TikTok Shop filter (Refero), https://refero.design/screens/2a222980-19a2-4729-b9f9-f61e80b99fff: bottom sheet split into a section rail on the left and chips on the right, plus Reset and Show results buttons.
4. On (Refero), https://refero.design/screens/15762f6c-ec7d-43e4-bd39-ab3e9d209e0c: bottom-sheet checkboxes with a "View results (6)" count button.
5. Insight Timer search (Mobbin), https://mobbin.com/screens/20208e4e-ce8c-4e08-acc1-e93be0379055: search field, filter icon plus a scrolling chip row, "26 Results" and a sort control on the right.
6. Square item library (Mobbin), https://mobbin.com/screens/06a9a697-289c-4b8b-99d6-796487f35005: dense table with thumbnails, filter pills showing counts ("Category 2"), and a right-side "Filter by" panel.

### (c) Item detail with tabs

Refero returned accordion-based detail pages (Asos, Target), not tabs. Mobbin and Dribbble were used instead.

1. Mindtrip place detail (Mobbin), https://mobbin.com/screens/70bec225-ef8a-4736-a111-c34fe93435bd: full-bleed hero, then a heart, then a scrolling underline tab row (Overview / Guides / Stays).
2. Insight Timer course (Mobbin), https://mobbin.com/screens/6845dc55-6acf-4cd3-97f0-d1bba8e5382d: large serif title over the hero, with plain text tabs (7 Days / Reviews / About) and a bookmark.
3. Public resource centre (Mobbin), https://mobbin.com/screens/e5dd854a-744d-4b78-87a7-e107c5b5d71a: two-level tabs (dropdown plus underline tabs) and a large editorial heading.
4. Pokémon Base Stats, Kiera Rooker (Dribbble), https://dribbble.com/shots/2183730-Pok-mon-Base-Stats-WIP: stat display with base, min and max values.
5. Pokémon Application UI Components, Priscila K. (Dribbble), https://dribbble.com/shots/17031004-Pok-mon-Application-UI-Components: reusable Pokémon card, header, type tag and search bar components.

### (d) Favourites / pinned on home

1. Fresha home (Refero), https://refero.design/screens/d1eb61e6-7940-434c-92d8-6a6a432f116e: greeting, then a horizontal "Favourites" card row, then a "Recently viewed" row.
2. Linear iOS home (Refero), https://refero.design/screens/9611e935-3d08-4d9f-adc2-0d5f4ba8b46d: a plain "Favorites" list at the top of home, with a bottom tab bar.
3. Freeform favourites (Refero), https://refero.design/screens/d847cf72-d3b3-429c-8229-468320bea305: large title, search field, then a 2-column favourites grid.
4. Mindtrip ideas (Mobbin), https://mobbin.com/screens/aacff10d-69bd-410a-b58a-615c832aa7a1: heart toggle on each grid tile, filled when saved.
5. Stamp collection app, Lucas Costa (Dribbble), https://dribbble.com/shots/11182068-Stamp-collection-app: collectibles sorted into categories, like a physical album.

### (e) Mobile-first navigation

1. Linear web (Refero), https://refero.design/pages/58ac6637-2009-4f3e-86c3-382b0dbfd942: dense left sidebar, centre list and right filter/metadata pane. Paired with (d) 2, it is the one example of the same product shown both ways: sidebar on desktop, bottom tabs on iOS.
2. Rivian account (Refero), https://refero.design/pages/fe7d04a7-ec38-4a73-ba99-8b1fe62f167f: narrow icon-only left rail.
3. Shopify search (Mobbin), https://mobbin.com/screens/83a79099-6b71-454f-817e-a701eb23811e: floating pill tab bar, with search as a detached circle next to it.
4. Recraft styles (Mobbin), https://mobbin.com/screens/a41e06f8-0537-457e-ad58-6bfff22f10b1: left sidebar plus a 5-column full-height image grid on laptop.
5. Once (Mobbin), https://mobbin.com/screens/16292a9b-80af-40c0-8dd6-dac90f9b0036: object-as-UI (a cassette as the item) with a two-item text tab bar at the bottom.

Not usable: generic Dribbble WebSearch returned only tag or search pages for "editorial collection" and "card grid filters", so no shot-level links were found for those.

## Directions

The four differ on phone nav, laptop nav and browse layout. No two share more than one of these.

### 1. Pocket Grid
Axis: layout (edge-to-edge image grid, card art as the whole UI) and colour mode (dark).
- Phone 390: bottom tab bar (Home, Cards, Search focus). Filters open as a bottom sheet.
- Laptop 1280: compact top bar with the same tabs inline and search centred. Grid of 6–7 columns, with filters in a popover from a chip row.
1. Takes the gutterless grid, count and chip row from Alta (a3).
2. Takes the sectioned bottom sheet with Show results from TikTok Shop (b3) and the live count button from On (b4).
3. Takes the Favourites, then Recently viewed carousels on home from Fresha (d1).
4. Takes the hero, heart and underline tabs on detail from Mindtrip (c1), and the heart-on-tile toggle from Mindtrip (d4).
5. Takes the type-coloured card frame from Rajan Neupane (a6).

### 2. Collector's Index
Axis: density (list/table-first, many rows per screen) and navigation pattern (sidebar plus master-detail).
- Phone 390: top app bar with search field. A menu button opens a left drawer (nav plus facets with counts). Filters open as a full-screen sheet.
- Laptop 1280: three panes. Left sidebar holds nav and the set/type/rarity facets with counts. The centre is a dense table with thumbnails. The right pane previews `/card/:id`, and the route also opens on its own.
1. Takes the three-pane layout from Linear web (e1), and favourites as a plain list at the top of home from Linear iOS (d2).
2. Takes the dense table with thumbnails and pills with counts ("Set 2") from Square (b6).
3. Takes the persistent filter sidebar and removable active pills from Zendesk (b2).
4. Takes the two-level tabs in the detail pane from Public (c3), and the base/min/max stat rows from Kiera Rooker (c4).

### 3. Field Guide
Axis: typography treatment (editorial, large serif, magazine rhythm) and layout (feature-led, not grid-led).
- Phone 390: top masthead with a large title that shrinks on scroll, with text tabs (Home · Cards) under it. No bottom bar.
- Laptop 1280: centred masthead with text nav and search. Content sits in a max-width column. Browse entry points are big type lists with counts. The grid is a 4-column grid with captions.
1. Takes the serif title over the hero and the plain text tabs on detail from Insight Timer (c2).
2. Takes the large editorial heading treatment from Public (c3).
3. Takes the result count, sort and scrolling chip row from Insight Timer search (b5).
4. Takes the collection tiles with counts for set/type/rarity entry points from Oku (a4).
5. Takes the large title, search, then favourites block from Freeform (d3).

### 4. Binder
Axis: physical metaphor (binder pages of 3x3 pockets, playful) and navigation pattern (floating dock plus index tabs).
- Phone 390: floating bottom pill (Home, Cards, Search). Browse shows one 3x3 binder page at a time and swipes sideways. Filters open as a bottom sheet.
- Laptop 1280: open two-page spread (two 3x3 pages). Nav is binder index tabs sticking out of the right edge. Filters live in a slim strip over the spread.
1. Takes the binder-as-portfolio framing from Pokedesk (a5).
2. Takes the floating pill nav and the warm header with search pill from LEGO Builder (a1), and the detached search circle from Shopify (e3).
3. Takes the object-as-UI idea from Once (e5).
4. Takes "first page = favourites" album sorting from Lucas Costa (d5).
5. Takes the live count on Apply ("View 3") from IKEA (b1).

## Questions for MrB

1. Colour mode is not settled in `init-settled.md`. Should each mockup show light only, dark only, or both (following the system setting)? Default if no answer: each direction uses the mode named above.
2. Favourites have no route (`/`, `/cards`, `/card/:id`) and stay out of the URL. Should they appear only on home, or also get a nav entry (for example a toggle on `/cards`)? Default if no answer: home only.
