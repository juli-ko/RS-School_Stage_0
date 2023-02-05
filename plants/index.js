
//window.onload - хорошая практика работать с домом когда прогрузился window
window.onload = function(){
    console.log("hi");

    //Tag selection for blur
    //когда куда-то нажимаем называть "Handler"
    addTagsClickHandler();

    openCity(); 
}


const addTagsClickHandler = () => {
    document.querySelector('.service_btns').addEventListener('click', (event) => {
      if (event.target.classList.contains('button')) {
        let clickedTag = event.target;
        removeSelectedTagsMoreThanTwo();
        selectClickedTag(clickedTag);
        filterBySelectedTag(clickedTag.innerText);
      }
    }); 
}

const amountOfSelection = () => {
  let tags = document.querySelectorAll(".service_btns .button");
  let sum = 0;
  tags.forEach((tag) => {
    if (tag.classList.length === 2) {
      sum += 1;
    }
  });
  return sum
}
const removeSelectedTagsMoreThanTwo = () => {
  let tags = document.querySelectorAll(".service_btns .button");
  if (amountOfSelection() === 2) {
    tags.forEach((tag) => {
      tag.classList.remove("button_selected");
    });
  }
}

const selectClickedTag = (clickedTag) => {
  clickedTag.classList.toggle("button_selected");
};

const filterBySelectedTag = (selectedTag) => {
  let articles = document.querySelectorAll(".service-wrapper .service__item");
  articles.forEach( article => {
    article.classList.add("blurred");
    if (amountOfSelection()===0){
      article.classList.remove("blurred");
    }else{
      article.querySelectorAll("h3").forEach((heading) => {
        document.querySelectorAll(".button_selected").forEach((selection) => {
          if(heading.innerText ==='Garden care' && selection.innerText === 'Gardens'){
            article.classList.remove("blurred");
          }
          if(heading.innerText ==='Lawn care' && selection.innerText === 'Lawn'){
            article.classList.remove("blurred");
          }
          if(heading.innerText === selection.innerText){
            article.classList.remove("blurred");
          }
        });
      });
    }
  })
}

const openCity = () =>{
  document.querySelector(".select-css").addEventListener("click", (event) => {
    let opt = document.querySelector(".select-css > option:checked");
    console.log(opt);
    document.querySelector(".new_york").classList.remove("active");
    document.querySelector(".sherill").classList.remove("active");
    document.querySelector(".canandaigua").classList.remove("active");
    document.querySelector(".yonkers").classList.remove("active");
    if (opt.innerText === "Sherrill, NY"){
      document.querySelector(".sherill").classList.add("active");
      
    }
    if (opt.innerText === "New York City") {
      document.querySelector(".new_york").classList.add("active");
    }
    if (opt.innerText === "Canandaigua, NY") {
      document.querySelector(".canandaigua").classList.add("active");
    } 
    if (opt.innerText === "Yonkers, NY") {
      document.querySelector(".yonkers").classList.add("active");
    }  
  })
}


//if (document.querySelector(".select-css")) {
//  document.querySelector("div.city-selected.sherill").classList.add("visible");
//}

