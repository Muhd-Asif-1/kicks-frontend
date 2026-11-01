export type CommunityPost = {
  id: string;
  image: string;
  alt: string;
  format: "portrait" | "square";
  href: string;
};

// Placeholder profile. Replace this and each post's href with Kicks' official URLs.
export const communityProfile = {
  handle: "@KICKS",
  href: "https://www.instagram.com/kicks/",
};

// Temporary lifestyle photography from Unsplash; source photo IDs are listed per post.
export const communityPosts: readonly CommunityPost[] = [
  {
    // photo-1520975954732-35dd22299614
    id: "rooftop-style",
    image: "/images/community/rooftop-style.jpg",
    alt: "Black leather jacket and sunglasses styled on a brick city rooftop",
    format: "portrait",
    href: communityProfile.href,
  },
  {
    // photo-1514989940723-e8e51635b782
    id: "air-max-on-the-street",
    image: "/images/community/air-max-on-the-street.jpg",
    alt: "Orange and yellow Air Max sneakers worn with dark denim on a city pavement",
    format: "square",
    href: communityProfile.href,
  },
  {
    // photo-1503342217505-b0a15ec3261c
    id: "pink-wall-style",
    image: "/images/community/pink-wall-style.jpg",
    alt: "Black graphic tee, light denim and tinted sunglasses against a pink street wall",
    format: "portrait",
    href: communityProfile.href,
  },
  {
    // photo-1512990414788-d97cb4a25db3
    id: "green-vans",
    image: "/images/community/green-vans.jpg",
    alt: "Green Vans sneakers worn with cuffed jeans against a weathered green door",
    format: "square",
    href: communityProfile.href,
  },
  {
    // photo-1529810313688-44ea1c2d81d3
    id: "rainy-day-kicks",
    image: "/images/community/rainy-day-kicks.jpg",
    alt: "Olive high-top sneakers splashing through a puddle on a rainy street",
    format: "portrait",
    href: communityProfile.href,
  },
  {
    // photo-1520639888713-7851133b1ed0
    id: "lacing-up",
    image: "/images/community/lacing-up.jpg",
    alt: "Hands lacing brown leather boots with denim on an outdoor stone step",
    format: "square",
    href: communityProfile.href,
  },
];
