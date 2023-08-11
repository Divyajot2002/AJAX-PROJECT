document.addEventListener("DOMContentLoaded", () => {
    const fetchPostsBtn = document.getElementById("fetchPostsBtn");
    const subredditInput = document.getElementById("subredditInput");
    const postsContainer = document.getElementById("postsContainer");

    fetchPostsBtn.addEventListener("click", () => {
        const subreddit = subredditInput.value.trim();
        if (!subreddit) {
            alert("Please enter a subreddit name.");
            return;
        }

        const url = `https://www.reddit.com/r/${subreddit}/top.json?limit=5`;

        fetch(url)
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                const posts = data.data.children;
                postsContainer.innerHTML = ""; // Clear previous posts

                posts.forEach((post) => {
                    const postData = post.data;
                    const postElement = document.createElement("div");
                    postElement.classList.add("post");
                    postElement.innerHTML = `
                        <div class="post-title">${postData.title}</div>
                        <a class="post-link" href="https://www.reddit.com${postData.permalink}" target="_blank">View on Reddit</a>
                    `;
                    postsContainer.appendChild(postElement);
                });
            })
            .catch((error) => {
                console.error("Error fetching data:", error);
                postsContainer.innerHTML = "Error fetching data. Please try again later.";
            });
    });
});
