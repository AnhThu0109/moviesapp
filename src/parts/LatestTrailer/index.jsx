import { useEffect, useState } from "react";
import { fetchPage } from "../../utils/fetchData";
import { formatDate } from "../../utils/function";

export const LatestTrailer = () =>{
    const [data, setData] = useState();
    const getData = async () => {
        debugger;
        const today = formatDate(new Date());
            const json = await fetchPage(
              1,
              "/discover/movie?",
              `&language=en-US&sort_by=primary_release_date.asc&primary_release_date.gte=${today}&primary_release_date.lte=${today}&page=`
            );
            if (json) {
              setData(json);
              let detailLinkArr = [];
              json.results.map((item) => {
                detailLinkArr.push(`/movies/${item.id}`);
              });
            }
      };

      useEffect(() => {
        getData()
      }, [])
    return(
        <></>
    )
}