export const SCHEMES = [
  {
    id: "svanidhi",
    name: "PM SVANidhi",
    description: "Special Micro-Credit Facility for Street Vendors to provide working capital loan up to ₹10,000.",
    eligibility: {
      types: ["Retail", "Food/Restaurant"],
      maxTurnover: 1000000,
    },
    benefits: "Up to ₹10,000 collateral-free working capital loan. 7% interest subsidy.",
    url: "https://pmsvanidhi.mohua.gov.in/"
  },
  {
    id: "vishwakarma",
    name: "PM Vishwakarma",
    description: "Support for traditional artisans and craftspeople through credit, training, and modern tools.",
    eligibility: {
      types: ["Services", "Manufacturing"],
      maxTurnover: 5000000,
    },
    benefits: "Collateral-free credit support up to ₹3 lakh. Skill training with ₹500/day stipend.",
    url: "https://pmvishwakarma.gov.in/"
  },
  {
    id: "mudra",
    name: "Pradhan Mantri MUDRA Yojana",
    description: "Loans up to ₹10 lakh to non-corporate, non-farm small/micro enterprises.",
    eligibility: {
      types: ["Retail", "Services", "Manufacturing", "Food/Restaurant"],
      maxTurnover: 50000000,
    },
    benefits: "Loans divided into Shishu (₹50k), Kishore (₹5 lakh), and Tarun (₹10 lakh).",
    url: "https://www.mudra.org.in/"
  }
];
