import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import PopularPage from "./pages/PopularMovie/PopularMovie";
import DetailMovie from "./pages/DetailMovie/DetailMovie";
import PopularPeople from "./pages/PopularPeople/PopularPeople";
import DetailPeople from "./pages/DetailPeople/DetailPeople";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path="/movies/popular" element={<PopularPage/>}/>
          <Route path="/movies/:id" element={<DetailMovie/>}/>
          <Route path="/people/popular" element={<PopularPeople/>}/>
          <Route path="/people/:id" element={<DetailPeople/>}/>
        </Route>
      </Routes>
    </BrowserRouter>
      
    </div>
  );
}

export default App;
