<template>
    <div class="container col-md-5 offset-md-3 p-5 mt-2 mx-auto">            
        <div class="card p-4">
            <h1 class="text-center"><span style="color:#37306B;">Create</span> a Post</h1>
            <hr>
            
            <div class="form-group mb-3">
                <label for="genre" class="form-label" >Genre: </label>
                <select class="form-select" v-model="genre">
                    <option disabled selected value="">Select a category</option>
                    <option value="Religion">Religion</option>
                    <option value="Education">Education</option>
                    <option value="Politics">Politics</option>
                    <option value="Romance">Romance</option>
                    <option value="Comedy">Comedy</option>
                </select>
            </div>
            <div class="form-group mb-3">
                <label for="content" class="form-label" >Content:</label>
                <textarea type="text" class="form-control" id="content" width="15rem" v-model="content" placeholder="What's on your mind?"></textarea>
            </div>
            <button class="btn mb-3 justify-content-end" @click="submit">Post</button>
        </div>
    </div>
</template>

<script setup>
import { addDoc, collection, getDocs, query, Timestamp, where } from "firebase/firestore";
import { ref } from "vue";
import { auth, db } from "../firebase";
import router from "../router";

const genre = ref('');
const content = ref('');

const submit = async () =>{
    if (genre.value !== '' && content.value !== '') {
    const currentUser = auth.currentUser;

    if (currentUser) {
      const userId = currentUser.uid;
      let name = '';
      let gender = '';
      let username ='';

      // Retrieve the name from the "users" collection using the userId
      const QuerySnapshot = await getDocs(query(collection(db, 'users'), where('uid', '==', userId)));
      if (!QuerySnapshot.empty) {
        const document = QuerySnapshot.docs[0];
        const userData = document.data();
        name = userData.name;
        gender = userData.gender;
        username =userData.username;
      } else {
        console.log("No matching document found in 'user' collection.");
      }
      
      //this is to get a timestamp data in every post of the user
      const timestamp= Timestamp.fromDate(new Date());

      //Each property in the postDoc object holds specific information related to a post. dire mastore ang gi input sa user and pass it to the addDoc para ma add as a document
      const postDoc = {
        genre: genre.value,
        content: content.value,
        userId: userId,
        gender: gender,
        name: name,
        username:username,
        time:timestamp,
        completed: false
      };
     
     // await kay ga wait pa siyas promise SA babaw 
     try {
        await addDoc(collection(db, 'posts'), postDoc);
        console.log('Post document successfully added.');

      } catch (error) {
        console.log('Error adding post document:', error);
      } 
      
    }
    genre.value = '';
    content.value = '';

    router.push('/post');
  }

}
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Poppins:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i&subset=devanagari,latin-ext');
*{
    font-family: 'Poppins', sans-serif;
}
.card{
    background-color: #f1b937;
}

.btn{
    background-color: #143d59;
    color:white;
}

.btn:hover{
    background-color: #246896;
}

label{
    font-weight: 1rem;
}
</style>