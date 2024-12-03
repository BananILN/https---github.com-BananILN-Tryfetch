const inputPostName = document.querySelector("#new-post-title");
const inputPostId = document.querySelector("#new-post-id");
const SearchPostId = document.querySelector("#search-post-id");
const SearchPosts = document.querySelector("#search-post-min");

const ResultElements = document.querySelector(".result");

const CreatePostElement = document.querySelector(".create-form");
const SearchPostIdElement = document.querySelector(".search-form");
const SearchMinPostElement = document.querySelector(".search-post");

SearchPostIdElement.addEventListener('submit' , (event) => {
     event.preventDefault();

    fetch(`http://localhost:3000/posts/${SearchPostId.value}`)
        .then((response) =>{
            console.log("response:", response);

            if(!response.ok){
                const errorMessage = response.status === 404
                ? 'Пост по указанному идентификатору не найден'
                : 'Что-то пошло не так :('

                throw new Error(errorMessage)
            }
            return response.json();

        })
        .then((json)=>{
            console.log(json);

            const {title, views} = json;

            ResultElements.innerHTML = `
            <p>${title}, просмотров ${views}</p>`  
        })
        .catch((error) => {
            ResultElements.innerHTML = error.message
          })
});

CreatePostElement.addEventListener('submit',(event)=>{
    event.preventDefault();

    const formData = new FormData(CreatePostElement);
    const formDataObject = Object.fromEntries(formData);

    fetch(`http://localhost:3000/posts/`,{
        method: 'POST',
        body:JSON.stringify({
            ...formDataObject,
            views: 5,
        }),
        headers:{
            'Content-type': 'application/json; charset=UTF-8',
            'X-Auth-Token': 'blablabla',
        },
    }).then((response) =>{
        console.log("response:",response)
        return response.json();
    })
    .then((json)=>{
        console.log("json",json);
    })
})


SearchMinPostElement.addEventListener('submit',(event)=>{
    event.preventDefault();

    fetch(`http://localhost:3000/posts?views_gte=${SearchPosts.value}`)
    .then((response)=> response.json())
    .then((json)=>{
        console.log(json);

        ResultElements.innerHTML = json
        .map(({title,views})=> `<p>${title}, просмотров: ${views}</p>`)
        .join('');
    })
})
