import React, { Component } from 'react';
import '../style/Header.css'

import { Link } from 'react-router-dom';
import axios from 'axios';

import Cookies from 'universal-cookie';
const cookies = new Cookies();

class Header extends Component {
    constructor(){
        super();
        this.state = {
            cookie: '',
            dynamic_Class: 'navbar navbar-expand-md fixed-top',
            dynamic_height: '80px',
            logo: require('../img/movietimecom-transparent-crop.png'),
            email: '',
            password: ''
        }
    }

    componentWillMount(){
        //Check cookies
        let cookiePeramban = cookies.get('MOVIETIME_SESSID')
        // console.log(cookiePeramban)
        
        var url = 'http://localhost:5001/cookie';
        axios.post(url, {
            cookieMovietime: cookiePeramban,
        })
        .then((response) => {
            if (response.data.kode == '001'){
                this.setState({
                    cookie: true,
                })
            }
            else if (response.data.kode == '002'){
                this.setState({
                    cookie: false,
                })
            }
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    componentDidMount() {
        document.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                this.setState({
                    dynamic_Class: 'navbar navbar-expand-md fixed-top shrink',
                    dynamic_height: '25px',
                    logo: require('../img/movietimecom-transparent-crop-vertical.png'),
                })
            }
            else if (window.scrollY < 50) {
                this.setState({
                    dynamic_Class: 'navbar navbar-expand-md fixed-top',
                    dynamic_height: '80px',
                    logo: require('../img/movietimecom-transparent-crop.png'),
                })
            }
        });

        let cookiePeramban = cookies.get('MOVIETIME_SESSID')
        var urlProfile = 'http://localhost:5001/myprofile';
        axios.post(urlProfile, {
            cookie: cookiePeramban,
        })
        .then((response) => {
            this.setState({
                email: response.data[0].email,
            })
        })
        .catch(function (error) {
            console.log(error);
        });
    }

    login(){
        var url = 'http://localhost:5001/login';
        axios.post(url, {
          email: this.refs.emaillogin.value,
          password: this.refs.passwordlogin.value
        })
        .then((response) => {
          if (response.data.kode == '001'){
            cookies.set('MOVIETIME_SESSID', response.data.session_id, {path: '/', expires: new Date(Date.now()+86400000)})

            this.setState({
                email:this.refs.emaillogin.value,
                password:this.refs.passwordlogin.value,
                cookie: true
            });

            window.location.reload()
            // console.log(`Berhasil login + session + cookie: ${this.state.cookie}`)
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }

    register(){
        var url = 'http://localhost:5001/register';
        axios.post(url, {
          email: this.refs.emailregister.value,
          password: this.refs.passwordregister.value,
          passwordConfirm: this.refs.passwordregisterconfirm.value
        })
        .then((response) => {
        //   console.log(`Ini response register: ${response.data}`);
          if (response.data.kode == '001'){
            cookies.set('MOVIETIME_SESSID', response.data.session_id, {path: '/', expires: new Date(Date.now()+86400000)})

            this.setState({
                email:this.refs.emailregister.value,
                password:this.refs.passwordregister.value,
                passwordconfirm:this.refs.passwordregisterconfirm.value,
                cookie: true
            });

            window.location.reload()
            // console.log(`Ini setelah berahasil register ${this.state.email}`)
          }
        })
        .catch((error) => {
          console.log(error);
        });
    };

    signOut(){
        console.log(`Tes tombol logout jalan ga abis loghin`)
        let cookiePeramban = cookies.get('MOVIETIME_SESSID')
        console.log(cookiePeramban)

        var url = 'http://localhost:5001/signout';
        axios.post(url, {
          cookieMovietime: cookiePeramban,
        })
        .then((response) => {
          console.log(response);
          if (response.data.kode == '001'){
            cookies.remove('MOVIETIME_SESSID')
          }
          window.location.reload()
        })
        .catch((error) => {
          console.log(error);
        });
    }

  render() {
        // Tampilan jika sudah login
        if (this.state.cookie == true){
            return  (
                <div className="HEADER">
                    <nav className={this.state.dynamic_Class} id="banner">
                        <div className="container">
                            <Link to="/"><img src={this.state.logo} alt="" height={this.state.dynamic_height}/></Link>
                        </div>

                        <div class="dropdown ">
                            <button class="btn btn-warning dropdown-toggle" type="button" id="dropdownMenu2" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                {this.state.email}
                            </button>
                            <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenu2">
                            <Link to="/profile"><button class="dropdown-item" type="button">My Profile</button></Link>
                            <button className="dropdown-item" onClick={()=> this.signOut()}>Log Out</button>
                            </div>
                        </div>
                    </nav>
            </div>
            )
        }

    // Tampilan jika belum login
    return (
      <div className="HEADER">
            <nav className={this.state.dynamic_Class} id="banner">
                <div className="container">
                    <Link to="/"><img src={this.state.logo} alt="" height={this.state.dynamic_height}/></Link>
                </div>

                <ul class="nav navbar-nav navbar-right">
                    <li class="dropdown">
                        <button className="btn btn-warning mt-btn my-2 my-sm-0 dropdown-toggle" data-toggle="dropdown">LOG IN<span class="caret"></span></button>
                        
                        <ul id="login-dp" class="dropdown-menu dropdown-menu-right">
                            <li>
                                <div class="row">
                                    <div class="col-md-12">
                                        {/* Login via
                                        <div class="social-buttons">
                                            <a href="#" class="btn btn-fb"><i class="fa fa-facebook"></i> Facebook</a>
                                            <a href="#" class="btn btn-tw"><i class="fa fa-twitter"></i> Twitter</a>
                                        </div>
                                        or */}
                                        {/* <form class="form" role="form" method="post" action="login" accept-charset="UTF-8" id="login-nav"> */}
                                        {/* <form class="form" role="form" accept-charset="UTF-8" id="login-nav"> */}
                                        {/* <form>
                                                <div class="form-group">
                                                    <label class="sr-only" for="exampleInputEmail2">Email address</label>
                                                    <input ref='emaillogin' type="email" class="form-control" id="exampleInputEmail2" placeholder="Email address" required />
                                                </div>
                                                <div class="form-group">
                                                    <label class="sr-only" for="exampleInputPassword2">Password</label>
                                                    <input ref='passwordlogin' type="password" class="form-control" id="exampleInputPassword2" placeholder="Password" required />
                                                </div>
                                                <div class="form-group">
                                                    <button class="btn btn-primary btn-block" onClick={()=> {this.login();}}>LOG IN</button>
                                                </div>
                                        </form> */}

                                        <div>
                                                <label class="sr-only" for="exampleInputEmail2">Email address</label>
                                                <input ref='emaillogin' type="email" class="form-control" id="exampleInputEmail2" placeholder="Email address" required />
                                                <label class="sr-only" for="exampleInputPassword2">Password</label>
                                                <input ref='passwordlogin' type="password" class="form-control" id="exampleInputPassword2" placeholder="Password" required />
                                                <button class="btn btn-primary btn-block" onClick={()=> {this.login();}}>LOG IN</button>
                                        </div>

                                    </div>
                                    <div class="bottom text-center">
                                        New here ? <a href="#" data-toggle="modal" data-target="#registerModal"><b>Join Us</b></a>
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </li>
                </ul>
            </nav>

            {/* Modal */}
            <div class="modal fade" id="registerModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalCenterTitle">SIGN UP</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    <input ref='emailregister' type='text' placeholder=' Email' ref="emailregister" />
                    <br />
                    <br />
                    <input ref='passwordregister' type='password' placeholder=' Password' ref="passwordregister" />
                    <br />
                    <br />
                    <input ref='passwordregisterconfirm' type='password' placeholder=' Confirm Pasword' ref="passwordregisterconfirm" />
                    <br/>
                    <br/>
                    <button type="button" class="btn btn-primary" onClick={()=> {this.register();}}>SIGN UP</button>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                </div>
                </div>
            </div>
            </div>
      </div>
    );
  }
}

export default Header;
// export default connect(null, {email, password})(Header);

