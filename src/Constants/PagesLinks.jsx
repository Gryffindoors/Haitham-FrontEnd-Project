import { ProductContext } from "../APIContext/ProductContext";
import { useContext } from "react";
import { FaDiscord, FaFacebook, FaInstagram, FaReddit, FaTwitter } from "react-icons/fa";

export const otherPages = [
    { name: "Start Here", href: "#", current: false },
    { name: "Site Map", href: "#", current: false },
    { name: "Guidelines", href: "#", current: false },
    { name: "Contact Us", href: "#", current: false },
    { name: "Privacy Policy", href: "#", current: false },
    { name: "Terms & Conditions", href: "#", current: false },

];

export function useNavigation() {
    const { categories } = useContext(ProductContext);
  
    return [
      { name: "Home", href: "/" },
      { name: "Products",
        dropdown: [
          { name: "All Products", href: "/products" },
          ...categories.map((category) => ({
            name: category,
            href: `/category/${category}`,
          })),
        ],
      },
      { name: "Favourites", href: "/favourites" },
      { name: "Cart", href: "/cart" },
      { name: "ٍSignup", href: "/signup" },
      
    ];
  }

export const socialMedia = [
    { id: 1, href: "#", icon: FaTwitter, name: "Twitter"},
    { id: 2, href: "#", icon: FaFacebook, name: "Facebook"},
    { id: 3, href: "#", icon: FaInstagram, name: "Instagram"},
    { id: 4, href: "#", icon: FaReddit, name: "Reddit"},
    { id: 5, href: "#", icon: FaDiscord, name: "Discord"},
]
