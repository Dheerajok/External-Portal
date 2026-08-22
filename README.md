# ECO-SMART Authority & Partner Portal 🏛️♻️

> **National-Scale Environmental Collaboration, Execution & Intelligence Infrastructure**  
> Official Ecosystem Portal for Government Authorities, Municipalities, Recyclers, NGOs, Businesses, Researchers, and Environmental Data Partners.

---

## 🌍 Overview

The **ECO-SMART Authority & Partner Portal** is the **execution, collaboration, and intelligence layer** connecting all institutional and community environmental stakeholders with the citizen-facing ECO-SMART platform.

```
CITIZENS (ECO-SMART Public Platform)
  ↓ Citizen submits waste / complaint / activity
ECO-SMART CENTRAL DATA & AI ENGINE
  ↓ Evaluates severity, distance, and entity capabilities
AUTHORITY & PARTNER PORTAL
  ↓ Relevant organization receives task / data
ORGANIZATION TAKES ON-GROUND ACTION
  ↓ Uploads photo proof & weighbridge manifest
ECO-SMART VERIFICATION
  ↓ Citizen receives reward points & status update
CERTIFIED ENVIRONMENTAL IMPACT & AI LEARNING
```

---

## 🏛️ Multi-Organization Stakeholder Support

The portal provides customized onboardings, workspaces, and telemetry pipelines for 13 distinct entity types:

1. 🏛️ **Government Authority** (CPCB, State Pollution Control Boards)
2. 🏙️ **Municipality / Local Body** (Municipal Corporations, Nagar Palikas, Zonal Units)
3. ♻️ **Waste Management Organization** (Bio-methanation, RDF, Processing facilities)
4. 🌱 **NGO / Environmental Organization** (Grassroots cleanups, lake rejuvenation)
5. 🏭 **Recycling Organization** (E-Waste recovery, PET flaking, EPR compliance)
6. 🏢 **Corporate / CSR Partner** (ESG funding, sensor sponsorships)
7. 🏫 **Educational Institution** (Universities, Youth Eco-Councils)
8. 🔬 **Research Organization** (Environmental labs, Satellite telemetry)
9. 🌍 **Sustainability Organization** (Carbon accounting, Lifecycle auditors)
10. 🚛 **Collection / Logistics Partner** (GPS vehicle fleets, Tipper trucks)
11. 🏪 **Reward / Business Partner** (Merchant discount network, Eco-vouchers)
12. 👥 **Community Organization** (Resident Welfare Associations, Civic brigades)
13. 🔗 **Other Authorized Organizations** (Audited environmental contractors)

---

## 🚀 Key Modules & Capabilities

- **Institutional Landing Page**: Live ecosystem synchronization visualization between citizens, authorities, waste orgs, NGOs, businesses, and researchers.
- **6-Step Verified Onboarding**: Statutory ID validation, representative credentialing, operational zone selection, 14 capability tags, and API sandbox key generation.
- **Dual Mode Interface**:
  - **🌱 Simple Mode**: Minimalist workflow for grassroots NGOs, local recyclers, and community groups.
  - **🏢 Enterprise Mode**: Multi-department permissions, bulk data pipelines, audit logs, and REST API management.
- **Universal Task Center**: Kanban & List views, status lifecycle (`New` → `Accepted` → `In Progress` → `Awaiting Verification` → `Completed`), photo proof upload, and weighbridge net weight audits.
- **Smart Task Assignment**: AI matching engine assessing capability %, geo-distance (km), availability, and average response speed.
- **Municipal Complaint Center & SLA Escalation**: 10 complaint categories, severity tags, citizen photo evidence, duplicate incident clustering, and automated 4-stage SLA escalation pipeline (`Intake` → `Dispatch` → `Warning` → `Commander Escalation`).
- **Waste Operations Workspace**: Live fleet route tracking, material segregation breakdown (Organic, Dry, Plastic, E-Waste, Hazardous), Devguradia transfer logs, and CO₂ offset calculators.
- **Environmental GIS Multi-Layer Map**: Interactive layers for AQI Sensors, Waste Density, Active Complaints, Partner Hubs, and AI Risk Hotspots.
- **AI Environmental Intelligence**: Real-time anomaly detection, commercial waste spike alerts, and duplicate incident merging.
- **Data Contribution Center**: CSV / Excel telemetry parser, REST API ingestion keys, and public dataset verification registry.
- **Unified Impact & Scorecard**: Certified metrics (waste diverted, CO₂ avoided, water saved, energy conserved, people engaged) and an objective 100-point Organization Performance Score.
- **Reporting & Export Center**: Statutory SWM 2016, E-Waste 2022, and CSR compliance reports with print and CSV export support.
- **National Command Center**: Situational room with real-time critical incident feeds and rapid commander overrides.
- **Bidirectional Ecosystem Connection**: Persistent `← Return to ECO-SMART` and `Open Citizen Portal` navigation controls.

---

## 🛠️ Technology Stack

- **Framework**: Next.js 15+ (App Router)
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4 with Navy Blue + Clean Institutional Theme
- **Icons**: Lucide React
- **State Management**: React Context (`PortalContext`) with reactive simulated real-time data
- **Data Visualizations**: Recharts & Custom SVGs

---

## 💻 Local Development Setup

```bash
# Clone the repository
git clone https://github.com/Dheerajok/External-Portal.git
cd External-Portal

# Install dependencies
npm install

# Start development server on port 3001
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3001](http://localhost:3001) in your browser.

---

## 🔗 Connection with Citizen ECO-SMART Platform

Set the citizen platform URL in your environment file:

```env
NEXT_PUBLIC_CITIZEN_PORTAL_URL=http://localhost:3000
```

---

## 📜 License & Compliance

Compliant with Central Pollution Control Board (CPCB) standards, Solid Waste Management Rules 2016, E-Waste Management Rules 2022, and Digital Data Sovereignty guidelines.
