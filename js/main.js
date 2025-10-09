const API_URL = "http://localhost:3000/posts";

// Отримання списку постів

async function getPosts() {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) {
      throw new Error("Пости не знайдено помилка 404");
    }
    return await res.json();
  } catch (error) {
    console.error(error);
  }
}

// // Створення нового поста

async function createPost(title, content) {
  try {
    const post = { title, content, comments: [] };
    const options = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(post),
    };
    const res = await fetch(API_URL, options);
    return await res.json();
  } catch (error) {
    console.error(error);
  }
}

// // Оновлення поста

async function updatePost(id, title, content) {
  try {
    const options = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, content }),
    };
    const res = await fetch(`${API_URL}/${id}`, options);
    console.log("res", res);
    return await res.json();
  } catch (error) {
    console.error(error);
  }
}

// // Видалення поста

async function deletePost(id) {
  try {
    await fetch(`${API_URL}/${id}`, { method: "DELETE" });
  } catch (error) {
    console.error(error);
  }
}

// Додавання коментаря до поста

async function createComment(postId, comment) {
  try {
    const res = await fetch(`${API_URL}/${postId}`);
    if (!res.ok) throw new Error(`Пост ${postId} не знайдено`);
    const post = await res.json();
    post.comments.push({ id: Date.now(), text: comment });

    const options = {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ comments: post.comments }),
    };
    await fetch(`${API_URL}/${postId}`, options);
  } catch (error) {
    console.error(error);
  }
}

// Оновлення відображення постів на сторінці

function renderPosts(posts) {
  // console.log(posts);

  const container = document.querySelector("#postsContainer");
  container.innerHTML = "";

  posts.forEach((post) => {
    // console.log("post", post);
    const postEl = document.createElement("div");
    postEl.classList.add("post");
    postEl.innerHTML = `
        <h2>${post.title}</h2>

        <p>${post.content}</p>

        <button class="editPostButton" data-id="${post.id}">Редагувати</button>

        <button class="deletePostButton" data-id="${post.id}">Видалити</button>

        <div class="commentsContainer" data-id="${post.id}">
          <h3>Коментарі:</h3>

          <ul>
          ${post.comments.map((comment) => `<li>${comment.text}</li>`).join("")}
            
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

document
  .getElementById("createPostForm")
  .addEventListener("submit", handlerCreatePost);

async function handlerCreatePost(evt) {
  evt.preventDefault();
  const title = document.querySelector("#titleInput").value;
  const content = document.querySelector("#contentInput").value;
  await createPost(title, content);
  renderPosts(await getPosts());
  evt.target.reset();
}

// Обробник події для редагування поста

document.addEventListener("click", async (evt) => {
  if (evt.target.classList.contains("editPostButton")) {
    evt.preventDefault();
    const id = evt.target.dataset.id;
    const newTitle = prompt("Новий заголовок:");
    const newContent = prompt("Новий зміст:");

    if (newTitle && newContent) {
      await updatePost(id, newTitle, newContent);
      renderPosts(await getPosts());
    }
  }
});

// Обробник події для видалення поста

document.addEventListener("click", async (e) => {
  if (e.target.classList.contains("deletePostButton")) {
    const id = e.target.dataset.id;
    await deletePost(id);
    renderPosts(await getPosts());
  }
});

// Обробник події для додавання коментаря

document.addEventListener("submit", async (e) => {
  if (e.target.classList.contains("createCommentForm")) {
    e.preventDefault();
    const postId = e.target.dataset.id;
    const input = e.target.querySelector(".commentInput");
    await createComment(postId, input.value);
    renderPosts(await getPosts());
  }
});

// Запуск додатку

async function startApp() {
  const posts = await getPosts();

  renderPosts(posts);
}

startApp();
