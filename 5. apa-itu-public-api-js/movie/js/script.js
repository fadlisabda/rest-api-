let movieList = document.getElementById("movie-list");
let searchInput = document.getElementById("search-input");
function searchMovie() {
  movieList.innerHTML = "";
  fetch("http://www.omdbapi.com/?apikey=fd8ee878&s=" + searchInput.value)
    .then((response) => response.json())
    .then((response) => {
      if (response.Response == "True") {
        let movies = response.Search;
        movies.forEach((m) => {
          movieList.innerHTML += `
                        <div class="col-md-4">
                            <div class="card mb-3">
                                <img src="${m.Poster}" class="card-img-top" alt="...">
                                <div class="card-body">
                                <h5 class="card-title">${m.Title}</h5>
                                <h6 class="card-subtitle mb-2 text-muted">${m.Year}</h6>
                                <a href="#" class="card-link see-detail" data-toggle="modal" data-target="#exampleModal" data-id="${m.imdbID}">See Detail</a>
                                </div>
                            </div>
                        </div>
                    `;
        });
        searchInput.value = "";
      } else {
        movieList.innerHTML = `<div class="col"><h1 class="text-center">` + response.Error + `</h1></div>`;
      }
    });
}

let searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", function () {
  searchMovie();
});

searchInput.addEventListener("keyup", function (e) {
  if (e.which === 13) {
    searchMovie();
  }
});

movieList.addEventListener("click", function () {
  let seeDetail = document.querySelector(".see-detail");
  fetch("http://www.omdbapi.com/?apikey=fd8ee878&i=" + seeDetail.dataset.id)
    .then((response) => response.json())
    .then((response) => {
      if (response.Response == "True") {
        let modalBody = document.querySelector(".modal-body");
        modalBody.innerHTML +=
          `
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-md-4">
                                <img src="` +
          response.Poster +
          `" class="img-fluid">
                            </div>

                            <div class="col-md-8">
                                <ul class="list-group">
                                    <li class="list-group-item"><h3>` +
          response.Title +
          `</h3></li>
                                    <li class="list-group-item">Released : ` +
          response.Released +
          `</li>
                                    <li class="list-group-item">Genre : ` +
          response.Genre +
          `</li>                 
                                    <li class="list-group-item">Director : ` +
          response.Director +
          `</li>                 
                                    <li class="list-group-item">Director : ` +
          response.Actors +
          `</li>                 
                                </ul>
                            </div>
                        </div>
                    </div>
                `;
      }
    });
});
