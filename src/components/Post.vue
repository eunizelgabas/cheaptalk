<template>
  <div class="container">  
    <h1 class=" mt-2 mx-auto">For you</h1>
    <div class="d-flex mb-2">
      <div class=" flex-grow-1">     
      </div>
      <div class="form-group mb-3">
        <select class="form-select" v-model="filterGenre">
            <option disabled selected value="">Select a category</option>
            <option value="">All</option>
            <option value="Religion">Religion</option>
            <option value="Education">Education</option>
            <option value="Politics">Politics</option>
            <option value="Romance">Romance</option>
            <option value="Comedy">Comedy</option>
        </select>
    </div>
    </div>
    <div class="row mb-2">
      <div class="col-md-6 mb-3" v-for="p in paginatedPosts" :key="p.posts" >
        <div class="blog-container"  :style="{background: p.gender === 'male' ? '#143d59' : '#f4b41a', color: p.gender === 'male'? 'white':'white'}">
          <div class="blog-header">
            <img v-if="p.gender === 'female'" :src="fIcon" alt="Profile pic">
            <img v-else :src="mIcon" alt="Profile pic">
             <div class="blog-author--no-cover">
                <h3 :style="{color: p.gender === 'male'? 'white':'white'}">{{ p.name }}</h3>
             </div>
           </div>
           <div class="blog-body">
             <div class="blog-summary">
               <p :style="{color: p.gender === 'male'? 'white':'black'}">{{ p.content }}</p>
             </div>
             <div class="blog-tags">
               <ul>
                 <li >
                    <a href="#" :style="{background: p.genre === 'Education' ? 'plum' :p.genre === 'Religion' ? 'green' :p.genre === 'Politics' ? 'teal' :p.genre === 'Romance' ? 'red': 'cyan',
                    color: p.genre === 'Education' ? 'black' :p.genre === 'Religion' ? 'white' :p.genre === 'Politics' ? 'white' :p.genre === 'Romance' ? 'white': 'black'}">
                    {{ p.genre }}
                  </a>
                </li>
               </ul>
             </div>
           </div> 
           <div class="blog-footer">
             <ul class="mt-2">
               <li class="published-date" :style="{color: p.gender === 'male' ? 'white' : 'black'}">{{ p.time }}</li>
             </ul>
           </div>       
         </div> 
      </div>  
      <div class="cards mt-2" v-if="errorMessage" >
        <p style="color: red; font-size: larger; font-weight: bold;" class="text-center">{{ errorMessage }}</p>
      </div>
      <div class="page mt-2">
        <div class="pagination">
            <button @click="previousPage" :disabled="currentPage === 1" class="bg-info m-1 text-dark rounded shadow" style="padding-top: 10px; padding-bottom: 10px; width: 50px; cursor:pointer; margin-top: 100px;"> <strong>&#60;</strong> </button>
            <template v-for="pageNumber in totalPages" :key="pageNumber">
            <button @click="goToPage(pageNumber)" :class="{ active: pageNumber === currentPage }" class="btn p-2 m-1 text-dark rounded shadow" style="width: 50px; cursor: pointer;">{{ pageNumber }}</button>
            </template>
            <button @click="nextPage" :disabled="currentPage === totalPages" class="bg-info m-1 text-dark rounded shadow" style="padding-top: 10px; padding-bottom: 10px; width: 50px; cursor:pointer; margin-top: 100px;"><strong>&#62;</strong></button>
        </div>
      </div>   
    </div>
        
  </div>
</template>
<script setup>
import { collection, getDocs, query } from "firebase/firestore";
import { computed, onMounted, ref, watch } from "vue";
import { db } from "../firebase";
import fIcon from "../assets/1.jpg";
import  mIcon from '../assets/5.jpeg';

const id = ref('1');
    const posts = ref([]);
    const qPost = query(collection(db, 'posts'));
    const filterGenre = ref('');
    const errorMessage = ref('');

    const currentPage = ref(1);
    const postsPerPage = 4;
    const totalPages = ref(0);
  
const fetchData = async () => {
  try {
    
    const snapshot = await getDocs(qPost);

    if (!snapshot.empty) {
      const postTmp = [];
      snapshot.forEach((doc) => {
        const post = {
          id: doc.id,
          genre: doc.data().genre,
          content: doc.data().content,
          userId: doc.data().userId,
          name: doc.data().name,
          gender: doc.data().gender,
          username:doc.data().username,
          time: doc.data().time?.toDate()?.toLocaleString(),
          completed: doc.data().completed,
        };
        postTmp.push(post);
      });
      posts.value = postTmp;
      // lastVisible = snapshot.docs[snapshot.docs.length - 1];
      // totalPages.value = Math.ceil(snapshot.size / pageSize);
    } else {
      console.log("No posts found");
      errorMessage.value = 'No posts found';
    }
  } catch (error) {
    console.log('Error getting user posts:', error);
    errorMessage.value = 'Error getting user posts';
  }
};

onMounted(fetchData);

//mount every search/filter 
const filteredPosts = computed(() => {
  let filtered = posts.value;

  if (filterGenre.value) {
    filtered = filtered.filter(post => post.genre === filterGenre.value);
    filtered = filtered.sort((a, b) => a.genre.localeCompare(b.genre));
  }

  return filtered;
});

watch(filteredPosts, (newFilteredPosts) => {
  
  if (newFilteredPosts.length === 0) {
    errorMessage.value = 'No posts found in the specified genre.';
  } else {
    errorMessage.value = '';
  }
  totalPages.value = Math.ceil(filteredPosts.value.length / postsPerPage);
});


//this is where the pagination query

// watch(filteredPosts, () => {
//   totalPages.value = Math.ceil(filteredPosts.value.length / postsPerPage);
// });


function previousPage() {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
}

function nextPage() {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
}

function goToPage(pageNumber) {
  currentPage.value = pageNumber;
}


const paginatedPosts = computed(() => {
  const startIndex = (currentPage.value - 1) * postsPerPage;
  const endIndex = startIndex + postsPerPage;
  return filteredPosts.value.slice(startIndex, endIndex);
});


</script>
<style>
@import url('https://fonts.googleapis.com/css?family=Poppins:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i&subset=devanagari,latin-ext');
.blog-container {
  background: #fff;
  border-radius: 5px;
  box-shadow: rgba(0, 0, 0, 0.2) 0 4px 2px -2px;
  font-family: "adelle-sans", sans-serif;
  font-weight: 100;
  width: 20rem;
  font-family: 'Poppins', sans-serif;
}

@media screen and (min-width: 959px) {
  .blog-container {
    width: 40rem;
  }
}
h1{
  font-family: 'Poppins', sans-serif;
}
.blog-container a {
  color: #4d4dff;
  text-decoration: none;
  transition: 0.25s ease;
}

.blog-cover {
  background-size: cover;
  border-radius: 5px 5px 0 0;
  height: 15rem;
  box-shadow: inset rgba(0, 0, 0, 0.2) 0 64px 64px 16px;
}

.blog-author,
.blog-author--no-cover {
  margin: 0 auto;
  padding-top: 0.200rem;
  width: 80%;
}

.blog-header img{
  background-size: cover;
  border-radius: 50%;
  content: " ";
  display: inline-block;
  height: 50px;
  margin-left: 1.5rem;
  position: relative;
  top: 53px;
  width: 50px;
}

.blog-author h3 {
  color: #fff;
  font-weight: 100;
  font-family: 'Poppins' sans-serif;
}

.blog-author--no-cover h3 {
  color: #999999;
  font-weight: 500;
  margin-top: 3%;
  margin-left: 1rem;
}

.blog-body {
  margin: 0 auto;
  width: 80%;
}

.blog-summary p {
  color: #4d4d4d;
  font-weight: 400;
}

.blog-tags ul {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  list-style: none;
  padding-left: 0;
}

.blog-tags li  {
  margin-left: 0.5rem;
  font-weight: 300;
}

.blog-tags a {
  border: 2px;
  border-radius: 3px;
  color: #999999;
  font-size: 1rem;
  height: 1.5rem;
  line-height: 1.5rem;
  letter-spacing: 1px;
  padding: 0 0.5rem;
  text-align: center;
  text-transform: uppercase;
  white-space: nowrap;
  width: 5rem;
}

.blog-footer {
  border-top: 1px solid #e6e6e6;
  margin: 0 auto;
  padding-bottom: 0.125rem;
  width: 80%;
}

.blog-footer ul {
  list-style: none;
  display: flex;
  flex: row wrap;
  justify-content: flex-end;
  padding-left: 0;
}

.blog-footer li:first-child {
  margin-right: auto;
}

.blog-footer li {
  margin-left: 0.5rem;
}

.blog-footer li {
  color: #999999;
  font-size: 0.75rem;
  height: 1.5rem;
  letter-spacing: 1px;
  line-height: 1.5rem;
  text-align: center;
  text-transform: uppercase;
  position: relative;
  white-space: nowrap;
}
.blog-footer li a {
  color: #999999;
  font-weight: 300;
}

.comments {
  margin-right: 1rem;
}

.published-date {
  border: 2px;
  border-radius: 3px;
  padding: 0 0.5rem;
  font-weight: 300;
}

.page {
  position: relative;
  bottom: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
}

.pagination {
  display: flex;
  justify-content: center;
}

.pagination button {
  margin: 1rem;
  width: 50px;
  cursor: pointer;
  border: 0;
  background-color: plum;
  color: white;
}

.pagination button:hover {
  margin: 1rem;
  width: 50px;
  cursor: pointer;
  border: 0;
  background-color: purple;

  color: white;
}

.pagination button.active {
    background-color: plum;
}

</style>