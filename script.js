let contentElememnt = document.querySelector(".content");
let tableElement = document.createElement("table");
tableElement.style.marginLeft= "auto";
tableElement.style.marginRight= "auto";
document.querySelector(".abb").addEventListener("click",()=>{

    search(document.querySelector(".input").value)  
})

async function search(title){
 
    let response = await fetch("https://www.anapioficeandfire.com/api/books?name="+title)
    let data = await response.json()
    showResponse(data);
 
}

function showResponse(data){

        let d1 = creatediv("Name",data[0].name);
        let d2 = creatediv("Author",data[0].authors[0]);
        let d3 = creatediv("Country",data[0].country);
        let d4 = creatediv("Publisher",data[0].publisher);
        let d5 = creatediv("Released",data[0].released);
        let d6 = creatediv("Pages",data[0].numberOfPages); 
        let d7 = creatediv(" Characters ","");
        contentElememnt.append(d1,d2,d3,d4,d5,d6,d7);
 
        if(data[0].povCharacters.length > 2){
            createFormElememnt(0,data[0].povCharacters)
            createPagination(data[0].povCharacters)    
        }
        else{
            createFormElememnt(0,data[0].characters)
            createPagination(data[0].characters) 
        }
}

function creatediv(title,item){
    let divElement = document.createElement("div");
    divElement.setAttribute("class","text-center")
    let spanElement = document.createElement("span");
    spanElement.style.display ="inline";
    spanElement.style.fontWeight="bold";
    spanElement.innerHTML= title+": "
    let pElement = document.createElement("p")
    //pElement.setAttribute("class","text-center");
    pElement.style.display ="inline";
    pElement.innerHTML= item;
    divElement.append(spanElement,pElement)
    return divElement;
}

async function createFormElememnt(index,formData){
    let n = formData.length;
    tableElement.innerHTML="";
    tableElement.setAttribute("class","text-center offset-4")
    tableElement.style.border="1px solid black"
    let theadElement = document.createElement("thead")
    let thrElement = document.createElement("tr")
    let th1Element1 = document.createElement("th")
    th1Element1.style.border="1px solid black"
    th1Element1.innerHTML="Name";
    let th1Element2 = document.createElement("th")
    th1Element2.style.border="1px solid black"
    th1Element2.innerHTML="Gender";
    let th1Element3 = document.createElement("th")
    th1Element3.style.border="1px solid black"
    th1Element3.innerHTML="Culture";
    let th1Element4 = document.createElement("th")
    th1Element4.style.border="1px solid black"
    th1Element4.innerHTML="PlayedBY";
    thrElement.append(th1Element1,th1Element2,th1Element3,th1Element4)
    let tbodyElement = document.createElement("tbody")
    for(let i = (index*10);i< ((index*10)+10) && i<n;i++){
        let resp = await fetch(formData[i]);
        let resp2 = await resp.json()
        let tr = createTableRow(resp2);
        tbodyElement.append(tr);
    }
    theadElement.append(thrElement);
    tableElement.append(theadElement,tbodyElement);
    contentElememnt.append(tableElement);     
}

//createTableRow() will create table rows
function createTableRow(resp){
    let tr = document.createElement("tr");
    tr.style.border="1px solid black"
    let td1 = document.createElement("td");
    td1.style.border="1px solid black"
    td1.innerHTML=resp.name;
    let td2 = document.createElement("td");
    td2.style.border="1px solid black"
    td2.innerHTML=resp.gender;
    let td3 = document.createElement("td");
    td3.style.border="1px solid black"
    td3.innerHTML=resp.culture;
    let td4 = document.createElement("td");
    td4.style.border="1px solid black"
    td4.innerHTML=resp.playedBy[0];
    tr.append(td1,td2,td3,td4)
    return tr;
}

//createPagination() will create pagination.
function createPagination(respData){
let n= respData.length;

let rem=n/10;
let d=  n%10;

if(d === 0)
rem =rem;
else
rem=rem+1;

 let ulElements = document.createElement("ul");
 ulElements.setAttribute("class","pagination justify-content-center");
      let liElement1 = document.createElement("li");
      liElement1.setAttribute("class","page-item")
      let aElement1 = document.createElement("a");
      aElement1.setAttribute("class","page-link")
      aElement1.href = "#";
      aElement1.innerHTML = "previous";
      liElement1.append(aElement1);
      ulElements.append(liElement1);
      liElement1.addEventListener("click",()=>{
        let nump= document.querySelector("#a1").innerHTML;
        nump= +nump;
           if(nump === 1){
            createPagDynamics(1,ulElements,rem,liElement1,liElement2,respData);          
           }
           else{
            
             createPagDynamics(nump-1,ulElements,rem,liElement1,liElement2,respData)  
           }  
      })
     
      let liElement2 = document.createElement("li");
      liElement2.setAttribute("class","page-item")
      let aElement2 = document.createElement("a");
      aElement2.href = "#";
      aElement2.innerHTML = "Next";
      aElement2.setAttribute("class","page-link")
      liElement2.append(aElement2);


    
     createPagDynamics(1,ulElements,rem,liElement1,liElement2,respData);
      
        liElement2.addEventListener("click",()=>{
        let ele= document.querySelector("#a1");
        
        let nump= document.querySelector("#a1").innerHTML;
        nump= +nump;
           if(nump+3 <=rem){
             createPagDynamics(nump+1,ulElements,rem,liElement1,liElement2,respData)
           }  

      })
     
        contentElememnt.append(ulElements);   
}

function createPagDynamics(num1,ulElements,rem,liElement1,liElement2,data){
    ulElements.innerHTML="";
    ulElements.append(liElement1);
    let j=1;
    for(let i=num1 ; i<= num1+2 && i<=rem ; i++ ){
        let liElement = document.createElement("li");
        liElement.setAttribute("class","page-item")
        let aElement = document.createElement("a");
        aElement.href = "#";
        aElement.innerHTML=i;
        aElement.setAttribute("class","page-link");
        aElement.setAttribute("id","a"+j);
        liElement.append(aElement);
        liElement.addEventListener("click",(e)=>{
            let target = e.path[0]
            let val=  target.innerHTML;
            val= +val-1
            createFormElememnt(val,data);
        })
        ulElements.append(liElement);
        j++;
    }
    ulElements.append(liElement2);
}


