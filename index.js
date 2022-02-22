const adviceCont = document.querySelector(".advice");
const adviceTxt = document.querySelector(".advice-txt");
const adviceId = document.querySelector(".advice-id-number");
const adviceDice = document.querySelector(".dice-icon-cont");

const adviceUrl = "	https://api.adviceslip.com/advice";

adviceDice.addEventListener("click", getAdvice);

function getAdvice() {
  adviceDice.removeEventListener("click", getAdvice);
  adviceDice.classList.add("active");
  fetch(adviceUrl)
    .then((response) => {
      response
        .json()
        .then((data) => {
          const id = data["slip"]["id"];
          const advice = data["slip"]["advice"];
          adviceId.textContent = id;
          adviceTxt.textContent = advice;
          localStorage.id = id;
          localStorage.advice = advice;
        })
        .then(() => {
          adviceDice.classList.remove("active");
          adviceCont.classList.add("changing");
          window.setTimeout(() => {
            adviceDice.addEventListener("click", getAdvice);
            adviceCont.classList.remove("changing");
          }, 2100);
        });
    })
    .catch((error) => {
      console.warn("an error occured. " + error);
    });
}

window.addEventListener("load", () => {
  console.log("loaded");
  adviceId.textContent = localStorage.id;
  adviceTxt.textContent = localStorage.advice;
});
