document.addEventListener("DOMContentLoaded", function() {
    const gameButtons = document.querySelectorAll(".game-btn");
    const newsGrid = document.getElementById("news-grid");
    const homeButton = document.querySelector(".home-btn");

    const gameNews = {
        "sinh-ton": `
            <div class="card">
                <img class="card-image" src="../images/minecraft-background-cfljc4haleghnajo.jpg" alt="Minecraft Update">
                <div class="card-content">
                    <span class="tag update">UPDATE</span>
                    <span class="date">13/7/2024</span>
                    <h3>Minecraft 1.21 Update Released!</h3>
                    <p>New features include: Tricky Trials, new mobs, and more!</p>
                    <button class="read-more">READ MORE</button>
                </div>
            </div>
            <div class="card">
                <img class="card-image" src="../images/minecraft-background-cfljc4haleghnajo.jpg" alt="Minecraft Patch">
                <div class="card-content">
                    <span class="tag update">UPDATE</span>
                    <span class="date">14/12/2023</span>
                    <h3>Minecraft 1.20.51 Patch Notes</h3>
                    <p>Bug fixes and performance improvements.</p>
                    <button class="read-more">READ MORE</button>
                </div>
            </div>
            <div class="card">
                <img class="card-image" src="../images/minecraft-background-cfljc4haleghnajo.jpg" alt="Minecraft Event">
                <div class="card-content">
                    <span class="tag event">EVENT</span>
                    <span class="date">01/05/2025</span>
                    <h3>Minecraft Summer Fest 2025</h3>
                    <p>Join the annual summer event with exclusive skins!</p>
                    <button class="read-more">READ MORE</button>
                </div>
            </div>`,
        "hanh-dong": `
            <div class="card">
                <img class="card-image" src="../images/8672297_Cover-ACS.webp" alt="AC Shadows">
                <div class="card-content">
                    <span class="tag event">EVENT</span>
                    <span class="date">2025.02.25</span>
                    <h3>Assassin's Creed Shadows Reveal</h3>
                    <p>New stealth and combat mechanics unveiled.</p>
                    <button class="read-more">READ MORE</button>
                </div>
            </div>
            <div class="card">
                <img class="card-image" src="https://via.placeholder.com/300x180?text=Cyberpunk+DLC" alt="Cyberpunk DLC">
                <div class="card-content">
                    <span class="tag update">UPDATE</span>
                    <span class="date">2025.03.10</span>
                    <h3>Cyberpunk 2077 Phantom Liberty</h3>
                    <p>New story expansion with enhanced gameplay.</p>
                    <button class="read-more">READ MORE</button>
                </div>
            </div>`,
        "nhap-vai": `
            <div class="card">
                <img class="card-image" src="../images/Vvvbbsi3774hfiaoolfb_1920x1040.jpg" alt="FF XIV">
                <div class="card-content">
                    <span class="tag event">EVENT</span>
                    <span class="date">2025.04.01</span>
                    <h3>Final Fantasy XIV New Expansion</h3>
                    <p>Explore a new world with updated quests.</p>
                    <button class="read-more">READ MORE</button>
                </div>
            </div>
            <div class="card">
                <img class="card-image" src="https://via.placeholder.com/300x180?text=Genshin+4.5" alt="Genshin Impact">
                <div class="card-content">
                    <span class="tag update">UPDATE</span>
                    <span class="date">2025.03.15</span>
                    <h3>Genshin Impact 4.5 Update</h3>
                    <p>New characters and events revealed.</p>
                    <button class="read-more">READ MORE</button>
                </div>
            </div>`,
        "FPS-TPS": `
            <div class="card">
                <img class="card-image" src="../images/valorant-game-ban-sung-chien-thuat-dau-tien-cua-riot-23-09-2020-3.jpg" alt="Valorant Event">
                <div class="card-content">
                    <span class="tag event">EVENT</span>
                    <span class="date">2025.03.07</span>
                    <h3>Valorant Championship 2025</h3>
                    <p>Join the global tournament with top teams.</p>
                    <button class="read-more">READ MORE</button>
                </div>
            </div>`,
        "chien-luoc": `
            <div class="card">
                <img class="card-image" src="../images/arknights-4k-waggbbwkw7f8w8dg.jpg" alt="Arknights Collab">
                <div class="card-content">
                    <span class="tag event">EVENT</span>
                    <span class="date">2025.03.15</span>
                    <h3>Arknights x Anime Collab</h3>
                    <p>Limited-time crossover with new operators.</p>
                    <button class="read-more">READ MORE</button>
                </div>
            </div>`,
        "sports": `
            <div class="card">
                <img class="card-image" src="../images/e3-2016-forza-horizon-3-le-hoi-than-gio-gioi-thieu-game-01.jpg" alt="FIFA 25">
                <div class="card-content">
                    <span class="tag event">EVENT</span>
                    <span class="date">2025.04.10</span>
                    <h3>FIFA 25 World Cup Mode</h3>
                    <p>Compete in the global tournament.</p>
                    <button class="read-more">READ MORE</button>
                </div>
            </div>`,
        "battle-royal": `
            <div class="card">
                <img class="card-image" src="../images/pubg-mobile-game-image-4.jpg" alt="PUBG Mode">
                <div class="card-content">
                    <span class="tag event">EVENT</span>
                    <span class="date">2025.02.20</span>
                    <h3>PUBG Mobile New Mode</h3>
                    <p>Introducing Team Deathmatch mode.</p>
                    <button class="read-more">READ MORE</button>
                </div>
            </div>
            <div class="card">
                <img class="card-image" src="https://via.placeholder.com/300x180?text=Fortnite+Event" alt="Fortnite Event">
                <div class="card-content">
                    <span class="tag event">EVENT</span>
                    <span class="date">2025.05.01</span>
                    <h3>Fortnite Season X Launch</h3>
                    <p>New skins and battle pass available.</p>
                    <button class="read-more">READ MORE</button>
                </div>
            </div>`
    };

    function updateNews(category) {
        newsGrid.innerHTML = gameNews[category] || "<p>Không có tin tức cho thể loại này.</p>";
        gameButtons.forEach(button => {
            button.classList.toggle("active", button.dataset.category === category);
        });
        window.history.pushState({}, "", `?category=${category}`);
    }

    gameButtons.forEach(button => {
        button.addEventListener("click", function() {
            const selectedCategory = this.dataset.category;
            updateNews(selectedCategory);
        });
    });

    homeButton.addEventListener("click", function() {
        window.location.href = "../index.html";
    });

    const urlParams = new URLSearchParams(window.location.search);
    const category = urlParams.get("category");
    updateNews(category && gameNews[category] ? category : "sinh-ton");
});