var menucontainer = document.getElementById("options")
var menu = menucontainer.getElementsByClassName("menu");

for (var i=0; i<menu.length; i++){
    menu[i].addEventListener('click', function () {
        var current = document.getElementsByClassName("active");
        current[0].className = current[0].className.replace(" active");
        this.className+= " active";
    })
}

ScrollReveal({
    reset: true,
    distance:'60px',
    duration: 500,
    delay:300
})

ScrollReveal().reveal('.learn', {delay: 300})
ScrollReveal().reveal('.one', {delay: 400})



ScrollReveal().reveal('.text-title', {delay: 300, origin: 'rigth'})
ScrollReveal().reveal('.image', {delay: 300, origin: 'right'})
ScrollReveal().reveal('.text-box', {delay: 300, origin: 'right'})
ScrollReveal().reveal('.text-box2', {delay: 300, origin: 'right'})
ScrollReveal().reveal('.image2', {delay: 300, origin: 'right'})


ScrollReveal().reveal('.sec-2-title', {delay: 300})
ScrollReveal().reveal('.container-courses', {delay: 400})

ScrollReveal().reveal('.contact-card', {delay: 300, origin: 'top'})

