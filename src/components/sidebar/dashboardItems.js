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
    href: "/clientes",
    icon: UserCheck,
    title: "Clientes",
  },
  {
    href: "/produtos_contratados",
    icon: ShoppingBag,
    title: "Produtos Contratados",
  },
  {
    href: "/auditoria",
    icon: Activity,
    title: "Auditorias",
  },
  {
    href: "/produtos",
    icon: ShoppingCart,
    title: "Produtos",
  },
  {
    href: "/usuarios",
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
