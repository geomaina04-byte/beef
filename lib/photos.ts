// All photography sourced from Unsplash, free to use under the Unsplash License.
// Keeping URLs + credits centralized so attribution stays consistent everywhere they're used.

export const PHOTOS = {
  cattleField: {
    url: "https://images.unsplash.com/photo-1715798637010-8a4f27a0950f",
    alt: "Herd of cattle grazing on open grassland",
    credit: "David Banning",
  },
  cattleCloseUp: {
    url: "https://images.unsplash.com/photo-1699748429966-eb238e4dc990",
    alt: "Close-up portrait of a cow",
    credit: "Natalia Malaia",
  },
  transportTruck: {
    url: "https://images.unsplash.com/photo-1694113372786-2553caec0c76",
    alt: "Transport truck driving on a road beside farmland",
    credit: "Artem Balashevsky",
  },
  serverRoom: {
    url: "https://images.unsplash.com/photo-1695668548342-c0c1ad479aee",
    alt: "Rack of servers in a data center",
    credit: "Kevin Ache",
  },
} as const;

export function unsplashSrc(url: string, opts: { w: number; q?: number } = { w: 1600 }) {
  return `${url}?auto=format&fit=crop&w=${opts.w}&q=${opts.q ?? 75}`;
}
