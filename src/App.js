import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import {publicRoutes, privateRoutes} from "./routes";
import PrivateRoute from "./utils/privateRoute";
import Welcome from "./parts/Welcome";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path="/welcome" element={<Welcome/>}/>
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
