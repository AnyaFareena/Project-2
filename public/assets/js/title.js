

const init = () => {

    const scene = $('#game');

    const renderTitleScreen = () => {
        scene.empty();
        scene.append(`
            <div id="title">
                <div id="gameButtons" class="full-center">
                    <button id="btnNewGame" class="btn btn-primary">New Game</button>
                    <button id="btnLoadGame" class="btn btn-primary">Load Game</button>
                </div>
            </div>
        `);
        $('#btnNewGame').click(newGame);
        $('#btnLoadGame').click(loadGame);
    };

    const newGame = () => {
        scene.empty().append(`
            <div id="title">
                <div id="register" class="full-center text-center">
                    <p>Enter your name</p>
                    <input type="text" class="form-control">
                    <button class="btn btn-primary">Begin your journey</button>
                </div>
            </div>
        `);
        $('#register button').click(function() {
            let name = $('#register input').val();
            if (name) name = name.trim();
            if (!name) {
                alert("Please enter a name.");
                return renderTitleScreen();
            }
            $.post("/api/users", { name: name })
            .done(result => {
                location.href = `/${result.token}`;
            })
            .fail(() => {
                alert("Error: Unable to create user.");
                location.reload();
            });
        });
    };

    const loadGame = () => {
        scene.empty().append(`
            <div id="title">
                <div id="register" class="full-center text-center">
                    <p>Enter your save code</p>
                    <input type="text" class="form-control">
                    <button class="btn btn-primary">Load Game</button>
                </div>
            </div>
        `);
        $('#register button').click(function() {
            let token = $('#register input').val();
            if (token) token = token.trim();
            if (!token) {
                alert("Game not loaded.");
                return renderTitleScreen();
            }
            $.get(`/api/token/${token}`)
            .done(result => {
                result ? location.href = `/${result.token}`
                : alert("Saved game not found.");
            })
            .fail(() => {
                alert("Error: Unable to fetch data.");
                location.reload();
            });
        });
    };

    renderTitleScreen();

};
