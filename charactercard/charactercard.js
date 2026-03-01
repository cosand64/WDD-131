const character = {
    // PROPERTIES of the character
    name: 'Snortleblat',
    class: 'Swamp Beast Diplomat',
    level: 5,
    health: 100,
    image: 'images/snortleblat.webp',
    // METHODS
    attacked: function() {
        if (this.health > 0) {
            this.health -= 20

            if (this.health <=0) {
                this.health = 0;
                alert(`${this.name} has died!`)
            }
        }
        createCharacterUI();
    },

    levelUp: function() {
        this.level += 1;
        createCharacterUI();
    }
};

function createCharacterUI(){
    // GRAB the elements
    const name = document.querySelector('.name');
    const classTitle = document.querySelector('.class')
    const level = document.querySelector('.level');
    const health = document.querySelector('.health');

    // WRITE the html
    name.textContent = character.name;
    classTitle.textContent = `Class: ${character.class}`;
    level.textContent = `Level: ${character.level}`;
    health.textContent = `health: ${character.health}`;
    document.querySelector('img').setAttribute('src', character.image);
    document.querySelector('img').setAttribute('alt', character.name);

}

document.querySelector('.attacked').addEventListener('click', () => {
    character.attacked();
})

document.querySelector('.levelUp').addEventListener('click', () => {
    character.levelUp();
})

createCharacterUI();