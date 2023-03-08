import { BASE_URL } from "./api";
import { KEY } from "./key";

const fetchData = async (url) => {
    const data = await fetch(
      `${url}`
    );
    const json = await data.json();
    return json;
  };

const fetchDataId = async (id, p, q) => {
    const data = await fetch(
      `${BASE_URL}${p}${id}${q}`
    );
    const json = await data.json();
    return json;
  };

const fetchPage = async (page=1, q, p) => {
    const data = await fetch(
      `${BASE_URL}${q}${KEY}${p}${page}`
    );
    const json = await data.json();
    return json;
  };

const fetchPageSort = async (page=1, q, p, k) => {
    const data = await fetch(
      `${BASE_URL}${q}${KEY}${p}${page}${k}`
    );
    const json = await data.json();
    return json;
  };

export {fetchData, fetchDataId, fetchPage, fetchPageSort};