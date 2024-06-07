<script>
    import 'bootstrap/dist/css/bootstrap.min.css';
</script>

<head>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
</head>
<div class="home-body">
    <div class="jumbotron mt-5">
        <h1 class="display-4"><center>CS 407 Assignments</center></h1>
        <p class="lead"><center><a class="github" href="https://github.com/zoerobb/CS407-Portfolio"> <i class="fa fa-github" aria-hidden="true"></i> GitHub</a></center></p>
        <hr>
    </div>

    <div class="list-group assignment-list mt-5">
        <a href="/assignment1" class="assignment-card">
            <div class="animate">
                <h3>Assignment 1</h3>
            </div>
        </a>
        <a href="/assignment2" class="assignment-card">
            <div class="animate">
                <h3>Assignment 2</h3>
            </div>
        </a>
        <a href="/assignment3" class="assignment-card">
            <div class="animate">
                <h3>Assignment 3</h3>
            </div>
        </a>
        <a href="/assignment4" class="assignment-card">
            <div class="animate">
                <h3>Assignment 4</h3>
            </div>
        </a>
        <a href="/assignment5" class="assignment-card">
            <div class="animate">
                <h3>Assignment 5</h3>
            </div>
        </a>
        <a href="/assignment6" class="assignment-card">
            <div class="animate">
                <h3>Assignment 6</h3>
            </div>
        </a>
        <a href="/assignment7" class="assignment-card">
            <div class="animate">
                <h3>Assignment 7</h3>
            </div>
        </a>
        <a href="/final" class="assignment-card">
            <div class="animate">
                <h3>Final</h3>
            </div>
        </a>
    </div>
</div>

<style>
    .github {
        color: rgb(163, 221, 255);
        text-decoration: none;
        font-weight: bold;
    }

    .assignment-list {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;
        margin-top: 0 !important;
    }
    
    .home-body {
        background-repeat: repeat;
        color: white;
        background: linear-gradient(to bottom, rgb(83, 3, 231), rgb(229, 32, 255), rgb(219, 30, 134));
        display: flex;
        flex-direction: column;
        min-height: 100vh;
        position: relative;
        overflow: hidden;
    }
    
    .assignment-card {
        transition: all 0.2s ease-in-out;
        position: relative;
    }

    .assignment-card:hover {
        transform: scale(1.05); 
        z-index: 1;
    }

    .assignment-card:hover {
        text-shadow: 0 0 10px #fff, 0 0 15px #ff00de;
    }

    .assignment-card {
        background-color: rgb(248, 249, 250, 0.30);
        color: white;
        border: 1px solid #dee2e6;
        border-radius: 0.25rem;
        box-shadow: 0.05rem 0.05rem 0.5rem rgba(255, 255, 255, 0.75);
        padding: 1rem;
        margin-bottom: 1rem;
        text-decoration: none;
        text-align: center;
        width: 20%;
        margin-top: 10px;
        margin-bottom: 10px;
    }
</style>