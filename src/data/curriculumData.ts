import { OfficialProfile, SkillItem, IGOTCourse, TrainingMaterialPreset } from "../types";

export const INITIAL_OFFICIAL_PROFILES: OfficialProfile[] = [
  {
    id: "prof-1",
    name: "Dr. Rajesh Kumar Sharma",
    email: "rajesh.sharma.iss@gov.in",
    userType: "official",
    designation: "Senior Statistical Officer (SSO)",
    cadre: "Subordinate Statistical Service (SSS)",
    department: "National Sample Survey (NSS) - Survey Design & Research Division (SDRD)",
    ministry: "Ministry of Statistics and Programme Implementation (MoSPI)",
    currentAssignment: "79th Round Socio-Economic Survey Methodology & Sampling Allocation",
    experienceYears: 7,
    education: "M.Sc. in Statistics (Delhi University), PG Diploma in Statistical Computing",
    targetRole: "Assistant Director (Data Analytics & Sample Design)",
    karmayogiId: "KMY-MOSPI-2019-8842",
    completedHours: 38.5,
    allocatedHours: 60,
    certificatesEarned: 5,
  },
  {
    id: "prof-2",
    name: "Smt. Priya Sundaram",
    email: "priya.sundaram.iss@gov.in",
    userType: "official",
    designation: "Junior Statistical Officer (JSO)",
    cadre: "Subordinate Statistical Service (SSS)",
    department: "Price Statistics Division (PSD) - Consumer Price Index Section",
    ministry: "Ministry of Statistics and Programme Implementation (MoSPI)",
    currentAssignment: "Monthly State-level CPI (Rural/Urban) Basket Price Collection & Imputation",
    experienceYears: 3,
    education: "B.Sc. (Hons) Statistics, M.A. Applied Economics",
    targetRole: "Senior Statistical Officer (Price Indices & High-Frequency Analytics)",
    karmayogiId: "KMY-MOSPI-2023-1492",
    completedHours: 24.0,
    allocatedHours: 50,
    certificatesEarned: 3,
  },
  {
    id: "prof-3",
    name: "Shri Amitav Mukherjee",
    email: "amitav.mukherjee@nic.in",
    userType: "official",
    designation: "Deputy Director (National Accounts)",
    cadre: "Indian Statistical Service (ISS)",
    department: "National Accounts Division (NAD) - GVA Compilation Wing",
    ministry: "Ministry of Statistics and Programme Implementation (MoSPI)",
    currentAssignment: "Quarterly GDP Estimates & SNA 2008 Supply-Use Table Harmonization",
    experienceYears: 12,
    education: "M.Stat (Indian Statistical Institute, Kolkata)",
    targetRole: "Joint Director (Macroeconomic Aggregates & Policy Integration)",
    karmayogiId: "KMY-MOSPI-2014-0419",
    completedHours: 54.0,
    allocatedHours: 70,
    certificatesEarned: 8,
  },
  {
    id: "prof-student-1",
    name: "Aakash Varma",
    email: "aakash.varma.stat@univ.edu.in",
    userType: "student",
    designation: "M.Sc. Statistics Student & ISS Aspirant",
    cadre: "Student (Undergraduate/Postgraduate)",
    department: "Department of Statistics & Operations Research",
    ministry: "Delhi University / Central University of Statistical Sciences",
    currentAssignment: "Survey Sampling Theory, Econometric Modeling & CSIR-UGC NET / ISS Prep",
    experienceYears: 2,
    education: "B.Sc. (Hons) Statistics, pursuing M.Sc. Statistics",
    targetRole: "Indian Statistical Service (ISS) Officer / Public Sector Data Scientist",
    karmayogiId: "STU-DU-2024-8831",
    completedHours: 18.0,
    allocatedHours: 45,
    certificatesEarned: 2,
  },
];

export const INITIAL_SKILLS: SkillItem[] = [
  // 1. Statistical Competencies
  {
    id: "stat-1",
    name: "Survey Design & Sampling Methods",
    domain: "Statistical Competencies",
    description: "Multi-stage stratified sampling, PPS systematic sampling, sampling variance estimation, and frame design.",
    currentLevel: 3.8,
    requiredLevel: 4.5,
    importance: "Critical",
    recentAssessmentScore: 84,
  },
  {
    id: "stat-2",
    name: "National Accounts (SNA 2008 & GVA)",
    domain: "Statistical Competencies",
    description: "Gross Value Added (GVA), basic vs producer prices, informal sector estimation, and Supply-Use Tables.",
    currentLevel: 2.5,
    requiredLevel: 4.0,
    importance: "Critical",
    recentAssessmentScore: 62,
  },
  {
    id: "stat-3",
    name: "Price Statistics (CPI, WPI & IIP)",
    domain: "Statistical Competencies",
    description: "Modified Laspeyres index, item substitution, hedonic price adjustments, and high-frequency series.",
    currentLevel: 3.4,
    requiredLevel: 4.0,
    importance: "High",
    recentAssessmentScore: 78,
  },
  {
    id: "stat-4",
    name: "Labour Statistics (PLFS Framework)",
    domain: "Statistical Competencies",
    description: "Usual Status (ps+ss), Current Weekly Status (CWS), activity codes, and sampling weights.",
    currentLevel: 4.0,
    requiredLevel: 4.2,
    importance: "High",
    recentAssessmentScore: 88,
  },
  {
    id: "stat-5",
    name: "SDG Indicators & National Framework (NIF)",
    domain: "Statistical Competencies",
    description: "Tracking UN Sustainable Development Goals, meta-data curation, and NIF baseline audits.",
    currentLevel: 3.0,
    requiredLevel: 4.0,
    importance: "Medium",
    recentAssessmentScore: 70,
  },
  {
    id: "stat-6",
    name: "Data Quality Frameworks (NQAF & SDMX)",
    domain: "Statistical Competencies",
    description: "National Quality Assurance Framework (NQAF), standard data and metadata exchange protocols.",
    currentLevel: 2.8,
    requiredLevel: 4.2,
    importance: "Critical",
    recentAssessmentScore: 65,
  },

  // 2. Technical Competencies
  {
    id: "tech-1",
    name: "Python for Official Statistics & Big Data",
    domain: "Technical Competencies",
    description: "Pandas, NumPy, automated data wrangling, web scraping for price monitoring, and data pipelines.",
    currentLevel: 2.2,
    requiredLevel: 4.5,
    importance: "Critical",
    recentAssessmentScore: 52,
  },
  {
    id: "tech-2",
    name: "R for Statistical Analysis & Econometrics",
    domain: "Technical Competencies",
    description: "Survey package in R, complex survey weighting, tidyr, ggplot2, and reproducible statistical reports.",
    currentLevel: 2.9,
    requiredLevel: 4.0,
    importance: "High",
    recentAssessmentScore: 68,
  },
  {
    id: "tech-3",
    name: "SQL & Relational Microdata Warehousing",
    domain: "Technical Competencies",
    description: "Complex joins, indexing, aggregating billions of survey respondent records, and PostgreSQL optimization.",
    currentLevel: 3.2,
    requiredLevel: 4.0,
    importance: "High",
    recentAssessmentScore: 75,
  },
  {
    id: "tech-4",
    name: "GIS & Spatial Data Analytics (Bhuvan/QGIS)",
    domain: "Technical Competencies",
    description: "Spatial stratification, geo-referencing primary sampling units, remote sensing data for crop statistics.",
    currentLevel: 2.0,
    requiredLevel: 3.8,
    importance: "High",
    recentAssessmentScore: 48,
  },
  {
    id: "tech-5",
    name: "Artificial Intelligence & Machine Learning in Stats",
    domain: "Technical Competencies",
    description: "Predictive imputation, automated text classification for National Industrial Classification (NIC), anomaly detection.",
    currentLevel: 1.8,
    requiredLevel: 4.0,
    importance: "Critical",
    recentAssessmentScore: 45,
  },
  {
    id: "tech-6",
    name: "Stata, SPSS & SAS Legacy Analytics",
    domain: "Technical Competencies",
    description: "Econometric regression modeling, cross-sectional time-series, and legacy NSS data extraction.",
    currentLevel: 4.1,
    requiredLevel: 4.0,
    importance: "Medium",
    recentAssessmentScore: 90,
  },

  // 3. Digital Governance
  {
    id: "gov-1",
    name: "Data Privacy & DPDP Act 2023 Compliance",
    domain: "Digital Governance",
    description: "Digital Personal Data Protection Act compliance, data anonymization techniques, and differential privacy.",
    currentLevel: 2.6,
    requiredLevel: 4.2,
    importance: "Critical",
    recentAssessmentScore: 60,
  },
  {
    id: "gov-2",
    name: "Government Cloud Infrastructure & Cyber Security",
    domain: "Digital Governance",
    description: "Secure data pipelines, CERT-In guidelines, zero trust architecture, and cloud data sovereignty.",
    currentLevel: 2.8,
    requiredLevel: 3.8,
    importance: "High",
    recentAssessmentScore: 66,
  },
  {
    id: "gov-3",
    name: "Digital Public Infrastructure (DPI) & Open Data",
    domain: "Digital Governance",
    description: "National Data & Analytics Platform (NDAP), India Data Portal, API-driven statistical dissemination.",
    currentLevel: 3.2,
    requiredLevel: 4.0,
    importance: "High",
    recentAssessmentScore: 74,
  },

  // 4. Behavioural and Managerial
  {
    id: "beh-1",
    name: "Statistical Project Management & Field Leadership",
    domain: "Behavioural and Managerial Competencies",
    description: "Leading field enumerator teams, managing survey timelines, monitoring response rates and attrition.",
    currentLevel: 3.8,
    requiredLevel: 4.5,
    importance: "High",
    recentAssessmentScore: 82,
  },
  {
    id: "beh-2",
    name: "Public Policy Ethics & Objective Evidence",
    domain: "Behavioural and Managerial Competencies",
    description: "Maintaining integrity of official data releases, conflict of interest management, and public trust.",
    currentLevel: 4.5,
    requiredLevel: 4.5,
    importance: "Critical",
    recentAssessmentScore: 94,
  },
  {
    id: "beh-3",
    name: "Evidence-Based Communication & Policy Briefs",
    domain: "Behavioural and Managerial Competencies",
    description: "Translating statistical aggregations into actionable executive notes for ministries and NITI Aayog.",
    currentLevel: 3.4,
    requiredLevel: 4.2,
    importance: "High",
    recentAssessmentScore: 76,
  },
];

export const IGOT_COURSE_CATALOGUE: IGOTCourse[] = [
  {
    id: "crs-nssta-101",
    courseCode: "NSSTA-STAT-701",
    title: "Modern Survey Sampling & Quality Assurance in NSS",
    titleHindi: "एनएसएस में आधुनिक सर्वेक्षण नमूनाकरण और गुणवत्ता आश्वासन",
    provider: "NSSTA",
    category: "Statistical Competencies",
    competencyMapped: ["Survey Design & Sampling Methods", "Data Quality Frameworks (NQAF & SDMX)"],
    level: "Intermediate",
    durationHours: 12.5,
    rating: 4.9,
    enrolledCount: 14280,
    completionRate: 91,
    tpacApproved: true,
    format: "Self-Paced e-Learning",
    description: "Approved by NSSTA's TPAC. Master multi-stage stratified survey architectures, calculating sample multipliers, non-response adjustments, and NQAF benchmarks.",
    syllabus: [
      "Introduction to Sampling Frames & 2011 Census/UFS Blocks",
      "Stratification and Sub-stratification in Rural and Urban Strata",
      "First Stage Units (FSUs) & Ultimate Stage Units (USUs) Allocation",
      "Calculating Sample Multipliers and Survey Weights",
      "Field Scrutiny Protocols and Non-Sampling Error Minimization"
    ],
    status: "In Progress",
    progressPercentage: 65,
  },
  {
    id: "crs-nssta-102",
    courseCode: "NSSTA-NAD-802",
    title: "System of National Accounts (SNA 2008) & GVA Compilation",
    titleHindi: "राष्ट्रीय लेखा प्रणाली (एसएनए 2008) और जीवीए संकलन",
    provider: "NSSTA",
    category: "Statistical Competencies",
    competencyMapped: ["National Accounts (SNA 2008 & GVA)"],
    level: "Advanced",
    durationHours: 16.0,
    rating: 4.8,
    enrolledCount: 9850,
    completionRate: 87,
    tpacApproved: true,
    format: "Self-Paced e-Learning",
    description: "Detailed study on Indian GDP estimation guidelines, transition from factor cost to basic prices, Supply-Use Tables (SUT), and corporate sector MCA21 data integration.",
    syllabus: [
      "Foundations of SNA 2008 Architecture & Sequence of Accounts",
      "GVA at Basic Prices vs GDP at Market Prices",
      "Estimation of Financial Intermediation Services Indirectly Measured (FISIM)",
      "Informal Sector Value Added and Household Production Boundary",
      "Double Deflation Techniques and Constant Price Series Compilation"
    ],
    status: "Not Enrolled",
    progressPercentage: 0,
  },
  {
    id: "crs-nssta-103",
    courseCode: "NSSTA-TECH-901",
    title: "Python for Official Statistics: Data Wrangling & Web Scraping",
    titleHindi: "आधिकारिक सांख्यिकी के लिए पायथन: डेटा रेंगलिंग और वेब स्क्रैपिंग",
    provider: "NSSTA",
    category: "Technical Competencies",
    competencyMapped: ["Python for Official Statistics & Big Data", "SQL & Relational Microdata Warehousing"],
    level: "Intermediate",
    durationHours: 18.0,
    rating: 4.9,
    enrolledCount: 22400,
    completionRate: 84,
    tpacApproved: true,
    format: "Virtual Lab",
    description: "Hands-on virtual lab on using Pandas, Polars, and BeautifulSoup for high-frequency commodity price monitoring, cleaning microdata files, and automated report generation.",
    syllabus: [
      "Python Environment Setup on Government Cloud (NIC / MeitY)",
      "High-speed Microdata Manipulation with Pandas & Polars",
      "Automated Price Web Scraping from e-Commerce and Mandi Portals",
      "Validation Rules Automation (Range checks, Logical inconsistencies)",
      "Exporting to SDMX and Relational Databases (PostgreSQL)"
    ],
    status: "Not Enrolled",
    progressPercentage: 0,
  },
  {
    id: "crs-nssta-104",
    courseCode: "NSSTA-TECH-904",
    title: "Applied Machine Learning & Predictive Imputation in Surveys",
    titleHindi: "सर्वेक्षणों में अनुप्रयुक्त मशीन लर्निंग और पूर्वानुमानित आरोपण",
    provider: "NSSTA",
    category: "Technical Competencies",
    competencyMapped: ["Artificial Intelligence & Machine Learning in Stats"],
    level: "Advanced",
    durationHours: 14.0,
    rating: 4.7,
    enrolledCount: 7800,
    completionRate: 79,
    tpacApproved: true,
    format: "Virtual Lab",
    description: "Learn state-of-the-art imputation methods for missing survey responses using Random Forests, k-NN, and automated NLP classification of job roles into NCO/NIC codes.",
    syllabus: [
      "Supervised vs Unsupervised ML for Official Statistical Agencies",
      "Hot-deck vs Machine Learning Imputation for Missing Values",
      "NLP Classification for National Classification of Occupations (NCO-2015)",
      "Anomaly Detection in Enterprise Surveys (ASI / MCA21)",
      "Model Explainability (SHAP/LIME) for Official Government Transparency"
    ],
    status: "Not Enrolled",
    progressPercentage: 0,
  },
  {
    id: "crs-igot-201",
    courseCode: "IGOT-GOV-305",
    title: "Digital Personal Data Protection (DPDP) Act 2023 for Public Servants",
    titleHindi: "लोक सेवकों के लिए डिजिटल व्यक्तिगत डेटा संरक्षण (डीपीडीपी) अधिनियम 2023",
    provider: "iGOT Karmayogi Bharat",
    category: "Digital Governance",
    competencyMapped: ["Data Privacy & DPDP Act 2023 Compliance", "Government Cloud Infrastructure & Cyber Security"],
    level: "Basic",
    durationHours: 6.0,
    rating: 4.8,
    enrolledCount: 145000,
    completionRate: 95,
    tpacApproved: true,
    format: "Self-Paced e-Learning",
    description: "Understand the legal frameworks of DPDP Act 2023, personal data fiducials, anonymization thresholds for survey respondents, and cyber security safeguards.",
    syllabus: [
      "Core Tenets of DPDP Act 2023 & Exemptions for Statistical Research",
      "Data Principal Rights & Consent Management in Digital Public Surveys",
      "Techniques for Differential Privacy and k-Anonymity in Microdata",
      "Incident Reporting to CERT-In and Data Breach Mitigation Protocols"
    ],
    status: "Completed",
    progressPercentage: 100,
  },
  {
    id: "crs-nssta-105",
    courseCode: "NSSTA-STAT-704",
    title: "Price Statistics: Compilation of CPI, WPI and Industrial Output (IIP)",
    titleHindi: "मूल्य सांख्यिकी: सीपीआई, डब्ल्यूपीआई और औद्योगिक उत्पादन सूचकांक (आईआईपी) का संकलन",
    provider: "NSSTA",
    category: "Statistical Competencies",
    competencyMapped: ["Price Statistics (CPI, WPI & IIP)"],
    level: "Intermediate",
    durationHours: 10.0,
    rating: 4.8,
    enrolledCount: 11200,
    completionRate: 89,
    tpacApproved: true,
    format: "Self-Paced e-Learning",
    description: "Comprehensive guide on compilation methodologies for Consumer Price Index (Base 2012=100), Index of Industrial Production, and wholesale price deflators.",
    syllabus: [
      "Selection of Quotation Centers and Item Selection Rules",
      "Base Year Revision Protocols and Expenditure Weighting Schemes",
      "Handling Item Substitution and Quality Adjustments",
      "Core Inflation vs Headline Inflation Analytics"
    ],
    status: "Completed",
    progressPercentage: 100,
  },
  {
    id: "crs-nssta-106",
    courseCode: "NSSTA-TECH-902",
    title: "R Programming for Survey Data Analysis & Complex Variance",
    titleHindi: "सर्वेक्षण डेटा विश्लेषण और जटिल भिन्नता के लिए आर प्रोग्रामिंग",
    provider: "NSSTA",
    category: "Technical Competencies",
    competencyMapped: ["R for Statistical Analysis & Econometrics"],
    level: "Intermediate",
    durationHours: 15.0,
    rating: 4.9,
    enrolledCount: 13500,
    completionRate: 86,
    tpacApproved: true,
    format: "Virtual Lab",
    description: "TPAC recommended programme on using the R 'survey' package for Taylor series linearization, Jackknife, and Bootstrap variance estimation on large NSS datasets.",
    syllabus: [
      "R Fundamentals & Tidyverse Data Pipelines",
      "Specifying Complex Sampling Designs with svydesign()",
      "Taylor Series Linearization and Sub-population Estimation",
      "Visualizing Survey Disparities with ggplot2 and leaflet"
    ],
    status: "Not Enrolled",
    progressPercentage: 0,
  },
  {
    id: "crs-nssta-107",
    courseCode: "NSSTA-GIS-601",
    title: "GIS & Remote Sensing Applications in Agricultural and Census Statistics",
    titleHindi: "कृषि और जनगणना सांख्यिकी में जीआईएस और रिमोट सेंसिंग अनुप्रयोग",
    provider: "NSSTA",
    category: "Technical Competencies",
    competencyMapped: ["GIS & Spatial Data Analytics (Bhuvan/QGIS)"],
    level: "Intermediate",
    durationHours: 12.0,
    rating: 4.7,
    enrolledCount: 8900,
    completionRate: 82,
    tpacApproved: true,
    format: "Blended / Hybrid",
    description: "Harness ISRO's Bhuvan platform, satellite crop signatures, and QGIS spatial overlays to validate agricultural acreage surveys and Urban Frame Survey (UFS) digitalization.",
    syllabus: [
      "Coordinate Reference Systems (CRS) and Spatial Data Formats (GeoJSON/Shapefile)",
      "Accessing ISRO Bhuvan Spatial Layers for Administrative Boundaries",
      "Spatial Layering of Urban Frame Survey Blocks with High-Resolution Imagery",
      "Calculating Crop Acreage Estimates using NDVI and Remote Sensing Indices"
    ],
    status: "Not Enrolled",
    progressPercentage: 0,
  },
  {
    id: "crs-niti-401",
    courseCode: "NITI-SDG-502",
    title: "SDG India Index & National Indicator Framework (NIF) Monitoring",
    titleHindi: "एसडीजी इंडिया इंडेक्स और राष्ट्रीय संकेतक ढांचा (एनआईएफ) निगरानी",
    provider: "NITI Aayog",
    category: "Statistical Competencies",
    competencyMapped: ["SDG Indicators & National Framework (NIF)"],
    level: "Intermediate",
    durationHours: 8.5,
    rating: 4.8,
    enrolledCount: 31000,
    completionRate: 92,
    tpacApproved: true,
    format: "Self-Paced e-Learning",
    description: "Designed jointly by NITI Aayog & MoSPI. Understand indicator normalization, target setting, state composite ranking, and localizing SDGs at the district level.",
    syllabus: [
      "UN 2030 Agenda and MoSPI's National Indicator Framework (NIF)",
      "Methodology of SDG India Index: Normalization and Aggregation",
      "Data Gaps and High-Frequency Administrative Data Integration",
      "Developing District SDG Dashboards"
    ],
    status: "Not Enrolled",
    progressPercentage: 0,
  },
  {
    id: "crs-istm-501",
    courseCode: "ISTM-MGMT-201",
    title: "Statistical Project Management & Administrative Field Ethics",
    titleHindi: "सांख्यिकीय परियोजना प्रबंधन और प्रशासनिक क्षेत्र नैतिकता",
    provider: "ISTM",
    category: "Behavioural and Managerial Competencies",
    competencyMapped: ["Statistical Project Management & Field Leadership", "Public Policy Ethics & Objective Evidence"],
    level: "Basic",
    durationHours: 9.0,
    rating: 4.7,
    enrolledCount: 42000,
    completionRate: 94,
    tpacApproved: true,
    format: "Self-Paced e-Learning",
    description: "Guidance on managing multi-regional survey field operations, enumerator motivation, ethical handling of respondent data, and time-bound dissemination.",
    syllabus: [
      "Field Operations Planning & Resource Allocation",
      "Managing Enumerator Teams & Conflict Resolution in Field Work",
      "Public Service Ethics & Objectivity in Government Statistics",
      "Drafting Cabinet Notes and Executive Summaries"
    ],
    status: "Completed",
    progressPercentage: 100,
  }
];

export const TRAINING_MATERIAL_PRESETS: TrainingMaterialPreset[] = [
  {
    id: "mat-nss79",
    title: "NSS 79th Round: Survey Methodology & Sampling Protocols",
    subtitle: "National Sample Survey Office (NSSO) - Operational Field Guide",
    domain: "Statistical Competencies",
    sourceDoc: "MoSPI NSSO/SDRD Technical Report No. 589",
    wordCount: 840,
    excerpt: `1. Sample Design for Socio-Economic Surveys:
A stratified multi-stage design is adopted for the 79th round survey. The First Stage Units (FSU) are the 2011 Census villages in the rural sector and Urban Frame Survey (UFS) blocks in the urban sector. The Ultimate Stage Units (USU) are households in both sectors.
2. Stratification:
Each district of a State/UT is taken as a basic stratum. In rural sector, if 'r' is the number of FSUs allocated to a district, the district is divided into r/2 sub-strata if r > 8. In the urban sector, UFS blocks are stratified into two sub-strata based on affluent pockets (sub-stratum 1) and remaining blocks (sub-stratum 2).
3. Selection of FSUs:
In the rural sector, FSUs are selected by Probability Proportional to Size with Replacement (PPSWR), size being the census population of the village. In the urban sector, FSUs are selected using Simple Random Sampling Without Replacement (SRSWOR).
4. Sub-division and Hamlet-group / Sub-block Formation:
For large villages/blocks with population exceeding 1200, the FSU is divided into two or more hamlet-groups (rural) or sub-blocks (urban) of approximately equal population, and two hamlet-groups/sub-blocks are selected with equal probability for listing.
5. Estimation Procedure & Multipliers:
The unbiased estimate of total Y for stratum s is calculated using the inverse probability sampling weight (multiplier):
W_i = (Total FSUs in Stratum / Allocated FSUs) * (Census Size / Village Size) * (Listed Households / Sampled Households).`
  },
  {
    id: "mat-cpi",
    title: "Compilation of Consumer Price Index (CPI) & Inflation Metrics",
    subtitle: "Price Statistics Division (PSD) - Technical Manual 2024",
    domain: "Statistical Competencies",
    sourceDoc: "MoSPI Price Statistics Division Guideline Vol. IV",
    wordCount: 760,
    excerpt: `1. Scope and Objective:
The Consumer Price Index (CPI) measures the change over time in the general level of prices of goods and services that a reference population acquires, uses or pays for consumption. In India, NSO compiles CPI on base 2012=100 separately for Rural, Urban and Combined sectors.
2. Weighting Diagram:
The weighting diagrams for CPI are derived from the results of the Consumer Expenditure Survey (CES). The consumption basket is classified into 6 major groups: (i) Food and Beverages (45.86% weight in Combined), (ii) Pan, tobacco and intoxicants, (iii) Clothing and footwear, (iv) Housing (urban only), (v) Fuel and light, and (vi) Miscellaneous.
3. Pricing Mechanism:
Prices are collected weekly from selected 1,181 village markets across the country for rural CPI, and monthly from 1,114 quotations across 310 towns for urban CPI through a dedicated mobile application (CAPI).
4. Index Formula:
The modified Laspeyres formula is used for calculating sub-group, group, and overall general indices:
I_t = Sum [ (P_it / P_i0) * W_i ] / Sum(W_i) * 100
Where P_it is price of item i in current period, P_i0 is base price, and W_i is base-year expenditure weight.
5. Imputation for Non-Availability:
If an item price is missing due to seasonal non-availability or temporary stockout, geometric mean price relative of available varieties or higher sub-group trend is used to impute the price.`
  },
  {
    id: "mat-sna2008",
    title: "System of National Accounts (SNA 2008): GDP & GVA Estimation",
    subtitle: "National Accounts Division (NAD) - Methodological Compendium",
    domain: "Statistical Competencies",
    sourceDoc: "Central Statistics Office (CSO) National Accounts Handbook",
    wordCount: 890,
    excerpt: `1. Adoption of SNA 2008 in India:
With the base revision to 2011-12, the National Accounts Division adopted the System of National Accounts (SNA 2008). Key changes include the presentation of Gross Value Added (GVA) at basic prices instead of GDP at factor cost as the headline measure of production.
2. Relationship between GVA and GDP:
- GVA at Basic Prices = Output at basic prices - Intermediate Consumption at purchasers' prices.
- GDP at Market Prices = GVA at Basic Prices + Product Taxes (Central GST, State GST, Customs, Excise) - Product Subsidies (Food, Fertilizer, Fuel).
3. Treatment of MCA21 Database:
For the organized private corporate sector in manufacturing and services, the production approach utilizes electronic financial filing data from the Ministry of Corporate Affairs (MCA21 database), analyzing balance sheets and Profit & Loss accounts of over 500,000 active enterprises.
4. Financial Intermediation Services Indirectly Measured (FISIM):
FISIM represents the value of financial services provided by banks that are not directly charged as fees. It is calculated as the difference between interest received on loans minus reference rate interest, plus reference rate interest minus interest paid on deposits.
5. Capital Formation & Intellectual Property Products (IPP):
Under SNA 2008, Research and Development (R&D) expenditures and software expenditures are treated as Gross Fixed Capital Formation rather than intermediate consumption.`
  },
  {
    id: "mat-python-stats",
    title: "Python & Big Data Pipelines in Official Statistics",
    subtitle: "NSSTA Technical Paper on AI and Automation in MoSPI",
    domain: "Technical Competencies",
    sourceDoc: "NSSTA Center of Excellence in Big Data & Analytics",
    wordCount: 810,
    excerpt: `1. Transition from Legacy SPSS/Stata to Open Source Data Science:
To accommodate massive microdata datasets like the Periodic Labour Force Survey (PLFS) and Annual Survey of Industries (ASI), MoSPI is deploying Python (Polars/Pandas) and R on secure government cloud infrastructure (NIC National Data Centre).
2. Automated Validation and Scrutiny:
Using vectorized operations in Python, automated scrutiny routines flag data entry errors, invalid occupation codes (NCO-2015), and extreme outlier expenditures in seconds:
\`\`\`python
# Vectorized range check example
invalid_records = df.filter(
    (pl.col('weekly_hours_worked') > 168) | 
    (pl.col('daily_wage') < 0)
)
\`\`\`
3. Web Scraping for High-Frequency Price Monitoring:
NSSTA training focuses on utilizing BeautifulSoup and Selenium to harvest daily vegetable, fuel, and cereal prices from open mandi portals and e-commerce websites.
4. Machine Learning for Predictive Imputation:
Random Forest regressors and k-Nearest Neighbors (k-NN) are evaluated to impute missing revenue figures in small-scale enterprise surveys, outperforming traditional mean imputation by preserving covariance structures.`
  },
  {
    id: "mat-dpdp",
    title: "Digital Personal Data Protection (DPDP) Act 2023 for Survey Work",
    subtitle: "Ministry of Law & Justice / MeitY - MoSPI Implementation Guidelines",
    domain: "Digital Governance",
    sourceDoc: "Government of India Gazette Notification & MoSPI Circular No. 12/2024",
    wordCount: 720,
    excerpt: `1. Application to Government Statistical Surveys:
The DPDP Act 2023 regulates the processing of digital personal data. While official statistical operations conducted under the Collection of Statistics Act 2008 benefit from research and statutory exemptions, strict data governance is mandated.
2. Anonymization and De-identification:
Datasets released for public research via the National Data & Analytics Platform (NDAP) must be fully anonymized. Direct identifiers (names, Aadhaar numbers, exact GPS coordinates of households) must be permanently purged or perturbed using pseudo-random hashing and cell suppression.
3. Data Fiduciary Responsibilities:
MoSPI and designated State Directorates act as Data Fiduciaries. Reasonable security safeguards must be maintained to prevent data leaks. All survey data collected on tablets (CAPI) must be encrypted using AES-256 both in transit and at rest.
4. Retention Limitation:
Field raw audio recordings or identifiable enumerator logs must not be retained beyond the period strictly necessary for quality verification audits.`
  }
];
