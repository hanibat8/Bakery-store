const bakeryItems={
    cakes:['cake-1.jpeg','cake-2.jpeg','cake-3.jpeg'],
    cupcakes:['cupcake-1.jpeg','cupcake-2.jpeg','cupcake-3.jpeg'],
    sweets:['sweets-1.jpeg','sweets-2.jpeg','sweets-3.jpeg'],
    doughnuts:['doughnut-1.jpeg','doughnut-2.jpeg','doughnut-3.jpeg']
}

const btns=document.querySelectorAll('.btn');
const items=document.querySelector('.items');
const modal=document.querySelector('.modal');
const modalCross=document.querySelector('.modal__cross');
const modalImg=document.querySelector('.modal__img');
const modalLeft=document.querySelector('.modal-left');
const modalRight=document.querySelector('.modal-right');

let currentItem;
let currentIndex;

function printItem(str,clear='yes'){
    clear==='yes'? items.innerHTML='':items.innerHTML;
    if(str==='all'){
        for(let item in bakeryItems){
            bakeryItems[item].forEach(addHtml.bind(null,item));
        }
    }
    else{
        bakeryItems[str].forEach(addHtml.bind(null,str));
    }
}

function addHtml(str,item){
    const html=`
        <div class="item">
            <div class="item-img__container">
                <img src="./img/${item}" alt="Item img" class="item__img">
            </div>
            <div class="item__details">
                <div class="item__details-name">${str}</div>
                <div class="item__details-price">$5</div>
            </div>
        </div>`;
    items.insertAdjacentHTML('afterbegin',html);
}

function getValue(){
    items.innerHTML='';
    const search=document.getElementById("search");
    const searchValue=search.value;
    checkValue(searchValue);
}

function checkValue(val){
    debugger;
    for(const prop in bakeryItems){
        if(val.length===1){
            if(prop.startsWith(val)){
                printItem(prop,'no');
            }
        }
        else{
            if(val!=='' && prop.includes(val)){
                printItem(prop,'no');
            }  
        }
    }    
}

function toggleModal(e){
    modalImg.src=e.target.src;
    currentIndex=bakeryItems[currentItem].indexOf(e.target.src.split('/img/')[1]);
    modal.classList.toggle('show-modal');
}

function moveLeft(){
    currentIndex===bakeryItems[currentItem].length-1 ? currentIndex=0:currentIndex++;
    addImg(currentIndex);
}

function moveRight(){
    currentIndex===0 ? currentIndex=(bakeryItems[currentItem].length)-1:currentIndex--;
    addImg(currentIndex);
}

function addImg(){
    modalImg.src ='http://127.0.0.1:5500/img/'+bakeryItems[currentItem][currentIndex];
}

btns.forEach(function(btn){
    btn.addEventListener('click',function(e){
        currentItem=e.target.dataset.filter;
        printItem(e.target.dataset.filter);
    });
});

items.addEventListener('click',toggleModal);
modalCross.addEventListener('click',toggleModal);
modalLeft.addEventListener('click',moveLeft);
modalRight.addEventListener('click',moveRight);