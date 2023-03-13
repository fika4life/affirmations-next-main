import Navbar from "./Navbar";

export default function Layout({ children }) {
  return (
    <>
      <Navbar></Navbar>
      <main className="container mx-auto">{children}</main>
    </>
  );
}
