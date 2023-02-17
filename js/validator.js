// Validation script for the form

const EMAIL_REGEX = /[\w]+@[a-z]+[\.][a-z]+/;

/** Validates the form element on submit. */
function validateForm() {
  const form = document.querySelector("form");
  const formData = new FormData(form);
  const isValidStatuses = [];
  let index = 0;

  for (const pair of formData.entries()) {
    const [name, value] = pair;
    isValidStatuses[index++] = isValid(name, value);
  }

  if (isValidStatuses.every((entry) => entry)) {
    form.submit();
  }
}

/** Checks whether a given input and value are valid, and sets the error states. */
function isValid(name, value) {
  const currentInput = document.querySelector(`input[name="${name}"]`);
  // added requirements for email and password
  // email must have valid syntax
  // password must be at least 8 characters
  if (
    value === "" ||
    !value ||
    (name === "password" && value.length < 8) ||
    (name === "email" && !value.match(EMAIL_REGEX))
  ) {
    showError(name, currentInput);
    return false;
  } else {
    clearError(name, currentInput);
    return true;
  }
}

/** Changes the elements of the UI to show the error state. */
function showError(name, input) {
  input.classList.add("error");
  input.setAttribute("aria-invalid", "true");
  const errorIcon = document.querySelector(`input[name="${name}"] + .error-icon`);
  errorIcon.classList.remove("hidden");
  errorIcon.ariaHidden = "false";
  const fieldset = input.closest("fieldset");
  const fieldsetChildren = Array.from(fieldset.children);
  const errorSpan = fieldsetChildren.at(-1);

  let errorMessage;
  if (name === "password") {
    errorMessage = "Password must be at least 8 characters long!";
    const eyeIcon = document.querySelector("button.eye-icon");
    eyeIcon.classList.add("hidden");
  } else {
    errorMessage = "A valid email is required!";
  }

  input.setAttribute("aria-errormessage", errorMessage);
  errorSpan.innerText = errorMessage;
  errorSpan.classList.remove("hidden");
  errorSpan.ariaHidden = "false";
}

/** Removes the error state from the UI. */
function clearError(name, input) {
  input.classList.remove("error");
  input.removeAttribute("aria-invalid");
  input.removeAttribute("aria-errormessage");
  const errorIcon = document.querySelector(`input[name="${name}"] + .error-icon`);
  errorIcon.classList.add("hidden");
  errorIcon.ariaHidden = "true";
  const fieldset = input.closest("fieldset");
  const fieldsetChildren = Array.from(fieldset.children);
  const errorSpan = fieldsetChildren.at(-1);
  errorSpan.classList.add("hidden");
  errorSpan.ariaHidden = "true";

  if (name === "password") {
    const eyeIcon = document.querySelector("button.eye-icon");
    eyeIcon.classList.remove("hidden");
  }
}

/** Toggles the visibility of the password element. */
function togglePassword(event) {
  const passwordInput = document.querySelector("input[name='password']");
  const shownIcon = event.target;

  let newSrc;
  if (shownIcon.src.includes("eye-show-icon")) {
    newSrc = shownIcon.src.replace("show", "hide");
    passwordInput.setAttribute("type", "text");
  } else {
    newSrc = shownIcon.src.replace("hide", "show");
    passwordInput.setAttribute("type", "password");
  }
  shownIcon.setAttribute("src", newSrc);
}
