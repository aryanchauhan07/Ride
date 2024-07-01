// Shery.mouseFollower();
function myFunction() {
  var x = document.getElementById("myDIV");
  if (x.style.display === "none" || x.style.display === "") {
      x.style.display = "block";
      document.querySelector(".noe").style.display = "none";
  } else {
      x.style.display = "none";
      document.querySelector(".noe").style.display = "block";
  }
}


document.getElementById('signupBtn').addEventListener('click', function () {
    window.location.href = '/signup';
  });

 
function redirectToDriver() {
  window.location.href = "/driver";
}


  Shery.makeMagnet(".magnet");
  
  // Shery.hoverWithMediaCircle("kispar yakis element p mouse aayega", {passes videos and images} );
  Shery.hoverWithMediaCircle(".text", {
    videos: ["assets/video2.mp4"],
  });
  
  
  gsap.to(".fleftelm", {
      scrollTrigger: {
        trigger: "#fimages",
        pin: true,
        start: "top top",
        end: "bottom bottom",
        endTrigger: ".last",
        scrub: 1,
      },
      y: "-300%",
      ease: Power1,
    });
  
    let sections = document.querySelectorAll(".fleftelm");
  
    
    gsap.set('#svg', {autoAlpha:1})
  
  var action = gsap.timeline({
    scrollTrigger: {
      trigger: "section",
      pin: true,   
      start: 'top top', 
      end:'bottom bottom',
      endTrigger: ".last",
      scrub: 1,
     
    },
    defaults:{duration:4, ease:'none'}
  })
  // .from('#poly0', {attr:{points:"0,200 400,200 400,200 0,200 0,0"} },'1')
  .from('#poly01', {attr:{points:"0,200 400,200 400,200 0,200 0,0"} },'1')
  .from('#poly02', {attr:{points:"0,200 400,200 400,200 0,200 0,0"} }, '+=1')
  .from('#poly03', {attr:{points:"0,200 400,200 400,200 0,200 0,0"} }, '+=1')
  .from('#poly04', {attr:{points:"0,200 400,200 400,200 0,200 0,0"} }, '+=1')
  
  
  
  
  // scrub means jese-jese scroll vese-vese animate, ekh dm animate nahi hoga 
  