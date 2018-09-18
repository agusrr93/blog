<template>
        <div>
            <div class="card border-primary mb-3" style="max-width: 18rem;">
                <div class="card-header">Daily Blog</div>
                    <div class="card-body text-primary">
                      <h5 class="card-title">WELCOME STRANGER</h5>
                      <p class="card-text">Hope You Enjoy This Blog</p>
                    </div>
                </div>
                <div>
                  <button type="button" class="btn btn-primary btn-lg btn-block" data-toggle="modal" data-target="#modalArticle" v-if="token">Create Articles</button>
                </div><br>
                
                <h1>List Of Article</h1>
                <ul class="list-group">
                      <a href=# v-for="(article, index) in dataartikel" v-bind:key="index">
                        {{article.title}}
                      </a>
                </ul>

        <div class="modal fade" id="modalArticle" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
              <div class="modal-dialog" role="document">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">New content</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div class="modal-body">
                    <form>
                      <div class="form-group">
                        <label for="recipient-name" class="col-form-label">Title:</label>
                        <input type="text" class="form-control" id="recipient-name" v-model="title">
                      </div>
                      <div class="form-group">
                        <label for="message-text" class="col-form-label">Content:</label>
                        <textarea class="form-control" id="message-text" v-model="content"></textarea>
                      </div>
                    </form>
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" v-on:click="createArticle">Post It</button>
                  </div>
                </div>
              </div>
            </div>
        </div>

</template>

<script>
    import axios from 'axios'

    const dataLocal = JSON.parse(localStorage.getItem('data'))
    const Token = dataLocal ? dataLocal[0].token : ''
    const users = dataLocal ? dataLocal[0].userId : ''
    
    export default {
        name: 'app',
        data:function(){
           return{
             title:'',
             content:'',
             token:Token,
             dataartikel:[]
           }
        },
        methods:{
          getArticle: function() {
              let self = this
              axios({
                method: 'GET',
                url: `http://localhost:3000/articles`,
              })
              .then((article) => {
                  var dataparse=article.data
                  this.dataartikel=[]
                  this.dataartikel=dataparse
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
          createArticle: function() {
              let self = this
              axios({
                method: 'POST',
                url: `http://localhost:3000/articles`,
                data: {
                  title: this.title,
                  content: this.content,
                  userId: users
                },headers:{token:this.token}
              })
              .then(() => {
                  alert('Success Create Articles')
                  this.getArticle()
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
             }
        },created :function(){
            this.getArticle()
        }
        
    }
</script>