import { User } from "./classes/userClass.js";

export const users = [];

window.onload = () => {
  console.log("loaded");
  document.querySelector(`#getUserForm`).addEventListener(`submit`, (e) => {
    console.log("submitted");
    e.preventDefault();
    let username = document.querySelector(`#username`).value.trim();
    if (username === ``) {
      return;
    }
    username = username[0].toUpperCase() + username.substring(1);
    users.push(new User(username));
    console.log(users);
  });

  /*document.querySelector(`#monthSelector`).addEventListener(`change`, (e) => {
    console.log("e");
  });*/
};
