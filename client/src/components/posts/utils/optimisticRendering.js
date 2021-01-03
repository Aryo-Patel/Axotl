export function optimisticRenderingPost(e, liked) {
    console.log("function hit");
    // if (e.target.classList.contains("post__like-icon")) {
    console.log(liked);
    console.log("if");
    console.log(e.target.parentNode.childNodes[0]);
    if (e.target.parentNode.childNodes[0].textContent === "'\u00a0'") {
        if (liked) {
            console.log("UNLIKING")
            e.target.parentNode.childNodes[0].textContent = "'\u00a0'";
        } else {
            console.log("LIKING")
            e.target.parentNode.childNodes[0].textContent = "1";
        }
    } else if (e.target.parentNode.childNodes[0].textContent === "1") {
        if (liked) {
            e.target.parentNode.childNodes[0].textContent =
                "\u00a0";
        } else {
            e.target.parentNode.childNodes[0].textContent =
                Number(e.target.parentNode.childNodes[0].textContent) + 1;
        }
    } else {
        if (liked) {
            e.target.parentNode.childNodes[0].textContent =
                Number(e.target.parentNode.childNodes[0].textContent) - 1;
        } else {
            e.target.parentNode.childNodes[0].textContent =
                Number(e.target.parentNode.childNodes[0].textContent) + 1;
        }
    }
}

export function optimisticRenderingComment(svg, label, liked) {
    console.log(svg)
    console.log(label)
    console.log(liked)
    if (label.textContent === "\u00a0") {
        label.textContent = "1";
    } else if (label.textContent === "1") {
        if (liked) {
            label.textContent = "\u00a0"
        } else {
            label.textContent = Number(label.textContent) + 1
        }
    } else {
        if (liked) {
            label.textContent = Number(label.textContent) - 1;
        } else {
            label.textContent = Number(label.textContent) + 1;
        }
    }

}

export function optimisticRenderingReply(svg, label, liked) {
    console.log(svg)
    console.log(label)
    console.log(liked)
    if (label.textContent === "\u00a0") {
        label.textContent = "1";
    } else if (label.textContent === "1") {
        if (liked) {
            label.textContent = "\u00a0"
        } else {
            label.textContent = Number(label.textContent) + 1
        }
    } else {
        if (liked) {
            label.textContent = Number(label.textContent) - 1;
        } else {
            label.textContent = Number(label.textContent) + 1;
        }
    }
}