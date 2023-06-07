<template>
    <div>
        <div class="container col-md-4 mx-auto offset-md-3 ">
           
            <h1 class="text-center">
                <img class="image" src="@/assets/log.png" alt="">CheapTalk
            </h1>
              <p class="text-center mt-2">Dont have an account? <a href="/register">Sign up</a></p>
                
            <div class="alert alert-danger" v-show="error">
                {{ errorMsg }}
            </div>

            <div class="alert alert-success" v-show="success">
                {{ successMsg }}
            </div>
        
              <div class="form-group mb-4">
                 <label for="email">Email:</label>
                 <input type="email" name="email" id="email" class="form-control" v-model="email">
                 
              </div>
        
              <div class="form-group mb-4">
                  <label for="password">Password:</label>
                  <input type="password" name="password" id="password" class="form-control" v-model="password">
                  
               </div>
        
               <div class="form-group mb-3">
                  <button class="btn px-5" style="width:100%; background-color:#f4b41a; color:white" @click='submit'>
                      Login
                  </button>
               </div>
               <hr>
               <div class=" button mt-4">
                <button class="btn px-5 mb-3" style="width:100%; background-color:#143d59; color:white" @click="signInWithGoogle">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-google" viewBox="0 0 16 16">
                        <path d="M15.545 6.558a9.42 9.42 0 0 1 .139 1.626c0 2.434-.87 4.492-2.384 5.885h.002C11.978 15.292 10.158 16 8 16A8 8 0 1 1 8 0a7.689 7.689 0 0 1 5.352 2.082l-2.284 2.284A4.347 4.347 0 0 0 8 3.166c-2.087 0-3.86 1.408-4.492 3.304a4.792 4.792 0 0 0 0 3.063h.003c.635 1.893 2.405 3.301 4.492 3.301 1.078 0 2.004-.276 2.722-.764h-.003a3.702 3.702 0 0 0 1.599-2.431H8v-3.08h7.545z"/>
                    </svg> |  Sign in with Google
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
    import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
    import { ref } from 'vue'
    import { auth } from '../firebase';
    import router from '../router/index.js';

    const email         = ref('');
    const password      = ref('');
    const error         = ref('');
    const errorMsg      = ref('');
    const success       = ref('');
    const successMsg    = ref('');

    const submit = () => {
        signInWithEmailAndPassword(auth, email.value, password.value)
            .then((cred) => {
                if(cred.user.emailVerified){
                    router.push('/dashboard')
                }else{
                    error.value = true
                    errorMsg.value = "Your account is not yet verified."
                    email.value = ""
                    password.value = ""
                }
            })
            .catch((err) => {
                error.value = true
                errorMsg.value = err.message;
            })
    }

    const signInWithGoogle = () =>{
        const provider = new GoogleAuthProvider()
        signInWithPopup(auth,  provider)
            .then((cred) =>{
                console.log(cred.user)
                router.push('/dashboard')
            })
            .catch((err) => {
                error.value = true
                errorMsg.value = err.message
            })
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
</style>