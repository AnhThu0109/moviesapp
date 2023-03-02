import "bootstrap/dist/css/bootstrap.min.css";
import "../style.css";
import Trending from "../parts/Trending";
import Popular from "../parts/Popular";
import Banner from "../parts/Banner/Banner";

const Home = () => {
  return (
    <>
      <Banner/>
      <Trending />
      <Popular />
    </>
  );
};

export default Home;
