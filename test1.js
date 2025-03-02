
const images = [
    { id: "1/5", color: "blue", bg: "#42a5f5" },
    { id: "2/5", color: "blue", bg: "#1e88e5" },
    { id: "3/5", color: "blue", bg: "#1976d2" },
    { id: "4/5", color: "blue", bg: "#0d47a1" },
    { id: "5/5", color: "blue", bg: "#0288d1" },

    { id: "1/3", color: "red", bg: "#f44336" },
    { id: "2/3", color: "red", bg: "#b71c1c" },
    { id: "3/3", color: "red", bg: "#ff4081" },

    { id: "1/4", color: "green", bg: "#ffeb3b" },
    { id: "2/4", color: "green", bg: "#cddc39" },
    { id: "3/4", color: "green", bg: "#4caf50" },
    { id: "4/4", color: "green", bg: "#1b5e20" },
];

const featureContainer = document.getElementById("feature-image");
const featureTitle = document.getElementById("feature-title");
const thumbnailContainer = document.getElementById("thumbnail-container");
const buttons = document.querySelectorAll(".filter-btn");
const dropdown = document.getElementById("color-dropdown");


function createThumbnails(filter) {
    thumbnailContainer.innerHTML = "";

    const filteredImages = filter === "all" ? images : images.filter(img => img.color === filter);

    filteredImages.forEach((img, index) => {
        const thumb = document.createElement("div");
        thumb.classList.add("thumbnail");
        thumb.textContent = img.id.toUpperCase();
        thumb.style.background = img.bg;

       
        if (index === 0) {
            thumb.classList.add("selected");
            updateFeatureImage(img); 
        }

        thumb.addEventListener("click", () => {
            updateFeatureImage(img);
            document.querySelectorAll(".thumbnail").forEach(t => t.classList.remove("selected"));
            thumb.classList.add("selected");
        });

        thumbnailContainer.appendChild(thumb);
    });
}


function updateFeatureImage(img) {
    featureContainer.style.background = img.bg;
    featureTitle.textContent = `${img.id} - ${img.color.toUpperCase()}`;
}


buttons.forEach(button => {
    button.addEventListener("click", () => {
        const filter = button.getAttribute("data-filter");
        createThumbnails(filter);
    });
});


dropdown.addEventListener("change", (e) => {
    createThumbnails(e.target.value);
});


document.body.style.fontFamily = "Arial, sans-serif";
document.body.style.padding = "20px";

featureContainer.style.width = "300px";
featureContainer.style.height = "200px";
featureContainer.style.border = "2px solid black";
featureContainer.style.marginBottom = "10px";
featureContainer.style.display = "flex";
featureContainer.style.alignItems = "center";
featureContainer.style.justifyContent = "center";
featureContainer.style.fontSize = "24px";
featureContainer.style.color = "black";


document.getElementById("buttons").style.marginBottom = "10px";

document.querySelectorAll(".filter-btn").forEach(btn => {
    btn.style.margin = "5px";
    btn.style.padding = "10px";
    btn.style.border = "1px solid black";
    btn.style.cursor = "pointer";
});

dropdown.style.marginBottom = "10px";
dropdown.style.padding = "5px";

thumbnailContainer.style.display = "flex";
thumbnailContainer.style.flexWrap = "wrap";
thumbnailContainer.style.gap = "10px";
thumbnailContainer.style.width="213px";

function styleThumbnail(thumb) {
    thumb.style.width = "60px";
    thumb.style.height = "60px";
    thumb.style.display = "flex";
    thumb.style.alignItems = "center";
    thumb.style.justifyContent = "center";
    thumb.style.fontSize = "12px";
    thumb.style.color = "black";
    thumb.style.border = "2px solid transparent";
    thumb.style.cursor = "pointer";
}


const observer = new MutationObserver(() => {
    document.querySelectorAll(".thumbnail").forEach(thumb => {
        styleThumbnail(thumb);
        thumb.addEventListener("mouseover", () => thumb.style.border = "2px solid black");
        thumb.addEventListener("mouseout", () => {
            if (!thumb.classList.contains("selected")) {
                thumb.style.border = "2px solid transparent";
            }
        });
    });
});

observer.observe(thumbnailContainer, { childList: true });


createThumbnails("all");