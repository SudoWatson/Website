function addTag(e) {
    let key = e.which;
    if (key == 32) {  // If 'space' key is pressed, add tag
        let str = document.getElementsByClassName("tags")[0].getElementsByTagName("input")[0].value
        console.log(str)
        document.getElementsByClassName("tags")[0].getElementsByTagName("input")[0].value = ""
    }
}
