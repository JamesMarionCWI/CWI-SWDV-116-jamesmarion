
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

var cars = [
    {
        type: "Car Type 1",
        name: "Car One",
        description: "Car one's description",
        year: 2020
    },
    {
        type: "Car Type 1",
        name: "Car Two",
        description: "Car two's description",
        year: 2021
    },
    {
        type: "Car Type 2",
        name: "Car Three",
        description: "Car three's description",
        year: 2022
    },
    {
        type: "Car Type 2",
        name: "Car Four",
        description: "Car four's description",
        year: 2020
    },
    {
        type: "Car Type 3",
        name: "Car Five",
        description: "Car five's description",
        year: 2019
    },
    {
        type: "Car Type 3",
        name: "Car Six",
        description: "Car six's description",
        year: 2020
    },
    {
        type: "Car Type 1",
        name: "Car Seven",
        description: "Car seven's description",
        year: 2021
    },
    {
        type: "Car Type 2",
        name: "Car Eight",
        description: "Car eight's description",
        year: 2022
    },
    {
        type: "Car Type 3",
        name: "Car Nine",
        description: "Car nine's description",
        year: 2019
    },
    {
        type: "Car Type 1",
        name: "Car Ten",
        description: "Car ten's description",
        year: 2020
    }
]

function listCars() {
    const params = new URLSearchParams(window.location.search);

    if (params.has('type')) {
        let type = params.get('type');
        switch(type) {
            case "type1":
                type = "Car Type 1";
                break;
            case "type2":
                type = "Car Type 2";
                break;
            case "type3":
                type = "Car Type 3";
                break;
        }
        // filter the cars array by type and call displayCars with the new array
        displayCars(cars.filter(car => car.type === type))
    } else {
        // call displayCars with the unfiltered cars array
        displayCars(cars);
    }
}

// Not much of a car person personally.
// It'll make complete and total sense to generate a random pic to use for the car.
// Riiiiiiiiiight? Nobody will ever notice!
// Anyway, this should hopefully meet "Note: Match the style of the featured cars list on index.html."
function generateRandomCarPic() {
    const picture = document.createElement('picture');
    const webp320Source = document.createElement('source')
    const webp500Source = document.createElement('source')
    const jpg320Source = document.createElement('source')
    const jpg500Source = document.createElement('source')
    const jpg500Image = document.createElement('img')
    
    const randomID = Math.ceil(Math.random() * 7);

    webp320Source.media = '(max-width: 480px)'
    jpg320Source.media = '(max-width: 480px)'
    webp500Source.media = '(min-width: 480px)'
    jpg500Source.media = '(min-width: 480px)'

    webp320Source.srcset = 'images/car_' + randomID + '-320w.webp'
    jpg320Source.srcset = 'images/car_' + randomID + '-320w.jpg'
    webp500Source.srcset = 'images/car_' + randomID + '-500w.webp'
    jpg500Source.srcset = 'images/car_' + randomID + '-500w.jpg'
    jpg500Image.src = 'images/car_' + randomID + '-500w.jpg'

    picture.appendChild(webp320Source)
    picture.appendChild(jpg320Source)
    picture.appendChild(webp500Source)
    picture.appendChild(jpg500Source)
    picture.appendChild(jpg500Image)

    /*
    <picture>
        <source media="(max-width: 480px)" srcset="images/car_1-320w.webp" />
        <source media="(min-width: 480px)" srcset="images/car_1-500w.webp" />
        <!-- Add a default image for browsers that may not support the webp format. -->
        <source media="(max-width: 480px)" srcset="images/car_1-320w.jpg" />
        <source media="(min-width: 480px)" srcset="images/car_1-500w.jpg" />
        <image src="images/car_1-500w.jpg" />
    </picture>
    */

   return picture;
}

function displayCars(cars) {
    const carsContainer = document.getElementById('featured-cars')
    carsContainer.textContent = '';
    // loop through cars and build html
    // append html to the page
    cars.forEach(car => {
        const carElement = document.createElement('div')
        switch(car.type) {
            case "Car Type 1":
                carElement.className = 'car-card type-one'
                break;
            case "Car Type 2":
                carElement.className = 'car-card type-two'
                break;
            case "Car Type 3":
                carElement.className = 'car-card type-three'
                break;
        }
        const carPic = generateRandomCarPic()
        const carName = document.createElement('h3')
        const carDesc = document.createElement('span')
        const carYearType = document.createElement('strong')
        const carDescTotal = document.createElement('p')
        carName.textContent = car.name
        carYearType.textContent = car.year + " " + car.type + ": ";
        carDesc.textContent = car.description
        carDescTotal.appendChild(carYearType)
        carDescTotal.appendChild(carDesc)
        carElement.appendChild(carPic)
        carElement.appendChild(carName)
        carElement.appendChild(carDescTotal)
        carsContainer.appendChild(carElement)
    })
}
