<template>
    <div class="container">
        <div class="row mt-5">          
            <div class="col-md-6 mt-5">
                <h1 class="text"><span>Explore</span> the world's opinion, knowledge and ideas</h1>
                <button class="button mt-4">Read more</button>
            </div>
            <div class="col-md-6">
                <img class="side_image" src="@/assets/im.png" alt="">
            </div>
        </div>
    </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Poppins:100,100i,200,200i,300,300i,400,400i,500,500i,600,600i,700,700i,800,800i,900,900i&subset=devanagari,latin-ext');
    h1{
        font-family: 'Poppins', sans-serif;
    }
    h1 span{
        color: #f4b41a;
    }
    .side_image{
        width: 40rem;
        height: 30rem;
    }
    .button {
        color: #0b0b0b;
        font-size: 17px;
        background-color: #f4b41a;
        border: 1px solid #f4b41a;
        border-radius: 5px;
        padding: 10px;
        box-shadow: 0px 6px 0px #e5a308;
        transition: all .1s;
        font-family: 'Poppins', sans-serif;
       }
       
       .button:active {
        box-shadow: 0px 2px 0px #f4b41a;
        position: relative;
        top: 2px;
       }

      .text{
        margin-top:5rem;
      }
</style>