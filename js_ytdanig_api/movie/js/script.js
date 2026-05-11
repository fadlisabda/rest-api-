// fetch("https://www.googleapis.com/youtube/v3/channels?part=snippet,statistics&id=UCkXmLjEr95LVtGuIm3l2dPg&key=AIzaSyBj_FdPICPZ3Y_CLtSnMAfJHs_uSCJQZeI")
//   .then((response) => response.json())
//   .then((response) => {
//     console.log(response);
//   });
fetch("https://www.googleapis.com/youtube/v3/search?key=AIzaSyBj_FdPICPZ3Y_CLtSnMAfJHs_uSCJQZeI&channelid=UCkXmLjEr95LVtGuIm3l2dPg&maxResults=1&order=date&part=snippet")
  .then((response) => response.json())
  .then((response) => {
    console.log(response);
  });
