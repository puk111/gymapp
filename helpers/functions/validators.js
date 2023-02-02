export function validPassword(password) {
  //Minimum 5 characters,Capital letter,One nubmer :
  const re = /^(?=.*\d)(?=.*[A-Z])(.{5,50})$/;
  //
  if (re.test(password)) {
    return true;
  } else {
    return false;
  }
}

export function validEmail(email) {
  const re =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
  if (re.test(email)) {
    return true;
  } else {
    return false;
  }
}

export function namaValid(name) {
  const re = /[a-zA-Z]{4,}/;
  if (re.test(name)) {
    return true;
  } else {
    return false;
  }
}
