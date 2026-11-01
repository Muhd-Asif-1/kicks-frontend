export type CommunityPost = {
  id: string;
  image: string;
  alt: string;
} & ({ type: "image"; href: string } | { type: "video"; video: string });

// Placeholder profile; replace with the official Kicks destination before launch.
export const communityProfile = { handle: "@KICKS", href: "https://www.instagram.com/kicks/" };

// Local mock content, deliberately independent of any Instagram API.
// Videos: Mixkit 4893 (street steps), 15059 (tying sneakers), trimmed silent previews.
// Existing lifestyle photographs: Unsplash. See public/media-sources.md.
export const communityPosts: readonly CommunityPost[] = [
  {
    id: "street-steps",
    type: "video",
    video: "/videos/community/street-steps.mp4",
    image: "/images/community/street-steps.jpg",
    alt: "Street steps — sneakers in motion down a sunlit alley",
  },
  {
    id: "air-max",
    type: "image",
    image: "/images/community/air-max-on-the-street.jpg",
    alt: "Orange and yellow Air Max on the pavement",
    href: communityProfile.href,
  },
  {
    id: "lace-up",
    type: "video",
    video: "/videos/community/lace-up.mp4",
    image: "/images/community/lace-up.jpg",
    alt: "Lace up — getting ready for the next run",
  },
  {
    id: "rooftop",
    type: "image",
    image: "/images/community/rooftop-style.jpg",
    alt: "Leather and denim on a city rooftop",
    href: communityProfile.href,
  },
  {
    id: "green-vans",
    type: "image",
    image: "/images/community/green-vans.jpg",
    alt: "Green Vans and cuffed denim",
    href: communityProfile.href,
  },
  {
    id: "rainy-day",
    type: "image",
    image: "/images/community/rainy-day-kicks.jpg",
    alt: "High tops making a splash on a rainy street",
    href: communityProfile.href,
  },
];
