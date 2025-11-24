// jQuery(function ($) {
//     var password = localStorage.getItem('password');
//     console.log('tsdguysjjhfdb')
//     // uploadFile();
//   });

  function home(){
    window.location.href = "/assigAndsubDats";
  }

  // function uploadFile() {
  //   var table = document.getElementById("tbl_monitoring");
  //   var col = table.rows[1].cells[1];
  //   console.log("hi" + col);
  
  //   var fileInput = document.createElement("input");
  //   fileInput.type = "file";
  
  //   // Create a closure to capture the file information
  //   fileInput.onchange = function() {
  //     var reader = new FileReader();
  //     var fileToRead = this.files[0];
  //     reader.readAsText(fileToRead);
  
  //     reader.onload = function(e) {
  //       for (var i = 1; i <= 6; i++) {
  //         var row = table.rows[i];
  //         var cell = row.insertCell(1);
  //         cell.innerHTML = e.target.result;
  //       }
  //     };
  //   };
  
  //   // Append the input to the cell
  //   var cell = document.createElement("td");
  //   cell.appendChild(fileInput);
  
  //   // Insert the cell in rows 2 to 7 at column 2
  //   for (var i = 1; i <= 6; i++) {
  //     var row = table.rows[i];
  //     row.insertCell(1);
  //     row.cells[1].appendChild(cell.cloneNode(true));
  //   }
  // }
  
  //   var table = document.getElementById("tbl_monitoring");
  // var col = document.getElementById("upload_file");
  // console.log("hi" , col);
//  להביא את הציון המשוקלל עבור כל תלמיד ולשים בעמודה של הציונים



// // Create an HTML form element
// const form = document.createElement('form_report');

// // Create a file input element
// const fileInput = document.createElement('input_report');
// fileInput.setAttribute('type', 'file');
// fileInput.setAttribute('name', 'file');

// // Add the file input to the form
// form.appendChild(fileInput);

// // Add an event listener to the form to handle file uploads
// form.addEventListener('submit', (event) => {
//   event.preventDefault(); // prevent the form from submitting
//   const file = fileInput.files[0]; // get the selected file
  
//   if (file) {
//     const formData = new FormData(); // create a new FormData instance
//     formData.append('file', file); // append the file to the form data
//     // Perform your file upload operation here
//     const url = 'your-upload-endpoint';
//     fetch(url, {
//       method: 'POST',
//       body: formData
//     })
//     .then(response => {
//       // Handle the response
//     })
//     .catch(error => {
//       // Handle any errors
//     });
//   }
// });


// // Add the form to the document
// document.body.td.appendChild(form);

    // Get the table element by its ID
    // const table = document.getElementById("myTable");

    // // Create the column title element and set its text content
    // const columnTitle = document.createElement("th");
    // columnTitle.textContent = "Column Title";

    // // Create the row title element and set its text content
    // const rowTitle = document.createElement("th");
    // rowTitle.textContent = "Row Title";

    // // Insert the column title element into the first row
    // const firstRow = table.getElementsByTagName("tr")[0];
    // firstRow.insertBefore(columnTitle, firstRow.firstChild);

    // // Insert the row title element into the first column of each row
    // const rows = table.getElementsByTagName("tr");
    // for (let i = 1; i < rows.length; i++) {
    //     const cell = document.createElement("td");
    //     cell.textContent = "Cell Value";
    //     rows[i].insertBefore(rowTitle.cloneNode(true), rows[i].firstChild);
    //     rows[i].appendChild(cell);
    // }
// });

// function home(){
//   window.location.href = "/home";
// }

// dodocument.addEventListener("DOMContentLoaded", function() {
//   uploadFile();
// });

// function uploadFile() {
//   var table = document.getElementById("tbl_monitoring");
//   var col = table.rows[1].cells[1];
//   console.log("hi" + col);

//   var fileInput = document.createElement("input");
//   fileInput.type = "file";

//   // Create a closure to capture the file information
//   fileInput.onchange = function() {
//     var reader = new FileReader();
//     var fileToRead = this.files[0];
//     reader.readAsText(fileToRead);

//     reader.onload = function(e) {
//       for (var i = 1; i <= 6; i++) {
//         var row = table.rows[i];
//         var cell = row.insertCell(1);
//         cell.innerHTML = e.target.result;
//       }
//     };
//   };

//   // Append the input to the cell
//   var cell = document.createElement("td");
//   cell.appendChild(fileInput);

//   // Insert the cell in rows 2 to 7 at column 2
//   for (var i = 1; i <= 6; i++) {
//     var row = table.rows[i];
//     row.insertCell(1);
//     row.cells[1].appendChild(cell.cloneNode(true));
//   }
// }




// document.addEventListener("DOMContentLoaded", function() {
//   // Call the uploadFile function here
//   uploadFile();
// });

// function uploadFile(files) {
  
//   var table = document.getElementById("tbl_monitoring");
//   var col = table.rows[0].cells[2];
//   console.log("hi" + col);
//   var file = files[0];
//   // for(var i = 1; i< table.rows.length; i ++){
//     // var x = document.getElementById("myTable").rows[1].cells.length;
//     // var reader = new FileReader();
//     // reader.onload = function(e) {
//     //   var newRow = table.insertRow(-1);
//     //   var cell1 = newRow.insertCell(0);
//     //   var cell2 = newRow.insertCell(1);
//     //   cell1.innerHTML = file.name;
//     //   cell2.innerHTML = e.target.result;
//     // }
//   // }
  
//   reader.readAsText(file);


// //   var table = document.getElementById("tbl_monitoring");
// // var col = document.getElementById("upload_file");

// var numberOfCells = 5; // Number of cells to add

// for (var i = 0; i < numberOfCells; i++) {
//   var reader = new FileReader();
//     reader.onload = function(e) {
//       var newRow = table.insertRow(-1);
//       var cell1 = newRow.insertCell(0);
//       var cell2 = newRow.insertCell(1);
//       cell1.innerHTML = file.name;
//       cell2.innerHTML = e.target.result;
//     }
//   // Create a new table cell
//   var cell = document.createElement("td");

//   // Create the input element
//   var input = document.createElement("input");
//   input.type = "file";
//   input.onchange = function(files) {
//     uploadFile(this.files);
//   };

//   // Append the input to the cell
//   cell.appendChild(input);

//   // Append the cell to the column
//   col.appendChild(cell);
// }

// }