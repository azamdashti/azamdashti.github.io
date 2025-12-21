
  
    let talks=[]
const talks_container = document.getElementById("talksLists");
document.addEventListener("DOMContentLoaded", async () => {

  try {

    const response = await fetch("../json/talks.json");

     talks = await response.json();
 
    

    talks_container.style.display = "flex";

    talks_container.style.flexWrap = "wrap";

    talks_container.style.gap = "16px"; 
 


    talks.forEach((talk) => {

      const card = document.createElement("div");

      card.setAttribute("data-id", talk.id)

      card.style.flex = "1 1 calc(50% - 16px)"; 

      card.style.boxSizing = "border-box";

      card.style.textAlign = "center";
      card.style.cursor="pointer"
 
      const img = document.createElement("div");

      img.style.backgroundImage = "url('../img/talks/"+talk.image+"')";

      img.style.aspectRatio = "3/2";

      img.style.width = "100%";
      img.style.backgroundSize = "cover"
      img.style.backgroundRepeat = "no-repeat"
      img.style.backgroundPosition = "center"
 
      const title = document.createElement("h3");

      title.textContent = talk.title;
 
      card.appendChild(img);

      card.appendChild(title);
 
      talks_container.appendChild(card);

    });
    

  } catch (err) {

    console.error("خطا در خواندن یا نمایش JSON:", err);

  }

});
talks_container.addEventListener("click",function(e){
  let video=``
  const id= Number(e.target.closest('[data-id]').dataset.id)
  console.log(id)
      if(id>0) {
        const talk=talks.find(p=>p.id==id)
        if(talk.video_type){

        if(talk.video_type=="YouTube") {
          video=`<div style="text-align:center"> <iframe width="700" height="390" src="${talk.video}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> </div>` 
        } else{
          video=`<video style="width:100%" controls>
      <source src="../video/${talk.video}" type="video/mp4">
      </video>`
        }
      }
        talks_container.innerHTML=`
      <h2> ${talk.title} </h2>
      <div  class="project_content">
       <p> <a href="talks.html" class="back_button"> back 
      </a>
       </p>
      ${video}
      </div>
      <div> 
      ${talk.content}
      </div>
      `

      }
    })