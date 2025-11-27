// Portfolio Data
const portfolioData = {
  personal: {
    name: "Rushiraj Chavan",
    title: ["AI Decision Scientist", "ML Engineer", "Data Scientist", "GenAI Specialist"],
    bio: "AI Decision Science Analyst at Accenture with 4+ years of experience in building scalable AI systems using LLMs, GenAI, Deep Learning, NLP, Computer Vision and MLOps. Expertise in enterprise-grade cloud architectures (AWS, GCP, Azure) and end-to-end AI pipeline deployment. Delivered multiple high-impact solutions across healthcare, supply chain, pharma, logistics, and design automation with measurable business outcomes including 30% reduction in processing times and 40% improvement in operational efficiency.",
    email: "rushirajrajeshchavan@gmail.com",
    phone: "+91 8898520000",
    location: "Mumbai, India",
    website: "https://rushiraj98.github.io",
    linkedin: "https://linkedin.com/in/rushirajchavan",
    github: "https://github.com/Rushiraj98",
    scholar: "https://scholar.google.com/citations?user=JrZtqHEAAAAJ&hl=en",
    lablab: "https://lablab.ai/u/@Rushiraj98"
  },

  experience: [
    {
      role: "AI Decision Science Analyst",
      company: "Accenture",
      duration: "January 2025 – Present",
      location: "Mumbai, India",
      description: [
        "Engineered a Large Language Model (LLM)-powered Q&A system using LangChain to efficiently process and retrieve key insights from diverse CSV datasets, resulting in a 40% reduction in manual data exploration time for stakeholders.",
        "Seamlessly integrated the LLM solution with existing business intelligence dashboards, significantly boosting stakeholder confidence and engagement by delivering instant, context-aware responses to complex, ad-hoc data queries.",
        "Designed and deployed a complex, multi-query LLM data pipeline orchestrated via GCP Cloud Run and BigQuery. This system automatically ingests weekly PDF reports, extracts critical operational insights, and delivers a consolidated Excel summary report to leadership.",
        "Enhanced Small Language Model (SLM) retrieval and reasoning performance on complex, high-context queries by implementing a hybrid GraphRAG architecture (combining vector search with knowledge graph querying) coupled with a Chain-of-Thought (CoT) prompting process, improving answer accuracy by 15%.",
        "Developed multiple high-impact assets/proof-of-concepts (PoCs) by applying QLoRA (Quantized Low-Rank Adaptation) for Parameter-Efficient Fine-Tuning (PEFT) on Mistral 7B and Gemma 2B models. This optimized SLM performance for task-specific applications while reducing computational resource requirements by ~70% compared to full fine-tuning."
      ]
    },
    {
      role: "Senior Data Scientist",
      company: "Gramener",
      duration: "Oct 2021 – Jan 2025",
      location: "Remote/Bangalore",
      description: [
        "Led AI Initiatives Across Diverse Industries: Enhanced operational efficiency and decision-making through advanced AI algorithms and MLOps methodologies, applying engineering principles in sectors including healthcare, consumer goods, government, non-profits, and entertainment.",
        "Automated Medical Claims Processing: Developed and integrated advanced machine learning models, including BERT and GPT, for the Government of India's National Health Authority's Pradhan Mantri Jan Arogya Yojana Scheme, achieving a 94% accuracy rate in document classification, a 30% reduction in processing time, and ensuring compliance with regulatory requirements.",
        "Scalability and Cost Reduction: Leveraged cloud computing platforms, including Azure and AWS, with Kubernetes for orchestration to process 100,000 documents per hour, reducing operational costs by 25%. Conducted performance testing and tuning for scalability and optimization.",
        "Advanced Analytics and Optimization: Utilized data extraction and data pipelines to refine existing models and explore new algorithms, contributing to a 25% increase in revenue. Developed optimization models using operations research principles, reducing truck loading transportation costs by 15%.",
        "GenAI Model Development: Independently developed a generative AI model for wood pattern regeneration using an advanced image generation model called stable diffusion, reducing design iteration time by 40% and boosting designer productivity.",
        "Career Growth: Promoted twice within three years due to outstanding performance, significant contributions to high-impact projects, and demonstration of technical expertise across machine learning, data analytics, and software engineering."
      ]
    }
  ],

  projects: [
  {
    name: "Medical Claims AI for National Health Authority",
    description: "Built comprehensive ML pipeline using LLMs, NLP & Computer Vision achieving 94% accuracy with Logistic Regression for text classification and ResNet-18/ResNet-50 for image classification. Deployed on AWS Kubernetes clusters processing 100K+ documents per hour with complete MLOps pipeline including load testing using Locust, Kibana, Grafana, and CloudWatch.",
    technologies: ["Python", "TensorFlow", "PyTorch", "AWS EKS", "SageMaker", "Lambda", "Kubernetes", "Logistic Regression", "ResNet"],
    category: ["mlops", "cv", "llm"],
    icon: "fa-hospital"
  },
  {
    name: "Wood Pattern Image Regeneration (GenAI)",
    description: "Developed generative AI system using Stable Diffusion for wood pattern regeneration enabling recreation and extension of design samples. Built GPU-backed API endpoints on AWS EC2 (g4dn) with feedback pipelines via S3 and Lambda. Implemented Streamlit front-end for real-time designer interaction, reducing manual design workload by 40%.",
    technologies: ["Python", "Stable Diffusion", "AWS EC2", "S3", "Lambda", "Streamlit", "Generative AI"],
    category: ["genai"],
    icon: "fa-image"
  },
  {
    name: "Document Question & Answering System",
    description: "Designed data extraction systems using Large Language Models like GPT-4 leveraging PyTorch and TensorFlow for high accuracy. Developed data pipelines for extraction, processing, and storage in Chroma DB with performance testing and optimization on cloud platforms using Kubernetes.",
    technologies: ["Python", "GPT-4", "LangChain", "Chroma DB", "PyTorch", "TensorFlow", "Kubernetes"],
    category: ["llm"],
    icon: "fa-comments"
  },
  {
    name: "Cold Storage Truck Consolidation Optimization",
    description: "Developed bin-packing optimization models (First Fit & Best Fit) for truck routing, reducing logistics cost by 15% with Streamlit dashboard for ROI analysis.",
    technologies: ["Python", "Optimization Algorithms", "Streamlit", "Data Analytics"],
    category: ["mlops"],
    icon: "fa-truck"
  },
  {
    name: "Supply Chain What-If Simulations for Pharma",
    description: "Built cost & carbon emission simulation models enabling pharma companies to analyze supply chain trade-offs using advanced statistical modeling and decision support systems.",
    technologies: ["Python", "Statistical Modeling", "Simulation", "Data Science"],
    category: ["mlops"],
    icon: "fa-pills"
  },
  {
    name: "Lightweight Market Data SDK (Bridgefi)",
    description: "Built high-performance C++/Rust SDK for streaming Kraken WebSocket market data with <10ms latency. Engineered low-latency cryptocurrency trading infrastructure handling 10k+ ticks per second for real-time market data aggregation and exchange connectivity.",
    technologies: ["C++", "Rust", "WebSocket", "Kraken API", "Real-time Data Streaming"],
    category: ["backend", "systems"],
    icon: "fa-code"
  },
  {
    name: "Market Buying Chatbot with Agentic AI Using LangGraph and GCP",
    description: "Built autonomous agent-based chatbot leveraging LangGraph for multi-step market analysis and procurement decision workflows. Implemented stateful agent execution with tool orchestration (market data APIs, inventory systems, pricing engines) and dynamic memory management. Deployed on GCP Cloud Run with BigQuery integration for transaction logging and audit trails, enabling real-time procurement decisions with 25% faster turnaround.",
    technologies: ["Python", "LangGraph", "GCP Cloud Run", "BigQuery", "LangChain", "REST APIs", "Agent Orchestration"],
    category: ["llm", "genai"],
    icon: "fa-robot"
  },
  {
    name: "Graph-based Retrieval-Augmented Generation (Graph RAG)",
    description: "Engineered knowledge graph-based RAG system for enterprise document intelligence combining Neo4j for relationship mapping with semantic search. Built entity extraction pipelines using Hugging Face NER models with graph traversal for multi-hop reasoning. Implemented semantic query expansion and context relevance scoring, improving retrieval accuracy by 35% over flat vector-based RAG and reducing hallucination rate by 28%.",
    technologies: ["Python", "Neo4j", "LangChain", "Hugging Face", "Knowledge Graphs", "Entity Extraction", "Graph Databases", "RAG"],
    category: ["llm", "genai"],
    icon: "fa-network-wired"
  },
  {
    name: "Enterprise LLM Fine-tuning Pipeline on GCP Vertex AI",
    description: "Developed production-grade LLM fine-tuning infrastructure using LoRA and QLoRA on GCP Vertex AI with automated orchestration. Implemented hyperparameter sweeps, evaluation benchmarking (BLEU, ROUGE, custom metrics), and A/B testing frameworks for model selection. Built CI/CD pipelines for dataset versioning (BigQuery), model versioning (Vertex Model Registry), and automated retraining triggers. Reduced fine-tuning iteration cycle from 2 weeks to 3 days.",
    technologies: ["Python", "Hugging Face", "LoRA", "QLoRA", "GCP Vertex AI", "PyTorch", "MLflow", "BigQuery", "Model Registry"],
    category: ["llm", "mlops"],
    icon: "fa-cube"
  }
], 


  skills: {
    "Programming & Frameworks": {
      icon: "fa-code",
      skills: ["Python", "C/C++", "SQL", "TensorFlow", "PyTorch", "FastAPI", "Streamlit"]
    },
    "Machine Learning & AI": {
      icon: "fa-brain",
      skills: ["Large Language Models (LLMs)", "Generative AI", "NLP", "Computer Vision", "Deep Learning", "Neural Networks", "CNNs", "RNNs", "GANs", "Transfer Learning"]
    },
    "Cloud & MLOps": {
      icon: "fa-cloud",
      skills: ["AWS", "GCP", "Azure", "Docker", "Kubernetes", "MLOps", "LLMOps", "SageMaker", "Lambda", "S3", "CloudWatch", "MLflow"]
    },
    "Data Technologies": {
      icon: "fa-database",
      skills: ["Chroma DB", "BigQuery", "Vertex AI", "Data Pipelines", "Data Warehousing", "Big Data", "PySpark", "Dataset Engineering"]
    },
    "AI/ML Libraries & Tools": {
      icon: "fa-tools",
      skills: ["Hugging Face", "Transformers", "scikit-learn", "NumPy", "Pandas", "Matplotlib", "OpenCV", "LangChain", "OpenAI API", "RLHF"]
    },
    "Specialized AI": {
      icon: "fa-robot",
      skills: ["Stable Diffusion", "BERT", "GPT", "Retrieval-Augmented Generation (RAG)", "GraphRAG", "QLoRA", "PEFT", "Chain-of-Thought (CoT)"]
    }
  },

  achievements: [
    {
      title: "1st Place - Supply Chain LLM Hackathon",
      description: "Accenture, 2025",
      icon: "fa-trophy"
    },
    {
      title: "Client Appreciation - Super Hero Award",
      description: "Unilever, 2025 - Top performer out of 100+ teams",
      icon: "fa-award"
    },
    {
      title: "Core Value Champion",
      description: "Accenture, 2025",
      icon: "fa-medal"
    },
    {
      title: "Rising Star Award",
      description: "Gramener, 2021-2024",
      icon: "fa-star"
    },
    {
      title: "Safe Hands Award",
      description: "Gramener, 2021-2024",
      icon: "fa-hands-helping"
    },
    {
      title: "Self-driven Team Award",
      description: "Gramener, 2021-2024",
      icon: "fa-users"
    },
    {
      title: "GPT Hackathon Runner-up",
      description: "Gramener, 2021-2024",
      icon: "fa-code"
    },
    {
      title: "Published Research Paper",
      description: "Speech-to-speech translation using deep learning-based models and cloud services in GIS Science Journal, 2022 (Cited by 1)",
      icon: "fa-file-alt"
    },
    {
      title: "Microsoft Azure Certification",
      description: "Associate Data Scientist Certification DP-100",
      icon: "fa-certificate"
    },
    {
      title: "Speaker at PyCon Limerick, Ireland",
      description: "2023 - Presented on Stable Diffusion and generative AI advancements",
      icon: "fa-microphone"
    }
  ]
};
