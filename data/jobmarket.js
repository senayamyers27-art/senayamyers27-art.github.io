/* US pay and job outlook for the jobs the career tracks lead to, from the U.S. Bureau of Labor Statistics
   Occupational Outlook Handbook (OOH): median annual wage for May 2025 and employment projections for 2025-35.
   Check each source link for newer figures; update "asOf" and every number together. Figures are national medians:
   pay varies widely by location, experience and employer. */
CertHub.jobMarket = {
  asOf: "May 2025 wages, 2025-35 projections",
  source: "U.S. Bureau of Labor Statistics, Occupational Outlook Handbook",
  // [occupation, median annual wage (USD), projected growth % 2025-35, openings per year, tracks, OOH page]
  rows: [
    ["Information security analysts", 129180, 21, 14100, ["cybersecurity", "secadmin"], "https://www.bls.gov/ooh/computer-and-information-technology/information-security-analysts.htm"],
    ["Software developers", 135980, 10, 106100, ["software"], "https://www.bls.gov/ooh/computer-and-information-technology/software-developers.htm"],
    ["Computer network architects", 134050, 8, 9600, ["network", "cloud"], "https://www.bls.gov/ooh/computer-and-information-technology/computer-network-architects.htm"],
    ["Data scientists", 120230, 35, 24800, ["data-ai"], "https://www.bls.gov/ooh/math/data-scientists.htm"],
    ["Database architects", 139500, 4, 7300, ["data-ai"], "https://www.bls.gov/ooh/computer-and-information-technology/database-administrators.htm"],
    ["Network and computer systems administrators", 99130, -4, 13400, ["network", "sysadmin", "cloud"], "https://www.bls.gov/ooh/computer-and-information-technology/network-and-computer-systems-administrators.htm"],
    ["Computer network support specialists", 76220, -3, 48700, ["network", "sysadmin"], "https://www.bls.gov/ooh/computer-and-information-technology/computer-support-specialists.htm"],
    ["Computer user support specialists", 61860, -3, 48700, ["sysadmin", "cybersecurity"], "https://www.bls.gov/ooh/computer-and-information-technology/computer-support-specialists.htm"]
  ],
  notes: {
    "Database architects": "The projection and openings are for database administrators and architects together.",
    "Computer network support specialists": "The projection and openings are for all computer support specialists.",
    "Computer user support specialists": "The projection and openings are for all computer support specialists."
  },
  es: {
    "Information security analysts": "Analistas de seguridad de la información", "Software developers": "Desarrolladores de software",
    "Computer network architects": "Arquitectos de redes informáticas", "Data scientists": "Científicos de datos", "Database architects": "Arquitectos de bases de datos",
    "Network and computer systems administrators": "Administradores de redes y sistemas informáticos", "Computer network support specialists": "Especialistas en soporte de redes",
    "Computer user support specialists": "Especialistas en soporte a usuarios",
    "The projection and openings are for database administrators and architects together.": "La proyección y las vacantes son para administradores y arquitectos de bases de datos juntos.",
    "The projection and openings are for all computer support specialists.": "La proyección y las vacantes son para todos los especialistas en soporte informático."
  }
};
