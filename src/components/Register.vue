<template>
    <div>
        <div class="container col-md-4 mx-auto offset-md-3">
            <h1 class="text-center">
                <img class="image" src="@/assets/log.png" alt="">CheapTalk
            </h1>
              <p class="text-center mt-2">I have an account? <a href="/login">Sign in</a></p>        
      
            <div class="alert alert-danger" v-show="error">
                {{ errorMsg }}
            </div>

            <div class="alert alert-success" v-show="success">
                {{ successMsg }}
            </div>

            <div class="form-group mb-4">
                  <label for="name">Name:</label>
                  <input type="text" name="name" id="name" class="form-control" v-model='name'>
                  
            </div>
      
            <div class="row">
                <div class="col">
                    <div class="form-group mb-4">
                        <label for="username">Username:</label>
                        <input type="text" name="username" id="username" class="form-control" v-model='username'>                
                    </div>
                </div>
                <div class="col">
                    <div class="form-group mb-4">
                        <label for="gender">Gender</label>    
                        <select class="form-select" aria-label="Gender:" v-model="gender">
                            <option hidden>Select Gender</option>
                            <option disabled>Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                        </select>            
                    </div>
                </div>
           </div>

               <div class="form-group mb-4">
                  <label for="location">Location:</label>
                  <input type="text" name="location" id="location" class="form-control" v-model='location'>
                 
               </div>
               
               
               
              <div class="form-group mb-4">
                 <label for="email">Email:</label>
                 <input type="email" name="email" id="email" class="form-control" v-model='email'>
                
              </div>
      
              <div class="form-group mb-4">
                  <label for="password">Password:</label>
                  <input type="password" name="password" id="password" class="form-control" v-model='password'>
                 
               </div>
      
               <div class="form-group mb-3">
                  <button class="btn px-5" style="width:100%; background-color:#f4b41a; color:black" type="button" @click='register'>
                      Register
                  </button>
               </div>
               <hr>
               <div class="button mt-4">
                <button class="btn px-5 mb-3" style="width:100%; background-color:#143d59; color:white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-google" viewBox="0 0 16 16">
                        <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
                    </svg> |  Continue with Google
                </button>
                <button class="btn px-5 mb-3" style="width:100%; background-color:#143d59; color:white">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-facebook" viewBox="0 0 16 16">
                        <path d="M16 8.049c0-4.446-3.582-8.05-8-8.05C3.58 0-.002 3.603-.002 8.05c0 4.017 2.926 7.347 6.75 7.951v-5.625h-2.03V8.05H6.75V6.275c0-2.017 1.195-3.131 3.022-3.131.876 0 1.791.157 1.791.157v1.98h-1.009c-.993 0-1.303.621-1.303 1.258v1.51h2.218l-.354 2.326H9.25V16c3.824-.604 6.75-3.934 6.75-7.951z"/>
                    </svg> | Sign in with Facebook
                </button>
               </div>
          </div>
    </div>
</template>

<script setup>
    import { ref } from 'vue'
    import { auth } from '../firebase';
    import { createUserWithEmailAndPassword, sendEmailVerification} from'firebase/auth';
    import { db } from '../firebase';
    import { collection, addDoc} from '@firebase/firestore';
    import router from '../router';
    
    const name              =   ref('');
    const location          =   ref('');
    const username          =   ref('');
    const gender            =   ref('');
    const email             =   ref('');
    const password          =   ref('');
    const error             =   ref('');
    const errorMsg          =   ref('');
    const success           =   ref('');
    const successMsg        =   ref('');

 
    const register = async () =>{
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        if(name.value !== '' && username.value !== '' && gender.value !== '' && email.value !== '' && password.value !== '')
        {
            if(!emailRegex.test(email.value)) 
            {
                error.value = true;
                errorMsg.value = "FirebaseError: Firebase: Error (auth/invalid-email).";
                return;
            }

            try 
            {
                const { user } = await createUserWithEmailAndPassword(auth, email.value, password.value);

                await addDoc(collection(db, 'users'), {
                    name: name.value,
                    username: username.value,
                    gender: gender.value,
                    email: email.value,
                    uid: user.uid,
                    completed: false
                });
                sendEmailVerification(user);

                error.value = false;
                success.value = true;
                successMsg.value = "Registered Successfully! A verification link has been sent to your email."

                name.value = '';
                username.value = '';
                gender.value = '';
                email.value = '';
                password.value = null;
                router.push('/login');
            }catch (error) {
                error.value = true;
                errorMsg.value = error.message;
            }
            
        }
    }

</script>

<style>

  @import url('https://fonts.googleapis.com/css2?family=Delicious+Handrawn&display=swap');
  @import url('https://fonts.googleapis.com/css?family=Poppins:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i&subset=devanagari,latin-ext');
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
    }

  h1{
        font-family: 'Delicious Handrawn', cursive;
        color:#143d59;
        font-size: 4rem;
    }

    .image{
        width: 5rem;
        justify-content: center;
     }

     input{
        font-family: 'Poppins', sans-serif;
     }
</style>