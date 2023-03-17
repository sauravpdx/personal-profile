// Select the scheduling button and add a click event listener
const schedulingButton = document.querySelector("#scheduling-button");
schedulingButton.addEventListener("click", () => {
  window.open("https://calendly.com/saurav2/30min", "_blank");
});

// Education data array containing objects with school information
const educationData = [
  {
    schoolName: "Portland State University",
    schoolWebsite: "https://www.pdx.edu/",
    degree: "Master's of Science",
    fieldOfStudy: "Computer Science",
    startDate: "Sep 2022",
    endDate: "Mar 2024",
    iconSrc: "./assets/pdx-logo.png",
  },
  {
    schoolName: "B.I.T. Sindri",
    schoolWebsite: "https://www.pdx.edu/",
    degree: "Bachelor's of Technology",
    fieldOfStudy: "Computer Science",
    startDate: "Aug 2016",
    endDate: "May 2020",
    iconSrc: "./assets/BIT-Sindri-logo.png",
  },
];

// Function to create education cards based on the education data array
const createEducationCards = () => {
  const cards = educationData
    .map((item) => {
      // Return a template string with HTML structure for each card
      return `
      <div class="col-md-6">
        <div class="card mb-3">
          <div class="row g-0">
            <div class="col-md-4 p-2 d-flex align-items-center justify-content-center">
              <img src="${item.iconSrc}" class="img-fluid rounded-start" style="height: 8rem" alt="${item.schoolName} Logo" />
            </div>
            <div class="col-md-8">
              <div class="card-body">
                <p class="card-title">${item.schoolName}</p>
                <p class="card-text m-0 p-0">${item.degree} in ${item.fieldOfStudy}</p>
                <p class="card-text m-0 p-0">${item.startDate} - ${item.endDate}</p>
                <p class="card-text">GPA - 3.67 / 4.00</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
    })
    .join("");

  // Return a template string with a row containing all the cards
  return `<div class="row">${cards}</div>`;
};

// Insert the generated education cards into the education container
document.querySelector("#education-container").innerHTML =
  createEducationCards();

// Select the form and form status elements
const form = document.querySelector("form");
const formStatus = document.getElementById("form-status");

// Function to show an alert with a specified message and bootstrap class
const showAlert = (message, alertClass) => {
  const alert = document.createElement("div");
  alert.className = `alert ${alertClass} fade show`;
  alert.role = "alert";
  alert.innerHTML = message;
  formStatus.appendChild(alert);

  // Remove the alert after 5 seconds
  setTimeout(() => {
    alert.classList.remove("show");
    setTimeout(() => {
      formStatus.removeChild(alert);
    }, 500);
  }, 5000);
};

// Async function to handle form submission
// This fetch function is modified from https://help.formspree.io/hc/en-us/articles/360013470814-Submit-forms-with-JavaScript-AJAX-
const handleSubmit = async (event) => {
  event.preventDefault();
  const data = new FormData(event.target);

  try {
    const response = await fetch(event.target.action, {
      method: form.method,
      body: data,
      headers: { Accept: "application/json" },
    });
    if (response.ok) {
      // Show a generic alert
      showAlert("Thanks for your submission!", "alert-success");
      form.reset();
    } else {
      const data = await response.json();
      if (Object.hasOwn(data, "errors")) {
        showAlert(
          data.errors.map((error) => error.message).join(", "),
          "alert-danger"
        );
      } else {
        showAlert(
          "Oops! There was a problem submitting your form",
          "alert-danger"
        );
      }
    }
  } catch (error) {
    showAlert("Oops! There was a problem submitting your form", "alert-danger");
  }
};

// Add a submit event listener to the form
form.addEventListener("submit", handleSubmit);
