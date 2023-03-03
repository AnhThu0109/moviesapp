import Home from "../pages/Home";
import PopularPage from "../pages/PopularMovie/PopularMovie";
import PopularPeople from "../pages/PopularPeople/PopularPeople";
import DetailMovie from "../pages/DetailMovie/DetailMovie";
import DetailPeople from "../pages/DetailPeople/DetailPeople";
import Layout from "../pages/Layout";
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
    }
];
export default routes;