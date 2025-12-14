
    //blogs
    let blogs=[]
const blogs_container = document.getElementById("blogsLists");
document.addEventListener("DOMContentLoaded", async () => {

  try {

    const response = await fetch("../json/blogs.json");

     blogs = await response.json();
 
    

    blogs_container.style.display = "flex";

    blogs_container.style.flexWrap = "wrap";

    blogs_container.style.gap = "16px"; 
 


    blogs.forEach((blog) => {

      const card = document.createElement("div");

      card.setAttribute("data-id", blog.id)

      card.style.flex = "1 1 calc(50% - 16px)"; 

      card.style.boxSizing = "border-box";

      card.style.textAlign = "center";
      card.style.cursor="pointer"
 
      const img = document.createElement("div");

      img.style.backgroundImage = "url('../img/blogs/"+blog.image+"')";

      img.style.aspectRatio = "3/2";

      img.style.width = "100%";
      img.style.backgroundSize = "cover"
      img.style.backgroundRepeat = "no-repeat"
      img.style.backgroundPosition = "center"
 
      const title = document.createElement("h3");

      title.textContent = blog.title;
 
      card.appendChild(img);

      card.appendChild(title);
 
      blogs_container.appendChild(card);

    });
    

  } catch (err) {

    console.error("خطا در خواندن یا نمایش JSON:", err);

  }

});
blogs_container.addEventListener("click",function(e){
  let video=``
  const id= Number(e.target.closest('[data-id]').dataset.id)
  console.log(id)
      if(id>0) {
        const blog=blogs.find(p=>p.id==id)
        if(blog.video_type){

        if(blog.video_type=="YouTube") {
          video=`<div style="text-align:center"> <iframe width="700" height="390" src="${blog.video}" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe> </div>` 
        } else{
          video=`<video style="width:100%" controls>
      <source src="../video/${blog.video}" type="video/mp4">
      </video>`
        }
      }
        blogs_container.innerHTML=`
      <h2> ${blog.title} </h2>
      <div  class="project_content">
       <p> <a href="blogs.html" class="back_button"> back 
      </a>
       </p>
      ${video}
      </div>
      <div> 
      ${blog.content}
      </div>
      `

      }
    })