import { Outlet } from "react-router";
import Navbar from "../Components/Navbar";

const Main = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default Main;
