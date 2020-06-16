export default function optimisticRendering(e, liked) {
    console.log("function hit");
    if (e.target.classList.contains("post__like-icon")) {
        console.log(liked);
        console.log("if");
        console.log(e.target.parentNode.parentNode.childNodes[0].textContent);
        if (e.target.parentNode.childNodes[0].textContent === "'\u00a0'") {
            if (liked) {
                e.target.parentNode.childNodes[0].textContent = "'\u00a0'";
            } else {
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
    } else {
        console.log(liked);
        console.log("else");
        console.log(e.target.parentNode.parentNode.childNodes[0].textContent);
        if (
            e.target.parentNode.parentNode.childNodes[0].textContent === "\u00a0"
        ) {
            console.log("DISCOVERED NBSP");
            e.target.parentNode.parentNode.childNodes[0].textContent = "1";
        } else if (
            e.target.parentNode.parentNode.childNodes[0].textContent === "1"
        ) {
            if (liked) {
                e.target.parentNode.parentNode.childNodes[0].textContent =
                    "\u00a0";
            } else {
                e.target.parentNode.parentNode.childNodes[0].textContent =
                    Number(e.target.parentNode.parentNode.childNodes[0].textContent) + 1;
            }
        } else {
            if (liked) {
                e.target.parentNode.parentNode.childNodes[0].textContent =
                    Number(e.target.parentNode.parentNode.childNodes[0].textContent) - 1;
            } else {
                e.target.parentNode.parentNode.childNodes[0].textContent =
                    Number(e.target.parentNode.parentNode.childNodes[0].textContent) + 1;
            }
        }
    }
}