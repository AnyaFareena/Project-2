module.exports = function getQuestions(category, difficulty) {
    const axios = require('axios');

    let categories = {
        geography: 22,
        film: 11,
        music: 12,
        videogames: 15
    };
    return axios.get(`https://opentdb.com/api.php?amount=10&category=${categories[category]}&difficulty=${difficulty}`)
    .then(res => res.data.results)
    .catch(err => {
        console.error(err);
    });
};
