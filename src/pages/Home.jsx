import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Trending from "../parts/Trending";
import Popular from "../parts/Popular";
import Banner from "../parts/Banner/Banner";
import UpComing from "../parts/UpComing";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style.css";
import { Skeleton } from "@mui/material";
import { LatestTrailer } from "../parts/LatestTrailer";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const loadingState = useSelector((state) => state.loading.value);

  useEffect(() => {
    setIsLoading(true);
    if (
      loadingState.isLoadingBanner === false &&
      loadingState.isLoadingTrending === false &&
      loadingState.isLoadingPopular === false &&
      loadingState.isLoadingUpComing === false 
    ) {
      setIsLoading(false);
    }
  }, []);

  return (
    <>
      {isLoading ? (
        <>
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
        </>
      ) : (
        <div className="container">
          <Banner />
          <Trending />
          {/* <div>
            <LatestTrailer/>
          </div> */}
          <Popular />
          <UpComing />
        </div>
      )}
    </>
  );
};

export default Home;
