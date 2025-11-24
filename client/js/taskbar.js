// $(document).ready(function () {
// // Create a taskbar container
// const taskbarContainer = document.createElement('div');
// taskbarContainer.id = 'taskbar-container';

// // Style the taskbar container
// taskbarContainer.style.position = 'fixed';
// taskbarContainer.style.top = '20px';
// taskbarContainer.style.bottom = 0;
// taskbarContainer.style.right = 0;
// taskbarContainer.style.width = '50px'; // Set the width of your taskbar
// taskbarContainer.style.backgroundColor = '#fdfcfb'; // Set the background color of your taskbar

// // Create a first button element
// const btnTrack = document.createElement('button');
// btnTrack.textContent = 'למעקב אחרי הפרויקט';
// btnTrack.style.backgroundColor = 'red';
// btnTrack.style.border = 'none';
// btnTrack.style.borderRadius = '10%';
// btnTrack.style.color = 'white';

// // Append the button to the taskbar container
// taskbarContainer.appendChild(btnTrack);

// // Add an event listener to the button
// btnTrack.addEventListener('click', () => {
//   // localStorage.setItem('password', password)
//     window.location.href = "/Monitoring";
// });

// // Create a second button element
// const btnTemplate = document.createElement('button');
// btnTemplate.textContent = 'תבנית דוחות';
// btnTemplate.style.backgroundColor = 'red';
// btnTemplate.style.border = 'none';
// btnTemplate.style.borderRadius = '10px';
// btnTemplate.style.color = 'white';

// taskbarContainer.appendChild(btnTemplate);

// // Add an event listener to the button
// btnTemplate.addEventListener('click', () => {
//   // localStorage.setItem('password', password)
//     window.location.href = "/template";
// });

// // Append the taskbar container to the document body
// document.body.appendChild(taskbarContainer);
// });