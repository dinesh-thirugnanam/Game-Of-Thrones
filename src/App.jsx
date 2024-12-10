import React from "react";
import HboIntro from "./components/HboIntro";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Hero from "./components/Hero";
import Test from "./components/Test";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Hero />,
    },
    {
        path: "/test",
        element: <Test />,
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
