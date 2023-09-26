document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('search');
    const searchButton = document.getElementById('search-button');
    const faqCards = document.querySelectorAll('.faq-card');
    const blogContent = document.getElementById('blog-content');
    const blogText = document.getElementById('blog-text');

    // Function to handle searching FAQs
    function searchFAQs() {
        const searchTerm = searchInput.value.trim().toLowerCase();
        faqCards.forEach(card => {
            const question = card.querySelector('h3').textContent.toLowerCase();
            if (question.includes(searchTerm) || searchTerm === '') {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    }

    // Event listener for the search button
    searchButton.addEventListener('click', function () {
        searchFAQs();
    });

    // Event listener for input in the search box
    searchInput.addEventListener('input', function () {
        searchFAQs();
    });

    faqCards.forEach(card => {
        card.addEventListener('click', function () {
            const blogUrl = card.getAttribute('data-blog-url');
            fetch(blogUrl)
                .then(response => response.text())
                .then(data => {
                    blogText.innerHTML = data;
                    blogContent.style.display = 'block';
                });
        });
    });
});
