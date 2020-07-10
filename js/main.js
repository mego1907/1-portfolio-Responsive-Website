

window.addEventListener("load", function(){
    document.querySelector(".preloader").classList.add("opacity-0");
    setTimeout(function() {
        document.querySelector(".preloader").style.display = "none"
    },1000)
})


// Profolio Item filter
var filterContainer = document.querySelector('.portfolio-filter');
var filterBtns = filterContainer.children;
var totalFilterBtn = filterBtns.length;

var portfolioItem = document.querySelectorAll('.portfolio-item');
var totalPortfolioItem = portfolioItem.length;

for(let i= 0;i<totalFilterBtn;i++){
    filterBtns[i].addEventListener('click', function() {
        filterContainer.querySelector('.active').classList.remove('active')
        this.classList.add('active');

        var filterValue = this.getAttribute('data-filter');
        for(let v = 0; v < totalPortfolioItem; v++){

            if(filterValue === portfolioItem[v].getAttribute('data-category')){
                portfolioItem[v].classList.remove('hide');
                portfolioItem[v].classList.add('show');
            } else{
                portfolioItem[v].classList.remove('show');
                portfolioItem[v].classList.add('hide');
            }

            if(filterValue === 'all'){
                portfolioItem[v].classList.remove('hide');
                portfolioItem[v].classList.add('show');
            }

        }
    });
};


// Portfolio Lightbox
var lightbox = document.querySelector('.lightbox');
var lightboxImg = lightbox.querySelector('.lightbox-img');
var lightboxText = lightbox.querySelector('.caption-text');
var lightboxCounter = lightbox.querySelector('.caption-counter');
var itemIndex = 0;

var CloseLightbox = lightbox.querySelector('.lightbox-close');


for (let i = 0; i < totalPortfolioItem; i++){
    portfolioItem[i].addEventListener('click', function () {
        itemIndex = i;
        changeItem();
        toggleLightbox()
    })
}


function nextItem(){
    if(itemIndex === totalPortfolioItem-1){
        itemIndex=0;
    } else{
        itemIndex++;
    }
    changeItem();
}


function prevItem(){
    if(itemIndex === 0){
        itemIndex=totalPortfolioItem-1;
    } else{
        itemIndex--;
    }
    changeItem();
}


function toggleLightbox(){
    lightbox.classList.toggle('open');
}


function changeItem(){
    imgSrc = portfolioItem[itemIndex].querySelector('.portfolio-img img').getAttribute('src');
    lightboxImg.src = imgSrc;
    lightboxText.innerHTML = portfolioItem[itemIndex].querySelector('h4').innerHTML;
    lightboxCounter.innerHTML = (itemIndex+1) + " of " + totalPortfolioItem;
}


lightbox.addEventListener('click', function (e) {
    if(e.target === CloseLightbox){
        toggleLightbox();
    }
});


// Aside Navbar
const nav = document.querySelector(".nav");
const navList = nav.querySelectorAll("li");
const totalNavList = navList.length;
const allSection = document.querySelectorAll(".section");
const totalSection = allSection.length;

for(let i = 0; i<totalNavList; i++) {
    const a = navList[i].querySelector('a');
    a.addEventListener('click', function(){
        // remove back section class
        for(let i = 0; i<totalSection; i++){
            allSection[i].classList.remove("back-section");
        }
        for(let j = 0; j<totalNavList; j++){
            if(navList[j].querySelector('a').classList.contains("active")){
                // add back section class
                allSection[j].classList.add("back-section")
            }
            navList[j].querySelector('a').classList.remove("active")
        }
        this.classList.add("active");
        showSection(this);

        if (window.innerWidth < 1200) {
            asideSectionTogglerBtn();
        }

    });
}

function showSection(element){
    for(let i = 0; i<totalSection; i++){
        allSection[i].classList.remove("active");
    }
    const target = element.getAttribute("href").split('#')[1];
    document.querySelector('#'+ target).classList.add("active");
}

const navTogglerBtn = document.querySelector(".nav-toggler");
const aside = document.querySelector(".aside");

navTogglerBtn.addEventListener("click", function() {
    asideSectionTogglerBtn()
});

function asideSectionTogglerBtn() {
    aside.classList.toggle("open");
    navTogglerBtn.classList.toggle("open");
    for(let i = 0; i<totalSection; i++){
        allSection[i].classList.toggle("open");
    }
}