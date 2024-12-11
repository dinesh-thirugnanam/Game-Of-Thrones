import React from "react";
import HboIntro from "./components/HboIntro";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Hero from "./components/Hero";
import Test from "./components/Test";
import Stark from "./components/Stark";
import Lannister from "./components/Lannister";
import Targaryen from "./components/Targaryen";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Test />,
    },
    {
        path: "/test",
        element: <Test />,
    },
    {
        path: "/stark",
        element: <Stark />,
    },
    {
        path: "/lannister",
        element: <Lannister />,
    },
    {
        path: "/targaryen",
        element: <Targaryen />,
    },
]);

const App = () => {
  
  return (
    <>
    <div className="w-screen h-screen overflow-hidden bg-black">
      <RouterProvider router={router} />
    </div>
    </>
  );
};

export default App;
