/**
 * Landmark Inter Gulf LLC — company content data
 * Sourced from the official company profile PDF.
 * Single source of truth used across all site sections and pages.
 */

export const company = {
  name: "Landmark Inter Gulf LLC",
  shortName: "Landmark Inter Gulf",
  tagline: "Reliable Workforce. Stronger Businesses.",
  established: "2017 – Present",
  website: "www.landmarkgulf.com",
  websiteUrl: "https://www.landmarkgulf.com",
  // Email obfuscated — bots can't scrape this; JS decodes at runtime
  // Email kept encoded only — no plain text for bots to scrape
  email: `${"info"}@${"landmarkgulf"}.com`,
  // Encoded email for HTML rendering (prevents scraping)
  emailEncoded: "&#105;&#110;&#102;&#111;&#64;&#108;&#97;&#110;&#100;&#109;&#97;&#114;&#107;&#103;&#117;&#108;&#102;&#46;&#99;&#111;&#109;",
  // Email split into parts for JS-based assembly
  emailUser: "info",
  emailDomain: "landmarkgulf.com",
  country: "Kingdom of Saudi Arabia",
  region: "Saudi Arabia & the Gulf Region",
  ceo: "Kazi Nazmul",
  ceoTitle: "Chief Executive Officer",
  vision2030: "Contributing to Vision 2030",
  // Physical office address — verified on Google Business Profile
  address: {
    line1: "King Faisal W, King Fahd Industrial Port",
    line2: "Al Jubail 35712",
    city: "Al Jubail",
    region: "Eastern Province",
    postalCode: "35712",
    country: "Saudi Arabia",
    countryCode: "SA",
    fullAddress: "2JCR+VW3, King Faisal W, King Fahd Industrial Port, Al Jubail 35712, Saudi Arabia",
    plusCode: "2JCR+VW3 Al Jubail",
  },
  // Google Business Profile integration
  googleBusiness: {
    url: "https://maps.app.goo.gl/Hi6Fimz27BaCCq7x8",
    mapsEmbedUrl: "https://www.google.com/maps?q=Landmark+Inter+Gulf+Co+L.L.C+Jubail&output=embed",
    reviewUrl: "https://maps.app.goo.gl/Hi6Fimz27BaCCq7x8",
    placeName: "Landmark Inter Gulf Co. L.L.C",
  },
  // Opening hours — synced with Google Business Profile
  openingHours: {
    mon: "7:00 AM – 5:00 PM",
    tue: "7:00 AM – 5:00 PM",
    wed: "7:00 AM – 5:00 PM",
    thu: "7:00 AM – 5:00 PM",
    fri: "Closed",
    sat: "7:00 AM – 5:00 PM",
    sun: "7:00 AM – 5:00 PM",
    // Schema.org format — for JSON-LD (dayOfWeek uses schema.org day names)
    schemaSpec: [
      { days: ["Saturday", "Sunday", "Monday", "Tuesday", "Wednesday", "Thursday"], opens: "07:00", closes: "17:00" },
      { days: ["Friday"], opens: "00:00", closes: "00:00" },
    ],
  },
};

export const heroStats = [
  {
    value: 5000,
    suffix: "+",
    label: "Skilled Manpower Deployed",
    description:
      "A deep bench of skilled, semi-skilled and unskilled professionals deployed across the Kingdom's largest projects.",
  },
  {
    value: 100,
    suffix: "+",
    label: "Modern Equipment Fleet",
    description:
      "Well-maintained earthmoving, lifting, access and transport equipment ready for projects of any size.",
  },
  {
    value: 10,
    suffix: "+",
    label: "Years of Combined Experience",
    description:
      "A leadership team with more than a decade of hands-on experience across industrial sectors.",
  },
  {
    value: 100,
    suffix: "%",
    label: "Commitment to Safety & Quality",
    description:
      "An uncompromising safety culture and strict quality assurance on every deployment.",
  },
];

export const fuelStationStats = [
  { value: 16, suffix: "+", label: "Completed & Ongoing Projects" },
  { value: 4500, suffix: "+", label: "Manpower Deployed" },
  { value: 35, suffix: "+", label: "Active Clients" },
  { value: 2017, suffix: "", label: "Present — Continuous Operations" },
];

export const about = {
  heading: "Who We Are",
  paragraphs: [
    "Landmark Inter Gulf LLC is a Saudi based company providing integrated solutions in Manpower Supply, Equipment Rental, Industrial Trading, Petro Services and Hospitality Services. We combine local market knowledge with international best practices to support the Kingdom's industrial and commercial growth.",
    "Established with a commitment to quality, safety and reliability, we deliver world-class services with a customer-focused approach to ensure every project is completed on time, within budget and beyond expectations. Our integrated service model lets clients source workforce, equipment and specialist support from a single accountable partner.",
    "Our dedicated team, modern equipment and in-depth industry experience enable us to support the Kingdom's growth and contribute to Vision 2030. From oil & gas megaprojects to community-level fuel stations, our standards remain the same — dependable people, dependable equipment, dependable delivery.",
  ],
  pillars: [
    { title: "Safety First", description: "Zero compromise on the safety of our people, partners and the communities we work in." },
    { title: "Quality Assured", description: "Strict quality control and compliance with international standards on every deployment." },
    { title: "Customer Focused", description: "Client satisfaction is our top priority in every project, large or small." },
    { title: "Sustainable Growth", description: "Committed to long-term partnerships and value creation for stakeholders and society." },
  ],
};

export const services = [
  {
    id: "manpower",
    slug: "manpower",
    icon: "Users",
    title: "Manpower Supply",
    color: "yellow",
    short: "Skilled, semi-skilled and unskilled workforce for all industrial and commercial sectors.",
    description:
      "We deploy certified, vetted and reliable manpower across construction, oil & gas, petrochemical, industrial and infrastructure projects. Every candidate goes through behaviour interviews, reference checks, legal status verification and skills training before deployment.",
    longDescription:
      "Our manpower division is the backbone of Landmark Inter Gulf LLC. With a database of over 5,000 skilled, semi-skilled and unskilled professionals, we can mobilize the right team for any project — from a single specialized technician to a multi-hundred-person workforce for a major EPC contract. We work with global contractors like Hyundai E&C, SINOPEC, SEPCO Arabia, L&T Arabia and Midong E&C, providing Aramco-approved safety officers, TUV-certified riggers and scaffolders, 6G/3G welders, pipe fabricators and fitters, and the full spectrum of civil, mechanical, electrical and instrumentation trades. Our pre-deployment process is rigorous: behaviour interviews, reference checks, legal status verification, training and certification, skills assessment and medical fitness. The result is a reliable workforce that shows up, performs, and upholds the safety standards the Kingdom's flagship projects demand.",
    bullets: [
      "Pipe fabricators, fitters, welders (6G & 3G, TIG & ARC)",
      "Riggers (TUV certified, Aramco approved)",
      "Scaffolders (TUV certified)",
      "QA/QC inspectors and safety officers (Aramco approved)",
      "Civil, mechanical, electrical and instrumentation trades",
      "General workforce and helpers",
    ],
    highlights: [
      { title: "5,000+", description: "Skilled professionals in our active database" },
      { title: "Aramco Approved", description: "Safety officers and work permit receivers" },
      { title: "TUV Certified", description: "Riggers and scaffolders with international certification" },
      { title: "Pre-Deployment Checks", description: "Behaviour interviews, references, legal, training, medical" },
    ],
  },
  {
    id: "equipment",
    slug: "equipment",
    icon: "Truck",
    title: "Equipment Rental",
    color: "orange",
    short: "Wide range of modern equipment and vehicles for projects of all sizes and scopes.",
    description:
      "Our rental fleet covers earthmoving, lifting, access, material handling, power support and heavy transport equipment. Every machine is regularly inspected, maintained and safety-compliant, with 24/7 technical support and flexible daily, weekly, monthly or long-term rental plans.",
    longDescription:
      "Landmark Inter Gulf's equipment rental division provides the machines that power Saudi Arabia's construction, infrastructure and industrial sectors. Our fleet spans earthmoving (excavators, loaders, backhoes, bulldozers, graders), lifting (mobile, crawler and truck cranes, forklifts, telehandlers), access equipment (scissor lifts, boom lifts, manlifts), power and support (generators, air compressors, welding machines, light towers), and heavy transport (low bed trailers, attachments, buckets, breakers). Every machine is regularly inspected and maintained by our certified technicians, safety-compliant, and ready for rapid deployment. With flexible daily, weekly, monthly and long-term rental plans, we scale to your project — whether you need a single forklift for a day or a full earthmoving package for a multi-year infrastructure build. Our 24/7 technical support team ensures maximum uptime.",
    bullets: [
      "Earthmoving: excavators, loaders, backhoes, bulldozers, graders",
      "Lifting: mobile, crawler and truck cranes, forklifts, telehandlers",
      "Access: scissor lifts, boom lifts, manlifts",
      "Power & support: generators, air compressors, welding machines, light towers",
      "Heavy transport: low bed trailers, attachments, buckets, breakers",
    ],
    highlights: [
      { title: "100+ Fleet", description: "Modern equipment across all categories" },
      { title: "24/7 Support", description: "Round-the-clock technical assistance" },
      { title: "Flexible Plans", description: "Daily, weekly, monthly, long-term" },
      { title: "Safety Compliant", description: "Regularly inspected and maintained" },
    ],
  },
  {
    id: "industrial",
    slug: "industrial",
    icon: "Factory",
    title: "Industrial Trading",
    color: "blue",
    short: "Quality industrial materials, tools and products from trusted global suppliers.",
    description:
      "We supply industrial-grade materials, tools, consumables and equipment from trusted international and regional suppliers. Our procurement network ensures competitive pricing, on-time delivery and full traceability — supporting construction, oil & gas, petrochemical and infrastructure clients across Saudi Arabia.",
    longDescription:
      "Landmark Inter Gulf's industrial trading division is the procurement arm that keeps projects running. We supply industrial-grade materials, tools, consumables and equipment from a curated network of trusted international and regional suppliers. Our catalog covers industrial tools and consumables, construction materials and hardware, petrochemical and oilfield supplies, safety equipment and PPE, and spare parts and equipment attachments. We combine competitive pricing with on-time delivery and full traceability — every shipment comes with documentation, certificates of conformity where required, and a single point of contact for after-sales support. Whether you need a single pallet of welding consumables or a year-long supply agreement for safety gear, our trading team will structure the right procurement solution for your project.",
    bullets: [
      "Industrial tools and consumables",
      "Construction materials and hardware",
      "Petrochemical and oilfield supplies",
      "Safety equipment and PPE",
      "Spare parts and equipment attachments",
    ],
    highlights: [
      { title: "Global Suppliers", description: "Trusted international and regional partners" },
      { title: "Full Traceability", description: "Documentation and certificates of conformity" },
      { title: "Competitive Pricing", description: "Volume agreements and project rates" },
      { title: "On-Time Delivery", description: "Kingdom-wide logistics network" },
    ],
  },
  {
    id: "petro",
    slug: "petro",
    icon: "Fuel",
    title: "Petro Services",
    color: "red",
    short: "Specialized support for oil & gas projects with skilled manpower and technical solutions.",
    description:
      "We provide specialized manpower and operational support for oil & gas, petrochemical and energy projects. From Aramco-approved safety officers and work permit receivers to certified riggers and pipe specialists, our teams keep critical energy infrastructure running safely and on schedule.",
    longDescription:
      "Landmark Inter Gulf's petro services division specializes in supporting the Kingdom's oil & gas, petrochemical and energy sectors. Since 2017, we have deployed over 4,500 professionals to 16+ major projects — including SINOPEC's Jafurah development, Hyundai E&C's Marjan and Yanbu projects, SEPCO Arabia, L&T Arabia's Amiral project, and Midong E&C's Jafurah operations. Our petro specialists include Aramco-approved safety officers and work permit receivers, certified riggers, pipe fabricators and fitters, mechanical and electrical supervisors, instrumentation technicians, and QA/QC inspectors. We also provide trained, customer-focused manpower for petrol stations across the Kingdom — keeping operations smooth, customer service excellent, and safety standards strict. With 35+ active clients and a track record built on Aramco-grade compliance, our petro services team is a trusted partner for any energy project in Saudi Arabia.",
    bullets: [
      "Aramco-approved safety officers and work permit receivers",
      "Petrol station staffing and operations support",
      "Pipe fabrication, fitting and welding specialists",
      "Mechanical, electrical and instrumentation technicians",
      "Tanker and transport solutions for fuel logistics",
    ],
    highlights: [
      { title: "16+ Projects", description: "Completed and ongoing petro projects since 2017" },
      { title: "4,500+ Deployed", description: "Manpower to oil & gas projects" },
      { title: "35+ Active Clients", description: "Leading EPC and energy companies" },
      { title: "Aramco Approved", description: "Safety officers, WPRs and riggers" },
    ],
  },
  {
    id: "hospitality",
    slug: "hospitality",
    icon: "ConciergeBell",
    title: "Hospitality Services",
    color: "green",
    short: "Professional hospitality staffing and support services for the hotel and catering industry.",
    description:
      "We provide professional hospitality workforce to deliver exceptional guest experiences. From hotel staffing and housekeeping to catering support and front desk, our trained professionals uphold the highest standards of service for hotels, resorts, catering companies and corporate facilities across the Kingdom.",
    longDescription:
      "Landmark Inter Gulf's hospitality services division delivers the people who deliver exceptional guest experiences. We provide trained, professional hospitality workforce to hotels, resorts, catering companies, corporate facilities and event venues across Saudi Arabia. Our hospitality portfolio covers hotel staffing solutions, housekeeping staff and cleaners, waiters, stewards and kitchen helpers, reception and front desk professionals, and complete catering support services. Every hospitality professional we deploy is trained to luxury hotel standards — well-groomed, customer-focused, and fluent in the service rituals that turn first-time guests into repeat visitors. Whether you need a single receptionist for a corporate lobby or a full housekeeping team for a 300-room hotel, our hospitality division scales to your service level requirements.",
    bullets: [
      "Hotel staffing solutions",
      "Housekeeping staff and cleaners",
      "Waiters, stewards and kitchen helpers",
      "Reception and front desk professionals",
      "Catering support services",
    ],
    highlights: [
      { title: "Trained Professionals", description: "Certified and well-groomed staff" },
      { title: "Premium Service", description: "Standards matching luxury hotels" },
      { title: "Guest Satisfaction", description: "Memorable experiences, every shift" },
      { title: "Scalable Teams", description: "From 1 to 100+ hospitality staff" },
    ],
  },
  {
    id: "transport",
    slug: "transport",
    icon: "Car",
    title: "Car Rental & Transport",
    color: "purple",
    short: "Reliable vehicles and transport solutions tailored to your business, projects, and operational needs.",
    description:
      "From economy sedans and SUVs to 50-seater buses, pickups, water tankers and diesel tankers — we provide safe, efficient and timely transport services for your personnel, logistics and operational needs across Saudi Arabia.",
    longDescription:
      "Landmark Inter Gulf's car rental and transport division provides the vehicles that move Saudi Arabia's workforce and logistics. Our fleet covers economy sedans for corporate travel, SUVs for executive transport and site visits, pickup trucks for utility and light logistics, mini buses (15-30 seater) for staff transportation, and full-size buses (30-50 seater) for workforce mobilization and event transport. We also operate specialized transport including water tankers, diesel tankers, low bed and flat bed trailers, drum trucks, and 55-seater buses. Our transport solutions serve corporate travel, staff transportation, events and conferences, airport transfers, construction project logistics, and facility management. Every vehicle is well-maintained, supported 24/7, and available on flexible rental plans — daily, weekly, monthly or long-term — with on-time delivery as standard.",
    bullets: [
      "Economy sedans, SUVs, and pickup trucks",
      "Mini buses (15-30 seater) and full buses (30-50 seater)",
      "Water tankers, diesel tankers, and 55-seater buses",
      "Low bed, flat bed, and drum trucks",
      "Corporate travel, staff transport, events, airport transfers",
    ],
    highlights: [
      { title: "Well Maintained Fleet", description: "Regularly serviced for safety and reliability" },
      { title: "24/7 Support", description: "Round-the-clock assistance" },
      { title: "Flexible Plans", description: "Daily, weekly, monthly, long-term" },
      { title: "On-Time Delivery", description: "Punctual pickups and drop-offs" },
    ],
  },
];

export const visionMission = {
  vision: {
    title: "Our Vision",
    body:
      "To be the leading integrated service provider in Saudi Arabia and the region by delivering innovative, reliable and sustainable solutions that empower industries and contribute to the realization of Vision 2030.",
  },
  mission: {
    title: "Our Mission",
    body:
      "To deliver high quality, cost-effective services on schedule by employing skilled professionals, modern equipment and best practices. We are passionate about exceeding customer expectations while maintaining the highest standards of safety, integrity and professionalism.",
  },
};

export const values = [
  { title: "Integrity & Transparency", description: "We conduct our business with honesty, ethics and transparency in every interaction." },
  { title: "Commitment", description: "We are committed to our clients, partners and to the quality of our work." },
  { title: "Safety & Well-Being", description: "We prioritize the safety of our people and the communities we work in." },
  { title: "Excellence", description: "We strive for excellence in everything we do." },
  { title: "Teamwork & Respect", description: "We believe in collaboration, respect and the power of teamwork." },
  { title: "Learning & Development", description: "We encourage continuous learning and embrace innovation at every level." },
];

export const coreStrengths = [
  { title: "Experienced Professionals", description: "Highly skilled team with vast industry experience." },
  { title: "Modern Equipment", description: "Well maintained and advanced equipment for every need." },
  { title: "Quality Fleet", description: "Strict quality control and international standards compliance." },
  { title: "Timely Assurance", description: "On-time project completion with efficiency." },
  { title: "Customer Delivery", description: "Client satisfaction is our top priority in every project." },
  { title: "Sustainable Focused", description: "Committed to long-term partnerships and value creation." },
];

export const businessEthics = [
  { title: "Integrity & Transparency", description: "We conduct our business with honesty, ethics and transparency in every transaction and relationship." },
  { title: "Fairness & Respect", description: "We treat our clients, partners and employees with fairness, dignity and respect at all times." },
  { title: "Compliance", description: "We strictly comply with all applicable laws, regulations and industry standards in the Kingdom of Saudi Arabia." },
  { title: "Social Responsibility", description: "We contribute to the development of our communities and support local employment initiatives." },
  { title: "Teamwork & Commitment", description: "We find greater strength in collaborating as one team to achieve our common goals and create exceptional results for our clients." },
  { title: "Learning & Development", description: "We bring prosperity and well-being to our stakeholders and society at large by adding value through engineering, technology and management." },
];

export const manpowerCategories = [
  {
    title: "General Workforce",
    items: ["Pipe Fabricator", "Pipe Fitter", "Millwright Foreman", "Instrument Technician", "Instrument Foreman", "Piping Foreman", "Tig & Arc Welder", "6G & 3G Welder", "Rigger II TUV Certified", "Rigging Supervisor", "Scaffolder TUV Certified", "Structural Supervisor / Foreman", "Material Coordinator", "Auto Cad Operator"],
  },
  {
    title: "Civil Workforces",
    items: ["Civil Surveyor", "Foreman", "Safety Manager", "Mechanic Helper", "Crane Operator Aramco*", "Forklift Operator Aramco*", "Bobcat Operator Aramco*", "Manlift Operator Aramco*", "Boom Truck Operator Aramco*", "Mason", "Steel Fixer", "Plumber", "Painter", "Carpenter"],
  },
  {
    title: "Supervisors / Engineers / Inspectors QA/QC",
    items: ["Mechanical Supervisor / Foreman", "Piping Supervisor / Foreman", "Structural Supervisor / Foreman", "Electrical Supervisor / Foreman", "Instrument Supervisor / Foreman", "Planning", "Scheduling", "Estimation", "Quality Control", "Safety Inspectors", "Rigging Supervisor", "Documentation"],
  },
  {
    title: "Pre-Deployment Checks We Follow",
    items: ["Behaviour Interviews", "Reference Checking", "Legal Status Verification", "Training & Certification", "Skills Assessment", "Medical Fitness Check"],
  },
];

export const equipmentCategories = [
  { title: "Earthmoving Equipment", icon: "Tractor", items: ["Excavators", "Loaders", "Backhoes", "Bulldozers", "Graders"] },
  { title: "Lifting Equipment", icon: "Forklift", items: ["Mobile Cranes", "Crawler Cranes", "Truck Cranes", "Forklifts"] },
  { title: "Access & Material Handling", icon: "Construction", items: ["Scissor Lifts", "Boom Lifts", "Telehandlers", "Manlifts"] },
  { title: "Power & Support Equipment", icon: "Zap", items: ["Generators", "Air Compressors", "Welding Machines", "Light Towers"] },
  { title: "Heavy Transport & Attachments", icon: "Truck", items: ["Low Bed Trailers", "Attachments", "Buckets", "Breakers"] },
];

export const equipmentHighlights = [
  { title: "Modern Fleet", description: "Latest equipment with advanced technology." },
  { title: "Well Maintained", description: "Regular inspection and maintenance for optimum performance." },
  { title: "Flexible Rental", description: "Short-term or long-term rental options to suit your needs." },
  { title: "Experienced Team", description: "Professional support to ensure your projects run smoothly with on-time delivery and quick response." },
];

export const projectsSupported = ["Oil & Gas", "Construction", "Infrastructure", "Industrial", "Mining", "Utilities"];

export const vehicleFleet = [
  { title: "Economy Sedan", description: "Fuel-efficient sedans for corporate travel and daily commutes." },
  { title: "SUV", description: "Comfortable SUVs for executive transport and project site visits." },
  { title: "Pickup Truck", description: "Rugged pickups for utility, site support and light logistics." },
  { title: "Mini Bus (15–30 Seater)", description: "Reliable mini buses for staff transportation and crew movement." },
  { title: "Bus (30–50 Seater)", description: "Large buses for workforce mobilization and event transport." },
];

export const transportSolutions = ["Corporate Travel", "Staff Transportation", "Events & Conferences", "Airport Transfers", "Construction Projects", "Facility Management"];

export const transportHighlights = [
  { title: "Well Maintained Fleet", description: "Regularly serviced vehicles for safety and reliability." },
  { title: "24/7 Support", description: "Round-the-clock assistance for any journey." },
  { title: "Flexible Rental Plans", description: "Daily, weekly, monthly and long-term options." },
  { title: "On-Time Delivery", description: "Punctual pickups and drop-offs, every time." },
];

export const transportTankers = [
  "Trailers — Low Bed, Flat Bed & Drum Trucks",
  "Water Tanker",
  "Diesel Tanker",
  "Bus 55 Seater",
  "Mini Bus (15–30 Seater)",
  "Rental Cars",
  "Rental Pick Ups",
];

export const hospitalityServices = [
  { title: "Hotel Staffing Solutions", description: "Trained hotel professionals for front office, guest services and operations." },
  { title: "Housekeeping Staff", description: "Detail-oriented housekeeping teams that maintain impeccable standards." },
  { title: "Cleaners", description: "Reliable cleaning staff for hotels, facilities and corporate environments." },
  { title: "Waiters & Stewards", description: "Professional F&B service staff for restaurants, banquets and events." },
  { title: "Reception & Front Desk", description: "Well-presented receptionists and front desk professionals." },
  { title: "Kitchen Helpers", description: "Trained kitchen support staff for hotels and catering operations." },
  { title: "Catering Support Services", description: "End-to-end catering support for events, corporate functions and venues." },
];

export const hospitalityHighlights = [
  { title: "Trained Professionals", description: "Certified, experienced and well-groomed hospitality staff." },
  { title: "Premium Service", description: "Service standards that match luxury hotel expectations." },
  { title: "Guest Satisfaction Priority", description: "Every team member is trained to deliver memorable guest experiences." },
];

export const projects = [
  {
    client: "SINOPEC Engineering Company Ltd",
    project: "Jafurah",
    duration: "2022 – Current",
    type: "Oil & Gas",
    description: "Manpower supply for SINOPEC's Jafurah gas development — one of Saudi Arabia's largest unconventional gas projects, supporting Aramco's strategic energy expansion.",
    roles: [
      { role: "Rigger 3 Aramco", qty: 45 },
      { role: "Safety Officer Aramco", qty: 15 },
      { role: "Pipe Fitter", qty: 85 },
      { role: "Pipe Fabricator", qty: 130 },
      { role: "Helper", qty: 80 },
    ],
  },
  {
    client: "HYUNDAI E&C",
    project: "Marjan",
    duration: "2019 – 2022",
    type: "Oil & Gas",
    description: "Construction manpower for Hyundai E&C's Marjan oil field development — providing skilled trades across civil, mechanical and electrical disciplines.",
    roles: [
      { role: "Electrician", qty: 56 },
      { role: "Rigger 3 Aramco", qty: 3 },
      { role: "Steel Fixer", qty: 30 },
      { role: "Mason", qty: 25 },
      { role: "Carpenter", qty: 30 },
      { role: "Helper", qty: 65 },
    ],
  },
  {
    client: "HYUNDAI E&C",
    project: "Marjan",
    duration: "2018 – 2020",
    type: "Oil & Gas",
    description: "Multi-discipline workforce deployment for the early phases of the Marjan capacity-increase project, including pipe fabrication, civil works and electrical installation.",
    roles: [
      { role: "Work Permit Receiver", qty: 7 },
      { role: "Pipe Fabricator", qty: 45 },
      { role: "Pipe Fitter", qty: 55 },
      { role: "Carpenter", qty: 120 },
      { role: "Mason", qty: 76 },
      { role: "Steel Fixer", qty: 130 },
      { role: "Civil Foreman", qty: 7 },
      { role: "Electrician", qty: 42 },
    ],
  },
  {
    client: "HYUNDAI LIVART",
    project: "Yanbu",
    duration: "2017 – 2019",
    type: "Manufacturing",
    description: "Workforce for Hyundai Livart's manufacturing facility in Yanbu — providing administrative support and skilled industrial trades.",
    roles: [
      { role: "Admin Assistant", qty: 2 },
      { role: "Document Controller", qty: 3 },
      { role: "Pipe Fitter", qty: 22 },
      { role: "Safety Officer Aramco", qty: 4 },
      { role: "Civil Foreman", qty: 3 },
      { role: "Piping Foreman", qty: 2 },
      { role: "Steel Fixer", qty: 45 },
      { role: "Mason", qty: 20 },
      { role: "Carpenter", qty: 30 },
      { role: "Electrician", qty: 35 },
      { role: "Helper", qty: 65 },
    ],
  },
  {
    client: "SEPCO Arabia",
    project: "Marjan",
    duration: "2021 – 2024",
    type: "Oil & Gas",
    description: "Large-scale workforce deployment for SEPCO Arabia on the Marjan project — one of our biggest single mobilizations with over 880 personnel on site.",
    roles: [
      { role: "Mason", qty: 145 },
      { role: "Carpenter", qty: 100 },
      { role: "Steel Fixer", qty: 260 },
      { role: "Helper", qty: 325 },
      { role: "Scaffolder TUV", qty: 16 },
      { role: "Safety Officer Aramco", qty: 7 },
    ],
  },
  {
    client: "GUSAN Arabia LLC",
    project: "Marjan",
    duration: "2021 – 2024",
    type: "Oil & Gas",
    description: "Skilled trades deployment for Gusan Arabia's Marjan scope — civil works, scaffolding and safety support across multiple construction fronts.",
    roles: [
      { role: "Safety Officer Aramco", qty: 6 },
      { role: "WPR Aramco", qty: 2 },
      { role: "Carpenter", qty: 86 },
      { role: "Steel Fixer", qty: 130 },
      { role: "Helper", qty: 135 },
      { role: "Plumber", qty: 17 },
    ],
  },
  {
    client: "SINOHYDRO",
    project: "Ras Al Khayer",
    duration: "2021 – 2023",
    type: "Infrastructure",
    description: "Infrastructure workforce for Sinohydro's Ras Al Khayer development — civil and electrical trades for a major mixed-use infrastructure project.",
    roles: [
      { role: "Rigger 3 Aramco", qty: 2 },
      { role: "Steel Fixer", qty: 20 },
      { role: "Carpenter", qty: 35 },
      { role: "Mason", qty: 22 },
      { role: "Electrician", qty: 32 },
    ],
  },
  {
    client: "L&T Arabia LLC",
    project: "Amiral",
    duration: "2024 – Current",
    type: "Oil & Gas",
    description: "Manpower for L&T Arabia's Amiral project — a major petrochemical expansion in Jubail, with specialized pipe, instrumentation and safety trades.",
    roles: [
      { role: "Rigger 3 Aramco", qty: 3 },
      { role: "WPR Aramco", qty: 6 },
      { role: "Safety Officer Aramco", qty: 8 },
      { role: "Pipe Fitter", qty: 32 },
      { role: "Pipe Fabricator", qty: 22 },
      { role: "Piping Supervisor", qty: 4 },
      { role: "Instrument Technician", qty: 35 },
      { role: "Tube Fitter", qty: 19 },
      { role: "Tray Fitter", qty: 32 },
      { role: "Helper", qty: 65 },
    ],
  },
  {
    client: "MIDONG E&C",
    project: "Jafurah",
    duration: "2022 – 2026",
    type: "Oil & Gas",
    description: "Electrical and instrumentation workforce for Midong E&C's Jafurah scope — large-scale electrical installation with over 220 electricians deployed.",
    roles: [
      { role: "Electrician", qty: 223 },
      { role: "Carpenter", qty: 3 },
      { role: "Electrical Supervisor", qty: 5 },
      { role: "WPR Aramco", qty: 16 },
      { role: "Admin Officer", qty: 1 },
      { role: "Mechanical Technician", qty: 37 },
      { role: "Helper", qty: 25 },
      { role: "Scaffolder TUV", qty: 18 },
    ],
  },
  {
    client: "HYUNDAI E&C – DAISUN",
    project: "Jubail Fabricator Shop",
    duration: "2023 – Current",
    type: "Industrial",
    description: "Industrial workforce for Hyundai E&C's Jubail fabricator shop — rigging, scaffolding, civil trades and transport support for a busy fabrication yard.",
    roles: [
      { role: "Light Driver", qty: 16 },
      { role: "Rigger 1 Aramco", qty: 1 },
      { role: "Rigger 3 Aramco", qty: 2 },
      { role: "Scaffolder TUV", qty: 5 },
      { role: "Steel Fixer", qty: 54 },
      { role: "Mason", qty: 10 },
      { role: "Helper", qty: 80 },
    ],
  },
];

export const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/#services" },
  { label: "Projects", href: "/projects" },
  { label: "Jobs", href: "/jobs" },
  { label: "Contact", href: "/contact" },
];

export const serviceNavLinks = [
  { label: "Manpower", href: "/services/manpower", icon: "Users" },
  { label: "Equipment", href: "/services/equipment", icon: "Truck" },
  { label: "Transport", href: "/services/transport", icon: "Car" },
  { label: "Petro", href: "/services/petro", icon: "Fuel" },
  { label: "Hospitality", href: "/services/hospitality", icon: "ConciergeBell" },
  { label: "Industrial", href: "/services/industrial", icon: "Factory" },
];

export const siteSeo = {
  title: "Landmark Inter Gulf LLC | Manpower, Equipment Rental & Industrial Services in Saudi Arabia",
  description:
    "Landmark Inter Gulf LLC (Landmark Gulf) is a Saudi-based integrated services company providing skilled manpower supply, equipment rental, industrial trading, petro services and hospitality services across the Kingdom. 5,000+ professionals deployed. Contributing to Vision 2030.",
  keywords: [
    "Landmark Inter Gulf LLC",
    "Landmark Inter Gulf",
    "Landmark Gulf",
    "Landmark Inter Gulf LLC Saudi Arabia",
    "Landmark Inter Gulf company",
    "Landmark Inter Gulf manpower",
    "Landmark Gulf services",
    "Landmark Gulf Saudi Arabia",
    "landmarkgulf.com",
    "manpower supply Saudi Arabia",
    "equipment rental Saudi Arabia",
    "industrial services Riyadh",
    "oil and gas manpower Saudi Arabia",
    "Aramco approved workforce",
    "construction manpower KSA",
    "hospitality staffing Saudi Arabia",
    "car rental Saudi Arabia",
    "Vision 2030 Saudi Arabia",
    "rigger TUV certified",
    "scaffolder TUV certified",
    "pipe fabricator Saudi Arabia",
    "welder 6G 3G Saudi Arabia",
    "fuel station staffing Saudi Arabia",
    "Landmark Inter Gulf jobs",
    "jobs in Saudi Arabia construction",
    "manpower jobs Saudi Arabia",
    "welder jobs Saudi Arabia",
    "rigger jobs Saudi Arabia",
    "scaffolder jobs Saudi Arabia",
    "safety officer jobs Saudi Arabia",
    "crane operator jobs Saudi Arabia",
    "driver jobs Saudi Arabia",
    "hospitality jobs Saudi Arabia",
    "careers Landmark Inter Gulf",
    "job vacancies Saudi Arabia oil gas",
    "skilled manpower supply KSA",
    "heavy equipment rental KSA",
    "integrated services company Saudi Arabia",
    "Saudi Arabia industrial services",
    "manpower supply company Saudi Arabia",
  ],
};

/**
 * Client logos — extracted from the uploaded CLIENTTS LOGO.zip
 * These are the real brand logos of companies Landmark Inter Gulf
 * has worked with or is associated with.
 * Files are stored in /public/images/clients/ as 1.jpg through 25.jpg.
 */
export const clientLogos = [
  { src: "/images/clients/1.jpg", name: "Saudi Aramco" },
  { src: "/images/clients/2.jpg", name: "SABIC" },
  { src: "/images/clients/3.jpg", name: "Saline Water Conversion Corporation" },
  { src: "/images/clients/4.jpg", name: "Client 4" },
  { src: "/images/clients/5.jpg", name: "Client 5" },
  { src: "/images/clients/6.jpg", name: "Client 6" },
  { src: "/images/clients/7.jpg", name: "Client 7" },
  { src: "/images/clients/8.jpg", name: "Client 8" },
  { src: "/images/clients/9.jpg", name: "AMAALA" },
  { src: "/images/clients/10.jpg", name: "Client 10" },
  { src: "/images/clients/11.jpg", name: "Client 11" },
  { src: "/images/clients/12.jpg", name: "Client 12" },
  { src: "/images/clients/13.jpg", name: "Samsung" },
  { src: "/images/clients/14.jpg", name: "Client 14" },
  { src: "/images/clients/15.jpg", name: "Client 15" },
  { src: "/images/clients/16.jpg", name: "Client 16" },
  { src: "/images/clients/17.jpg", name: "Client 17" },
  { src: "/images/clients/18.jpg", name: "Client 18" },
  { src: "/images/clients/19.jpg", name: "Client 19" },
  { src: "/images/clients/20.jpg", name: "Client 20" },
  { src: "/images/clients/21.jpg", name: "Client 21" },
  { src: "/images/clients/22.jpg", name: "Client 22" },
  { src: "/images/clients/23.jpg", name: "Client 23" },
  { src: "/images/clients/24.jpg", name: "Client 24" },
  { src: "/images/clients/25.jpg", name: "Client 25" },
];

/** Helper: get a service by slug */
export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}

/**
 * Job categories and open positions for the Careers page.
 * Job seekers can browse by category and apply directly.
 */
export const jobCategories = [
  {
    id: "manpower",
    name: "Manpower & Skilled Trades",
    icon: "HardHat",
    description: "Skilled, semi-skilled and unskilled positions across construction, oil & gas, petrochemical and industrial sectors.",
    jobs: [
      { title: "Pipe Fabricator", type: "Full-time", experience: "3+ years", cert: "Aramco preferred" },
      { title: "Pipe Fitter", type: "Full-time", experience: "3+ years", cert: "Technical diploma" },
      { title: "6G / 3G Welder", type: "Full-time", experience: "5+ years", cert: "6G certification" },
      { title: "TIG & ARC Welder", type: "Full-time", experience: "3+ years", cert: "Welding cert" },
      { title: "Rigger (TUV Certified)", type: "Full-time", experience: "3+ years", cert: "TUV/Rigger 3 Aramco" },
      { title: "Scaffolder (TUV Certified)", type: "Full-time", experience: "2+ years", cert: "TUV certified" },
      { title: "Millwright", type: "Full-time", experience: "3+ years", cert: "Millwright cert" },
      { title: "Instrument Technician", type: "Full-time", experience: "3+ years", cert: "Instrumentation" },
      { title: "Instrument Electrician", type: "Full-time", experience: "3+ years", cert: "Electrical cert" },
      { title: "Civil Surveyor", type: "Full-time", experience: "3+ years", cert: "Surveying cert" },
      { title: "Mason", type: "Full-time", experience: "3+ years", cert: "—" },
      { title: "Steel Fixer", type: "Full-time", experience: "3+ years", cert: "—" },
      { title: "Carpenter", type: "Full-time", experience: "3+ years", cert: "—" },
      { title: "Electrician", type: "Full-time", experience: "3+ years", cert: "ITI/equivalent" },
      { title: "Plumber", type: "Full-time", experience: "3+ years", cert: "—" },
      { title: "Painter", type: "Full-time", experience: "2+ years", cert: "—" },
      { title: "Mechanic Helper", type: "Full-time", experience: "1+ year", cert: "—" },
      { title: "Material Coordinator", type: "Full-time", experience: "3+ years", cert: "—" },
      { title: "Helper", type: "Full-time", experience: "0-1 year", cert: "—" },
    ],
  },
  {
    id: "supervisors",
    name: "Supervisors & Engineers",
    icon: "Users",
    description: "Leadership and technical supervision roles for experienced professionals.",
    jobs: [
      { title: "Mechanical Supervisor / Foreman", type: "Full-time", experience: "8+ years", cert: "Engineering degree" },
      { title: "Piping Supervisor / Foreman", type: "Full-time", experience: "8+ years", cert: "Engineering degree" },
      { title: "Structural Supervisor / Foreman", type: "Full-time", experience: "8+ years", cert: "Engineering degree" },
      { title: "Electrical Supervisor / Foreman", type: "Full-time", experience: "8+ years", cert: "Electrical eng." },
      { title: "Instrument Supervisor / Foreman", type: "Full-time", experience: "8+ years", cert: "Instrumentation" },
      { title: "Civil Foreman", type: "Full-time", experience: "5+ years", cert: "Civil diploma" },
      { title: "Rigging Supervisor", type: "Full-time", experience: "5+ years", cert: "Rigger certified" },
      { title: "Safety Officer (Aramco)", type: "Full-time", experience: "5+ years", cert: "Aramco approved" },
      { title: "Work Permit Receiver (WPR)", type: "Full-time", experience: "3+ years", cert: "Aramco WPR" },
      { title: "QA/QC Inspector", type: "Full-time", experience: "5+ years", cert: "QA/QC certified" },
      { title: "Planning Engineer", type: "Full-time", experience: "5+ years", cert: "Engineering degree" },
      { title: "Document Controller", type: "Full-time", experience: "3+ years", cert: "—" },
    ],
  },
  {
    id: "operators",
    name: "Equipment Operators",
    icon: "Truck",
    description: "Heavy equipment operation roles for certified operators across various sites.",
    jobs: [
      { title: "Crane Operator (Aramco)", type: "Full-time", experience: "5+ years", cert: "Aramco certified" },
      { title: "Forklift Operator (Aramco)", type: "Full-time", experience: "3+ years", cert: "Aramco certified" },
      { title: "Bobcat Operator (Aramco)", type: "Full-time", experience: "3+ years", cert: "Aramco certified" },
      { title: "Manlift Operator (Aramco)", type: "Full-time", experience: "3+ years", cert: "Aramco certified" },
      { title: "Boom Truck Operator (Aramco)", type: "Full-time", experience: "3+ years", cert: "Aramco certified" },
      { title: "Excavator Operator", type: "Full-time", experience: "3+ years", cert: "License required" },
      { title: "Light Driver", type: "Full-time", experience: "2+ years", cert: "Valid license" },
      { title: "Heavy Driver", type: "Full-time", experience: "3+ years", cert: "HV license" },
    ],
  },
  {
    id: "hospitality",
    name: "Hospitality & Catering",
    icon: "ConciergeBell",
    description: "Hotel, catering and facility management positions across the Kingdom.",
    jobs: [
      { title: "Hotel Receptionist", type: "Full-time", experience: "2+ years", cert: "Hospitality diploma" },
      { title: "Housekeeping Staff", type: "Full-time", experience: "1+ year", cert: "—" },
      { title: "Waiter / Steward", type: "Full-time", experience: "1+ year", cert: "—" },
      { title: "Kitchen Helper", type: "Full-time", experience: "1+ year", cert: "—" },
      { title: "Cleaner", type: "Full-time", experience: "0-1 year", cert: "—" },
      { title: "Catering Support Staff", type: "Contract", experience: "1+ year", cert: "—" },
    ],
  },
  {
    id: "transport",
    name: "Transport & Logistics",
    icon: "Car",
    description: "Driving and transport roles for corporate and project logistics.",
    jobs: [
      { title: "Corporate Driver (Sedan/SUV)", type: "Full-time", experience: "3+ years", cert: "Valid license" },
      { title: "Bus Driver (30-50 Seater)", type: "Full-time", experience: "3+ years", cert: "Bus license" },
      { title: "Pickup Truck Driver", type: "Full-time", experience: "2+ years", cert: "Valid license" },
      { title: "Water Tanker Driver", type: "Full-time", experience: "2+ years", cert: "HV license" },
      { title: "Low Bed Trailer Driver", type: "Full-time", experience: "5+ years", cert: "Trailer license" },
    ],
  },
  {
    id: "management",
    name: "Management & Office",
    icon: "Briefcase",
    description: "Administrative and management positions at our head office.",
    jobs: [
      { title: "Site Manager", type: "Full-time", experience: "10+ years", cert: "Engineering degree" },
      { title: "Safety Manager", type: "Full-time", experience: "8+ years", cert: "NEBOSH/equivalent" },
      { title: "Project Coordinator", type: "Full-time", experience: "5+ years", cert: "Engineering/MBA" },
      { title: "HR Coordinator", type: "Full-time", experience: "3+ years", cert: "HR degree" },
      { title: "Accountant", type: "Full-time", experience: "3+ years", cert: "Accounting degree" },
      { title: "Admin Officer", type: "Full-time", experience: "3+ years", cert: "—" },
      { title: "AutoCAD Operator", type: "Full-time", experience: "2+ years", cert: "AutoCAD certified" },
    ],
  },
];
