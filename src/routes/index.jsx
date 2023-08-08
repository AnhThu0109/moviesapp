import Home from "../pages/Home";
import PopularPage from "../pages/PopularMovie";
import PopularPeople from "../pages/PopularPeople";
import DetailMovie from "../pages/DetailMovie";
import DetailPeople from "../pages/DetailPeople";
import TopRated from "../pages/TopRated";
import UpComing from "../pages/UpComing";
import SearchPage from "../pages/SearchPage";
import Login from "../pages/Login";
import AllReviews from "../pages/AllReview";
import JoinUs from "../pages/JoinUs";
import NotFound from "../pages/NotFound";

const publicRoutes = [
    {
        element: <Home/>,
        path: "/"
    },
    {
        element: <SearchPage/>,
        path: "/search/movies/:keyword"
    },
    {
        element: <SearchPage/>,
        path: "/search/people/:keyword"
    },
    {
        element: <Login/>,
        path: "/login"
    },
    {
        element: <JoinUs/>,
        path: "/signup"
    },
    {
        element: <NotFound/>,
        path: "/*"
    }
]

const privateRoutes = [
    {
        element: PopularPage,
        path: "/movies/popular"
    },
    {
        element: TopRated,
        path: "/movies/top"
    },
    {
        element: UpComing,
        path: "/movies/upcoming"
    },
    {
        element: DetailMovie,
        path: "/movies/:id"
    },
    {
        element: AllReviews,
        path: "/movies/:id/allreviews"
    },
    {
        element: PopularPeople,
        path: "/people/popular"
    },
    {
        element: DetailPeople,
        path: "/people/:id"
    }
]
export {publicRoutes, privateRoutes};