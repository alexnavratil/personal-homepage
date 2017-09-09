var router = router();
router.fallbackGet(function(){
    hideActive();
    activate("home");
});

router.get("cv", function(){
    hideActive();
    activate("cv");
});

router.get("projects", function(){
    hideActive();
    activate("projects");
});

router.get("imprint", function(){
    hideActive();
    activate("imprint");
});

router.init();

function hideActive(finishListener){
    let pages = document.getElementsByClassName("active");
    for(var i = 0; i<pages.length; i++){
        let page = pages[i];
        page.classList.remove("active");
    }
}

function activate(pageId){
    document.getElementById(pageId).classList.add("active");
}

registerProjectModalListener();

function registerProjectModalListener(){
    let projectList = document.getElementsByClassName("project");
    for (var i = 0; i<projectList.length; i++) {
        let p = projectList[i];
        p.addEventListener("click", function(){
            openModal(p);
        });
    }
}

function openModal(project) {
    let fullProject = project.querySelector(".project-full");
    let projectTitle = project.querySelector(".project-title");
    if(fullProject && projectTitle) {
        let modal = document.createElement("div");
        modal.innerHTML = `
    <div class="modal-topbar">
        <h1 class="modal-title">${projectTitle.innerHTML}</h1> 
        <i onclick="closeModal(this)" class="modal-close fa fa-close"></i>
    </div>
    <div class="modal-content">
        ${fullProject.innerHTML}    
    </div>`;
        modal.className = "modal";
        let addedModal = document.getElementById("column-container").appendChild(modal);
        window.setTimeout(function(){
            addedModal.classList.add("modal-active");
        }, 0);


    }
}

function closeModal(target){
    target.parentNode.parentNode.remove();
}