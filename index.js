import reddit from './redditAPI';

const searchForm = document.getElementById('search-form');
const searchInput = document.getElementById('search-input');

searchForm.addEventListener('submit', (event) =>{
    event.preventDefault();
    
    const searchTerm = searchInput.value;
    const sortBy = document.querySelector('input[name="sortby"]:checked').value;
    const searchLimit = document.getElementById('limit').value;
    
    if(searchTerm === ''){
        showMessage('Please add a search term', 'alert-danger');
    }

    // clear input
    searchInput.value = '';

    // search reddit
    reddit.search(searchTerm, searchLimit, sortBy)
    .then(results => {
        let output = '<div class="card-columns">';

        results.forEach(i => {
            // check for images
            const image = i.preview ? i.preview.images[0].source.url : 'https://cdn.vox-cdn.com/thumbor/SfU1irp-V79tbpVNmeW1N6PwWpI=/0x0:640x427/1200x800/filters:focal(0x0:640x427)/cdn.vox-cdn.com/uploads/chorus_image/image/45970810/reddit_logo_640.0.jpg'

            output += `
            <div class="card" style="width: 18rem;">
            <img class="card-img-top" src="${image}" alt="Card image cap">
            <div class="card-body">
              <h5 class="card-title">${i.title}</h5>
              <p class="card-text">${shortenText(i.selftext, 100)}</p>
              <a href="${i.url}" target='_blank' class="btn btn-primary">Read More</a>
              <hr>
              <span class='badge badge-secondary'>Subreddit: ${i.subreddit}</span>
              <span class='badge badge-dark'>Score: ${i.score}</span>
            </div>
          </div>`
        });
        output += '</div>';

        document.getElementById('results').innerHTML = output;
    });
});

function showMessage(message, className){
    const div = document.createElement('div');
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(message));

    const searchContainer = document.getElementById('search-container');
    const search = document.getElementById('search');

    searchContainer.insertBefore(div, search);

    setTimeout(() =>{
        document.querySelector('.alert').remove()
    }, 2000);
}

// Shorten Self text

function shortenText(text, limit){
    const shortened = text.indexOf(' ', limit);
    if(shortened === -1){
        return text;
    };
    return text.substring(0, shortened);
}