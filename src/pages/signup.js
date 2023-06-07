import React, { Component } from 'react';
import axios from 'axios';

//facem login, preluam token si il punem in local storage
class LoginButton extends Component {

  getSearchResultsClick() {

    const headers = {};

    const data = {
      nickname: 'admin',
      password: 'admin'
    };

    //daca bagi credentiale gresite o sa primesti raspuns de eroare cu codul 401, request failed. 
    // Ar trb schimbat pe server, sa trimita un raspuns cu cod 200 (request succes) dar sa contina un raspuns care sa sugereze 
    //ca credentialele au fost gresite
    axios.post('https://localhost:7112/api/Login', data, { headers })
      .then(response => {
        // Process the response data here
        console.log(response.data);
        localStorage.setItem('acces_token', response.data.token);
        localStorage.setItem('user_id', response.data.user_id); // Stocati ID-ul unic al utilizatorului

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
          <button onClick={this.getSearchResultsClick}>Log In</button>
        </p>
      </div>
    );
  }
}

//luam  token din local storage, il adaugam la  headers si facem requestul cu el. Acum suntem autentificati
class UseTokenExampleButton extends Component {

  getSearchResultsClick() {
    
    const token = localStorage.getItem('acces_token');
    const headers = {
      Authorization: `Bearer ${token}`
    };

    axios.get('https://localhost:7112/api/Login/test', { headers })
      .then(response => {
        // Process the response data here
        console.log(response.data);

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
          <button onClick={this.getSearchResultsClick}>Test token</button>
        </p>
      </div>
    );
  }
}

class SignUp extends Component {
  render() {
    return (
      <div>
        <h1>Sign Up Successful</h1>
        <LoginButton />
        <UseTokenExampleButton />
      </div>
    );
  }
}

export default SignUp;
