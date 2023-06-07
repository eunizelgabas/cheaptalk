<template>
	<nav class="navbar navbar-expand-lg p-3">
		<div class="container">
			<img src="@/assets/log.png" alt="">
			<a class="navbar-brand" href="#">CheapTalk</a>
			<button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
				<span class="navbar-toggler-icon"></span>
			</button>

			<div class="collapse navbar-collapse" id="navbarNavDropdown" >
				<ul class="navbar-nav ms-auto " v-show="!isSignedIn">
					<li class="nav-item">
						<router-link class="nav-link mx-2" to="/HOME">
							Home
						</router-link> 
					</li>
					<li class="nav-item">
						<router-link class="nav-link mx-2" to="/login">
							Login
						</router-link> 
					</li>
				</ul>
			</div>
			<div class=" collapse navbar-collapse" id="navbarNavDropdown" v-show="isSignedIn" v-for="usr in users" :key="usr.id">
				<ul class="navbar-nav ms-auto ">
					<li class="nav-item">
						<router-link class="nav-link mx-2" to="/dashboard">
							Dashboard
						</router-link> 
					  </li>
	
				  <li class="nav-item">
					<router-link class="nav-link mx-2" to="/post">
						Post
					</router-link> 
				  </li>
				  			  
				  <li class="nav-item dropdown">
					<a class="nav-link mx-2 dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-bs-toggle="dropdown" aria-expanded="false">
					 {{usr.name}}
					</a>
					<ul class="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
					  <li><router-link to="/add" class="dropdown-item">Add post</router-link></li>
					  <li><a class="dropdown-item" href="#">My Profile</a></li>
					  <li><router-link to="/home" class="dropdown-item" @click="logout">Logout</router-link></li>
					</ul>
				  </li>
				</ul>
			  </div>
		  </div>
		 
		</nav>
  <RouterView/>
  </template>
  
 
<script setup>
import { collection, onSnapshot, query} from "firebase/firestore";
import { ref, onMounted } from 'vue';
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { auth, db } from "./firebase";
import router from "./router";

const isSignedIn = ref (false)


const logout = () =>{
  signOut(auth)
  .then(()=>{
    isSignedIn.value = false
  })
 window.location.reload();
}


const users = ref([])
    const id = ref(1)
    const userRef = (collection(db, "users"));
    
onMounted(async () => {
	onAuthStateChanged(auth, (user) => {
		if (user) {
			if(user.emailVerified){
				isSignedIn.value = true
				
				router.push('/dashboard')

				const q = query(userRef);
				onSnapshot(q, (snapshot) => {
					const midtermTmp = [];
					snapshot.forEach((doc) => {
					const midterm = {
						// id: doc.id,
						name: doc.data().name,
						username: doc.data().username,
						location: doc.data().location,
						gender: doc.data().gender,
						email: doc.data().email,
						// completed: doc.data().completed,
					};
					if (midterm.email === user.email) {
						midtermTmp.push(midterm);
					}
					});
					users.value = midtermTmp;
				
				});
			}else{
				// router.push('/login')
			}
		}
	});
});

</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Poppins:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i&subset=devanagari,latin-ext');
@import url('https://fonts.googleapis.com/css2?family=Delicious+Handrawn&display=swap');

body{
font-family: 'Poppins', sans-serif;
font-size: 16px;
line-height: 24px;
font-weight: 400;
color: #212112;
background-image: url('https://s3-us-west-2.amazonaws.com/s.cdpn.io/1462889/pat-back.svg');
background-position: center;
background-repeat: no-repeat;
background-size: cover;
background-color: #fff;
overflow-x: hidden;

}

.navbar{
padding: 0;
}

.navbar-brand{
	font-family: 'Delicious Handrawn', cursive;
	font-size: x-large;
	color:#143d59;
	font-size: 2rem;
}

.navbar-brand:hover{
	color:#f4b41a;
}
.nav-link{
	color: #143d59;
	font-weight: 500;
	transition: all 200ms linear;
	font-family: 'Poppins', sans-serif;
}
.nav-item:hover .nav-link{
	color: #f4b41a;
}
.nav-item.active .nav-link{
	color: #777;
}
.nav-link {
	position: relative;
	padding: 5px;
	display: inline-block;
}
.nav-item:after{
	position: absolute;
	bottom: -5px;
	left: 0;
	content: '';
	background-color: #143d59;
	opacity: 0;
}
.nav-item:hover:after{
	bottom: 0;
	opacity: 1;
	color:#143d59;
}
.nav-item{
	position: relative;
  	transition: all 200ms linear;
	color:#143d59;
}
a{
	color:#143d59;
}
 img{
	width: 5rem;
 }
</style>
