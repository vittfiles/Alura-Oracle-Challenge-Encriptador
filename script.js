function isUppercase(text) {
  let regex = new RegExp("[A-Z]");
  if (regex.test(text)) {
    return true;
  }
  return false;
}

function encrypt(text) {
  let regexp = new RegExp("a|e|i|o|u");
  let res = "";
  let rest = text;
  let data = null;
  while ((data = regexp.exec(rest))) {
    res += rest.substring(0, data.index);
    switch (data[0]) {
      case "a":
        res += "ai";
        break;
      case "e":
        res += "enter";
        break;
      case "i":
        res += "imes";
        break;
      case "o":
        res += "ober";
        break;
      case "u":
        res += "ufat";
        break;
    }
    rest = rest.substring(data.index + 1, rest.length);
  }
  return res + rest;
}

function decrypt(text) {
  let res = text;
  res = res.replaceAll("ai", "a");
  res = res.replaceAll("enter", "e");
  res = res.replaceAll("imes", "i");
  res = res.replaceAll("ober", "o");
  res = res.replaceAll("ufat", "u");
  return res;
}

function init() {
  let textElement = document.getElementById("text");
  let resultElement = document.getElementById("result");

  let divResultElement = document.getElementById("div-result");
  let infoElement = document.getElementById("info");
  let toastElement = document.getElementById("toast");

  document.addEventListener("animationend", (e) => {
    if (e.target.matches(".toast.fade")) {
      e.target.classList.remove("fade");
    }
  });

  document.addEventListener("click", (e) => {
    if (e.target.matches("#encrypt")) {
      if (!isUppercase(textElement.value)) {
        resultElement.value = encrypt(textElement.value);
        textElement.value = "";
        divResultElement.classList.remove("hidden");
        infoElement.classList.add("hidden");
      }
    } else if (e.target.matches("#decrypt")) {
      if (!isUppercase(textElement.value)) {
        resultElement.value = decrypt(textElement.value);
        textElement.value = "";
      }
    } else if (e.target.matches("#copy_text")) {
      navigator.clipboard.writeText(resultElement.value);
      toastElement.classList.add("fade");
    }
  });
}

document.addEventListener("DOMContentLoaded", init);
