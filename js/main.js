const frame=document.querySelector("section");
const lists=frame.querySelectorAll("article");
const deg = 45; //각각의 article요소가 회전할각도
const len = lists.length-1; //순번이 0부터 시작하므로 전체 개수에서 1을뺌
const prev = document.querySelector(".btnPrev");
const next = document.querySelector(".btnNext");
const audio = frame.querySelectorAll("audio");
let i = 0;
let num =0;
let active = 0;

//article의 개수만큼 반복
for(let el of lists){
    let pic = el.querySelector(".pic");
    //각 article요소를 45도씩 회전하고 아래로 배치
    el.style.transform = `rotate(${deg * i}deg) translateY(-100vh)`; 
    pic.style.backgroundImage = `url(img/member${i+1}.jfif)`;    
    i++;

    //각 article 요소 안쪽의 재생, 정지, 처음부터 재생 버튼을 변수에 저장
    let play = el.querySelector(".play");
    let pause = el.querySelector(".pause");
    let load = el.querySelector(".load");

    //play버튼 클릭시
    play.addEventListener("click", (e)=>{
        let isActive = e.currentTarget.closest("article").classList.contains("on");
        if(isActive){
        //play 버튼부터 .pic요소까지 탐색한 뒤 클래스 on 추가하여 활성화
        e.currentTarget.closest("article").querySelector(".pic").classList.add("on");
        //play 버튼부터 audio요소까지 탐색한 뒤 음악 재생
        e.currentTarget.closest("article").querySelector("audio").play();
        }
    });

    pause.addEventListener("click",(e)=>{
        let isActive = e.currentTarget.closest("article").classList.contains("on");
        if(isActive){
        //pause버튼부터 .pic 요소까지 탐색한 뒤 클래스 on 제거하여 비활성화
        e.currentTarget.closest("article").querySelector(".pic").classList.remove("on");
        //pause 버튼부터 audio요소까지 탐색한 뒤 음악정지
        e.currentTarget.closest("article").querySelector("audio").pause();
        }
    });

    //load 버튼 클릭시
    load.addEventListener("click", e=>{
        let isActive = e.currentTarget.closest("article").classList.contains("on");
        if(isActive){
        //load 버튼부터 .pic요소까지 탐색한 뒤 클래스 on추가하여 활성화
        e.currentTarget.closest("article").querySelector(".pic").classList.add("on");
        //load버튼부터 audio요소까지 탐색한 뒤 음악 다시 로드하고 재생
        e.currentTarget.closest("article").querySelector("audio").load();
        e.currentTarget.closest("article").querySelector("audio").play();
        }
    });
}

function initMusic(){
    for(let el of audio){
        el.pause();
        el.load();
        el.parentElement.previousElementSibling.classList.remove("on");
    }
}

prev.addEventListener("click", ()=>{
    initMusic();
    num++;
    frame.style.transform = `rotate(${deg*num}deg)`;
    (active==0) ? active = len : active--;
    activation(active,lists);
});
next.addEventListener("click", ()=>{
    initMusic();
    num--;
    frame.style.transform = `rotate(${deg*num}deg)`;
    (active==len) ? active = len : active++;
    activation(active,lists);
});

function activation(index,lists){
    for(let el of lists){
        el.classList.remove("on");
    }
    lists[index].classList.add("on");
}


