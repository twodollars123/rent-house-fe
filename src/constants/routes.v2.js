const ROUTESV2 = [
  {
    name: "Dashboard",
    icon: "rectangle-history-circle-user-regular",
    links: [
      { name: "Sales Analytics", path: "/" },
      { name: "Sellers List", path: "/sellers-list" },
      { name: "Sellers Table", path: "/sellers-table" },
      { name: "Sellers Grid", path: "/sellers-grid" },
      { name: "Seller Profile", path: "/seller-profile" },
      { name: "Revenue by Period", path: "/revenue-by-period" },
    ],
  },
  {
    name: "Posts",
    icon: "boxes-stacked-regular",
    links: [
      { name: "Top Posts", path: "/top-products" },
      { name: "Posts Management", path: "/posts-management" },
      { name: "Post Editor", path: "/post-editor" },
    ],
  },
  {
    name: "Orders",
    icon: "cart-shopping-regular",
    path: "/orders",
  },
  {
    name: "Customers",
    icon: "chart-user-regular",
    path: "/customers",
  },

  {
    name: "Pages",
    icon: "layer-group-regular",
    links: [
      { name: "Login", path: "/login" },
      { name: "Home", path: "/" },
      { name: "Page 404", path: "/404" },
    ],
  },
  {
    name: "Settings",
    icon: "gear-regular",
    links: [{ name: "General Settings", path: "/general-settings" }],
  },
];

export default ROUTESV2;