document.addEventListener("DOMContentLoaded", () => {
    // Xử lý menu dropdown
    document.querySelectorAll(".dropdown-toggle").forEach(toggle => {
        toggle.addEventListener("click", (event) => {
            event.stopPropagation();
            const listItem = toggle.parentElement;
            const isActive = listItem.classList.contains("active");

            document.querySelectorAll(".menu li.active").forEach(item => {
                item.classList.remove("active");
                item.querySelector(".dropdown-toggle").setAttribute("aria-expanded", "false");
            });

            if (!isActive) {
                listItem.classList.add("active");
                toggle.setAttribute("aria-expanded", "true");
            }
        });
    });

    document.addEventListener("click", event => {
        if (!event.target.closest(".dropdown")) {
            document.querySelectorAll(".menu li.active").forEach(item => {
                item.classList.remove("active");
                item.querySelector(".dropdown-toggle").setAttribute("aria-expanded", "false");
            });
        }
    });

    // Dữ liệu game
    const gameData = {
        "sinh-ton": {
            name: "Minecraft",
            video: "https://www.youtube.com/watch?v=MmB9b5njVbA",
            link: "https://www.minecraft.net/en-us",
            description: "Minecraft là một trò chơi sandbox nổi tiếng...",
            backgroundImage: "../images/minecraft-background-cfljc4haleghnajo.jpg"
        },
        "hanh-dong": {
            name: "Assassin's Creed Shadows",
            video: "https://www.youtube.com/watch?v=vovkzbtYBC8",
            link: "https://www.ubisoft.com/en-sg/",
            description: "Assassin's Creed Shadows là phần mới...",
            backgroundImage: "./images/8672297_Cover-ACS.webp"
        },
        "nhap-vai": {
            name: "Final Fantasy XIV",
            video: "https://youtu.be/1bzWvyncQh8",
            link: "https://eu.finalfantasyxiv.com/",
            description: "Final Fantasy là một loạt trò chơi nhập vai nổi tiếng...",
            backgroundImage: "./images/Vvvbbsi3774hfiaoolfb_1920x1040.jpg"
        },
        "FPS-TPS": {
            name: "Valorant",
            video: "https://www.youtube.com/watch?v=OHzUoFKPUB0",
            link: "https://valorant.vnggames.com/vi-vn/",
            description: "Valorant là một trò chơi bắn súng góc nhìn thứ nhất...",
            backgroundImage: "./images/valorant-game-ban-sung-chien-thuat-dau-tien-cua-riot-23-09-2020-3.jpg"
        },
        "chien-luoc": {
            name: "Arknights",
            video: "https://www.youtube.com/watch?v=--xJQ5oNcCA",
            link: "https://arknights.global/",
            description: "Arknights là một tựa game chiến thuật thủ tháp...",
            backgroundImage: "./images/arknights-4k-waggbbwkw7f8w8dg.jpg"
        },
        "sports": {
            name: "Forza Horizon",
            video: "https://www.youtube.com/watch?v=5xy4n73WOMM",
            link: "https://forza.net/horizon",
            description: "Forza Horizon là một trò chơi đua xe thế giới mở nổi tiếng...",
            backgroundImage: "./images/e3-2016-forza-horizon-3-le-hoi-than-gio-gioi-thieu-game-01.jpg"
        },
        "battle-royal": {
            name: "PUBG",
            video: "https://youtu.be/h0s5X6pyhd0",
            link: "https://www.pubg.com/vi/main",
            description: "PUBG là một trò chơi bắn súng sinh tồn...",
            backgroundImage: "./images/pubg-mobile-game-image-4.jpg"
        }
    };

    // Parse ID video từ URL YouTube
    function youtube_parser(url) {
        const regExp = /(?:youtube\.com\/.*[?&]v=|youtu\.be\/)([^#&?]{11})/;
        const match = url.match(regExp);
        return match ? match[1] : null;
    }

    const gameDetailsSection = document.getElementById("game-details");
    const gameVideoDiv = document.getElementById("game-video");
    const gameLinkDiv = document.getElementById("game-link");
    const gameDescriptionDiv = document.getElementById("game-description");
    let currentPlayer = null;

    function showGameDetails(game) {
        const data = gameData[game];
        if (!data) return;

        if (currentPlayer && typeof currentPlayer.stopVideo === "function") {
            currentPlayer.stopVideo();
        }

        gameVideoDiv.innerHTML = "";
        const videoId = youtube_parser(data.video);
        if (videoId) {
            const iframe = document.createElement("iframe");
            iframe.src = `https://www.youtube.com/embed/${videoId}?autoplay=0&rel=0&enablejsapi=1`;
            iframe.frameBorder = "0";
            iframe.allow = "autoplay; encrypted-media";
            iframe.allowFullscreen = true;
            gameVideoDiv.appendChild(iframe);

            iframe.onload = () => {
                currentPlayer = new YT.Player(iframe, {
                    events: {
                        onReady: () => console.log("Video ready")
                    }
                });
            };
        } else {
            gameVideoDiv.innerHTML = "<p>Video không khả dụng.</p>";
        }

        gameLinkDiv.innerHTML = `<a href="${data.link}" target="_blank">${data.name}</a>`;
        gameDescriptionDiv.textContent = data.description;
        gameDetailsSection.style.display = "flex";

        document.body.style.background = `url('${data.backgroundImage}') no-repeat center center fixed`;
        document.body.style.backgroundSize = "cover";
    }

    document.querySelectorAll("#game-thumbnails img").forEach(img => {
        img.addEventListener("click", () => showGameDetails(img.dataset.game));
    });

    document.querySelectorAll(".dropdown-content a").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const category = link.dataset.game;
            window.location.href = `/html/news.html?category=${category}`;
        });
    });

    // Xử lý đăng nhập / đăng xuất
    const loginBtn = document.getElementById("login-btn");
    const username = localStorage.getItem("loggedInUser");

    if (username) {
        loginBtn.textContent = username;
        loginBtn.href = "#";
        loginBtn.style.cursor = "pointer";
        loginBtn.addEventListener("click", () => {
            if (confirm("Đăng xuất?")) {
                localStorage.removeItem("loggedInUser");
                window.location.href = "/index.html";
            }
        });
    }

    // Hiển thị game mặc định
    showGameDetails("sinh-ton");

    // Xử lý quảng cáo popup
    if (username) {
        const adKey = `dontShowAd_${username}`;
        const dontShowAd = localStorage.getItem(adKey);
        if (!dontShowAd) {
            setTimeout(() => {
                document.getElementById("popup-ad").style.display = "flex";
            }, 3000);
        }
    } else {
        // Nếu chưa đăng nhập thì quảng cáo luôn hiển thị
        setTimeout(() => {
            document.getElementById("popup-ad").style.display = "flex";
        }, 3000);
    }

    // Back to Top
    const backToTopBtn = document.getElementById("back-to-top");
    window.addEventListener("scroll", () => {
        backToTopBtn.style.display = window.scrollY > 300 ? "block" : "none";
    });
    backToTopBtn.addEventListener("click", () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Đóng quảng cáo
    window.closeAd = () => {
        const checkbox = document.getElementById("dont-show-again");
        if (checkbox.checked && username) {
            const adKey = `dontShowAd_${username}`;
            localStorage.setItem(adKey, "true");
        }
        document.getElementById("popup-ad").style.display = "none";
    };
});
