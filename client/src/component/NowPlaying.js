import React, { Component } from 'react';
import '../style/NowPlaying.css';

import { Link } from 'react-router-dom';
import axios from 'axios'

class NowPlaying extends Component {
    constructor() {
        super();
        this.state = {
            movie1: '299536',
            movie2: '353486',
            movie3: '402900',
            moviePoster1: '',
            moviePoster2: '',
            moviePoster3: '',
            movieTitle1: '',
            movieTitle2: '',
            movieTitle3: '',

        }
    }

    componentDidMount(){
        axios.get(`https://api.themoviedb.org/3/movie/${this.state.movie1}/images?api_key=5c494406a56ba5a1cce62329a3880c81&language=en-US&include_image_language=en%2Cnull`)
        .then((ambilData) => {
            this.setState({
                moviePoster1: `https://image.tmdb.org/t/p/original${ambilData.data.posters[0].file_path}`,
            })
        })
        axios.get(`https://api.themoviedb.org/3/movie/${this.state.movie1}?api_key=5c494406a56ba5a1cce62329a3880c81&language=en-US`)
        .then((ambilData) => {
            this.setState({
                movieTitle1: ambilData.data.original_title,
            })
        })

        axios.get(`https://api.themoviedb.org/3/movie/${this.state.movie2}/images?api_key=5c494406a56ba5a1cce62329a3880c81&language=en-US&include_image_language=en%2Cnull`)
        .then((ambilData) => {
            this.setState({
                moviePoster2: `https://image.tmdb.org/t/p/original${ambilData.data.posters[0].file_path}`,
            })
        })
        axios.get(`https://api.themoviedb.org/3/movie/${this.state.movie2}?api_key=5c494406a56ba5a1cce62329a3880c81&language=en-US`)
        .then((ambilData) => {
            this.setState({
                movieTitle2: ambilData.data.original_title,
            })
        })

        axios.get(`https://api.themoviedb.org/3/movie/${this.state.movie3}/images?api_key=5c494406a56ba5a1cce62329a3880c81&language=en-US&include_image_language=en%2Cnull`)
        .then((ambilData) => {
            this.setState({
                moviePoster3: `https://image.tmdb.org/t/p/original${ambilData.data.posters[0].file_path}`,
            })
        })
        axios.get(`https://api.themoviedb.org/3/movie/${this.state.movie3}?api_key=5c494406a56ba5a1cce62329a3880c81&language=en-US`)
        .then((ambilData) => {
            this.setState({
                movieTitle3: ambilData.data.original_title,
            })
        })
    }

  render() {
    return (
      <div className="NOWPLAYING">
        <div className="mt-nowplaying-title">
            <h1 align="center">NOW PLAYING</h1>
        </div>

        <div className="card-deck">
            <div className="card">
                <img className="card-img-top" src={this.state.moviePoster1} alt="Card image cap" /> 
                <div className="card-body">
                    <h5 className="card-title">{this.state.movieTitle1}</h5>
                    <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>                
                    <Link to={this.state.movie1}><button className="btn btn-warning mt-btn my-2 my-sm-0" type="submit">BUY TICKET</button></Link>                
                </div>
            </div>
            <div className="card">
                <img className="card-img-top" src={this.state.moviePoster2} alt="Card image cap" />
                <div className="card-body">
                    <h5 className="card-title">{this.state.movieTitle2}</h5>
                    <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                    <Link to={this.state.movie2}><button className="btn btn-warning mt-btn my-2 my-sm-0" type="submit">BUY TICKET</button></Link>                
                </div>
            </div>
            <div className="card">
                <img className="card-img-top" src={this.state.moviePoster3} alt="Card image cap" />
                <div className="card-body">
                    <h5 className="card-title">{this.state.movieTitle3}</h5>
                    <br />
                    <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>                
                    <Link to={this.state.movie3}><button className="btn btn-warning mt-btn my-2 my-sm-0" type="submit">BUY TICKET</button></Link>          
                </div>
            </div>
        </div>
      </div>
    );
  }
}

export default NowPlaying;
