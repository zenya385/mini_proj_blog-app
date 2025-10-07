const API_URL = "http://localhost:3000/posts/";
// Отримання списку постів

async function getPosts() {
  try {
    const res = await fetch(API_URL);
    console.log(res);
    if (!res.ok) {
      throw new Error("Пости не знайдено помилка 404");
    }
    return res.json();
  } catch (error) {
    console.error(error);
  }
}

// getPosts().then((data) => {
//   console.log("data", data);
// });

// // Створення нового поста

// async function createPost(title, content) {
//   try {
//   } catch (error) {
//     console.error(error);
//   }
// }

// // Оновлення поста

// async function updatePost(id, title, content) {
//   try {
//   } catch (error) {
//     console.error(error);
//   }
// }

// // Видалення поста

// async function deletePost(id) {
//   try {
//   } catch (error) {
//     console.error(error);
//   }
// }

// // Додавання коментаря до поста

// async function createComment(postId, comment) {
//   try {
//   } catch (error) {
//     console.error(error);
//   }
// }

// Оновлення відображення постів на сторінці

function renderPosts(posts) {
  const container = document.querySelector("#postsContainer");
  container.innerHTML = "";

  posts.forEach((post) => {
    const postEl = createElement("div");
    postEl.classList.add("post");
    postEl.innerHTML = `
        <h2>${post.title}</h2>

        <p>${post.content}</p>

        <button class="editPostButton" data-id="${post.id}">Редагувати</button>

        <button class="deletePostButton" data-id="${post.id}">Видалити</button>

        <div class="commentsContainer" data-id="${post.id}">
          <h3>Коментарі:</h3>

          <ul>
          ${post.comments.map((comment) => <li>${comment.text}</li>).join("")}
            
          </ul>

          <form class="createCommentForm" data-id='${post.id}'>
            <input
              type="text"
              class="commentInput"
              placeholder="Новий коментар"
              required
            />

            <button type="submit">Додати коментар</button>
          </form>
        </div>
    
    `;
    container.appendChild(postEl);
  });
}

// // Обробник події для створення поста

// document.getElementById("createPostForm").addEventListener("submit", cb);

// // Обробник події для редагування поста

// document.addEventListener("click", cb);

// // Обробник події для видалення поста

// document.addEventListener("click", cb);

// // Обробник події для додавання коментаря

// document.addEventListener("submit", cb);

// // Запуск додатку

// async function startApp() {
//   const posts = await getPosts();

//   renderPosts(posts);
// }

// startApp();
