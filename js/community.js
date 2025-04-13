document.addEventListener("DOMContentLoaded", function () {
    // --- Dữ liệu Tin tức (QUAN TRỌNG: Cập nhật id, url, image paths) ---
    const featuredNewsData = [
        {
            id: "thien-long-origin-1",
            image: "/images/thien-long-origin-1-17441892507981019140530.webp",
            title: "Tựa game Thiên Long Bát Bộ kinh điển của 8x 9x thông báo ngày ra mắt chính thức",
            content: "Thiên Long Origin là tựa game MMORPG do VNGGames phát hành, tái hiện nguyên bản thế giới Thiên Long Bát Bộ trên nền tảng PC...",
            url: "https://thienlongorigin.zing.vn/",
            isFeatured: true,
        },
        {
            id: "t1-drama-2",
            image: "/images/t1-drama-gumayusi-1-17441772159702063384208.webp",
            title: "Drama hậu trường T1 bùng nổ, một hành động đơn giản khiến cả cộng đồng LMHT tranh cãi",
            content: "Tưởng rằng nội bộ T1 sẽ ổn định trong mùa giải Regular Season 2025, nhưng mới đây lại nổ ra drama...",
            url: "https://webthethao.vn/lien-minh-huyen-thoai/drama-hau-truong-t1-bung-no-mot-hanh-dong-don-gian-khien-ca-cong-dong-lmht-tranh-cai-2SjO4mPiR.htm",
            isFeatured: true,
        },
        {
            id: "gundam-steam",
            image: "/images/gundam-anime-4k-wallpaper-uhdpaper.com-290@5@d.jpg",
            title: "Tựa game Gundam này chỉ còn 6 người chơi, bị xóa khỏi Steam?",
            content: "SD Gundam Capsule Fighter Online, game online đình đám một thời giờ chỉ còn đếm trên đầu ngón tay người chơi...",
            url: "https://gamek.vn/tua-game-chi-con-6-nguoi-choi-bi-xoa-khoi-steam-178240722172802315.chn",
            isFeatured: false,
        },
    ];
  
    const latestNewsData = [
         
        {
            id: "dot-kich-mobile",
            image: "/images/dotkichphoto-1-15741514593041084518651.webp", // Thay ảnh thật
            title: "Đột Kích Mobile sắp hồi sinh?",
            content: "Phiên bản thử nghiệm mới bất ngờ được đăng tải, cộng đồng dậy sóng.",
            url: "#", // Thay link thật
            isFeatured: false,
        },
        {
            id: "moonton-moba",
            image: "/images/news-6.jpg", // Thay ảnh thật
            title: "Moonton hé lộ dự án MOBA mới",
            content: "Đối thủ nặng ký của Liên Quân và LMHT Tốc Chiến chính thức khởi động.",
            url: "#", // Thay link thật
            isFeatured: false,
        },
        {
            id: "valorant-mobile",
            image: "/images/0508_valorant-tren-playstation-1.jpg", // Thay ảnh thật
            title: "Valorant Mobile lộ ảnh thử nghiệm",
            content: "Hé lộ bản đồ mới, súng mới, và tính năng độc quyền cho mobile.",
            url: "#", // Thay link thật
            isFeatured: false,
        },
        {
            id: "steam-sale",
            image: "/images/chuong-trinh-steam-sale.jpg", // Thay ảnh thật
            title: "Steam Sale giữa năm chuẩn bị khởi động",
            content: "Hàng trăm game giảm giá sâu, bạn đã sẵn sàng chưa?",
            url: "https://store.steampowered.com/",
            isFeatured: false,
        },
    ];
  
    const allNews = [...featuredNewsData, ...latestNewsData];
    const placeholderImage = '/images/placeholder.png'; // Đường dẫn ảnh placeholder chung
  
    // --- Quản lý Dữ liệu Tương tác (LocalStorage) ---
    const interactionDataKey = "newsInteractionData"; // Key cho localStorage
    function getNewsData() {
        const data = localStorage.getItem(interactionDataKey);
        try {
            return data ? JSON.parse(data) : {};
        } catch (e) {
            console.error(`Error parsing ${interactionDataKey} from localStorage`, e);
            return {};
        }
    }
  
    function saveNewsData(data) {
        try {
            localStorage.setItem(interactionDataKey, JSON.stringify(data));
        } catch (e) {
             console.error(`Error saving ${interactionDataKey} to localStorage`, e);
        }
    }
  
    // Khởi tạo hoặc chuẩn hóa dữ liệu
    let newsData = getNewsData();
    allNews.forEach((news) => {
        const newsId = news.id;
        if (!newsData[newsId]) {
            newsData[newsId] = { likes: 0, dislikes: 0, userAction: null, comments: [] };
        } else {
            newsData[newsId].likes = newsData[newsId].likes || 0;
            newsData[newsId].dislikes = newsData[newsId].dislikes || 0;
            newsData[newsId].userAction = newsData[newsId].userAction || null;
            if (!Array.isArray(newsData[newsId].comments)) {
                newsData[newsId].comments = [];
            } else {
                newsData[newsId].comments = newsData[newsId].comments
                    .map((comment, index) => {
                        if (typeof comment === 'string') return { id: Date.now() + index, text: comment };
                        if (typeof comment === 'object' && comment !== null && comment.text && !comment.id) return { ...comment, id: Date.now() + index };
                        return (typeof comment === 'object' && comment !== null && comment.id && comment.text) ? comment : null;
                    })
                    .filter(comment => comment !== null);
            }
        }
    });
    saveNewsData(newsData);
  
    // --- Hàm Escape HTML ---
    function escapeHTML(str) {
        if (typeof str !== 'string') return '';
        const p = document.createElement('p');
        p.appendChild(document.createTextNode(str));
        return p.innerHTML;
    }
  
    // --- Hàm Render Bình luận ---
    const COMMENT_DISPLAY_LIMIT = 2;
  
    function renderComments(commentListEl, comments, newsId, commentToggleEl) {
        commentListEl.innerHTML = '';
        const commentsToShow = [...comments].sort((a, b) => b.id - a.id);
        const isExpanded = commentListEl.dataset.expanded === 'true';
        const limitedComments = isExpanded ? commentsToShow : commentsToShow.slice(0, COMMENT_DISPLAY_LIMIT);
  
        limitedComments.forEach(comment => {
            const commentItem = document.createElement("div");
            commentItem.classList.add("comment-item");
            commentItem.dataset.commentId = comment.id;
            commentItem.innerHTML = `
                <span class="comment-text">${escapeHTML(comment.text)}</span>
                <button class="delete-comment" title="Xóa bình luận"><i class="fas fa-times"></i></button>
                `;
            commentListEl.appendChild(commentItem);
  
            commentItem.querySelector(".delete-comment").addEventListener("click", function () {
                if (confirm("Bạn có chắc muốn xóa bình luận này?")) {
                    const commentIdToDelete = comment.id;
                    const currentComments = newsData[newsId].comments;
                    const commentIndex = currentComments.findIndex(c => c.id === commentIdToDelete);
                    if (commentIndex > -1) {
                        currentComments.splice(commentIndex, 1);
                        saveNewsData(newsData);
                        const newsItemEl = commentListEl.closest('.news-item');
                        if (newsItemEl) {
                            renderComments(commentListEl, currentComments, newsId, commentToggleEl);
                             const commentCountEl = newsItemEl.querySelector('.comment .comment-count');
                             if (commentCountEl) commentCountEl.textContent = currentComments.length;
                             updateCommentToggle(commentToggleEl, currentComments.length, commentListEl);
                        }
                    }
                }
            });
        });
        updateCommentToggle(commentToggleEl, comments.length, commentListEl);
    }
  
    // --- Hàm Cập nhật nút "Hiển thị thêm/Thu gọn" ---
    function updateCommentToggle(toggleEl, totalComments, commentListEl) {
        if (!toggleEl) return;
        const isExpanded = commentListEl.dataset.expanded === 'true';
        if (totalComments > COMMENT_DISPLAY_LIMIT) {
            toggleEl.style.display = 'inline-block';
            toggleEl.textContent = isExpanded ? "Thu gọn" : `Xem thêm ${totalComments - COMMENT_DISPLAY_LIMIT} bình luận`;
        } else {
            toggleEl.style.display = 'none';
        }
    }
  
    // --- Hàm Render Tin tức ---
    function renderNews(newsArray, containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;
  
        newsArray.forEach((news) => {
            const newsId = news.id;
            if (container.querySelector(`.news-item[data-news-id="${newsId}"]`)) return; // Tránh render trùng
  
            const currentData = newsData[newsId];
            if (!currentData) return; // Bỏ qua nếu không có dữ liệu
  
            const newsItem = document.createElement("div");
            newsItem.classList.add("news-item");
            newsItem.dataset.newsId = newsId;
            if (news.isFeatured) newsItem.classList.add("featured");
  
            const imageSrc = news.image ? escapeHTML(news.image) : placeholderImage;
  
            newsItem.innerHTML = `
                <a href="${escapeHTML(news.url || '#')}" target="_blank" rel="noopener noreferrer" class="news-link">
                    <img src="${imageSrc}" alt="${escapeHTML(news.title)}" loading="lazy" onerror="this.src='${placeholderImage}'; this.onerror=null;" />
                    ${news.isFeatured ? `<h2>${escapeHTML(news.title)}</h2>` : `<h3>${escapeHTML(news.title)}</h3>`}
                    <p>${escapeHTML(news.content)}</p>
                </a>
                <div class="like-comment">
                    <span class="like ${currentData.userAction === 'liked' ? 'active' : ''}" title="Thích">
                        <i class="fas fa-thumbs-up"></i> <span class="like-count">${currentData.likes}</span>
                    </span>
                    <span class="dislike ${currentData.userAction === 'disliked' ? 'active' : ''}" title="Không thích">
                        <i class="fas fa-thumbs-down"></i> <span class="dislike-count">${currentData.dislikes}</span>
                    </span>
                    <span class="share" title="Chia sẻ"><i class="fas fa-share"></i> Share</span>
                    <span class="comment" title="Bình luận"><i class="fas fa-comment"></i> <span class="comment-count">${currentData.comments.length}</span></span>
                </div>
                <div class="comment-section">
                    <textarea class="comment-input" placeholder="Viết bình luận của bạn..." rows="2"></textarea>
                    <button class="comment-submit">Gửi</button>
                    <div class="comment-list"></div>
                    <span class="comment-toggle" style="display: none;"></span>
                </div>
            `;
            container.appendChild(newsItem);
  
            // Lấy các phần tử tương tác sau khi append
            const likeBtn = newsItem.querySelector(".like");
            const dislikeBtn = newsItem.querySelector(".dislike");
            const shareBtn = newsItem.querySelector(".share");
            const commentToggleBtn = newsItem.querySelector(".comment");
            const commentSection = newsItem.querySelector(".comment-section");
            const commentInput = newsItem.querySelector(".comment-input");
            const commentSubmit = newsItem.querySelector(".comment-submit");
            const commentListEl = newsItem.querySelector(".comment-list");
            const commentExpandToggle = newsItem.querySelector(".comment-toggle");
  
            // Render bình luận ban đầu
            renderComments(commentListEl, currentData.comments, newsId, commentExpandToggle);
  
            // --- Xử lý Like / Dislike ---
            function handleLikeDislike(isLike) {
                const currentAction = newsData[newsId].userAction;
                const targetAction = isLike ? 'liked' : 'disliked';
                const oppositeAction = isLike ? 'disliked' : 'liked';
                const targetCountKey = isLike ? 'likes' : 'dislikes';
                const oppositeCountKey = isLike ? 'dislikes' : 'likes';
  
                let targetChange = 0;
                let oppositeChange = 0;
  
                if (currentAction === targetAction) { // Hủy action hiện tại
                    targetChange = -1;
                    newsData[newsId].userAction = null;
                } else { // Thực hiện action mới
                    targetChange = 1;
                    if (currentAction === oppositeAction) { // Nếu đang thực hiện action ngược lại -> hủy nó
                        oppositeChange = -1;
                    }
                    newsData[newsId].userAction = targetAction;
                }
  
                newsData[newsId][targetCountKey] += targetChange;
                newsData[newsId][oppositeCountKey] += oppositeChange;
                // Đảm bảo không âm
                newsData[newsId].likes = Math.max(0, newsData[newsId].likes);
                newsData[newsId].dislikes = Math.max(0, newsData[newsId].dislikes);
  
                saveNewsData(newsData);
                // Cập nhật UI
                likeBtn.querySelector(".like-count").textContent = newsData[newsId].likes;
                dislikeBtn.querySelector(".dislike-count").textContent = newsData[newsId].dislikes;
                likeBtn.classList.toggle('active', newsData[newsId].userAction === 'liked');
                dislikeBtn.classList.toggle('active', newsData[newsId].userAction === 'disliked');
            }
            likeBtn.addEventListener("click", () => handleLikeDislike(true));
            dislikeBtn.addEventListener("click", () => handleLikeDislike(false));
  
  
            // --- Xử lý Share ---
            shareBtn.addEventListener("click", function () {
                const shareUrl = (news.url && news.url !== '#') ? news.url : window.location.href;
                const shareTitle = news.title;
                if (navigator.share) {
                     navigator.share({ title: shareTitle, url: shareUrl })
                         .then(() => console.log('Chia sẻ thành công!'))
                         .catch((error) => console.log('Lỗi chia sẻ:', error));
                } else {
                     navigator.clipboard.writeText(shareUrl)
                         .then(() => alert(`Đã sao chép link vào clipboard:\n${shareUrl}`))
                         .catch(err => alert('Không thể tự động sao chép link.'));
                }
            });
  
            // --- Xử lý Mở/Đóng Comment Section ---
            commentToggleBtn.addEventListener("click", function () {
                const isDisplayed = commentSection.style.display === "block";
                commentSection.style.display = isDisplayed ? "none" : "block";
                 if (!isDisplayed && commentInput) commentInput.focus();
            });
  
            // --- Xử lý Gửi Bình luận ---
            commentSubmit.addEventListener("click", function () {
                const commentText = commentInput.value.trim();
                if (commentText && commentText.length <= 500) {
                    const newComment = { id: Date.now(), text: commentText };
                    newsData[newsId].comments.push(newComment);
                    saveNewsData(newsData);
                    renderComments(commentListEl, newsData[newsId].comments, newsId, commentExpandToggle);
                    commentInput.value = "";
                    const commentCountEl = newsItem.querySelector('.comment .comment-count');
                    if(commentCountEl) commentCountEl.textContent = newsData[newsId].comments.length;
                    if (commentListEl.dataset.expanded !== 'true' && newsData[newsId].comments.length > COMMENT_DISPLAY_LIMIT) {
                         commentListEl.dataset.expanded = 'true';
                         renderComments(commentListEl, newsData[newsId].comments, newsId, commentExpandToggle);
                    }
                } else if (commentText.length > 500) alert("Bình luận quá dài (tối đa 500 ký tự).");
                else commentInput.focus();
            });
            commentInput.addEventListener('keydown', function(e) {
                  if (e.key === 'Enter' && !e.shiftKey) {
                      e.preventDefault();
                      commentSubmit.click();
                  }
              });
  
             // --- Xử lý nút Xem thêm/Thu gọn bình luận ---
             commentExpandToggle.addEventListener('click', function() {
                 const isExpanded = commentListEl.dataset.expanded === 'true';
                 commentListEl.dataset.expanded = String(!isExpanded);
                 renderComments(commentListEl, currentData.comments, newsId, commentExpandToggle);
             });
  
        }); // Kết thúc forEach newsArray
    }
  
    // --- Render Tin tức Ban đầu ---
    renderNews(allNews.filter(n => n.isFeatured), "featured-news");
    renderNews(allNews.filter(n => !n.isFeatured), "latest-news");
  
    // --- Xử lý Tìm kiếm Google ---
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");
  
    function performSearch() {
         const query = searchInput.value.trim();
        if (query) window.open(`https://www.google.com/search?q=${encodeURIComponent(query)}`, '_blank', 'noopener,noreferrer');
        else searchInput.focus();
    }
  
    if (searchButton && searchInput) {
        searchButton.addEventListener("click", performSearch);
        searchInput.addEventListener("keydown", function(event) { if (event.key === "Enter") performSearch(); });
    }
  
    // --- Xử lý Login/Logout ---
    const loginBtn = document.getElementById("login-btn");
    const loggedInUserKey = "loggedInUser";
  
    function updateLoginStatus() {
        const username = localStorage.getItem(loggedInUserKey);
        const currentLoginBtn = document.getElementById("login-btn"); // Luôn lấy nút mới nhất
        if (!currentLoginBtn) return; // Thoát nếu không tìm thấy nút
  
        // Xóa listener cũ trước khi thêm mới hoặc thay đổi nội dung
        const newLoginBtn = currentLoginBtn.cloneNode(true);
        currentLoginBtn.parentNode.replaceChild(newLoginBtn, currentLoginBtn);
  
        if (username) {
            newLoginBtn.textContent = escapeHTML(username);
            newLoginBtn.href = "#";
            newLoginBtn.style.cursor = "pointer";
            newLoginBtn.title = `Đăng xuất khỏi ${username}`;
            newLoginBtn.addEventListener("click", function (e) {
                e.preventDefault();
                if (confirm(`Bạn muốn đăng xuất khỏi tài khoản ${username}?`)) {
                    localStorage.removeItem(loggedInUserKey);
                    // localStorage.removeItem(interactionDataKey); // Tùy chọn: reset cả tương tác
                    window.location.reload();
                }
            });
        } else {
            newLoginBtn.textContent = "LOGIN";
            newLoginBtn.href = "/html/login.html"; // Đảm bảo link đúng
            newLoginBtn.style.cursor = "";
            newLoginBtn.title = "Đăng nhập / Đăng ký";
            // Không cần thêm listener cho nút login
        }
    }
    updateLoginStatus(); // Cập nhật trạng thái ban đầu
  
    // --- PHẦN QUẢNG CÁO TRONG JS ĐÃ BỊ XÓA ---
  
  }); // Kết thúc DOMContentLoaded