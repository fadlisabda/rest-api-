// TODO: jquery to js
function tampilkanSemuaMenu() {
  fetch("data/pizza.json")
    .then((response) => response.json())
    .then((response) => {
      let menu = response.menu;
      let daftarMenu = document.getElementById("daftar-menu");
      menu.forEach((m) => {
        daftarMenu.innerHTML +=
          '<div class="col-md-4"><div class="card mb-3"><img src="img/menu/' +
          m.gambar +
          '" class="card-img-top"><div class="card-body"><h5 class="card-title">' +
          m.nama +
          '</h5><p class="card-text">' +
          m.deskripsi +
          '</p><h5 class="card-title">Rp. ' +
          m.harga +
          '</h5><a href="#" class="btn btn-primary">Pesan Sekarang</a></div></div></div>';
      });
    });
}

tampilkanSemuaMenu();

let navLink = document.querySelectorAll(".nav-link");
navLink.forEach((nl) => {
  nl.addEventListener("click", function () {
    navLink.forEach((nl) => {
      nl.classList.remove("active");
    });
    this.classList.add("active");
    let h1 = document.querySelector("h1");
    h1.innerHTML = nl.textContent;
    if (nl.textContent == "All Menu") {
      tampilkanSemuaMenu();
      return;
    }
    fetch("data/pizza.json")
      .then((response) => response.json())
      .then((response) => {
        let menu = response.menu;
        let content = "";
        menu.forEach((m) => {
          if (nl.textContent.toLowerCase() == m.kategori) {
            content +=
              '<div class="col-md-4"><div class="card mb-3"><img src="img/menu/' +
              m.gambar +
              '" class="card-img-top"><div class="card-body"><h5 class="card-title">' +
              m.nama +
              '</h5><p class="card-text">' +
              m.deskripsi +
              '</p><h5 class="card-title">Rp. ' +
              m.harga +
              '</h5><a href="#" class="btn btn-primary">Pesan Sekarang</a></div></div></div>';
          }
        });
        let daftarMenu = document.getElementById("daftar-menu");
        daftarMenu.innerHTML = content;
      });
  });
});
