import { Pagination } from "antd";
import "antd/dist/reset.css";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useParams } from 'react-router-dom';
import { fetchPage, fetchDataId } from "../../utils/fetchData";
import { KEY } from "../../utils/key";
import { POSTER_SRC } from "../../utils/posterSrc";
import "./style.css";
import { Image } from "antd";
import { showBrief, countLetter } from "../../utils/function";
import { StarFilled, ArrowLeftOutlined } from "@ant-design/icons";
import { AVATAR_SRC } from "../../utils/avatarSrc";
import { Link } from "react-router-dom";
import { getYear } from "../../utils/function";


function AllReviews() {
    const [page, setPage] = useState(1);
    const [totalReviews, setTotalReviews] = useState();
    const [reviewPoint, setReviewPoint] = useState([]);
    const [avatarSrc, setAvatarSrc] = useState([]);
    const [isShowRest, setShowRest] = useState(false);
    const [movie, setMovie] = useState();
    const [posterSrc, setPosterSrc] = useState();
    const { id } = useParams();

    const onChange = (p) => {
        setPage(p);
    }

    const getReview = async (id) => {
        const data = await fetchPage(
            1,
            `/movie/${id}/reviews?`,
            "&language=en-US&"
        );
        if (data) {
            let allReviews = [];
            let point = [];
            let avatar = [];
            for (let i = 1; i <= data.total_pages; i++) {
                const response = await fetchPage(
                    i,
                    `/movie/${id}/reviews?`,
                    "&language=en-US&"
                );
                allReviews = allReviews.concat(response?.results);
            }
            console.log("review", allReviews);
            allReviews.map(item => {
                point.push(item?.author_details?.rating?.toFixed(1));
                if (item?.author_details?.avatar_path == null) {
                    avatar.push("https://cdn-icons-png.flaticon.com/512/1177/1177568.png");
                } else {
                    if (item?.author_details?.avatar_path.includes("http")) {
                        avatar.push(item?.author_details?.avatar_path?.substring(1));
                    } else {
                        avatar.push(AVATAR_SRC + item?.author_details?.avatar_path);
                    }
                }
            })
            setAvatarSrc(avatar);
            setReviewPoint(point);
            setTotalReviews(allReviews);
        }
    };

    const getMovieById = async (id) => {
        const json = await fetchDataId(id, "/movie/", `?${KEY}&language=en-US`);
        if (json) {
            console.log(json);
            setMovie(json);
            let imageSrc = "";
            if (json?.poster_path == null) {
                imageSrc = "https://img.lovepik.com/element/40021/7866.png_1200.png";
            }
            else {
                imageSrc = `${POSTER_SRC}` + json?.poster_path;
            }
            console.log(imageSrc);
            setPosterSrc(imageSrc);
        }
    };

    useEffect(() => {
        console.log(id)
        getReview(id).catch(e => console.log(e));
        getMovieById(id).catch(e => console.log(e));
    }, [page]);

    return (
        <div>
            <div className="backMenu py-3 px-sm-3 px-lg-5 row">
                <div className="col-sm-2 col-lg-1 ps-4">
                    <Image src={posterSrc} className="rounded-2"></Image>
                </div>
                <div className="col text-white">
                    <h1><span className="fw-bolder">{movie?.title}</span> <span className="fw-lighter">({getYear(movie?.release_date)})</span></h1>
                    <Link to={`/movies/${id}`} className="text-decoration-none text-white"><ArrowLeftOutlined /> Back to main</Link>
                </div>
            </div>
            <div className="p-sm-3 p-lg-5 mx-3">
                {
                    totalReviews?.map((item, index) => (
                        <div key={index} className="reviewShow p-3 mb-4 rounded-4 row">
                            <div className="mx-3 col-sm-2 col-lg-1">
                                <Image src={avatarSrc[index]} className="rounded-circle avatarImg"></Image>
                            </div>
                            <div className="me-3 col">
                                <h5 className="firstReview">A review by {item?.author} <span className="bg-black text-white rounded-3 px-2"><StarFilled className="starIcon" />{reviewPoint[index]}</span></h5>
                                <p className="fw-lighter text-black-50">Written by <b>{item?.author}</b> on {item?.created_at}</p>
                                {
                                    countLetter(item?.content) > 500 ? (
                                        <>
                                            {
                                                isShowRest == false ? (
                                                    <p className="reviewContent">{showBrief(item?.content, 500)} <Link onClick={() => setShowRest(true)}>Read the rest.</Link></p>
                                                ) : (
                                                    <p className="reviewContent">{item?.content} <Link onClick={() => setShowRest(false)}>Hide the rest.</Link></p>
                                                )
                                            }
                                        </>
                                    ) : (
                                        <p className="reviewContent">{item?.content}</p>
                                    )
                                }
                            </div>
                        </div>
                    ))
                }
            </div>

            <Pagination
                defaultCurrent={1}
                total={totalReviews?.length}
                pageSize={20}
                onChange={onChange} className="text-center"
                showSizeChanger={false}
            />
        </div>
    );
}

export default AllReviews;