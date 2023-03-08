import Home from "../pages/Home";
import PopularPage from "../pages/PopularMovie";
import PopularDesPage from "../pages/PopularMovie/index1";
import PopularAscPage from "../pages/PopularMovie/index2";
import PopularPeople from "../pages/PopularPeople";
import DetailMovie from "../pages/DetailMovie";
import DetailPeople from "../pages/DetailPeople";
import TopRated from "../pages/TopRated";
import UpComing from "../pages/UpComing";
import SearchPage from "../pages/SearchPage";
import Login from "../pages/Login";
import TopRatedDes from "../pages/TopRated/index1";
import TopRatedAsc from "../pages/TopRated/index2";

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
        element: <PopularDesPage/>,
        path: "/movies/popular/des"
    },
    {
        element: <PopularAscPage/>,
        path: "/movies/popular/asc"
    },
    {
        element: <TopRated/>,
        path: "/movies/top"
    },
    {
        element: <TopRatedDes/>,
        path: "/movies/top/des"
    },
    {
        element: <TopRatedAsc/>,
        path: "/movies/top/asc"
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
        element: <SearchPage/>,
        path: "/search/:keyword"
    },
    {
        element: <Login/>,
        path: "/login"
    }
];

const publicRoutes = [
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
        element: <PopularPeople/>,
        path: "/people/popular"
    },
    {
        element: <SearchPage/>,
        path: "/search/:keyword"
    },
    {
        element: <Login/>,
        path: "/login"
    }
]

const privateRoutes = [
    {
        element: <DetailMovie/>,
        path: "/movies/:id"
    },
    {
        element: <DetailPeople/>,
        path: "/people/:id"
    }
]
export {routes, publicRoutes, privateRoutes};