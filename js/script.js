let projects=[]
const container = document.getElementById("projectLists");
document.addEventListener("DOMContentLoaded", async () => {

  try {

    const response = await fetch("../json/projects.json");

     projects = await response.json();
 
    

    container.style.display = "flex";

    container.style.flexWrap = "wrap";

    container.style.gap = "16px"; 
 


    projects.forEach((project) => {

      const card = document.createElement("div");

      card.setAttribute("data-id", project.id)

      card.style.flex = "1 1 calc(50% - 16px)"; 

      card.style.boxSizing = "border-box";

      card.style.textAlign = "center";
      card.style.cursor="pointer"
 
      const img = document.createElement("div");

      img.style.backgroundImage = "url('../img/projects/"+project.image+"')";

      img.style.height = "200px";

      img.style.width = "300px";
      img.style.backgroundSize = "cover"
      img.style.backgroundRepeat = "no-repeat"
      img.style.backgroundPosition = "center"
 
      const title = document.createElement("h3");

      title.textContent = project.title;
 
      card.appendChild(img);

      card.appendChild(title);
 
      container.appendChild(card);

    });
    

  } catch (err) {

    console.error("خطا در خواندن یا نمایش JSON:", err);

  }

});
container.addEventListener("click",function(e){
  let video=``
  const id= Number(e.target.closest('[data-id]').dataset.id)
  console.log(id)
      if(id>0) {
        const project=projects.find(p=>p.id==id)

        if(project.video_type=="YouTube") {
          video=`<div style="text-align:center"> <iframe width="700" height="390" src="${project.video}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> </div>` 
        } else{
          video=`<video style="width:100%" controls>
      <source src="../video/${project.video}" type="video/mp4">
      </video>`
        }
        container.innerHTML=`
      <h2> ${project.title} </h2>
      <div  class="project_content">
       <p> <a href="projects.html" class="back_button"> back 
      </a>
       </p>
      ${video}
      </div>
      <div> 
      ${project.content}
      </div>
      `

      }
    })
 