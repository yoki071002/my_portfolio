export const projects = [
    {
        id: 1,
        title: "Digital Restoration of Ancient Artifacts",
        category: "AI + Cultural Heritage",
        status: "In Development",
        summary: "An integrated NLP and Computer Vision platform designed for the digital stitching of pottery fragments and the restoration of obscured historical scripts.",
        tech: ["Python", "PyTorch", "React", "OpenCV"],
        link: "/",
        highlights: [
            "Leveraging CV for geometric fragment matching.",
            "Utilizing NLP models to infer missing segments in ancient texts based on historical context."
        ]
    },
    {
        id: 2,
        title: "Personal Portfolio: The Digital Museum",
        category: "Web Development",
        status: "In Development",
        summary: "A high-performance personal portfolio built with Next.js, featuring a 'Digital Museum' theme to showcase the intersection of technology and humanities.",
        tech: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion"],
        link: "/",
        highlights: [
            "Server-side rendering for optimal performance.",
            "Custom-designed UI inspired by traditional Chinese aesthetics."
        ]
    },
    {
        id: 3,
        title: "OnCore: Intelligent Musical Calendar & Social Wallet",
        category: "Mobile Software Engineering",
        status: "Completed",
        summary: "A full-stack Android ecosystem for theatre enthusiasts, integrating digital ticket management, real-time social synchronization, and automated spending analytics.",
        tech: ["Kotlin", "Jetpack Compose", "MVVM", "Firebase", "Room DB", "Retrofit"],
        link: "https://github.com/yoki071002/cs501_fp",
        highlights: [
            "Architecture: Implemented MVVM with Unidirectional Data Flow (UDF) to manage complex states across UI, local SQLite (Room), and cloud NoSQL (Firestore).",
            "Data Integration: Synchronized multi-source data from Ticketmaster and iTunes APIs using Retrofit and Coroutines for seamless real-time event discovery.",
            "Analytics Dashboard: Engineered a Budget Tracker with dynamic data visualization to analyze lifetime spending patterns and ticket distributions.",
            "Cloud Infrastructure: Leveraged Firebase Auth and Cloud Storage to ensure secure user identity management and persistent cross-device image syncing."
        ]
    },
    {
        id: 4,
        title: "RiotPulse: League of Legends Real-time Analytics",
        category: "Data Engineering & Web",
        status: "Completed",
        summary: "A high-performance analytics dashboard utilizing Riot Games API to visualize player statistics, match dynamics, and competitive meta-game trends.",
        tech: ["Next.js", "TypeScript", "Tailwind CSS", "REST API", "Vercel"],
        link: "https://github.com/lagijk/final-project",
        highlights: [
            "Full-stack Integration: Developed a robust data-fetching layer using Next.js Route Handlers to interface with the Riot Games Rate-limited API.",
            "Type-safe Development: Leveraged TypeScript to define complex schemas for multi-dimensional summoner and match data, ensuring system-wide type safety.",
            "Dynamic Visualization: Engineered interactive ProfileCards and match history components with optimized rendering for high-frequency data updates.",
            "Deployment & DevOps: Managed CI/CD workflows via Vercel, implementing custom error handling for cross-origin API requests and backend structure shifts."
        ]
    },
    {
        id: 5,
        title: "I Close My Eyes (To Open Yours): Audio-Driven Puzzle System",
        category: "Game Engineering & Interactive Systems",
        status: "Completed",
        summary: "An experimental sensory-deprivation puzzle game developed in Godot, where navigation relies entirely on beat-synced audio cues and tile-based haptic feedback.",
        tech: ["GDScript", "Godot 4", "Real-time Audio Processing", "Finite State Machines"],
        link: "https://github.com/yoki071002/PixelAudioGame",
        highlights: [
            "Gameplay Engineering: Developed the core movement and interaction systems, including a 'Blind Cane' proximity detection algorithm that translates tile properties into spatial audio cues.",
            "Dynamic NPC Logic: Architected Finite State Machines (FSM) for NPC behaviors (Ghost & Siren), ensuring high-performance pathfinding and state transitions within a 10-day sprint.",
            "Beat-Synchronization: Engineered a rhythm-aligned playback system (80 BPM) to synchronize player actions with environmental audio loops, maintaining sub-millisecond precision.",
            "System Optimization: Refined audio bus routing and ducking mechanisms to ensure clarity in complex multi-channel soundscapes."
        ]
    },
    {
        id: 6,
        title: "Statistical Inference on Global Crop Yield Determinants",
        category: "Mathematics & Statistics Modeling",
        status: "Completed",
        summary: "A rigorous quantitative study utilizing the Climate Change Impact on Agriculture 2024 dataset to evaluate the influence of biological, temporal, and management factors on agricultural productivity.",
        tech: ["R", "R Markdown", "ANOVA", "Non-parametric Testing", "Hypothesis Testing"],
        link: "https://github.com/yoki071002/FactorsOnCropYield",
        highlights: [
            "Experimental Design: Implemented a robust statistical pipeline including One-Way ANOVA, Repeated-Measures ANOVA, and Kruskal-Wallis tests to analyze multi-dimensional agrarian data.",
            "Pre-analysis Diagnostics: Conducted comprehensive assumption checks via Lilliefors KS (Normality), Tietjen-Moore (Outliers), and Bartlett’s tests (Homogeneity) to ensure model validity.",
            "Rigorous Inference: Evaluated p-values and effect sizes across biological (crop type) and temporal (year-to-year) variables, concluding high yield stability within the studied parameters.",
            "Data Visualization: Leveraged R Markdown to generate reproducible research reports with integrated data cleaning and complex statistical visualizations."
        ]
    },
    {
        id: 7,
        title: "Predicting Taxi Fares: Regression Analytics & Regularization",
        category: "Mathematics & Statistics Modeling",
        status: "Completed",
        summary: "A comparative study of MLR and Ridge Regression models to predict ride-hailing fares, featuring advanced feature selection and heteroscedasticity stabilization.",
        tech: ["R", "Ridge Regression", "Logistic Regression", "Regularization", "Variable Selection"],
        link: "https://github.com/yoki071002/PredictingTaxiFares",
        highlights: [
            "Model Engineering: Built and optimized Multiple Linear Regression (MLR) and Ridge Regression models, achieving robust coefficient stability against multicollinearity (MCI ≈ 2.28).",
            "Advanced Diagnostics: Addressed severe heteroscedasticity through logarithmic transformations and validated model assumptions via Bartlett’s and Kolmogorov-Smirnov tests.",
            "Feature Selection: Employed Lasso Regression traces and Added-Variable Plots (AV-Plots) to identify and prune redundant predictors like passenger count and weather variables.",
            "Classification Extension: Developed a Logistic Regression framework to classify trip fares into high/low pricing tiers, providing a probabilistic approach to dynamic pricing strategies."
        ]
    }
];