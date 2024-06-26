"use strict";

const URL = "http://localhost:3000/posts";
const inputTitle = document.querySelector(".title");
const inputBody = document.querySelector(".body");
const createBtn = document.querySelector(".btn-create");
let postId = 11;
const loader = document.querySelector('.loader');

function setLoading() {
  loader.classList.remove('hide');
}

function setNotLoading() {
  loader.classList.add('hide');
}

function showError(message) {
  const errorElement = document.querySelector('.error');
  errorElement.textContent = message;
  errorElement.classList.remove('hide');
}

async function getData() {
  try {
    setLoading();
    const response = await fetch(URL);
    const responseObj = await response.json();
    // getDataPosts(responseObj);
    renderPosts(responseObj);
  } catch(error) {
    showError(error.message);
  } finally {
    setNotLoading();
  }
}


getData();

function getDataPosts(result) {
  const ul = document.querySelector('.getDataPosts');
  result.forEach(object => {
    const li = document.createElement("li");
    li.innerHTML = `<br>${object.id} ${object.title}<br>${object.body}`;
    ul.append(li)
  });
}


function renderPosts(response) {
  const postList = document.querySelector(".posts");
  postList.innerHTML = '';

  response.forEach((post) => {
    const li = document.createElement("li");
    const h3 = document.createElement("h3");
    const p = document.createElement("p");
    const deleteBtn = document.createElement("button");
    const editBtn = document.createElement("button");
    const saveBtn = document.createElement('button');
    
    saveBtn.innerHTML = 'Save';
    saveBtn.classList.add('btn-save')
    editBtn.innerHTML = 'Edit';
    editBtn.classList.add('btn-edit');
    deleteBtn.innerHTML = 'Delete';
    deleteBtn.classList.add('btn-delete');

    h3.innerHTML = `${post.id} ${post.title}`;
    p.innerHTML = post.body;

    li.classList.add("post");

    editBtn.addEventListener('click', () => {
      const titleInput = document.createElement('input');
      titleInput.classList.add('create-form');
      titleInput.type = 'text';
      titleInput.value = post.title;
      h3.replaceWith(titleInput);
      li.append(saveBtn);
    });

    const id = String(post.id); 

    saveBtn.addEventListener('click',  () => {
      const updatedTitle = li.querySelector('input').value;
      
        fetch(`${URL}/${id}`, {
          method: 'PUT',
          body: JSON.stringify({ 
            title: updatedTitle,
             body: post.body,
             id: post.id,
          }),
        });
        getData();
    });

    deleteBtn.addEventListener('click', () => {
      fetch(`${URL}/${id}`, {
        method: 'DELETE',
      })
    });

    h3.append(editBtn);
    h3.append(deleteBtn);
    li.append(h3);
    li.append(p);
    postList.append(li);
  });
}


createBtn.addEventListener('click', (event) => {
  event.preventDefault();

  const title = inputTitle.value;
  const body = inputBody.value;
  const id = String(postId + 1);

  fetch(URL, {
    method: "POST",
    body: JSON.stringify({
      title,  
      body,
      id,
    }),
  })
})