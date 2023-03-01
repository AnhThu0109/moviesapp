import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import PopularPage from "./pages/Popular";
import DetailMovie from "./pages/DetailMovie";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path="/popular" element={<PopularPage/>}/>
          <Route path="/movies/:id" element={<DetailMovie/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
      
    </div>
  );
}

export default App;
