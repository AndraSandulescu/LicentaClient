import React, { Component } from 'react';
import axios from 'axios';


// de exemplu, acest button ar trb sa fie intr-un fisier separat, in folderul components si sa fie inclus aici si folosit
//      sa nu fie tot codul aici
class MyButton extends Component {
  handleClick() {
    alert('You clicked meee!');
    axios.get('https://api.npms.io/v2/search?q=react')
      .then(response => {
        // Process the response data here
        console.log(response.data);
      })
      .catch(error => {
        // Handle any errors that occurred during the request
        console.error(error);
      });
  }

  // getSearchResultsClick(){

  //   const headers = {

  //   };
  //   axios.get('https://localhost:7112/api/Search/SearchScript',{headers})
  //   .then(response => {
  //       // Process the response data here
  //       console.log(response.data);
  //       console.log(response.data[0].tweetId);
  //   })
  //   .catch(error => {
  //       // Handle any errors that occurred during the request
  //       console.error(error);
  //   });
  // }

  getScrapedTweets(){

    const headers = {
    };
    axios.get('https://localhost:7112/api/Search/SearchScript?text=covid&username=JoeBiden&until=2022-02-02&since=2020-02-02&retweet=n&replies=n&count=10',{headers})
    .then(response => {
        // Process the response data here
        console.log(response.data);
        console.log(response.data[0].tweetId);
    })
    .catch(error => {
        // Handle any errors that occurred during the request
        console.error(error);
    });
  }

  render() {
    return (
        <div>
            <p>
                <button onClick={this.handleClick}>Print to console a json</button>
            </p>
            {/* <p>
                <button onClick={this.getSearchResultsClick}>Search from licenta</button>
            </p> */}
            <p>
                <button onClick={this.getScrapedTweets}>Scrape!!</button>
            </p>
        </div>
    );
  }
}

class About extends Component {
  render() {
    return (
      <div>
        <h1>
          GeeksforGeeks is a Computer
          Science portal for geeks.
        </h1>
        <MyButton />
      </div>
    );
  }
}

export default About;
