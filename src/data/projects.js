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
            "•Python",
            "• Scikit-learn",
            " • Random Forest ",
            "• FastAPI • Uvicorn",
            "• Pandas ",
            "• NumPy",
            "• Machine Learning",
            "• REST API",
        ],

        overview:
            "IBM Z Fraud Detection is a real-time credit-card fraud detection system that uses Machine Learning and FastAPI to identify whether a transaction is fraudulent or legitimate. The system processes transaction data, sends it to a trained Random Forest model through the /predict API endpoint, and returns a fraud/legitimate prediction along with a risk assessment.",

        problem:
            "Financial fraud is increasing in digital transactions, making it difficult to manually identify suspicious transactions quickly and accurately. Traditional rule-based systems can generate false positives and may fail to detect new fraud patterns. The IBM Z Fraud Detection project addresses this problem by using machine learning to analyze transaction patterns in real time and identify potentially fraudulent transactions, enabling faster and more reliable fraud detection.",

        solution:
            "IBM Z Fraud Detection uses a machine-learning-based approach to automatically identify suspicious credit-card transactions. A Random Forest model analyzes transaction features and predicts the probability of fraud. The trained model is deployed through a FastAPI /predict endpoint, enabling real-time transaction analysis and classification as fraudulent or legitimate. This helps reduce manual monitoring, detect suspicious patterns faster, and support timely fraud prevention.",

        features: [
            "Transaction Fraud Detection — Classifies transactions as fraud or legitimate.",
            "Random Forest Model — Uses a trained ML classification model.",
            "Real-Time API — FastAPI provides the /predict endpoint for predictions.",
            "Transaction Analysis — Processes transaction features to identify suspicious patterns.",
            "Risk Assessment — Uses a probability threshold to determine fraud risk.",
            "Streaming Simulation — Simulates real-time incoming transaction data.",
            "Large Dataset — Trained/evaluated using the credit-card fraud dataset containing 284,807 transactions.",
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

        github: "https://github.com/tiwariraman884/Datathon.git",
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
            "• React Native",
            "• OCR/Tesseract",
            "• Google ML Kit",
            "• Firebase/Auth",
            "• AI/ML ",
            "• Barcode Scanner",
        ],

        overview:
            "NutriGuard is an AI-powered food safety and nutrition platform designed to help users make safer and healthier food choices. The application allows users to scan food product labels using OCR, scan barcodes, and analyze nutritional information to provide an easy-to-understand health and nutrition assessment. It can highlight important nutritional values, identify potentially concerning ingredients, and provide personalized food guidance.",

        problem:
            "Consumers often struggle to understand complex food labels, nutritional values, and potentially harmful ingredients while purchasing packaged food. Manually checking every ingredient and nutrition value is time-consuming and confusing, especially for people with specific dietary needs. NutriGuard addresses this problem by providing quick, easy-to-understand food safety and nutrition analysis through OCR and barcode scanning.",

        solution:
            "NutriGuard provides a quick and intelligent way to analyze packaged food products. Users can scan a barcode or food label, and the system extracts nutritional and ingredient information using OCR and ML-based scanning. It then analyzes the data, generates an easy-to-understand nutrition/health score, highlights potentially concerning ingredients or nutrient levels, and provides practical guidance to help users make safer and healthier food choices.",

        features: [
            "OCR Food Label Scanning — Extracts nutrition and ingredient information from product labels.",
            "Barcode Scanning — Quickly identifies packaged food products.",
            "Nutrition Analysis — Evaluates calories, sugar, fat, protein, sodium, and other nutritional values.",
            "Food Safety Assessment — Highlights potentially concerning ingredients or nutritional levels.",
            "Health/Nutrition Score — Converts complex nutritional information into an easy-to-understand score.",
            "AI-Powered Guidance — Provides recommendations to help users choose better food options.",
            "User-Friendly Interface — Designed to make food analysis quick and accessible.",
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

        github: "https://github.com/tiwariraman884/food-safety-app.git",
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
            "Frontend: Next.js, React, Tailwind CSS",
            "Backend & Database: Supabase, PostgreSQL",
            "Deployment: Vercel",
            "AI: Google Gemini AI",
            "Version Control: Git & GitHub",
            "Development: JavaScript / TypeScript",
            "UI/UX: Responsive design with modern interactive components",
        ],

        overview:
            "GreenStep India is an AI-powered sustainability platform designed to help users understand, track, and reduce their carbon footprint. It collects information about daily activities such as transportation and energy consumption, calculates estimated CO₂ emissions, and presents the results through an interactive dashboard. Using Gemini AI, the platform provides personalized suggestions for adopting more sustainable habits and reducing environmental impact. The project is built using Next.js, Supabase, Gemini AI, and Vercel.",

        problem:
            "GreenStep India was built to help people understand and reduce their carbon footprint in a simple and practical way. Many people are aware of climate change but don't know how their daily activities contribute to carbon emissions or what actions they can take. The platform was designed to calculate users' environmental impact, visualize their footprint, and use AI-powered recommendations to encourage sustainable lifestyle choices and measurable emission reduction.",

        solution:
            "GreenStep India is an AI-powered carbon-footprint platform built with Next.js, Supabase, Gemini, and Vercel. It collects users’ lifestyle and activity data such as transportation, electricity, and other consumption patterns, calculates their estimated CO₂ emissions using emission factors, and stores the data in Supabase. The dashboard visualizes the user’s carbon footprint and progress, while Gemini AI analyzes the data and provides personalized recommendations to help users reduce their environmental impact.",

        features: [
            "Carbon Footprint Calculation — Estimates CO₂ emissions based on users daily activities",
            "Interactive Dashboard — Displays carbon footprint, category-wise emissions, and progress.",
            " AI-Powered Recommendations — Uses Gemini AI to provide personalized sustainability suggestions.",
            "Progress Tracking — Helps users monitor changes in their carbon footprint over time.",
            "Sustainable Lifestyle Guidance — Suggests practical actions to reduce environmental impact.",
            " User Data Management — Uses Supabase for secure data storage and user management.",
            "Environmental Awareness — Encourages users to understand how everyday choices affect the environment.",
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

        github: "https://github.com/tiwariraman884/promptwar.git",
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
            "Frontend: React.js, JavaScript, Tailwind CSS",
            "Backend: Node.js, Express.js",
            "Database: MongoDB, Mongoose",
            "Authentication: JWT-based authentication",
            "Maps & Location: Interactive map integration",
            "API: RESTful APIs",
        ],

        overview:
            "Freshwater Health Monitor is a citizen-driven environmental platform designed to help communities report, monitor, and track the health and pollution levels of freshwater bodies such as rivers, lakes, and ponds. Users can submit pollution reports and water-quality observations, which can be organized and visualized to identify pollution patterns and support faster environmental action. The platform aims to connect citizens, environmental organizations, and authorities to improve freshwater monitoring and awareness.",

        problem:
            "Freshwater bodies such as rivers, lakes, and ponds are increasingly affected by pollution, while regular monitoring is often limited, fragmented, or difficult for local communities to access. Citizens may notice pollution but lack an easy platform to report and track it. This creates a gap between pollution incidents, community awareness, and environmental action. Freshwater Health Monitor addresses this gap by enabling citizens to report issues and providing a centralized system to monitor freshwater health and pollution trends.",

        solution:
            "Freshwater Health Monitor provides a centralized, citizen-driven platform for reporting and monitoring freshwater pollution. Users can submit pollution reports with relevant details and location information, while the system organizes and visualizes these reports to identify pollution patterns and affected water bodies. This helps communities and environmental stakeholders monitor freshwater health, raise awareness, and take faster, data-driven action to protect water resources.",

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

        github: "https://github.com/tiwariraman884/FreshWatch.git",
    },
];

export { projects };
export default projects;