import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import routes from "./routes";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
      <Route path="/" element={<Layout/>}>
        {routes.map((item, index) => {
          return <Route key={index} path={item.path} element={item.element}/>
        })}
      </Route>
      </Routes>
    </BrowserRouter>      
    </div>
  );
}

export default App;
