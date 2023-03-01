import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Popular from "./pages/Popular";


function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route index element={<Home/>}/>
          <Route path="/popular" element={<Popular/>}/>
          {/* <Route path="portfolio" element={<Portfolio/>}/>
          <Route path="contact" element={<Contact/>}/>
          <Route path="establish" element={<Establish/>}/>
          <Route path="/events" element={<Events/>}/>
          <Route path="/board" element={<Board/>}/> */}
        </Route>
      </Routes>
    </BrowserRouter>
      
    </div>
  );
}

export default App;
