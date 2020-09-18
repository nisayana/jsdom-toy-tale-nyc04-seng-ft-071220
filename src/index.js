let addToy = false;

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
  });
  
  fetch("http://localhost:3000/toys")
  .then(res => res.json())
  .then(toysObj => {
    toysObj.forEach(toyObj => {
      turnObjToHTML(toyObj)
    })
  })

    let listOfToys = document.querySelector("div#toy-collection")
    // console.log(listOfToys)
    let turnObjToHTML = (toy) => {
      let toyCard = document.createElement("div")
      toyCard.className = "card"
      listOfToys.append(toyCard)

      let toyNameH2 = document.createElement("h2")
      let toyImage = document.createElement("img")      
      let toyP = document.createElement("p")
      let toyButton = document.createElement("button")
      toyNameH2.innerText = toy.name
      toyImage.src = toy.image
      toyP.innerText = toy.likes
      toyButton.innerText = "Like"
      toyCard.append(toyNameH2, toyImage, toyP, toyButton)

      toyButton.addEventListener("click", (evt)=> {
        let newLikeCount = toy.likes + 1
        //Update Backend
        fetch(`http://localhost:3000/toys/${toy.id}`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            likes: newLikeCount
          })
        })
        .then(res => res.json())
        .then(likeObj => {
          //Update Memory
          toy.likes = likeObj.likes
          //Update FrontEnd
          toyP.innerText = likeObj.likes
        })

      })  

    }   



    let newToyForm = document.querySelector("form.add-toy-form")
      newToyForm.addEventListener("submit", (event) => {
      event.preventDefault()
      let inputName = event.target.name.value
      let inputImage = event.target.image.value
      fetch(`http://localhost:3000/toys`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: inputName,
          image: inputImage,
          likes: 0
        })
      })
      .then(res => res.json())
      .then(newToyOb => {
        turnObjToHTML(newToyOb);
        event.target.reset()
        })
      })


});


