function changeSlide(index) {

    var slides = document.querySelectorAll('.slide');
    slides.forEach(function(slide) {
        slide.style.display = 'none'; 
    });

    
    var slideToShow = document.querySelectorAll('.slide')[index];
    slideToShow.style.display = 'block'; 

 
    var thumbnails = document.querySelectorAll('.thumbnail');
    thumbnails.forEach(function(thumbnail) {
        thumbnail.classList.remove('active');
    });
    document.querySelectorAll('.thumbnail')[index].classList.add('active');
}