/** Food menu (the /menu ordering page). TODO: confirm every price with SO Restaurant. */

export type MenuOption = { label: string; price: number }

export type MenuItem = {
  id: string
  name: string
  category: CategorySlug
  /** Naira. For items with options this is the "from" price. */
  price: number
  image: string
  description: string
  options?: MenuOption[]
  popular?: boolean
}

export const categories = [
  { slug: 'mains', label: 'Mains' },
  { slug: 'grills', label: 'Grills' },
  { slug: 'burgers', label: 'Burgers & Wraps' },
  { slug: 'soups', label: 'Soups & Swallow' },
  { slug: 'pasta', label: 'Pasta & Noodles' },
  { slug: 'breakfast', label: 'Breakfast' },
  { slug: 'drinks', label: 'Shakes & Drinks' },
] as const

export type CategorySlug = (typeof categories)[number]['slug']

const protein: MenuOption[] = [
  { label: 'with Chicken', price: 0 },
  { label: 'with Beef', price: 500 },
  { label: 'with Turkey', price: 2000 },
  { label: 'with Fish', price: 1500 },
]

export const menu: MenuItem[] = [
  { id: 'party-jollof', name: 'Party Jollof & Fish', category: 'mains', price: 7500, image: '/img/jollof-fish.jpg', description: 'Smoky firewood-style jollof, grilled fish, plantain and fresh pepper.', popular: true },
  { id: 'jollof-chicken', name: 'Jollof & Chicken', category: 'mains', price: 6000, image: '/img/rice-chicken.jpg', description: 'Party jollof with a peppered chicken leg.', options: protein },
  { id: 'fried-rice', name: 'Special Fried Rice', category: 'mains', price: 6000, image: '/img/fried-rice.jpg', description: 'Fried rice with veg, liver and your choice of protein.', options: protein },
  { id: 'rice-stew', name: 'White Rice & Stew', category: 'mains', price: 5500, image: '/img/rice-egg.jpg', description: 'Steamed rice, rich tomato stew and a boiled egg.', options: protein },
  { id: 'native-rice', name: 'SO Native Platter', category: 'mains', price: 8500, image: '/img/rice-meat.jpg', description: 'Spiced rice, assorted meat and a side of salad.', popular: true },

  { id: 'mixed-grill', name: 'Mixed Grill Platter', category: 'grills', price: 18000, image: '/img/platter.jpg', description: 'Suya beef, chicken, gizzard, sausages and roasted veg. Feeds two.', popular: true },
  { id: 'grill-board', name: 'Grill Board for 4', category: 'grills', price: 32000, image: '/img/grill-banner.jpg', description: 'Chicken, ribs, kebabs, potatoes and three dips.' },
  { id: 'croaker', name: 'Grilled Croaker', category: 'grills', price: 12000, image: '/img/fish-lime.jpg', description: 'Whole croaker, pepper rub, lime and onions.' },
  { id: 'salmon', name: 'Seared Salmon', category: 'grills', price: 14500, image: '/img/fish-grilled.jpg', description: 'Pan-seared salmon on sautéed greens.' },
  { id: 'wings-hot', name: 'Hot Honey Wings', category: 'grills', price: 7000, image: '/img/wings-buffalo.jpg', description: 'Eight wings tossed in hot honey, with a garlic dip.', options: [{ label: '8 pieces', price: 0 }, { label: '12 pieces', price: 3000 }] },
  { id: 'wings-bbq', name: 'Sticky BBQ Wings', category: 'grills', price: 7000, image: '/img/wings-glazed.jpg', description: 'Smoky-sweet glazed wings with sesame.' },

  { id: 'so-burger', name: 'The SO Burger', category: 'burgers', price: 8500, image: '/img/burger-classic.jpg', description: 'Beef patty, cheddar, house sauce, pickles, brioche.', popular: true },
  { id: 'double-stack', name: 'Double Stack', category: 'burgers', price: 11000, image: '/img/burger-double.jpg', description: 'Two smashed patties, double cheese, caramelised onions.' },
  { id: 'classic-burger', name: 'Garden Burger', category: 'burgers', price: 7500, image: '/img/burger-wood.jpg', description: 'Beef, lettuce, tomato, onion and mayo.' },
  { id: 'wraps', name: 'Spicy Chicken Wraps', category: 'burgers', price: 6500, image: '/img/wraps.jpg', description: 'Two wraps with pepper chicken, slaw and chilli mayo.' },

  { id: 'egusi', name: 'Egusi & Pounded Yam', category: 'soups', price: 7500, image: '/img/egusi.jpg', description: 'Egusi with assorted meat and stockfish.', options: [{ label: 'Pounded yam', price: 0 }, { label: 'Eba', price: -500 }, { label: 'Semo', price: -500 }] },
  { id: 'efo', name: 'Efo Riro & Swallow', category: 'soups', price: 7000, image: '/img/efo.jpg', description: 'Spinach stew with assorted meat and your choice of swallow.' },
  { id: 'pepper-soup', name: 'Goat Meat Pepper Soup', category: 'soups', price: 6500, image: '/img/pepper-soup.jpg', description: 'Hot, peppery broth with tender goat meat.' },
  { id: 'seafood', name: 'Seafood Pot', category: 'soups', price: 15000, image: '/img/seafood-soup.jpg', description: 'Prawns, fish and periwinkle in a rich pepper broth.' },

  { id: 'penne', name: 'Spicy Penne', category: 'pasta', price: 6000, image: '/img/penne.jpg', description: 'Penne in a peppery tomato sauce with chicken.' },
  { id: 'stir-fry', name: 'Stir-fry Noodles', category: 'pasta', price: 5500, image: '/img/noodles.jpg', description: 'Wok-tossed noodles, veg and chicken strips.' },

  { id: 'big-breakfast', name: 'The Big Breakfast', category: 'breakfast', price: 8000, image: '/img/breakfast-full.jpg', description: 'Eggs, sausages, beans, plantain and toast.' },
  { id: 'egg-toast', name: 'Egg & Toast', category: 'breakfast', price: 4500, image: '/img/breakfast-toast.jpg', description: 'Fried eggs, toast, tomatoes and onions.' },

  { id: 'cookie-shake', name: 'Cookies & Cream Shake', category: 'drinks', price: 4500, image: '/img/shake-cookie.jpg', description: 'Thick vanilla shake blended with cookies.' },
  { id: 'strawberry-shake', name: 'Strawberry Shake', category: 'drinks', price: 4500, image: '/img/shake-strawberry.jpg', description: 'Fresh strawberries and vanilla ice cream.' },
  { id: 'pineapple-cooler', name: 'Pineapple Cooler', category: 'drinks', price: 3500, image: '/img/mocktail-pineapple.jpg', description: 'Pineapple, lime, mint and crushed ice.' },
]

/** Drinks list for the /lounge page (name + price only, dotted-leader layout). */
export const lounge = [
  {
    title: 'Cocktails',
    items: [
      ['SO Signature', 9500], ['Margarita', 9000], ['Mojito', 9000], ['Long Island', 10500], ['Pina Colada', 9000],
      ['Whiskey Sour', 10000], ['Cosmopolitan', 9000], ['Tequila Sunrise', 9000], ['Old Fashioned', 10500],
    ],
  },
  {
    title: 'Mocktails',
    items: [['Chapman', 5000], ['Virgin Mojito', 5500], ['Pineapple Cooler', 3500], ['Sunset Punch', 5500], ['Zobo Spritz', 4500]],
  },
  {
    title: 'Shots',
    items: [['Hennessy VS', 3000], ['Hennessy VSOP', 4000], ['Tequila', 3000], ['Jägermeister', 3000]],
  },
] as const
