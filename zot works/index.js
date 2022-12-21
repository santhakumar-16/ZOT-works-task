function getPopUpData(key) {
  console.log(key);
  fetch("https://openlibrary.org/authors/" + key + ".json")
    .then((a) => a.json())
    .then((response) => {
      console.log(response);
      document.getElementById("name").innerHTML =
        response.name || "No data available";
      document.getElementById("alternate-names").innerHTML =
        (response.alternate_names &&
          response.alternate_names[0] +
            "," +
            response.alternate_names[1] +
            "," +
            response.alternate_names[2]) ||
        "No data available";
      document.getElementById("bio").innerHTML =
        response.bio || "No data available";
      document.getElementById("birth-date").innerHTML =
        response.birth_date || "No data available";
      document.getElementById("death-date").innerHTML =
        response.death_date || "No data available";
      document.getElementById("title").innerHTML =
        response.title || "No data available";
      document.getElementById("wikipedia").innerHTML =
        response.wikipedia || "No data available";
    });
}

function getBooks() {
  var xmlhttp = new XMLHttpRequest();
  var url =
    "https://openlibrary.org/search/authors.json?q=" + $("#inputn").val();

  xmlhttp.open("GET", url, true);
  xmlhttp.send();
  xmlhttp.onreadystatechange = function () {
    if (this.readyState == 4 && this.status == 200) {
      var data = JSON.parse(this.responseText);
      $("#example").DataTable().clear().destroy();
      $("#example").DataTable({
        data: data.docs,
        columns: [
          {
            data: "key",
            title: "Author Id",
            class: "center",
            render: function (data, type, full, meta) {
              return (
                "<p onClick=getPopUpData('" +
                data +
                "') data-bs-toggle='modal' data-bs-target='#my-modal'>" +
                data +
                "</p>"
              );
            },
          },
          { data: "name" },
          { data: function(row){if(row.top_work==undefined){return"-";}else{return row.top_work}} },
          
          { data: function(row){if(row.birth_date==undefined){return"-";}else{return row.birth_date}} },
          
        ],
      });
      document.getElementById("no-records").innerHTML = "";
    }
  };
}