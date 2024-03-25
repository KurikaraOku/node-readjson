const showCrafts = async () => {
    let response = await fetch("http://localhost:3000/api/crafts");

    let craftJSON = await response.json();
    let craftDiv = document.getElementById("craft-list");
    craftDiv.classList.add("flex-container");

    craftJSON.forEach((craft) => {
        let section = document.createElement("section");
        section.classList.add("flex-item");
        craftDiv.append(section);
        // 
        let title = craft.name;
        let img = document.createElement("img");

        img.src = "/crafts/" + craft.image;

        // click event listener to each image
        img.addEventListener("click", function() {

            let modal = document.getElementById("myModal");
            let modalTitle = modal.querySelector("#modal-title");
            let modalImg = modal.querySelector("#modal-img");
            let modalDescription = modal.querySelector("#modal-description");
            let modalSupplies = modal.querySelector("#modal-supplies");

            // the image source and description content
            modalTitle.textContent = craft.name;
            modalImg.src = this.src;
            modalDescription.innerHTML = craft.description;

            // Clear previous supplies list
            modalSupplies.innerHTML = "";

            // Populate supplies list with a simple bullet point
            craft.supplies.forEach((supply) => {
                let li = document.createElement("li");
                li.textContent = supply;
                modalSupplies.appendChild(li);
            });

            // show the modal
            modal.style.display = "block";
        });

        section.append(img);
    });
};

window.onload = () => {
    showCrafts();

    // get the modal
    var modal = document.getElementById("myModal");

    // Get the <span> element 
    var span = document.getElementsByClassName("close")[0];

    // <span> (x), close the modal
    span.onclick = function() {
        modal.style.display = "none";
    }

    // close it
    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
};