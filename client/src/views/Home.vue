<template>
  <div class="home">
    <div class="container">
      <div class="row">
        <div class="col-md-8">
            <h1 class="my-4">Blogging
                <small>Overflow</small>
            </h1>
            <content-cart></content-cart>
         </div>
         <div class="col-md-4">
              <side-bar></side-bar>          
         </div>
            <!-- Pagination -->
            <ul class="pagination justify-content-center mb-4">
              <li class="page-item">
                <a class="page-link" href="#">&larr; Older</a>
              </li>
              <li class="page-item disabled">
                <a class="page-link" href="#">Newer &rarr;</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
</template>

<script>
import contentcart from '@/components/content-cart.vue'
import sidebar from '@/components/side-bar.vue'

export default {
  name: 'home',
  components: {
    'content-cart': contentcart,
    'side-bar':sidebar
  }
}

</script>
