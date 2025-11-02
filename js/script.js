document.addEventListener("DOMContentLoaded", async () => {

  try {

    const response = await fetch("../json/projects.json");

    const projects = await response.json();
 
    const container = document.getElementById("projectLists");

    container.style.display = "flex";

    container.style.flexWrap = "wrap";

    container.style.gap = "16px"; 
 


    projects.forEach((project) => {

      const card = document.createElement("div");

      card.setAttribute("data-id", project.id)

      card.style.flex = "1 1 calc(50% - 16px)"; 

      card.style.boxSizing = "border-box";

      card.style.textAlign = "center";
 
      const img = document.createElement("img");

      img.src = "../img/projects/"+project.image;

      img.alt = project.title;

      img.style.width = "100%";
 
      const title = document.createElement("h3");

      title.textContent = project.title;
 
      card.appendChild(img);

      card.appendChild(title);
 
      container.appendChild(card);

    });
    container.addEventListener("click",function(e){
      if(e.target.dataset.id>0) {
        const project=projects.find(p=>p.id==e.target.dataset.id)
      container.innerHTML=`
      <h2> ${project.title} </h2>
      <div style="width:100%">
       
      <video style="width:100%" controls>
      
      <source src="../video/${project.video}" type="video/mp4">
       
      
      </video>
      </div>
      <div> 
      ${project.content}
      </div>
      `

      }
    })

  } catch (err) {

    console.error("خطا در خواندن یا نمایش JSON:", err);

  }

});

 