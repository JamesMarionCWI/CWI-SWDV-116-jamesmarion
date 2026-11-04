
function validateSearch() {
    const typeSelect = document.getElementById('typeSelect');
    const pickupDate = document.getElementById('pickupDate');
    const returnDate = document.getElementById('returnDate');
    // Ensure All fields have values.
    let errors = [];
    if(typeSelect.selectedIndex == -1 || !pickupDate.value || !returnDate.value) {
        errors.push('Values are missing!');
    }
    // Ensure The pickup date is in the future.
    // T00:00 forces the pickupDate to be parsed in local time
    // Otherwise it parses as if it's UTC and that's a big headache depending on the time of day
    if(new Date(pickupDate.value+"T00:00").getTime() < new Date().getTime()) {
        errors.push('Pickup is in the past!');
    }
    // Ensure The return date is after the pickup date.
    if(returnDate.value && pickupDate.value) {
        // Only run this test when both values exist
        if(returnDate.value < pickupDate.value) {
            errors.push('Return is before pickup!');
        }
    }

    // Return error messages as an array.
    // If there are no errors, return an empty array.
    return errors;
}
// Attach a click event handler to the "Search button"
// If the function returns errors, prevent the form submission
// and add a <ul> with an <li> element for each error to the search form
function checkForm(event) {
    const errors = validateSearch();
    const formErrors = document.getElementById('formErrors');
    if(errors.length > 0) {
        // Reset the contents of the errors element to just this text:
        if(errors.length === 1) {
            formErrors.textContent = 'Error:';
        } else {
            formErrors.textContent = 'Errors:';
        }
        // Prevent form submission
        event.preventDefault();
        // For each error, add the error to the errors element
        const errorsUl = document.createElement('ul');
        for(const error of errors) {
            const errorLi = document.createElement('li');
            errorLi.textContent = error;
            errorsUl.appendChild(errorLi);
        }
        formErrors.appendChild(errorsUl);
        formErrors.style.backgroundColor = '#333333';
        formErrors.style.padding = '1em';
    } else {
        // Reset the contents of the error element, we have no more errors :)
        formErrors.textContent = '';
        formErrors.style.backgroundColor = '';
        formErrors.style.padding = '0';
    }
}
const searchForm = document.getElementById('searchForm');
searchForm.addEventListener("submit", checkForm);


/*
<form action="cars.html" method="GET">
    <select name="type" id="typeSelect">
        <option value="type1">Car Type 1</option>
        <option value="type2">Car Type 2</option>
        <option value="type3">Car Type 3</option>
    </select>
    <label for="type">Car Type</label>
    <input type="date" name="pickup" id="pickupDate" />
    <label for="pickup">Pickup Date</label>
    <input type="date" name="return" id="returnDate" />
    <label for="return">Return Date</label>
    <input type="submit" value="Search" id="searchButton" />
</form>
*/