const bakeryItems={
    cakes:['cake-1.jpeg','cake-2.jpeg','cake-3.jpeg'],
    cupcakes:['cupcake-1.jpeg','cupcake-2.jpeg','cupcake-3.jpeg'],
    sweets:['sweets-1.jpeg','sweets-2.jpeg','sweets-3.jpeg'],
    doughnuts:['doughnut-1.jpeg','doughnut-2.jpeg','doughnut-3.jpeg']
}

const search=document.getElementById("search");
const btns=document.querySelectorAll('.btn');
const items=document.querySelector('.items');
const modal=document.querySelector('.modal');
const modalCross=document.querySelector('.modal__cross');
const modalImg=document.querySelector('.modal__img');
const modalLeft=document.querySelector('.modal-left');
const modalRight=document.querySelector('.modal-right');

const cart=document.querySelector('.cart');
const cartItems=document.querySelector('.cart__items');
const cartBtn=document.querySelector('.details__cart');

let currentItem;
let currentIndex;
let cartThings=[];

//Print items according to button selected
btns.forEach(function(btn){
    btn.addEventListener('click',function(e){
        currentItem=e.target.dataset.filter;
        printItem(e.target.dataset.filter);
    });
});

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
                <button class="item__icon__container">
                    <svg class="cart__icon">
                        <use xlink:href="img/sprite.svg#icon-shopping-cart"></use>
                    </svg>
                </button>
            </div>
            <div class="item__details">
                <div class="item__details-name">${str[0].toUpperCase()+str.slice(1)}</div>
                <div class="item__details-price">$5</div>
            </div>
        </div>`;
    items.insertAdjacentHTML('afterbegin',html);
}

//Search
function getValue(){
    items.innerHTML='';
    searchValue=search.value;
    checkValue(searchValue);
}

function checkValue(val){
    for(const prop in bakeryItems){
        if(prop.startsWith(val)){
            printItem(prop,'no');
        }
    }    
}

//Show item in a modal on clicking the item
function toggleModal(e){
    if(e.target.classList.value==='item__img' || e.target.classList.value==='modal__cross'){
        modalImg.src=e.target.src;
        currentIndex=bakeryItems[currentItem].indexOf(splitStr(e.target.src));
        modal.classList.toggle('show-modal');
    }
}

function splitStr(imgSrc){
    imgSrc1=imgSrc.split('/img/')[1];
    return imgSrc1;
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

//Add cart item
function addCart(e){
    if(e.target.closest('.item__icon__container')){
        imgSrc=splitStr(e.target.closest('.item-img__container').firstElementChild.src);
        itemName=imgSrc.split('-')[0];
        if(!cartThings.includes(imgSrc)){
            addCartHtml(itemName,imgSrc);
        }
    }
}

function addCartHtml(str,item){
    const html=`
        <div class="cart__item">
            <img src="./img/${item}" alt="Cart Item img" class="cart__item__img">
            <div class="cart__item--details">
                <div class="cart__item--name">
                    ${str[0].toUpperCase()+str.slice(1)}
                </div>
                <div class="cart__item--price">
                    $5
                </div>
            </div>
            <button class="cart__item__icon__container">
                <svg class="cart__icon">
                    <use xlink:href="img/sprite.svg#icon-trash"></use>
                </svg>
            </button>
        </div>`;
    cartThings.push(item);
    cartItems.insertAdjacentHTML('afterbegin',html);
}

function toggleCart(){
    cart.classList.toggle('cart--open');
}

items.addEventListener('click',toggleModal);
items.addEventListener('click',addCart);
modalCross.addEventListener('click',toggleModal);
modalLeft.addEventListener('click',moveLeft);
modalRight.addEventListener('click',moveRight);
cartBtn.addEventListener('click',toggleCart);
//printItem('all');