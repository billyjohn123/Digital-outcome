const buttons = document.querySelectorAll(".stage-btn");
const phDisplay = document.querySelector(".ph-display");
const nutrientIndicator = document.querySelector(".nutrient-indicator");
const plantsContainer = document.querySelector(".plants");
const yieldFill = document.querySelector(".yield-fill");
const yieldPercent = document.querySelector(".yield-percent");
const stageInfo = document.querySelector(".stage-info p");
const limeParticles = document.querySelector(".lime-particles");
const soilParticles = document.querySelector(".soil-particles");

// Create plants if they don't exist
const initialHeights = [20, 15, 25];
const initialWidths = [8, 6, 10];

if (plantsContainer.children.length === 0) {
    initialHeights.forEach((height, index) => {
        const plant = document.createElement("div");
        plant.classList.add("plant");
        plant.style.height = height + "px";
        plant.style.width = initialWidths[index] + "px";
        plant.style.backgroundColor = "#6B8E23";

        // Create single leaf for each plant
        const leaves = document.createElement("div");
        leaves.classList.add("plant-leaves");
        plant.appendChild(leaves);

        plantsContainer.appendChild(plant);
    });
}

const stages = {
    1: {
        ph: "pH: 5.0 (Acidic)",
        nutrients: { 
            nitrogen: "Nitrogen: Low", 
            phosphorus: "Phosphorus: Low", 
            potassium: "Potassium: Low" 
        },
        plantHeights: [20, 15, 25],
        plantWidths: [8, 6, 10],
        leafSizes: [8, 6, 10], 
        yield: 30,
        info: "Soil is acidic and nutrient availability is low. Plant growth is limited.",
    },
    2: {
        ph: "pH: 6.2 (Improving)",
        nutrients: { 
            nitrogen: "Nitrogen: Medium", 
            phosphorus: "Phosphorus: Medium", 
            potassium: "Potassium: Medium" 
        },
        plantHeights: [40, 35, 45],
        plantWidths: [12, 10, 14],
        leafSizes: [16, 14, 18], 
        yield: 60,
        info: "Lime applied. pH is improving, nutrients are more available, plants are growing faster.",
        limeVisible: true
    },
    3: {
        ph: "pH: 6.8 (Optimal)",
        nutrients: { 
            nitrogen: "Nitrogen: High", 
            phosphorus: "Phosphorus: High", 
            potassium: "Potassium: High" 
        },
        plantHeights: [70, 65, 75],
        plantWidths: [19, 16, 23],
        leafSizes: [30, 31, 28], 
        yield: 95,
        info: "Soil pH is optimal, nutrients are abundant, and plant growth is at maximum.",
    }
};

function createLime() {
    limeParticles.innerHTML = "";
    for (let i = 0; i < 50; i++) {
        const dot = document.createElement("div");
        dot.classList.add("lime-dot");
        dot.style.top = Math.random() * 60 + 40 + "%"; 
        dot.style.left = Math.random() * 100 + "%";
        limeParticles.appendChild(dot);
    }
}

function createSoilParticles() {
    soilParticles.innerHTML = "";
    for (let i = 0; i < 40; i++) {
        const particle = document.createElement("div");
        particle.classList.add("soil-particle");
        particle.style.bottom = Math.random() * 40 + "%"; 
        particle.style.left = Math.random() * 100 + "%";
        particle.style.width = "2px";
        particle.style.height = "2px";
        particle.style.backgroundColor = "#8B4513";
        particle.style.borderRadius = "50%";
        particle.style.position = "absolute";
        particle.style.animationDelay = (Math.random() * 2) + "s";
        soilParticles.appendChild(particle);
    }
}

// Stage button event listeners
buttons.forEach(btn => {
    btn.addEventListener("click", () => {
        // Remove active class from all buttons
        buttons.forEach(b => b.classList.remove("active"));
        // Add active class to clicked button
        btn.classList.add("active");

        const stage = stages[btn.dataset.stage];

        // Update pH display
        phDisplay.textContent = stage.ph;

        // Update nutrient indicators
        nutrientIndicator.innerHTML = `
            <div class="nutrient nitrogen">${stage.nutrients.nitrogen}</div>
            <div class="nutrient phosphorus">${stage.nutrients.phosphorus}</div>
            <div class="nutrient potassium">${stage.nutrients.potassium}</div>
        `;

        // Update plants
        plantsContainer.querySelectorAll(".plant").forEach((plant, i) => {
            // Update plant height and width
            plant.style.height = stage.plantHeights[i] + "px";
            plant.style.width = stage.plantWidths[i] + "px";
            plant.style.backgroundColor = stage.plantHeights[i] > 30 ? "#228B22" : "#6B8E23";
            
            // Update single leaf size
            const leaves = plant.querySelector(".plant-leaves");
            const leafSize = stage.leafSizes[i];
            
            leaves.style.display = "block";
            leaves.style.width = leafSize + "px";
            leaves.style.height = (leafSize * 0.6) + "px";
            leaves.style.backgroundColor = stage.plantHeights[i] > 30 ? "#32CD32" : "#6B8E23";
        });

        // Update yield meter
        yieldFill.style.width = stage.yield + "%";
        yieldPercent.textContent = stage.yield + "%";

        // Update stage info
        stageInfo.textContent = stage.info;

        // Handle lime particles
        if (stage.limeVisible) {
            createLime();
            limeParticles.style.display = "block";
        } else {
            limeParticles.style.display = "none";
        }
    });
});

// Initialize
createSoilParticles();
// Trigger the first stage
if (buttons.length > 0) {
    buttons[0].click();
}