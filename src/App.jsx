import React, { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
const Main = React.lazy(() => import("./pages/Main"));
const NotFound = React.lazy(() => import("./pages/NotFound"));
import NavBar from "./components/NavBar";

function App() {
  return (
    /*====================
    REACT ROUTER LOGIC FOR MAIN, XXXXX AND NOT FOUND PAGES
    ====================*/
    <>
      <Suspense fallback={<h1>loading...</h1>}>
        <NavBar></NavBar>
        <Routes>
          <Route path="/" element={<Navigate replace to="/main" />} />
          <Route path="main" element={<Main />} />
          {/* <Route path="main" element={<Main2 />} /> */}
          {/* <Route path="main" element={<Main3 />} /> */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </>
  );
}

export default App;
