document.addEventListener("DOMContentLoaded", function () {
  const pinballs = document.querySelectorAll(".pinball");

  pinballs.forEach((pinball) => {
    // Set initial position and speed of each pinball
    let xPos = Math.random() * (window.innerWidth - pinball.offsetWidth); // Random horizontal position
    let yPos = Math.random() * (window.innerHeight - pinball.offsetHeight); // Random vertical position
    let xSpeed = 2 + Math.random() * 2; // Speed for horizontal movement
    let ySpeed = 2 + Math.random() * 2; // Speed for vertical movement

    // Initial direction
    let directionX = 1;
    let directionY = 1;

    // Set initial position on the screen
    pinball.style.left = `${xPos}px`;
    pinball.style.top = `${yPos}px`;

    // Move meteor in a loop
    function moveMeteor() {
      // Check for collisions with the edges of the screen
      if (xPos + pinball.offsetWidth >= window.innerWidth || xPos <= 0) {
        directionX *= -1; // Reverse horizontal direction
      }
      if (yPos + pinball.offsetHeight >= window.innerHeight || yPos <= 0) {
        directionY *= -1; // Reverse vertical direction
      }

      // Update positions based on direction
      xPos += xSpeed * directionX;
      yPos += ySpeed * directionY;

      // Set the new position of the pinball
      pinball.style.left = `${xPos}px`;
      pinball.style.top = `${yPos}px`;

      // Repeat the animation
      requestAnimationFrame(moveMeteor);
    }

    // Start moving the pinball
    moveMeteor();
  });
});

document.querySelectorAll(".pinball").forEach((pinball) => {
  for (let i = 1; i <= 3; i++) {
    let span = document.createElement("span");
    span.style.setProperty("--i", i);
    pinball.appendChild(span);
  }
});
