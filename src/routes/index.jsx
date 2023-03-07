import Home from "../pages/Home";
import PopularPage from "../pages/PopularMovie";
import PopularPeople from "../pages/PopularPeople";
import DetailMovie from "../pages/DetailMovie";
import DetailPeople from "../pages/DetailPeople";
import TopRated from "../pages/TopRated";
import UpComing from "../pages/UpComing";
import SearchPage from "../pages/SearchPage";
import Login from "../pages/Login";
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
        element: <TopRated/>,
        path: "/movies/top"
    },
    {
        element: <UpComing/>,
        path: "/movies/upcoming"
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
    },
    {
        element: <SearchPage/>,
        path: "/search/:keyword"
    },
    {
        element: <Login/>,
        path: "/login"
    }
];
export default routes;