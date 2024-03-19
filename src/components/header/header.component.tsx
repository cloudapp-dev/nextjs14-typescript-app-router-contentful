import Navbar from "@/components/header/navbar.component";

export default function Header({ menuItems }: any) {
  return (
    <header>
      {/* <DarkModeButton /> */}
      {/* <NavbarBanner /> */}
      <Navbar menuItems={menuItems} />
    </header>
  );
}
