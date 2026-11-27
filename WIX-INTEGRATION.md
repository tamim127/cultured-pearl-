# Wix Headless Integration & API Architecture

This document details the backend architecture, installed Wix apps, API endpoints, schema definitions, and caching strategies for the **Cultured Pearl** website connected to Wix site `6f7426b7-afd2-4e14-84db-49d2395b4ee7`.

---

## 1. Wix Site & Project Context

| Parameter | Value |
|:---|:---|
| **Site Name** | Cultured Pearl |
| **Site ID (`metaSiteId`)** | `6f7426b7-afd2-4e14-84db-49d2395b4ee7` |
| **Live Host URL** | `https://headless-myhqhhixfom-cmsscaleup-140a.wix-site-host.com` |
| **Wix Dashboard** | `https://manage.wix.com/dashboard/6f7426b7-afd2-4e14-84db-49d2395b4ee7` |
| **API Base URL** | `https://www.wixapis.com` |

---

## 2. Installed Wix Applications

The following official Wix apps are actively installed and operational on the site:

| Application | App ID | Status | Purpose |
|:---|:---|:---|:---|
| **Wix CMS (Data)** | `e593b0bd-b783-45b8-97c2-873d42aacaf4` | Installed | Custom collections (`TeamMembers`, `SiteSettings`, `Testimonials`, etc.) |
| **Wix Events** | `140603ad-af8d-84a5-2c80-a0f60cb47351` | Installed | Debutante Ball, Galas, Community drives, and RSVP management |
| **Wix Forms** | `225dd912-7dea-4738-8688-4b8c6955ffc2` | Installed | Contact Us and Volunteer Application forms with automatic CRM sync |
| **Wix Stores** | `215238eb-22a5-4c36-9e7b-e7c08025e04e` | Installed | Cultured Pearl Magazine print and digital publication distribution |
| **Wix Blog** | `14bcded7-0066-7c35-14d7-466cb3f09103` | Installed | Articles, devotionals, and ministry updates |

---

## 3. Centralized API Service (`wixClient.ts`)

All communication between the frontend and Wix is mediated by `src/services/wixClient.ts`. This architecture provides:
1. **Header Normalization:** Standardizes `wix-site-id` and `Content-Type` headers.
2. **Two-Tier Caching:** Caches API query results in a high-speed memory Map and synchronizes to `sessionStorage` with a 5-minute Time-To-Live (TTL).
3. **Graceful Degradation:** If network connectivity fails or Wix returns non-200 responses, the system logs a diagnostic message and serves cached or curated fallbacks.
4. **Offline Queueing:** Contact and volunteer submissions that encounter network disruptions are safely preserved in browser `localStorage` for re-dispatch.

---

## 4. API Endpoints & Data Flows

### A. Wix CMS (Data v2)
- **Endpoint:** `POST https://www.wixapis.com/wix-data/v2/items/query`
- **Headers:** `{"Content-Type": "application/json", "wix-site-id": "6f7426b7-afd2-4e14-84db-49d2395b4ee7"}`
- **Payload:**
  ```json
  {
    "dataCollectionId": "TeamMembers",
    "query": {
      "paging": { "limit": 50 }
    }
  }
  ```
- **Used by:** `MeetTheTeam.tsx` (`fetchTeamMembers`), `Home.tsx` (`fetchTestimonials`).

### B. Wix Events (Events v3)
- **Endpoint:** `POST https://www.wixapis.com/events/v3/events/query`
- **Headers:** `{"Content-Type": "application/json", "wix-site-id": "6f7426b7-afd2-4e14-84db-49d2395b4ee7"}`
- **Payload:**
  ```json
  {
    "query": {
      "paging": { "limit": 20 },
      "sort": [{ "fieldName": "createdDate", "order": "DESC" }]
    }
  }
  ```
- **Used by:** `Events.tsx`, `EventDetail.tsx`, and `Home.tsx` upcoming events section.

### C. Wix Forms v4 (CRM Contact Synchronization)
- **Endpoint:** `POST https://www.wixapis.com/form-submission-service/v4/submissions`
- **Headers:** `{"Content-Type": "application/json", "wix-site-id": "6f7426b7-afd2-4e14-84db-49d2395b4ee7"}`
- **Contact Form (`7c41df41-9f95-4fa3-b65c-dbf5628f0b26`):**
  ```json
  {
    "submission": {
      "formId": "7c41df41-9f95-4fa3-b65c-dbf5628f0b26",
      "submissions": {
        "first_name_cp01": "Jane",
        "last_name_cp02": "Doe",
        "email_cp03": "jane@example.com",
        "phone_cp04": "(202) 555-0199",
        "message_cp05": "Prayer request for health and guidance."
      }
    }
  }
  ```
- **Volunteer Form (`5e71ce1e-f501-419d-a12c-a63fc14fc95e`):**
  ```json
  {
    "submission": {
      "formId": "5e71ce1e-f501-419d-a12c-a63fc14fc95e",
      "submissions": {
        "vol_first_name_v01": "Sarah",
        "vol_last_name_v02": "Jenkins",
        "vol_email_v03": "sarah@example.com",
        "vol_phone_v04": "(202) 555-0188",
        "vol_skills_v05": "Youth mentorship and community shoe drive logistics"
      }
    }
  }
  ```
- **Automatic CRM Action:** Every form submission automatically creates or updates the Contact record in the Wix CRM Contacts dashboard with name, email, phone, and submission history.
