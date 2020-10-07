export default{
    search: function(searchTerm, searchLimit, sortBy){
        return fetch(`http://www.reddit.com/search.json?q=${searchTerm}&sort=${sortBy}&limit=${searchLimit}`)
        .then(response => response.json())
        .then(data => data.data.children.map(i => i.data))
        .catch(err => console.log(err));
    }
};