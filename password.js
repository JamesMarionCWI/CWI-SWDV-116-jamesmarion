function isStrongPassword(passwordToTest) {
    // Provide a default non-null empty string to prevent errors in accessing
    passwordToTest = passwordToTest ?? ""

    // Is 12 or more characters long
    const isLongEnough = passwordToTest.length >= 12
    // Contains at least 1 uppercase character
    const hasUpperChar = (passwordToTest.match(/[A-Z]/) ?? "").length > 0
    // Contains at least 1 lowercase character
    const hasLowerChar = (passwordToTest.match(/[a-z]/) ?? "").length > 0
    // Contains at least 1 number
    const hasNumber = (passwordToTest.match(/[0-9]/) ?? "").length > 0
    // Contains at least one of the following characters: !@#$%^&*()_+{}[]|/<>?
    const hasSpecial = (passwordToTest.match(/[!@#$%^&*()_+{}\[\]|\/<>?]/) ?? "").length > 0
    // Does NOT contain the word "password" regardless of case
    const doesNotContainPassword = passwordToTest.toLowerCase().indexOf("password") === -1

    // Test the values for debugging purposes
    //console.log(isLongEnough)
    //console.log(hasUpperChar)
    //console.log(hasLowerChar)
    //console.log(hasNumber)
    //console.log(hasSpecial)
    //console.log(doesNotContainPassword)

    if(
        isLongEnough
        && hasUpperChar && hasLowerChar && hasNumber && hasSpecial
        && doesNotContainPassword
    ) {
        console.log('Strong Password')
    } else {
        console.log('Weak Password')
    }
}

let password = prompt('Enter a password. We pinky promise not to do anything naughty with it.')
isStrongPassword(password)
