import { icon } from "leaflet";

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
    name: "Quản lý bài viết",
    icon: "boxes-stacked-regular",
    links: [
      { name: "Top Posts", path: "/top-products" },
      { name: "Posts Management", path: "/posts-management" },
      { name: "Post Editor", path: "/post-editor" },
    ],
  },
  {
    name: "Quản lý yêu cầu",
    icon: "cart-shopping-regular",
    path: "/orders",
  },
  {
    name: "Quản lý tài khoản",
    icon: "chart-user-regular",
    path: "/accounts",
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
