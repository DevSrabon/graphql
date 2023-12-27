// import { useQuery } from "@apollo/client";
// import React, { useState } from "react";
// import { AiOutlineClose, AiOutlineMenu } from "react-icons/ai";
// import { Link, NavLink } from "react-router-dom";
// import { ME_USER } from "../graphql/query";

// const Navbar = () => {
//   const {
//     data: { user },
//     error,
//   } = useQuery(ME_USER, {
//     context: {
//       headers: {
//         authorization: localStorage.getItem("token"),
//       },
//     },
//     skip: !localStorage.getItem("token"),
//   });

//   console.log("🚀 ~ file: Navbar.jsx:10 ~ Navbar ~ user:", user, error);

//   const [nav, setNav] = useState(false);

//   const handleNav = () => {
//     setNav(!nav);
//   };

//   const navItems = [
//     { id: 1, text: "Home", path: "/" },
//     { id: 2, text: "Todo", path: "/todo" },
//     { id: 3, text: "Profile", path: "/profile" },
//     { id: 4, text: "Login", path: "/login" },
//     { id: 5, text: "Users", path: "/users" },
//   ];

//   return (
//     <div className="bg-black flex justify-between items-center h-24 max-w-full mx-auto px-4 text-white">
//       {/* Logo */}
//       <h1 className="w-full text-3xl font-bold text-[#00df9a]">REACT.</h1>

//       {/* Desktop Navigation */}
//       <ul className="hidden md:flex">
//         {navItems.map((item) =>
//           item.text === "Users" && !user?.role !== "admin" ? null : (
//             <NavLink
//               key={item.id}
//               className={({ isActive }) =>
//                 `p-4 hover:bg-[#00df9a] rounded-xl m-2 cursor-pointer duration-300 ${
//                   isActive ? "bg-[#00df9a] text-black" : "text-white"
//                 }`
//               }
//               to={item.path}
//             >
//               {item.text}
//             </NavLink>
//           )
//         )}
//       </ul>

//       {/* Mobile Navigation Icon */}
//       <div onClick={handleNav} className="block md:hidden">
//         {nav ? <AiOutlineClose size={20} /> : <AiOutlineMenu size={20} />}
//       </div>

//       {/* Mobile Navigation Menu */}
//       <ul
//         className={
//           nav
//             ? "fixed md:hidden left-0 top-0 w-[60%] h-full border-r border-r-gray-900 bg-[#000300] ease-in-out duration-500"
//             : "ease-in-out w-[60%] duration-500 fixed top-0 bottom-0 left-[-100%]"
//         }
//       >
//         {/* Mobile Logo */}
//         <h1 className="w-full text-3xl font-bold text-[#00df9a] m-4">REACT.</h1>

//         {/* Mobile Navigation Items */}
//         {navItems.map((item) => (
//           <li
//             key={item.id}
//             className="p-4 border-b rounded-xl hover:bg-[#00df9a] duration-300 hover:text-black cursor-pointer border-gray-600"
//           >
//             <Link to={item.path}>{item.text}</Link>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Navbar;
