let gameMode = null; 
            let difficulty = null; 

            const menuOverlay = document.getElementById('menu-overlay');
            const controlsOverlay = document.getElementById('controls-overlay');
            const difficultyOverlay = document.getElementById('difficulty-overlay');
            const gameUI = document.getElementById('game-ui');

            const playerVsPlayerBtn = document.getElementById('player-vs-player-btn');
            const playerVsComputerBtn = document.getElementById('player-vs-computer-btn');
            const aboutBtn = document.getElementById('about-btn');
            const controlsBackBtn = document.getElementById('controls-back-btn');
            const difficultyBackBtn = document.getElementById('difficulty-back-btn');

            function showMenu() {
                menuOverlay.style.display = 'flex';
                controlsOverlay.style.display = 'none';
                difficultyOverlay.style.display = 'none';
                gameUI.style.display = 'none';
                if (PoolGame.instance && PoolGame.instance.stop) {
                    PoolGame.instance.stop();
                }
            }

            function startGame() {
                menuOverlay.style.display = 'none';
                controlsOverlay.style.display = 'none';
                difficultyOverlay.style.display = 'none';
                gameUI.style.display = 'block';
                PoolGame.start(gameMode, difficulty); 
            }

            