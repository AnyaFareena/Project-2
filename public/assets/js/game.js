const init = token => {

    let test = false;

    let data, activeCharacter, activeLocation;

    const checkToken = token => {
        $.getJSON(`/api/token/${token}`)
        .done(result => {
            if (result) {
                getData(result.id);
            } else {
                location.href = "/";
            }
        })
        .fail(err => {
            alert("token check failed");
            location.href = "/";
        });
    };

    const getData = id => {
        $.when(
            $.getJSON(`/api/users/${id}`),
            $.getJSON(`/api/characters/${id}`),
            $.getJSON(`/api/locations`)
        )
        .done((user, characters, locations) => {
            data = {
                user: user[0],
                characters: characters[0],
                locations: locations[0]
            };
            if (test) console.log(data);
            main(data);
        })
        .fail(err => {
            alert("unable to fetch data");
            location.href = "/";
        });
    };

    const main = data => {

        const scene = $('#game');

        const sceneCharacters = () => {
            scene.empty();
            scene.append(`
                <div id="menuCharacterSelect">
                    <div class="container">
                        <h1>Welcome, ${data.user.name}!</h1>
                        <div class="row">
            `);
            for (character of data.characters)
                $('#menuCharacterSelect .row').append(`
                    <div class="col-6 col-md-4">
                        <div class="character" title="${character.name}" data-id="${character.id}">
                            <div class="characterSprite"><img src="/assets/img/wizard-10x.gif" alt="" style="width: 128px; margin: 0 0 5px;"></div>
                            <div class="characterName">${character.name}</div>
                            <div class="characterPoints">${character.points}</div>
                        </div>
                    </div>
                `);
            $('#menuCharacterSelect .row').append(`
                <div class="col-6 col-md-4">
                    <div id="menuCharacterAdd">
                        <div class="full-center">
                            <p>New Character</p>
                            <input type="text" class="form-control" id="name">
                            <button class="btn btn-primary">Add</button>
                        </div>
                    </div>
                </div>
            `)
            scene.append(`
                <div id="saveCodeLink">
                    <div class="container">
                        <p>Bookmark this link to save your game</p>
                        <div class="input-group">
                            <input type="text" class="form-control" value="${location.href}" readonly>
                            <span class="input-group-btn">
                                <button class="btn btn-primary">Copy Link</button>
                            </span>
                        </div>
                    </div>
                </div>
            `);
            $('#menuCharacterSelect .character').click(function() {
                let id = $(this).data('id');
                activeCharacter = data.characters.find(e => e.id == id);
                if (test) console.log(activeCharacter);
                sceneLocations();
            });
            $('#menuCharacterAdd button').click(function() {
                let newCharacter = {
                    name: $('#menuCharacterAdd input').val(),
                    user_id: data.user.id
                };
                if (!newCharacter.name) return;
                if (test) console.log(newCharacter);
                $.post("/api/characters", newCharacter)
                .done(result => {
                    if (test) console.log(result);
                    data.characters.push(result);
                    sceneCharacters();
                })
                .fail(() => {
                    alert("unable to add character");
                });
            });
            $('#saveCodeLink input').click(function() {
                $(this).select();
            });
            $('#saveCodeLink button').click(function() {
                $('#saveCodeLink input').select();
                document.execCommand("copy");
                $('#saveCodeLink button').text("Copied");
                setTimeout(() => {
                    $('#saveCodeLink button').text("Copy Link");
                }, 2000);
            });

        };

        const sceneLocations = () => {
            scene.empty();
            scene.append(`
                <div id="menuLocationSelect">
                    <div class="container">
                        <h2>Select your destination</h2>
                        <div class="row">
            `);
            for (place of data.locations)
                $('#game .row').append(`
                    <div class="col-6">
                        <div class="location" data-id="${place.id}" style="background-image: url('${place.image}')">
                            <div class="full-center">
                                ${place.name}
                            </div>
                        </div>
                    </div>
                `);
            $('.location').click(function() {
                let id = $(this).data('id');
                activeLocation = data.locations.find(e => e.id == id);
                if (test) console.log(activeLocation);
                sceneDifficulty();
            });
        };

        const sceneDifficulty = () => {
            scene.empty();
            scene.append(`
                <div id="menuDifficulty">
                    <div class="container text-center">
                        <h2>Pick a difficulty</h2>
                        <button class="btn btn-primary" data-difficulty="easy">Easy (5 pts)</button>
                        <button class="btn btn-primary" data-difficulty="medium">Medium (10 pts)</button>
                        <button class="btn btn-primary" data-difficulty="hard">Hard (20 pts)</button>
            `);
            $('#menuDifficulty button').click(function() {
                activeLocation['difficulty'] = $(this).data('difficulty');
                if (test) console.log(activeLocation);
                sceneQuiz();
            });
        };

        const sceneQuiz = () => {
            scene.empty();
            scene.append(`
                <div id="quiz" style="background-image: url('${activeLocation.image}')">
                    <img class="sprite" src="/assets/img/wizard-10x.gif" alt="">
                    <div id="questions" class="container">
            `);

            let current = 0;
            let questions;
            let pointsEarned = 0;
            let points = {
                easy: 5,
                medium: 10,
                hard: 20
            };

            const showQuestion = question => {
                let choices = [ ...question.incorrect_answers ];
                choices.push(question.correct_answer);
                if (question.type === "multiple")
                    choices.sort(() => Math.random() - 0.5);
                if (question.type === "boolean")
                    choices.sort().reverse();
                let q = $('#questions');
                q.empty();
                q.append(`
                    <h2>${question.question}</h2>
                `);
                for (choice of choices)
                    q.append(`<div class="choice" data-choice="${choice}">${choice}</div>`);
                q.append(`<div id="questionResult">`);
                $('#questions .choice').click(function() {
                    if ($(this).data('choice') === question.correct_answer) {
                        $('#questionResult').text(`Correct! +${points[question.difficulty]} pts`);
                        pointsEarned += points[question.difficulty];
                    } else {
                        $('#questionResult').text(`Incorrect! -${points[question.difficulty]} pts`);
                        pointsEarned -= points[question.difficulty];
                    }
                    current++;
                    if (current < questions.length) {
                        setTimeout(() => {
                            showQuestion(questions[current]);
                        }, 1000);
                    } else {
                        setTimeout(() => {
                            endQuiz(pointsEarned);
                        }, 1000);
                    }
                });
            };

            const endQuiz = (pointsEarned) => {
                scene.empty();
                let changeOfPoints = { points: activeCharacter.points + pointsEarned }
                $.ajax({
                    url: `/api/updateCharacter/${activeCharacter.id}`,
                    type: 'PUT',
                    data: changeOfPoints
                })
                .then(() => {
                    data.characters.find(e => e.id === activeCharacter.id).points = changeOfPoints.points;
                    scene.append(`
                        <div id="ending">
                            <div class="container">
                                <p>The road was rough but you made it!</p>
                                <p>You received ${pointsEarned} points.</p>
                                <button class="btn btn-primary" id="return">Return Home</button>
                    `);
                    $('#ending #return').click(function() {
                        sceneCharacters();
                    });
                })
                .fail(() => {
                    alert('Error updating character.');
                    sceneCharacters();
                });
            };

            $.getJSON(`/api/questions/${activeLocation.category}/${activeLocation.difficulty}`)
            .done(result => {
                questions = result;
                if (test) console.log(questions);
                showQuestion(questions[current]);
            })
            .fail(() => {
                alert('Unable to retrieve questions.');
                location.reload();
            });



        };

        sceneCharacters();

    };


    checkToken(token);
};
