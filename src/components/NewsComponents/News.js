import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import "../styles/NewsComponentsStyles/News.css";

function News() {
  const [news, setNews] = useState(null);

  const getNews = async () => {
    console.log(process.env.REACT_APP_CRYPTO_NEWS_API_KEY);
    const data = await fetch(
      `https://newsapi.org/v2/everything?q=(cryptocurrency OR bitcoin OR ethereum OR crypto)&apiKey=${process.env.REACT_APP_CRYPTO_NEWS_API_KEY}&pageSize=6`,
      { method: "GET" }
    );
    const parsedData = await data.json();
    setNews(parsedData.articles);
  };

  useEffect(() => {
    getNews();

    return () => {};
  }, []);

  return (
    <div>
      <p className="news-page-header">LATEST NEWS</p>
      {news ? (
        <>
          <div className="upper-card-container">
            <NavLink
              className="card1"
              to={news[0].url}
              style={{ background: `url("${news[0].urlToImage}")` }}
            >
              {news[0].title}
            </NavLink>
            <NavLink
              className="card2"
              to={news[1].url}
              style={{ background: `url("${news[1].urlToImage}")` }}
            >
              {news[1].title}
            </NavLink>
            <NavLink
              className="card3"
              to={news[2].url}
              style={{ background: `url("${news[2].urlToImage}")` }}
            >
              {news[2].title}
            </NavLink>
          </div>
          <div className="lower-card-container">
            <NavLink
              className="card1"
              to={news[3].url}
              style={{ background: `url("${news[3].urlToImage}")` }}
            >
              {news[3].title}
            </NavLink>
            <NavLink
              className="card2"
              to={news[4].url}
              style={{ background: `url("${news[4].urlToImage}")` }}
            >
              {news[4].title}
            </NavLink>
            <NavLink
              className="card3"
              to={news[5].url}
              style={{ background: `url("${news[5].urlToImage}")` }}
            >
              {news[5].title}
            </NavLink>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
}

export default News;
