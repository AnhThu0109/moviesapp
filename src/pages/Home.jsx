import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import Trending from "../parts/Trending";
import Popular from "../parts/Popular";
import Banner from "../parts/Banner/Banner";
import UpComing from "../parts/UpComing";
import "bootstrap/dist/css/bootstrap.min.css";
import "../style.css";
import { Skeleton } from "@mui/material";

const Home = () => {
  const [isLoading, setIsLoading] = useState(false);
  const loadingState = useSelector((state) => state.loading.value);

  useEffect(() => {
    // debugger;
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
        <>
          <Banner />
          <Trending />
          <Popular />
          <UpComing />
        </>
      )}
    </>
  );
};

export default Home;
