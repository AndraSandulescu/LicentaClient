
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { format, isSameDay } from "date-fns";
import { MDBRow, MDBCol } from 'mdb-react-ui-kit';
import "./centralizedStyling.css"

const LatestNews = () => {
  // const [newsContent, setNewsContent] = useState([]);
  const [newsContent, setNewsContent] = useState({ results: [], topSubjects: [] });

  const [isVisibleTableNews, setIsVisibleTableNews] = useState(false);
  const [newestNews, setNewestNews] = useState([]);
  const [olderNews, setOlderNews] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const token = localStorage.getItem('access_token'); // Replace with your actual bearer token
      const headers = {
          Authorization: `Bearer ${token}`
      };
      const response = await axios.get('https://localhost:7112/api/News/NewsFeed',{

          headers: headers 
      });
      setNewsContent(response.data);
      setIsVisibleTableNews(true);

      const today = new Date();
      const lastDayNews = response.data.results.filter(item => isSameDay(new Date(item.dateTime), today));
      const olderDayNews = response.data.results.filter(item => !isSameDay(new Date(item.dateTime), today));

      setNewestNews(lastDayNews);
      setOlderNews(olderDayNews);

      // console.log("Newest News", newestNews);
      // console.log("Older News", olderNews);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className='entirePage'>
      <h1>Latest News</h1>
      <br /><br /><br /><br />
      <MDBRow className='justify-content-center'>
        <MDBCol md='2'>
          {/* Conținut coloană stânga */}
          {newsContent.topSubjects.length > 0 && (
            <div className='topSubjectsList'>
              <h2>This Week's Subjects</h2>
              <ul>
                {newsContent.topSubjects.map((subject, index) => (
                  <li key={index}>{subject}</li>
                ))}
              </ul>
            </div>
          )}
        </MDBCol>

        <MDBCol md='8'>
          {/* Conținut feed */}
          {isVisibleTableNews && (
            <div className="newsTableContainer">
              {newestNews.length > 0 && (
                <div>
                  <h3>Today's News</h3>
                  {newestNews.map((item, index) => (
                    <div className="tweet" key={index}>
                      <div className="tweetHeader">
                        {/* <img className="userAvatar" src={item.avatarUrl} alt={item.username} /> */}
                        <div className="userInfo">
                          <span className="username">{item.username}</span>
                          <span className="timestamp">{format(new Date(item.dateTime), "yyyy-MM-dd")}</span>
                        </div>
                      </div>
                      <div className="tweetContent">
                        <p>{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {olderNews.length > 0 && (
                <div>
                  <br /><br /><br />
                  <h3>Older News</h3>
                  {olderNews.map((item, index) => (
                    <div className="tweet" key={index}>
                      <div className="tweetHeader">
                        {/* <img className="userAvatar" src={item.avatarUrl} alt={item.username} /> */}
                        <div className="userInfo">
                          <span className="username">{item.username}</span>
                          <span className="timestamp">{format(new Date(item.dateTime), "yyyy-MM-dd")}</span>
                        </div>
                      </div>
                      <div className="tweetContent">
                        <p>{item.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}


            </div>
          )}

        </MDBCol>

        <MDBCol md='2'>
          {/* Conținut coloană dreaptă */}
        </MDBCol>
      </MDBRow>
    </div>
  );



}

export default LatestNews;
