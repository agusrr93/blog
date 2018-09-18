<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top">
      <div class="container">
        <a class="navbar-brand" href="#">Blogger Overflow</a>
        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarResponsive">
          <ul class="navbar-nav ml-auto">
            <li class="nav-item">
              <a class="nav-link" href="#">Home</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-toggle="modal" href="#loginmodal" v-if="!token">Login</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-toggle="modal" href="#registermodal" v-if="!token">Register</a>
            </li>
            <li class="nav-item">
              <a class="nav-link" data-toggle="modal" href="#registermodal" v-if="token" v-on:click=logout>Logout</a>
            </li>
          </ul>
        </div>
      </div>
    </nav>   

   <div class="modal fade" id="loginmodal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header text-center">
                <h4 class="modal-title w-100 font-weight-bold">Sign in</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                </button>
            </div>
            <div class="modal-body mx-3">
                <div class="md-form mb-5">
                    <i class="fa fa-envelope prefix grey-text"></i>
                    <input type="email" id="defaultForm-email" class="form-control validate" v-model="email">
                    <label data-error="wrong" data-success="right" for="defaultForm-email">Your email</label>
                </div>

                <div class="md-form mb-4">
                    <i class="fa fa-lock prefix grey-text"></i>
                    <input type="password" id="defaultForm-pass" class="form-control validate" v-model="password">
                    <label data-error="wrong" data-success="right" for="defaultForm-pass">Your password</label>
                </div>

                </div>
                <div class="modal-footer d-flex justify-content-center">
                    <button class="btn btn-default" v-on:click="login">Login</button>
                </div>
            </div>
        </div>
    </div>

    <div class="modal fade" id="registermodal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
            <div class="modal-content">
                <div class="modal-header text-center">
                    <h4 class="modal-title w-100 font-weight-bold">Sign up</h4>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body mx-3">
                    <div class="md-form mb-5">
                        <i class="fa fa-user prefix grey-text"></i>
                        <input type="text" id="orangeForm-name" class="form-control validate" v-model="name">
                        <label data-error="wrong" data-success="right" for="orangeForm-name">Your name</label>
                    </div>
                    <div class="md-form mb-5">
                        <i class="fa fa-envelope prefix grey-text"></i>
                        <input type="email" id="orangeForm-email" class="form-control validate" v-model="email">
                        <label data-error="wrong" data-success="right" for="orangeForm-email">Your email</label>
                    </div>

                    <div class="md-form mb-4">
                        <i class="fa fa-lock prefix grey-text"></i>
                        <input type="password" id="orangeForm-pass" class="form-control validate" v-model="password">
                        <label data-error="wrong" data-success="right" for="orangeForm-pass">Your password</label>
                    </div>

                </div>
                <div class="modal-footer d-flex justify-content-center">
                    <button class="btn btn-deep-orange" v-on:click="register">Sign up</button>
                </div>
            </div>
        </div>
  </div>
    <div id="nav">
      <router-link to="/">Home</router-link> 
    </div>
    <router-view/>
  </div>
</template>

<style>
    #app {
      font-family: 'Avenir', Helvetica, Arial, sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
      color: #2c3e50;
    }
    #nav {
      padding: 30px;
    }
    #nav a {
      font-weight: bold;
      color: #2c3e50;
    }
    #nav a.router-link-exact-active {
      color: #42b983;
    }
</style>

<script>
    import axios from 'axios'

    const data=[]
    const dataLocal = JSON.parse(localStorage.getItem('data'))
    const Token = dataLocal ? dataLocal[0].token : ''
    const userId = dataLocal ? dataLocal[0].userId : ''

    export default {
        name: 'app',
        data:function(){
           return{
             token:Token,
             name:'',
             email:'',
             password:'',
           }
        },
        methods:{
          register: function() {
              let self = this
              axios({
                method: 'POST',
                url: `http://localhost:3000/users`,
                data: {
                  name: this.name,
                  email: this.email,
                  password: this.password
                }
              })
                .then(() => {
                  alert('Register berhasil!')
                  this.login()
                })
                .catch(error => {
                  if (error.response) {
                      alert(error.response.data.error)
                      self.error = ''
                      self.error = error.response.data.error
                  } else if (error.request) {
                      console.log(error.request);
                  } else {
                      console.log('Error', error.message);
                  }
                })
            },
          login: function() {
            let self = this
            axios({
              method: 'POST',
              url: `http://localhost:3000/users/login`,
              data: {
                email: this.email,
                password: this.password
              }
            })
            .then(response => {
                let obj = {
                  token: response.data.token,
                  userId: response.data.userId,
                  cart: [],
                  totalPrice: 0
                }
                data.push(obj)
                localStorage.setItem('data', JSON.stringify(data))
                location.reload()
              })
              .catch(error => {
                if (error.response) {
                    alert('Login gagal!')
                    self.error = ''
                    self.error = 'Login gagal!'
                } else if (error.request){ 
                    console.log(error.request)
                } else {   
                    console.log('Error', error.message)
                }
              })
          },
          logout: function() {
              localStorage.removeItem('data')
              location.reload()
          }
      }
    }
</script>
