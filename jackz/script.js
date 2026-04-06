// available lessons array
const lessons = [
    { id: 1, title: "Novice Fundamentals", level: "novice", price: 25.00, isAvailable: true },
    { id: 2, title: "Novice Practice", level: "novice", price: 20.00, isAvailable: true }, 
    { id: 3, title: "Open Practice", level: "open", price: 30.00, isAvailable: true },
    { id: 4, title: "Senior Practice", level: "senior", price: 35.00, isAvailable: true },
    { id: 5, title: "Master Practice", level: "master", price: 40.00, isAvailable: true }
];

// User profile
const userProfile = {
    ownerName: "",
    dogName: "",
    registeredClasses: []
};

const lessonContainer = document.getElementById('lesson-container');
const levelSelect = document.getElementById('level-select'); 

function displayLessons(data) {
    if (!lessonContainer) return; 

    const lessonsHTML = data.map(lesson => {
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
    }).join(''); 

    lessonContainer.innerHTML = lessonsHTML;

    const buttons = document.querySelectorAll('.signup-btn');
    buttons.forEach(button => {
        if (!button.classList.contains('full')) {
            button.addEventListener('click', handleRegistration);
        }
    });
}

function filterLessons(level) {
    if (level === 'all' || !level) {
        displayLessons(lessons); 
    } else {
        const filteredData = lessons.filter(lesson => lesson.level === level);
        displayLessons(filteredData);
    }
}

function handleRegistration(event) {
    const lessonId = parseInt(event.target.getAttribute('data-id'));
    const selectedLesson = lessons.find(l => l.id === lessonId);

    if (selectedLesson && selectedLesson.isAvailable) {
        const ownerInput = document.getElementById('owner-name');
        const dogInput = document.getElementById('dog-name');
        
        if (!ownerInput.value.trim() || !dogInput.value.trim()) {
            alert("Please provide your name and your dog's name in the 'User Information' card at the top before signing up!");
            return;
        }

        selectedLesson.isAvailable = false;
        userProfile.ownerName = ownerInput.value;
        userProfile.dogName = dogInput.value;
        userProfile.registeredClasses.push(selectedLesson);

        alert(`Success! ${userProfile.ownerName}, you have registered ${userProfile.dogName} for ${selectedLesson.title}.`);

        filterLessons(levelSelect.value);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    displayLessons(lessons);

    if (levelSelect) {
        const allOption = document.createElement('option');
        allOption.value = 'all';
        allOption.textContent = 'Show All Levels';
        levelSelect.prepend(allOption);
        levelSelect.value = 'all'; 

        levelSelect.addEventListener('change', (e) => filterLessons(e.target.value));
    }
});