let addToy = false;

let toysCollection = document.querySelector("#toy-collection")
let addAToyForm = document.querySelector(".add-toy-form")

// console.log(addAToyForm)

fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then((toysArr) => {
    toysArr.forEach((toyObj) => {
      turnToyObjToLi(toyObj)
    })
  })

  let turnToyObjToLi = (toy) => {

    let toyLi = document.createElement("div")
        toyLi.className = "card"

    let toyName = document.createElement("h2")
        toyName.innerText = toy.name

    let toyImg = document.createElement("img")
        toyImg.src = toy.image
        toyImg.className = "toy-avatar"

    let toyLikes = document.createElement("p")
        toyLikes.innerText = `${toy.likes} Likes`

    let likeBtn = document.createElement("button")
        likeBtn.className = "like-btn"
        likeBtn.innerText = "Like ♥️"


    toyLi.append(toyName, toyImg, toyLikes, likeBtn)
    toysCollection.append(toyLi)

    likeBtn.addEventListener("click", (evt)=> {
      let theNewLikes = toy.likes + 1

      fetch(`http://localhost:3000/toys/${toy.id}`, {
        method: "PATCH",
        headers: {
          "content-type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify({
          likes: theNewLikes
        })        
      })
      .then(res => res.json())
      .then((updatedToy) => {
        toyLikes.innerText = `${updatedToy.likes} Likes` //Razmatazz elements from the DOM  
        
        toy.likes = updatedToy.likes //update object in memory
      })
    })

  }

  addAToyForm.addEventListener("submit", (evt) => {
    evt.preventDefault()

    let toyName = evt.target.name.value
    let toyImg = evt.target.image.value

    fetch("http://localhost:3000/toys", {
      method: "POST",
      headers: {
        "content-type": "application/json"
      },
      body: JSON.stringify({
        "name": toyName,
        "image": toyImg, 
        "likes": 0
      })
    })
    .then(res => res.json())
    // .then(turnToyObjToLi) instead of lines below
    .then(createdToy => {
      turnToyObjToLi(createdToy);
      evt.target.reset()
    })
  })

  document.addEventListener("DOMContentLoaded", () => {
    const addBtn = document.querySelector("#new-toy-btn");
    const toyFormContainer = document.querySelector(".container");
    addBtn.addEventListener("click", () => {
      // hide & seek with the form
      addToy = !addToy;
      if (addToy) {
        toyFormContainer.style.display = "block";
      } else {
        toyFormContainer.style.display = "none";
      }
    })
  });