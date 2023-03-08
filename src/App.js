import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import {routes, publicRoutes, privateRoutes} from "./routes";
import PrivateRoute from "./utils/privateRoute";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Layout/>}>
        {routes.map((item, index) => {
          return <Route key={index} path={item.path} element={item.element}/>
        })}
        {/* {publicRoutes.map((item, index) => {
          return <Route key={index} path={item.path} element={item.element}/>
        })}
        {privateRoutes.map((item, index) => {
          return <PrivateRoute parentIndex={index} parentPath={item.path} parentElement={item.element}></PrivateRoute>
        })} */}
      </Route>
      </Routes>
    </BrowserRouter>      
    </div>
  );
}

export default App;
