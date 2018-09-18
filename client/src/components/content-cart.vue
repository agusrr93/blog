<template>
    <div>
       <div class="card mb-4" v-for="(article, index) in dataartikel" v-bind:key="index">
            <div class="card-body">
            <h2 class="card-title">{{article.title}}</h2>
            <p class="card-text">{{article.content}}</p>
            <a href="#" class="btn btn-primary">Read More &rarr;</a>
            </div>
               <div class="card-footer text-muted">
                    Posted on January 1, 2017 by
               <a href="#">{{article.userId.name}}</a>
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
                url: `http://localhost:3000/articles/author`,
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
          }},
          created :function(){
            this.getArticle()
          }
        
     }
    
</script>