// Array of objects to store available lessons
const lessons = [
    { id: 1, title: "Novice Fundamentals", level: "novice", price: 25.00, isAvailable: true },
    { id: 2, title: "Novice Practice", level: "novice", price: 20.00, isAvailable: false }, // Full class example
    { id: 3, title: "Open Practice", level: "open", price: 30.00, isAvailable: true },
    { id: 4, title: "Senior Practice", level: "senior", price: 35.00, isAvailable: true },
    { id: 5, title: "Master Practice", level: "master", price: 40.00, isAvailable: true }
];

// User profile object to store user data
const userProfile = {
    ownerName: "",
    dogName: "",
    registeredClasses: []
};

// Select DOM Elements
const lessonContainer = document.getElementById('lesson-container');
const levelSelect = document.getElementById('level-select'); 

// 1. Function to display lessons using the .map method
function displayLessons(data) {
    // If we aren't on the signup page, stop the function
    if (!lessonContainer) return; 

    // Use .map to create an array of HTML strings for each lesson
    const lessonsHTML = data.map(lesson => {
        // Determine button class and status based on isAvailable property
        const btnClass = lesson.isAvailable ? 'signup-btn' : 'signup-btn full';
        const btnText = lesson.isAvailable ? 'Sign Up' : 'Class Full';
        const isDisabled = lesson.isAvailable ? '' : 'disabled';

        return `
            <div class="lesson-card dynamic-card">
                <h3>${lesson.title}</h3>
                <p><strong>Level:</strong> <span style="text-transform: capitalize;">${lesson.level}</span></p>
                <p><strong>Price:</strong> $${lesson.price.toFixed(2)}</p>
                <button class="${btnClass}" data-id="${lesson.id}" ${isDisabled}>${btnText}</button>
            </div>
        `;
    }).join(''); // Join the array into a single HTML string

    // Insert the HTML into the container
    lessonContainer.innerHTML = lessonsHTML;

    // Use .forEach to attach event listeners to all newly created sign-up buttons
    const buttons = document.querySelectorAll('.signup-btn');
    buttons.forEach(button => {
        if (!button.classList.contains('full')) {
            button.addEventListener('click', handleRegistration);
        }
    });
}

// 2. Function to filter lessons using the .filter method
function filterLessons(level) {
    if (level === 'all' || !level) {
        displayLessons(lessons); // Show all if no specific level is chosen
    } else {
        const filteredData = lessons.filter(lesson => lesson.level === level);
        displayLessons(filteredData);
    }
}

// 3. Function to handle registration events
function handleRegistration(event) {
    event.preventDefault(); 
    
    // Grab the ID from the clicked button
    const lessonId = parseInt(event.target.getAttribute('data-id'));
    
    // Find the exact lesson object in our array
    const selectedLesson = lessons.find(l => l.id === lessonId);

    if (selectedLesson && selectedLesson.isAvailable) {
        // Grab the form input values to update the user profile
        const ownerInput = document.getElementById('owner-name');
        const dogInput = document.getElementById('dog-name');
        
        // Basic validation: make sure they typed their name!
        if (!ownerInput.value || !dogInput.value) {
            alert("Please fill out your name and your dog's name in the form before clicking a sign-up button!");
            return;
        }

        // Update profile
        userProfile.ownerName = ownerInput.value;
        userProfile.dogName = dogInput.value;
        userProfile.registeredClasses.push(selectedLesson);

        // Success message
        alert(`Success! ${userProfile.ownerName}, you have registered ${userProfile.dogName} for: ${selectedLesson.title}.`);
    }
}

// Wait for the HTML to fully load before running our scripts
document.addEventListener('DOMContentLoaded', () => {
    // Initially display all lessons
    displayLessons(lessons);

    // Listen for changes on the dropdown menu to filter the displayed lessons
    if (levelSelect) {
        // We'll add an "All Levels" option to the HTML dropdown dynamically just for the filter
        const allOption = document.createElement('option');
        allOption.value = 'all';
        allOption.textContent = 'Show All Levels';
        levelSelect.prepend(allOption);
        levelSelect.value = 'all'; // Set default to all

        levelSelect.addEventListener('change', (event) => {
            filterLessons(event.target.value);
        });
    }
});