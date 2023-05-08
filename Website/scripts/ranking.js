const url = "https://localhost:7041/api/Perfiles";
fetch(url)
.then(response => {
  //handle response            
  console.log(response);
  if (response.ok) {
      return response.json();
  }
})
.then(data => {
  //handle data
  console.log(data);
})
.catch(error => {
  //handle error
});
