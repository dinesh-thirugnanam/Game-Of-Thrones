import React from "react";
import HboIntro from "./components/HboIntro";
import { createBrowserRouter, RouterProvider } from "react-router-dom";


const router = createBrowserRouter([
  {
    path: "/",
    element: <HboIntro />
  },
  {
    path: "/test",
    element: <HboIntro />
  }
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
