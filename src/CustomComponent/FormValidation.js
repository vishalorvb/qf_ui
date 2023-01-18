function containsSpecialChars(str) {
    const rg = new RegExp("[^a-z ^A-Z ^0-9]");
    return rg.test(str);
}

function containUpperCase(str) {
    const rg = new RegExp("[A-Z]");
    return rg.test(str);
}
function containLowerCase(str) {
    const rg = new RegExp("[a-z]");
    return rg.test(str);
}
function containsNumber(str) {
    const rg = new RegExp("[0-9]");
    return rg.test(str);
}
function ValidateEmail(mail) {
    if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
        return (true)
    }
    return (false)
}
function onlyAlphabets(str) {
    const rg = new RegExp("[^a-z ^A-Z]");
    return !rg.test(str);
}
function onlyNumber(str) {
    const rg = new RegExp("[^0-9]");
    return rg.test(str);

}

export function validateForm(refs , specialcharRefs , passwordRef , onlyalphabets , onlynumbers , autocompletename , cname) {

    let status = true;
    console.log(refs)
    console.log(specialcharRefs)
    console.log(passwordRef)
    console.log(onlyalphabets)
    console.log(onlynumbers)
    console.log(autocompletename)
    refs.forEach(element => {
        try {
            if (element.current.value.trim() === "" || element.current === undefined) {
                element.current.className = cname;
                status = false;
            }
            else if (/EMAIL/.test(element.current.name.toUpperCase())) {

                if (!ValidateEmail(element.current.value)) {
                    element.current.className = cname;
                    status = false;
                }
            }
        } catch (error) {
            status = false;
        }


    });
    specialcharRefs.forEach(element => {

        try {
            if (containsSpecialChars(element.current.value) || element.current.value.trim() == "" || element.current.value.trim() == undefined) {
                element.current.className = cname;
                status = false;
            }

        } catch (error) {
            status = false;
        }

    });
    passwordRef.forEach(element => {
        try {
            if (!containUpperCase(element.current.value) || !containsSpecialChars(element.current.value) || !containLowerCase(element.current.value) || !containsNumber(element.current.value) || element.current.value.length < 8) {
                element.current.className = cname;
                status = false;
            }
        } catch (error) {
            status = false;
        }
    });
    onlyalphabets.forEach(element => {
        try {

            if (!onlyAlphabets(element.current.value) || element.current.value.trim() == "" || element.current.value.trim() == undefined) {
                console.error("Error in alphabet")
                element.current.className = cname;
                status = false;
            }
        } catch (error) {
            status = false;
        }
    });
    onlynumbers.forEach(element => {
        try {
            if (onlyNumber(element.current.value)) {
                element.current.className = cname;
                status = false;
            }
        } catch (error) {
            status = false;
        }
    });

    autocompletename.forEach(element => {
        let collection = document.getElementsByName(element)
        for (let i = 0; i < collection.length; i++) {
            console.log(collection[i].value)
            if (collection[i].value.trim() == "") {
                collection[i].className = cname
                status = false;
            }
        }
    });



    return status;
}

export function resetClassName(e) {
    if (e.target.nodeName === "INPUT") {
        e.target.className = " "
    }
}


export function NumberValidation(ref, length, cname) {
    let numstatus = true;
    console.log(ref.current.value.length);
    console.log(ref.current.className);
    if (ref.current.value.length != length) {
        ref.current.className = cname;
        numstatus = false;
    }
    return numstatus;
}




