document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const contactList = document.getElementById('contactList');
    const panicBtn = document.getElementById('panicBtn');
    const dailyMessage = document.getElementById('dailyMessage');
    const panicGuidance = document.getElementById('panicGuidance');
    const closePanicGuidance = document.getElementById('closePanicGuidance');
    const articleList = document.getElementById('articleList'); // Container for expert articles

    // Comfort messages array
    const comfortMessages = [
        "Stay strong, you are never alone. We are here for you.",
        "Every challenge is an opportunity to grow. Keep moving forward.",
        "Remember, it's okay to ask for help. You're doing great!",
        "Take a deep breath; you've got this. We're right here with you.",
        "No matter what you're going through, you're not alone.",
    ];

    // Panic attack suggestions
    const panicSuggestions = [
        "1. Focus on your breathing: Take slow, deep breaths. Inhale for 4 seconds, hold for 4, and exhale for 4.",
        "2. Ground yourself: Look around you, and find 5 things you can see, 4 things you can touch, 3 things you can hear, 2 things you can smell, and 1 thing you can taste.",
        "3. Remind yourself that this will pass. Panic attacks are temporary, and you are safe.",
        "4. Try to distract yourself: Count backwards from 100, name all the colors you can see, or do mental math.",
        "5. If possible, move to a quieter place or try splashing cold water on your face to help calm your nerves.",
    ];

    // Expert articles array
    const expertArticles = [
        {
            title: "How to Remain Calm in an Emergency",
            author: "Dustin W. Ballard MD, MBE",
            excerpt: "Buddhist practices of mindfulness and cyclical breathing can help.",
            link: "https://www.psychologytoday.com/intl/blog/standing-strong/202302/how-to-remain-calm-in-an-emergency?msockid=26d2b90187d26d050a3dad6386d36c14" // Update this link with the actual URL of the article
        },
        {
            title: "Amazing Personal Safety Tips That Will Change Your Life",
            author: "Bill Stanton",
            excerpt: "Be prepared, not scared.",
            link: "https://bestlifeonline.com/safety-tips/" // Update this link with the actual URL of the article
        },
        
    ];

    // Function to display a random daily message
    function showDailyMessage() {
        const randomIndex = Math.floor(Math.random() * comfortMessages.length);
        dailyMessage.textContent = comfortMessages[randomIndex];
    }

    // Function to load and display expert articles
    function loadArticles() {
        expertArticles.forEach(article => {
            const articleItem = document.createElement('div');
            articleItem.classList.add('article-item');

            // Add article details using template literals for better readability
            articleItem.innerHTML = `
                <h3>${article.title}</h3>
                <h4>by ${article.author}</h4>
                <p>${article.excerpt}</p>
                <a href="${article.link}" class="read-more" target="_blank">Read More</a>
            `;

            articleList.appendChild(articleItem);
        });
    }

    // Load contacts from local storage
    function loadContacts() {
        const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
        contacts.forEach(contact => {
            addContactToList(contact.name, contact.number);
        });
    }

    // Save contacts to local storage
    function saveContact(name, number) {
        const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
        contacts.push({ name, number });
        localStorage.setItem('contacts', JSON.stringify(contacts));
    }

    // Delete contact from local storage
    function deleteContact(name, number) {
        const contacts = JSON.parse(localStorage.getItem('contacts')) || [];
        const updatedContacts = contacts.filter(contact => !(contact.name === name && contact.number === number));
        localStorage.setItem('contacts', JSON.stringify(updatedContacts));
    }

    // Add contact to the list and create delete button
    function addContactToList(name, number) {
        const listItem = document.createElement('li');
        listItem.textContent = `${name}: ${number}`;

        // Create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn'; // Optional class for styling

        // Delete contact when button is clicked
        deleteBtn.addEventListener('click', () => {
            listItem.remove();
            deleteContact(name, number);
        });

        listItem.appendChild(deleteBtn);
        contactList.appendChild(listItem);
    }

    // Handle contact form submission
    contactForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('contactName').value.trim();
        const number = document.getElementById('contactNumber').value.trim();

        if (name && number) {
            addContactToList(name, number);
            saveContact(name, number);
            contactForm.reset();
        } else {
            alert('Please fill in both the contact name and number.');
        }
    });

    // Panic button functionality to display guidance
    panicBtn.addEventListener('click', () => {
        panicGuidance.innerHTML = '<button class="close-btn" id="closePanicGuidance">&times;</button><h2>Panic Attack Guidance</h2>';
        panicSuggestions.forEach(suggestion => {
            const listItem = document.createElement('li');
            listItem.textContent = suggestion;
            panicGuidance.appendChild(listItem);
        });
        panicGuidance.style.display = 'block'; // Show the guidance
    });

    // Close panic guidance when close button is clicked
    document.addEventListener('click', (event) => {
        if (event.target && event.target.id === 'closePanicGuidance') {
            panicGuidance.style.display = 'none';
        }
    });

    // Display a daily comfort message on page load
    showDailyMessage();
    // Load contacts on page load
    loadContacts();
    // Load expert articles on page load
    loadArticles();
});
