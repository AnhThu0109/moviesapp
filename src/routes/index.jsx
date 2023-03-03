import Home from "../pages/Home";
import PopularPage from "../pages/PopularMovie";
import PopularPeople from "../pages/PopularPeople";
import DetailMovie from "../pages/DetailMovie";
import DetailPeople from "../pages/DetailPeople";
import TopRated from "../pages/TopRated";
const routes = [
    {
        element: <Home/>,
        path: "/"
    },
    {
        element: <PopularPage/>,
        path: "/movies/popular"
    },
    {
        element: <DetailMovie/>,
        path: "/movies/:id"
    },
    {
        element: <PopularPeople/>,
        path: "/people/popular"
    },
    {
        element: <DetailPeople/>,
        path: "/people/:id"
    },
    {
        element: <TopRated/>,
        path: "/movie/top"
    }
];
export default routes;