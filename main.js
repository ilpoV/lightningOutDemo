addGlobalEventListener("click", ".action-show-modal", e => {
    showModal()
})

addGlobalEventListener("click", ".action-hide-modal", e => {
    hideModal()
})

addGlobalEventListener("click", "[data-action] [type=radio]", e => {
    e.target.closest(".table-actions").nextElementSibling.dataset.view = e.target.value
})


addGlobalEventListener("click", "select", e => {
    let selectContainer = e.target.closest(".form-field-select")
    let optionList = e.target.options
    let customOptionList = document.createElement("ul")

    for(let i = 0; i < optionList.length; i++) {
        let option = document.createElement("li")
        option.appendChild(document.createTextNode(e.target.options[i].label))
        customOptionList.appendChild(option)
    }

/* 
    customOptionList.classList.add("custom-option-list")
    customOptionList.classList.add("clean")
    //selectContainer.appendChild(customOptionList)
    selectContainer.classList.toggle("is-opened")
*/

})


addGlobalEventListener("click", "[data-function='action-print']", e => {
    window.print()
})


addGlobalEventListener("change", "#csp-right-file, #csp-left-file", e => {
    let fileContainer = e.target.closest(".form-action")
    let loadingState = document.createElement("p")
    let resultState = document.createElement("p")
    let errorState = document.createElement("p")

    loadingState.classList.add("input-file-loading")
    resultState.classList.add("input-file-result")
    errorState.classList.add("input-file-error")

    resultState.setAttribute("title", "Remove file")

    errorState.textContent += "We were unable to process your scan. Please try another file."

    let fileName = document.createElement("p")
    fileName.textContent += e.target.files[0].name
    resultState.appendChild(fileName)

    resultState.addEventListener("click", e => {
        let container = e.target.closest(".form-action")
        let items = container.getElementsByTagName("p")
        items[1].remove()
    })

    fileContainer.appendChild(loadingState)
    setTimeout(() => {
        fileContainer.removeChild(loadingState)

        let showState = (Math.random() > .5) ? resultState : errorState
        fileContainer.appendChild(showState)
        if (showState === errorState) {
            setTimeout(() => {
                //fileContainer.removeChild(errorState)
            }, 5000)
        }
    }, 1200)
})


addGlobalEventListener("keyup", "#promo-code-input", e => {
    let isEmpty = e.target.value === "" ? true : false

    if (isEmpty) {
        document.getElementById("promo-code-button").disabled = true
        return
    }

    document.getElementById("promo-code-button").disabled = false

})


addGlobalEventListener("click", "#promo-code-button", e => {
    let promoCode = document.getElementById("promo-code-input").value.toLowerCase()

    validatePromotion(promoCode)
})


addGlobalEventListener('keydown', '[contenteditable]', e => {
    if (e.keyCode === 13) {
        e.preventDefault()
        if (document.activeElement.hasAttribute('contenteditable')) document.activeElement.blur()
    }
})




function validatePromotion(promoCode) {
    let validationMessage = document.getElementById("promo-code-message")
    let appliedPromotionContainer = document.querySelector(`[data-promotion="${CSS.escape(promoCode)}"]`)

    if (validationMessage != null) {
        switch (promoCode) {
            case "free":
            case "discount":
                validationMessage.textContent = "Promotion applied!"
                break
            default:
                validationMessage.textContent = "The code is not valid, was previously used, has expired or the promotion conditions were not met."
        }
    }

    document.querySelectorAll('[data-promotion]').forEach(item => {
        item.classList.add("hidden")
    })

    if (appliedPromotionContainer != null) {
        appliedPromotionContainer.classList.remove("hidden")
    }
}


window.addEventListener("scroll", e => {
    let offsetElement = document.querySelector("#site-heading .site-navigation-level-1")

    if (offsetElement != null) {
        let offsetValue = Math.ceil(document.querySelector("#site-heading .site-navigation-level-1").offsetHeight)

        document.documentElement.style.setProperty("--sticky-header-offset", "-" + offsetValue + "px")

        if (window.scrollY >= offsetValue || window.pageYOffset >= offsetValue) {
            document.getElementById("site-heading").classList.add("scrolled")
        } else {
            document.getElementById("site-heading").classList.remove("scrolled")
        }
    }
})


function addGlobalEventListener(type, selector, callback) {
    document.addEventListener(type, e => {
        if (e.target.matches(selector)) callback(e)
    })
}

function showModal() {
    document.getElementsByTagName("body")[0].classList.remove("hide-modal")
    document.getElementsByTagName("body")[0].classList.add("show-modal")
}

function hideModal () {
    document.getElementsByTagName("body")[0].classList.remove("show-modal")
}

function rem2px(rem) {    
    return rem * parseFloat(getComputedStyle(document.documentElement).fontSize)
}

function getQueryVariable(variable) {
    let query = window.location.search.substring(1)
    let vars = query.split("&")

    for (let i=0;i<vars.length;i++) {
        let pair = vars[i].split("=")
        if(pair[0] == variable) return pair[1]
    }

    return(false);
}
