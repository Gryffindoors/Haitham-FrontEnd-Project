import React, { useContext } from "react";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { ProductContext } from "../APIContext/ProductContext";
import { NavLink } from "react-router-dom";

export default function CategoryDropdown() {
  const { categories } = useContext(ProductContext);

  return (
    <Menu as="div" className="relative inline-block text-left">
      <MenuButton className="flex items-center space-x-2 rounded-md px-3 py-2 text-gray-800 dark:text-gray-300 hover:bg-gray-700 hover:text-white dark:hover:bg-gray-600 dark:hover:text-gray-100">
        <span>Categories</span>
        <ChevronDownIcon className="size-5" />
      </MenuButton>

      <MenuItems className="absolute left-0 z-10 mt-2 w-48 rounded-md bg-white py-2 shadow-lg ring-1 ring-black/5 dark:bg-gray-800">
        <MenuItem>
          <NavLink
            to="/products"
            className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            All Products
          </NavLink>
        </MenuItem>
        <div className="border-t border-gray-200 dark:border-gray-600"></div>
        {categories.map((category) => (
          <MenuItem key={category}>
            <NavLink
              to={`/category/${category}`}
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-200 dark:text-gray-300 dark:hover:bg-gray-700"
            >
              {category}
            </NavLink>
          </MenuItem>
        ))}
      </MenuItems>
    </Menu>
  );
}
