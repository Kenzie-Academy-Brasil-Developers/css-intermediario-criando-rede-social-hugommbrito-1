// LOGICA PARA LISTAR "SUGESTÕES PARA VOCÊ SEGUIR"
let cardContainer = document.getElementById("cards-container")

for (let i = 0; i < sugestUsers.length; i++) {
    cardContainer.insertAdjacentHTML("beforeend", `
    <div class="sugestion-card flex justify-between">
        <div class="sugestion-card-user flex gap1">
            <img src=${users[sugestUsers[i]-1].img} alt="User Image">
            <div class="sugestion-card-user-info">
                <h2 class="title2">${users[sugestUsers[i]-1].user}</h2>
                <p class="text2">${users[sugestUsers[i]-1].stack}</p>
            </div>
        </div>
        <button class="button-outline sugest-button">Seguir</button>
    </div>
    `)    
}


// LOGICA PARA ALTERAR BOTÃO SEGUIR/SEGUINDO
let botaoSugestao = document.getElementsByClassName("sugest-button")

for (let i = 0; i < botaoSugestao.length; i++) {

    botaoSugestao[i].addEventListener("click", function(e){
        let botaoClicado = e.target
        botaoClicado.classList.toggle("button-outline")
        botaoClicado.classList.toggle("button-outline-active")

        if (botaoClicado.classList.contains("button-outline-active")){
            botaoClicado.innerText = "Seguindo"
        } else {
            botaoClicado.innerText = "Seguir"
        }
    })
}


// LOGICA PARA LISTAR "POSTS"
let feed = document.getElementById("feed")

//Encontra o usuário da postagem
function findPostUser(post){
    let userFound = {}

    for (let j = 0; j < users.length; j++) {
        if (post.user == users[j].id) {
            userFound = users[j]
        }        
    }
    return userFound
}

//Listar Postagens
function listarPosts(){
    feed.innerHTML = '<h2 class="title1">Posts</h2>'
    for (let i = posts.length-1; i >= 0; i--) {
        
        let currentUser = findPostUser(posts[i])
    
        //Resume textos grandes
        let resumedText = ""
        if (posts[i].text.length > 150){
            resumedText = posts[i].text.slice(0,150) + "..."
        } else {
            resumedText = posts[i].text
        }

        //Renderiza os Posts

        feed.insertAdjacentHTML("beforeend", `
        <div class="feed-post flex-col gap2">
            <div class="post-user flex gap1">
                <img src=${currentUser.img}>
                <div class="post-user-info">
                    <h2 class="title2">${currentUser.user}</h2>
                    <p class="text2">${currentUser.stack}</p>
                </div>
            </div>
            <h2 class="feed-post-title title1">${posts[i].title}</h2>
            <p class="feed-post-text text1">${resumedText}</p>
            <div class="feed-post-footer flex align-center gap1">
                <button id="btn${posts[i].id_post}" data-control-modal="modal" class="button-abrirPost button-grey1">Abrir Post</button>
                <button id="lk${posts[i].id_post}" class="like button-like">❤</button>
                <p id="lkcount${posts[i].id_post}" class="like-counter">${posts[i].likes}</p>
            </div>
         </div>
        `)
    }
}
listarPosts()


// LOGICA PARA ABRIR MODAL DE POSTS
function listenModalButtons(){
    let modal = document.getElementById("modal")
    
    let modalButton = document.querySelectorAll("[data-control-modal]")
    console.log(modalButton)
    
    for (let i = 0; i < modalButton.length; i++) {
        modalButton[i].addEventListener("click", function(e){
            modal.classList.toggle("show-modal")
    
            if(modal.classList.contains("show-modal")){
                let clickedButton = e.target
                let selectedPost = {}
                for (let j = 0; j < posts.length; j++){
                    if(clickedButton.id[3] == posts[j].id_post){
                        selectedPost = posts[j]
                    }
                }
                
                let modalCardInfo = document.getElementById("modalCardInfo")
                let postUser = findPostUser(selectedPost)
        
                modalCardInfo.innerHTML = ''
                modalCardInfo.insertAdjacentHTML("beforeend", `
                    <div class="post-user flex gap1">
                        <img src=${postUser.img} alt="User Image">
                        <div class="post-user-info">
                            <h2 class="title2">${postUser.user}</h2>
                            <p class="text2">${postUser.stack}</p>
                        </div>
                    </div>
                    <h2 class="feed-post-title title1">${selectedPost.title}</h2>
                    <p class="feed-post-text text1">${selectedPost.text}</p>
                `)
            }
    
        })    
    }
}
listenModalButtons()


//LOGICA PARA INCLUIR NOVO POST
let newPostButton = document.getElementById("newPostButton")

newPostButton.addEventListener("click", function(e){
    let newPostTitle = document.getElementById("newPostTitle")
    let newPostText = document.getElementById("newPostText")
    console.log(listarPosts)
    let newPost = {
        id_post: posts.length + 1,
        user: 1,
        title: newPostTitle.value,
        text: newPostText.value,
        likes: 0,
        liked: false,
    }
    
    posts.push(newPost)
    
    console.log(posts)
    listarPosts()

    listenLikeButton()
    
    listenModalButtons()
    e.preventDefault()
})


//LOGICA PARA FUNCIONAR O BOTÃO DE LIKE
function listenLikeButton(){
    let likeButton = document.getElementsByClassName("like")
    
    for (let i = 0; i < likeButton.length; i++) {
        likeButton[i].addEventListener("click", function(e){
            likeButton[i].classList.toggle("button-like")
            likeButton[i].classList.toggle("button-like-active")
    
            let likedPostId = e.target.id[2]
            for (let j = 0; j < posts.length; j++) {
                if(likedPostId == posts[j].id_post && posts[j].liked == false){
                    posts[j].likes++
                    posts[j].liked = true
                    console.log(posts[j].likes)
                    console.log("liked")
                    let likeCounter = document.getElementById(`lkcount${likedPostId}`)
                    likeCounter.innerText = posts[j].likes
                } else if (likedPostId == posts[j].id_post && posts[j].liked == true){
                    posts[j].likes--
                    posts[j].liked = false
                    console.log(posts[j].likes)
                    console.log("disliked")
                    let likeCounter = document.getElementById(`lkcount${likedPostId}`)
                    likeCounter.innerText = posts[j].likes
                }
            }
    
    
        })
    }
}
listenLikeButton()
