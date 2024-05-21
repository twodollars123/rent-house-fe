import { icon } from "leaflet";

const PUBLICPOUTES = [
  {
    name: "Dashboard",
    icon: "rectangle-history-circle-user-regular",
    links: [
      { name: "Home", path: "/" },
      // shop.user_role === 1 &&
      // { name: "Sales Analytics", path: "/sales-analytics" },
      // { name: "Sellers List", path: "/sellers-list" },
      // { name: "Sellers Table", path: "/sellers-table" },
      // { name: "Sellers Grid", path: "/sellers-grid" },
      // { name: "Seller Profile", path: "/seller-profile" },
      // { name: "Revenue by Period", path: "/revenue-by-period" },
    ],
  },
  {
    name: "Quản lý bài viết",
    icon: "boxes-stacked-regular",
    links: [{ name: "Danh sách bài viết yêu thích", path: "/top-products" }],
  },
  {
    name: "Quản lý yêu cầu",
    icon: "cart-shopping-regular",
    path: "/orders",
  },
  {
    name: "Trang",
    icon: "layer-group-regular",
    links: [
      { name: "Đăng nhập", path: "/login" },
      { name: "Trang chủ", path: "/" },
      { name: "Page 404", path: "/404" },
    ],
  },
  {
    name: "Settings",
    icon: "gear-regular",
    links: [{ name: "Thông tin cá nhân", path: "/general-settings" }],
  },
];

export default PUBLICPOUTES;
