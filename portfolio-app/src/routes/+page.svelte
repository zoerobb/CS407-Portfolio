<script>
    import 'bootstrap/dist/css/bootstrap.min.css';
</script>

<div class="container">
    <div class="jumbotron mt-5">
        <h1 class="display-4"><center>CS 407 Assignments</center></h1>
        <p class="lead"><center>yay</center></p>
        <hr class="my-4">
    </div>

    <div class="list-group mt-5">
        <a href="/assignment1" class="list-group-item list-group-item-action">
            <div class="d-flex flex-column align-items-start animate">
                <h5 class="mb-1">Assignment 1</h5>
                <img src="/node_modules/bootstrap-icons/icons/arrow-bar-right.svg" alt="Arrow Icon" />
            </div>
        </a>
        <a href="/assignment2" class="list-group-item list-group-item-action">
            <div class="d-flex flex-column align-items-start animate">
                <h5 class="mb-1">Assignment 2</h5>
                <img src="/node_modules/bootstrap-icons/icons/arrow-bar-right.svg" alt="Arrow Icon" />
            </div>
        </a>
        <a href="/assignment3" class="list-group-item list-group-item-action">
            <div class="d-flex flex-column align-items-start animate">
                <h5 class="mb-1">Assignment 3</h5>
                <img src="/node_modules/bootstrap-icons/icons/arrow-bar-right.svg" alt="Arrow Icon" />
            </div>
        </a>
    </div>
</div>

<style>
    .mb-1, img {
        margin-bottom: 1rem !important;
    }

    img {
        padding-left: 0.3rem;
    }

    .animate {
        transition: all 0.2s ease-in-out;
    }

    .animate:hover {
        transform: translateX(12px);
    }
</style>