/**
 * Adds a tag to the program
 *
 */
 function addTag(e) {  // Adds a tag
  /** Pressed key code */
  let key = e.which;
  /** Div containing tag relevent elements */
  let div = document.getElementsByClassName("tagField")[0]
  /** Textarea field where user enters the new tag to add */
  let newTag = document.getElementById("new-tag")
  /** Invisible input field where tags are moved to. Value of this is actually submitted for the tags */
  let tagField = document.getElementById("tags")

  if (key == 32) {  // If 'space' key is pressed, add tag
      if (newTag.value.trim() === "") return  // Don't add empty field

      /** Entered tag */
      let tag = newTag.value
      newTag.value = " "
      if (tagField.value.includes((tag.trim() + " "))) return  // Tag already entered
      
      /** Span element containing new tag */
      let span = document.createElement("span")
      div.insertBefore(span, newTag)
      span.appendChild(document.createTextNode(tag.trim()))
      tagField.value = tagField.value + tag.trim() + " "  // Add tag to full list
      tagField.style.width = getComputedStyle(tagField).width - getComputedStyle(span).width;
  } else if (key === 8 && newTag.value === "" && div.getElementsByTagName("span").length > 0) {  // 'Backspace' - Remove last tag 
      let lastTag = div.getElementsByTagName("span")
      lastTag = lastTag[lastTag.length-1]
      tagField.value = tagField.value.slice(0, -(lastTag.textContent.length + 1))
      newTag.value = " " + lastTag.textContent
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