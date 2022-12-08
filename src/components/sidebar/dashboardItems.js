import {
  ShoppingCart,
  Users,
  LogOut,
  UserCheck,
  ShoppingBag,
  Activity,
} from "react-feather";

const pagesCatalog = [
  {
    href: "/customers",
    icon: UserCheck,
    title: "Clientes",
  },
  {
    href: "/contracted_products",
    icon: ShoppingBag,
    title: "Produtos Contratados",
  },
  {
    href: "/audit",
    icon: Activity,
    title: "Auditorias",
    // badge: "8",
    // children: [
    //     {
    //       href: "/pages/profile",
    //       title: "Profile",
    //     },
    //     {
    //       href: "/pages/settings",
    //       title: "Settings",
    //     },
    //     {
    //       href: "/pages/pricing",
    //       title: "Pricing",
    //     },
    //     {
    //       href: "/pages/chat",
    //       title: "Chat",
    //     },
    //     {
    //       href: "/pages/blank",
    //       title: "Blank Page",
    //     },
    //   ],
  },
  {
    href: "/products",
    icon: ShoppingCart,
    title: "Produtos",
  },
  {
    href: "/users",
    icon: Users,
    title: "Usuários",
  },
  {
    href: "/sign_out",
    icon: LogOut,
    title: "Sair",
  },
];

const navItems = [
  {
    title: "Catálogo",
    pages: pagesCatalog,
  },
];

export default navItems;
