import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format, isSameDay } from "date-fns";
import "./comparePoliticians.css"
import "./latestNews.css"

const LatestNews = () => {
  const [newsContent, setNewsContent] = useState([]);
  const [isVisibleTableNews, setIsVisibleTableNews] = useState(false);
  const [newestNews, setNewestNews] = useState([]);
  const [olderNews, setOlderNews] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await axios.get('https://localhost:7112/api/News/NewsFeed');
      setNewsContent(response.data);
      setIsVisibleTableNews(true);

      const today = new Date();
      const lastDayNews = response.data.filter(item => isSameDay(new Date(item.dateTime), today));
      const olderDayNews = response.data.filter(item => !isSameDay(new Date(item.dateTime), today));

      setNewestNews(lastDayNews);
      setOlderNews(olderDayNews);

      console.log("Newest News", newestNews);
      console.log("Older News", olderNews);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='entirePage'>
      <h1>Latest News</h1>

      <br /><br /><br /><br />
      {isVisibleTableNews && (
        <div className="tableContainer" id="scrapeTable">
          {newestNews.length > 0 && (
            <div>
              <h2>Today's News</h2>
              <div className='newsFeedTable'>
                <table>
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Date</th>
                      <th>Text</th>
                    </tr>
                  </thead>
                  <tbody>
                    {newestNews.map((item, index) => (
                      <tr key={index}>
                        <td>{item.username}</td>
                        <td>{format(new Date(item.dateTime), "yyyy-MM-dd")}</td>
                        <td>{item.text}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {olderNews.length > 0 && (
            <div>
              <br/><br/><br/>
              <h2>Older News</h2>
              <div className='newsFeedTable'>
                <table>
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Date</th>
                      <th>Text</th>
                    </tr>
                  </thead>
                  <tbody>
                    {olderNews.map((item, index) => (
                      <tr key={index}>
                        <td>{item.username}</td>
                        <td>{format(new Date(item.dateTime), "yyyy-MM-dd")}</td>
                        <td>{item.text}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default LatestNews;
