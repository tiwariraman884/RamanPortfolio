const projects = [
    {
        id: "01",
        slug: "ibm-z-fraud-detection",
        title: "IBM Z Fraud Detection",
        category: "REAL-TIME CREDIT CARD FRAUD DETECTION",
        image: "/images/projects/IBM-Z-Fraud.webp",

        shortDescription:
            "A machine-learning based fraud detection system that evaluates financial transactions and returns real-time fraud risk predictions through a FastAPI backend.",

        technologies: [
            "Python",
            "Scikit-learn",
            "Random Forest",
            "FastAPI",
            "REST API",
        ],

        overview:
            "IBM Z Fraud Detection is a real-time credit card fraud detection system designed to identify potentially fraudulent financial transactions using machine learning.",

        problem:
            "Financial transaction systems need to identify suspicious activity quickly while minimizing unnecessary false alerts.",

        solution:
            "The system processes transaction data through a FastAPI backend and uses a trained Random Forest model to classify transactions as fraudulent or legitimate.",

        features: [
            "Real-time transaction prediction",
            "Random Forest classification",
            "FastAPI REST backend",
            "Transaction processing",
            "Fraud-risk assessment",
            "Machine-learning based prediction",
        ],

        architecture: [
            "Transaction Input",
            "FastAPI Backend",
            "Data Validation",
            "Feature Processing",
            "Random Forest Model",
            "Fraud / Legitimate Prediction",
            "Risk Assessment",
        ],

        github: "https://github.com/tiwariraman884",
    },

    {
        id: "02",
        slug: "nutriguard",
        title: "NutriGuard",
        category: "AI-POWERED FOOD SAFETY & NUTRITION",
        image: "/images/projects/NutriGuard.webp",

        shortDescription:
            "A food intelligence platform exploring OCR, barcode scanning, nutrition analysis, and AI-assisted guidance to help users make safer and more informed food choices.",

        technologies: [
            "JavaScript",
            "React",
            "OCR",
            "AI APIs",
        ],

        overview:
            "NutriGuard is a food intelligence platform designed to make food information easier to understand through technology-assisted analysis.",

        problem:
            "Consumers often have difficulty understanding nutritional information, ingredient lists, and food labels when making food choices.",

        solution:
            "NutriGuard explores OCR, barcode scanning, nutrition analysis, and AI-assisted guidance to turn food information into practical insights.",

        features: [
            "Food label OCR",
            "Barcode scanning",
            "Nutrition analysis",
            "AI-assisted guidance",
            "Food safety insights",
            "Practical food recommendations",
        ],

        architecture: [
            "Food Product",
            "Camera / Barcode",
            "OCR / Scanner",
            "Food Data",
            "Nutrition Analysis",
            "AI Guidance",
            "User Recommendation",
        ],

        github: "https://github.com/tiwariraman884",
    },

    {
        id: "03",
        slug: "greenstep-india",
        title: "GreenStep India",
        category: "CARBON FOOTPRINT & RENEWABLE TRACKING",
        image: "/images/projects/GreenStep.webp",
        shortDescription:
            "A web platform designed to help users understand and reduce their environmental impact through carbon-footprint tracking and practical sustainability guidance.",

        technologies: [
            "Next.js",
            "Supabase",
            "Gemini",
            "Vercel",
        ],

        overview:
            "GreenStep India is a sustainability-focused web platform that helps users understand their environmental impact and explore practical ways to reduce it.",

        problem:
            "People often know that everyday activities affect the environment but lack simple tools to understand their individual impact.",

        solution:
            "GreenStep India combines carbon-footprint tracking with sustainability guidance to make environmental impact easier to understand and act upon.",

        features: [
            "Carbon-footprint tracking",
            "Sustainability guidance",
            "Environmental impact insights",
            "AI-assisted recommendations",
            "Modern web interface",
            "Cloud-based data storage",
        ],

        architecture: [
            "User Input",
            "Activity Data",
            "Carbon Calculation",
            "Supabase",
            "Gemini AI",
            "Environmental Insights",
            "Recommendations",
        ],

        github: "https://github.com/tiwariraman884",
    },

    {
        id: "04",
        slug: "freshwater-health-monitor",
        title: "Freshwater Health Monitor",
        category: "REAL-TIME WATER QUALITY MONITORING",
        image: "/images/projects/Freshwater.webp",

        shortDescription:
            "A citizen-driven platform for reporting freshwater pollution, sharing observations, uploading evidence, and tracking the health of local water bodies.",

        technologies: [
            "React",
            "Node.js",
            "MongoDB",
            "REST API",
        ],

        overview:
            "Freshwater Health Monitor is a community-driven platform designed to help citizens report and track pollution and environmental conditions in freshwater bodies.",

        problem:
            "Communities often lack accessible digital tools for documenting pollution observations and maintaining structured information about local water bodies.",

        solution:
            "The platform allows citizens to submit pollution reports, observations, and supporting evidence through a centralized monitoring system.",

        features: [
            "Pollution reporting",
            "Water-body monitoring",
            "Evidence uploads",
            "Community observations",
            "REST API backend",
            "MongoDB storage",
        ],

        architecture: [
            "Citizen",
            "Report / Observation",
            "React Frontend",
            "REST API",
            "Node.js Backend",
            "MongoDB",
            "Water Health Records",
        ],

        github: "https://github.com/tiwariraman884",
    },
];

export { projects };
export default projects;