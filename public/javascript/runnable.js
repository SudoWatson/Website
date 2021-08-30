/**
 * Adds a tag to the program
 *
 */
 function addTag(e) {  // Adds a tag
  /** Pressed key code */
  let key = e.which;
  /** Div containing tag relevent elements */
  let div = document.getElementsByClassName("tagField")[0]
  /** Textarea field where user enters the tag to add */
  let tagField = document.getElementById("tag-input")
  /** Invisible input field where tags are moved to. Value of this is actually submitted for the tags */
  let realTagField = document.getElementById("tags")

  console.log("Hello")
  if (key == 32) {  // If 'space' key is pressed, add tag
      if (tagField.value.trim() === "") return  // Don't add empty field

      /** Entered tag */
      let tag = tagField.value
      tagField.value = " "
      console.log(realTagField.value)
      console.log(tag.trim() + " ")
      if (realTagField.value.includes((tag.trim() + " "))) return  // Tag already entered
      
      /** Span element containing new tag */
      let span = document.createElement("span")
      div.insertBefore(span, tagField)
      span.appendChild(document.createTextNode(tag.trim()))
      realTagField.value = realTagField.value + tag.trim() + " "  // Don't add unnecessary whitespace
      tagField.cols = tagField.cols - tag.length
      
      //tagField.style.width = getComputedStyle(tagField).width - getComputedStyle(span).width;
  } else if (key === 8 && tagField.value === "" && div.getElementsByTagName("span").length > 0) {  // 'Backspace' - Remove last tag 
      let lastTag = div.getElementsByTagName("span")
      lastTag = lastTag[lastTag.length-1]
      realTagField.value = realTagField.value.slice(0, -(lastTag.textContent.length + 1))
      tagField.value = " " + lastTag.textContent
      lastTag.parentNode.removeChild(lastTag)
  }
}


/**
* Displays preview of programs thumbnail
*/
function previewFile() {
  let preview = document.querySelector('img');
  let file = document.querySelector('input[type=file]').files[0];
  let reader = new FileReader();
  
  reader.onloadend = function () {
    preview.src = reader.result;
  }

  if (file) {
    reader.readAsDataURL(file);
  } else {
    preview.src = "/images/noImg.jpg";
  }
}