import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./pages/Layout";
import Login from "./pages/Login";
import PopularPage from "./pages/PopularMovie";
import {publicRoutes, privateRoutes} from "./routes";
import PrivateRoute from "./utils/privateRoute";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Layout/>}>
        {publicRoutes.map((item, index) => {
          return <Route key={index} path={item.path} element={item.element}/>
        })}

        {privateRoutes.map((item, index) => {
          return (
            <Route 
              key={index}
              path={item.path}
              element={<PrivateRoute Component={item.element} />}
            />
          );
        })}       
      </Route>
      </Routes>
    </BrowserRouter>      
    </div>
  );
}

export default App;
