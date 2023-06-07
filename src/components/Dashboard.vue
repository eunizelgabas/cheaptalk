<template>
    <div>
        <div class="container mt-2">
            <h3 class="mt-3 mb-3">List of Users</h3>
            <div class="row">
              <div class="d-flex mb-2">
                <div class="flex-grow-1">
                  
                </div>
                <form class="form">
                  <label for="search">
                      <input required="" autocomplete="off" placeholder="search user" id="search" type="text" v-model="search">
                      <div class="icon">
                          <svg stroke-width="2" stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="swap-on">
                              <path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" stroke-linejoin="round" stroke-linecap="round"></path>
                          </svg>
                          <svg stroke-width="2" stroke="currentColor" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="swap-off">
                              <path d="M10 19l-7-7m0 0l7-7m-7 7h18" stroke-linejoin="round" stroke-linecap="round"></path>
                          </svg>
                      </div>
                      <button type="reset" class="close-btn">
                          <svg viewBox="0 0 20 20" class="h-5 w-5" xmlns="http://www.w3.org/2000/svg">
                              <path clip-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" fill-rule="evenodd"></path>
                          </svg>
                      </button>
                  </label>
              </form>
              </div>
                <div class="col-md-3" v-for="usr in users" :key="usr.id" >
                    <div class="card" :style="{background: usr.gender === 'male' ? '#143d59' : '#f4b41a', color: usr.gender === 'male'? 'white':'black'}">
                        <div class="infos">
                            <div class="image">
                                <img v-if="usr.gender === 'female'" :src="fIcon" alt="Profile pic">
                                <img v-else :src="mIcon" alt="Profile pic">
                            </div>
                            <div class="info">
                                <div>
                                    <p class="name" :style="{color: usr.gender === 'male'? 'white':'black'}">
                                        {{ usr.name }}
                                    </p>
                                    <p class="function">
                                        @{{ usr.username }}
                                    </p>
                                </div>
                                <div class="stats">
                                        <p class="flex flex-col">
                                            No. Posts
                                            <span class="state-value" v-if="usr.postCount">
                                                {{usr.postCount}} posts
                                            </span>
                                            <span class="state-value" v-else>
                                              {{usr.postCount}} post
                                          </span>
                                        </p>
                                        <p class="flex">
                                            Gender
                                            <span class="state-value">
                                                {{usr.gender}}
                                            </span>
                                        </p>
                                        
                                </div>
                            </div>
                        </div>
                        <button class="request" type="button" @click="view(usr.uid)">
                                View Post
                        </button>
                    </div>
                </div>
            </div>
            
        </div>
    </div>
</template>

<script setup>
import { collection, getDocs, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { computed, ref } from "vue";
import { db } from "../firebase";
import fIcon from "../assets/1.jpg";
import  mIcon from '../assets/5.jpeg';
import router from "../router";
import { FirebaseError } from "firebase/app";

const search = ref('')
const qUser =(collection(db, 'users'));
const qPost =(collection(db, 'posts'));
const users = ref([]);
// const posts = ref([]);
    onSnapshot(
  query(qUser, orderBy('name', 'asc')),
  async (querySnapshot) => {
    const userTmp = [];
    await Promise.all(
      querySnapshot.docs.map(async (doc) => {
        const id = doc.data().uid;
        const querySnapshot = await getDocs(
          query(qPost, where('userId', '==', id))
        );
        const count = querySnapshot.size;
        const user = {
          id: doc.id,
          uid: doc.data().uid,
          name: doc.data().name,
          username: doc.data().username,
          location: doc.data().location,
          gender: doc.data().gender,
          email: doc.data().email,
          postCount: count,
        };
        userTmp.push(user);
      })
    );
    //All the data from users will be stored in userTmp
    users.value = userTmp;
    
  }
);


const view = (uid) => {
  router.push(`/${uid}/wall`);
};
</script>

<style scoped>

.card {
    max-width: 350px;
    border-radius: 1rem;
    background-color: rgba(31, 41, 55, 1);
    padding: 1rem;
  }
  
  .infos {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    grid-gap: 1rem;
    gap: 1rem;
  }
  
  .image {
    height: 7rem;
    width: 7rem;
    border-radius: 0.5rem;
   
  }

  img{
    height: 7rem;
    width: 7rem;
    border-radius: 0.5rem;
  }
  
  .info {
    height: 7rem;
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  
  .name {
    font-size: 1.25rem;
    line-height: 1.75rem;
    font-weight: 500;
    color: rgba(255, 255, 255, 1);
  }
  
  .function {
    font-size: 1rem;
    line-height: 1rem;
  
  }
  
  .stats {
    width: 100%;
    border-radius: 0.5rem;
    background-color: rgba(255, 255, 255, 1);
    padding: 0.5rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 0.75rem;
    line-height: 1rem;
    color: rgba(0, 0, 0, 1);
  }
  
  .flex {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 0 4px;
  }
  
  .state-value {
    font-weight: 700;
    color: rgb(118, 36, 194);
  }
  
  .request {
    margin-top: 1.5rem;
    width: 100%;
    border: 1px solid transparent;
    border-radius: 0.5rem;
    padding: 0.5rem 1rem;
    font-size: 1rem;
    line-height: 1.5rem;
    transition: all .3s ease;
  }
  
  .request:hover {
    background-color: rgb(118, 36, 194);
    color: #fff;
  }

  .form {
    --input-bg: #F9F5E7;
   /*  background of input */
    --padding: 1.5em;
    --rotate: 80deg;
   /*  rotation degree of input*/
    --gap: 2em;
    /*  gap of items in input */
    --icon-change-color: #15A986;
   /*  when rotating changed icon color */
    --height: 40px;
   /*  height */
    width: 300px;
    padding-inline-end: 1em;
   /*  change this for padding in the end of input */
    background: var(--input-bg);
    position: relative;
    border-radius: 4px;
    border:1;
  }
  
  .form label {
    display: flex;
    align-items: center;
    width: 100%;
    height: var(--height);
  }
  
  .form input {
    width: 100%;
    padding-inline-start: calc(var(--padding) + var(--gap));
    outline: none;
    background: none;
    border: 0;
  
  }
  /* style for both icons -- search,close */
  .form svg {
    /* display: block; */
    color: #111;
    transition: 0.3s cubic-bezier(.4,0,.2,1);
    position: absolute;
    height: 15px;
  }
  /* search icon */
  .icon {
    position: absolute;
    left: var(--padding);
    transition: 0.3s cubic-bezier(.4,0,.2,1);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  /* arrow-icon*/
  .swap-off {
    transform: rotate(-80deg);
    opacity: 0;
    visibility: hidden;
  }
  /* close button */
  .close-btn {
    /* removing default bg of button */
    background: none;
    border: none;
    right: calc(var(--padding) - var(--gap));
    box-sizing: border-box;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #111;
    padding: 0.1em;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    transition: 0.3s;
    opacity: 0;
    transform: scale(0);
    visibility: hidden;
  }
  
  .form input:focus ~ .icon {
    transform: rotate(var(--rotate)) scale(1.3);
  }
  
  .form input:focus ~ .icon .swap-off {
    opacity: 1;
    transform: rotate(-80deg);
    visibility: visible;
    color: var(--icon-change-color);
  }
  
  .form input:focus ~ .icon .swap-on {
    opacity: 0;
    visibility: visible;
  }
  
  .form input:valid ~ .icon {
    transform: scale(1.3) rotate(var(--rotate))
  }
  
  .form input:valid ~ .icon .swap-off {
    opacity: 1;
    visibility: visible;
    color: var(--icon-change-color);
  }
  
  .form input:valid ~ .icon .swap-on {
    opacity: 0;
    visibility: visible;
  }
  
  .form input:valid ~ .close-btn {
    opacity: 1;
    visibility: visible;
    transform: scale(1);
    transition: 0s;
  }
  
</style>