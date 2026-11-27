# Cultured Pearl — CMS Data Dictionary & Schemas

This document defines the schema architecture, field names, data types, and display settings for all custom Wix CMS collections created for **Cultured Pearl** (`metaSiteId: 6f7426b7-afd2-4e14-84db-49d2395b4ee7`).

---

## 1. Custom Collections Overview

| Collection ID | Display Name | Record Count | Managed In Dashboard |
|:---|:---|:---:|:---|
| `TeamMembers` | Leadership & Team | 6 | [Wix CMS Dashboard](https://manage.wix.com/dashboard/6f7426b7-afd2-4e14-84db-49d2395b4ee7/cms) |
| `SiteSettings` | Global Site Settings | 8 | [Wix CMS Dashboard](https://manage.wix.com/dashboard/6f7426b7-afd2-4e14-84db-49d2395b4ee7/cms) |
| `Testimonials` | Community Voices | 3 | [Wix CMS Dashboard](https://manage.wix.com/dashboard/6f7426b7-afd2-4e14-84db-49d2395b4ee7/cms) |
| `Scholarships` | Purposeful Life Scholarship | 2 | [Wix CMS Dashboard](https://manage.wix.com/dashboard/6f7426b7-afd2-4e14-84db-49d2395b4ee7/cms) |
| `MediaGallery` | Photo Archive | Ready | [Wix CMS Dashboard](https://manage.wix.com/dashboard/6f7426b7-afd2-4e14-84db-49d2395b4ee7/cms) |

---

## 2. Collection Schemas

### Collection: `TeamMembers`
Used on `/meet-the-team` to render executive leadership, board members, and committee chairs.

| Field Key | Field Label | Data Type | Required | Description |
|:---|:---|:---|:---:|:---|
| `title` | Full Name | Text | Yes | First and last name of the leader (e.g. "Sharonda Savoy") |
| `role` | Position / Title | Text | Yes | Title in the organization (e.g. "Founder & Executive Director") |
| `bio` | Biography | Long Text | Yes | Multi-paragraph bio detailing background and ministry focus |
| `education` | Education / Credentials | Text | No | Degrees and certifications (e.g. "B.S. in Organizational Leadership") |
| `image` | Photo | Image | Yes | High-resolution portrait photograph |
| `quote` | Personal Scripture / Quote | Text | No | Inspiring quote or scripture highlighted on their card |
| `displayOrder` | Sort Order | Number | No | Numerical sort rank (1 = first) |

---

### Collection: `SiteSettings`
Used across headers, footers, meta tags, and contact sections.

| Field Key | Field Label | Data Type | Required | Description |
|:---|:---|:---|:---:|:---|
| `title` | Setting Key | Text | Yes | Unique identifier (e.g. "site_name", "primary_email", "ein") |
| `value` | Setting Value | Text / Long Text | Yes | The textual setting content |
| `description` | Internal Note | Text | No | Purpose of this setting for content editors |

**Initial Seeded Records:**
- `site_name`: Cultured Pearl
- `tagline`: Bringing Women Into God's Light
- `verse_primary`: "Strength and dignity are her clothing, and she laughs at the time to come." — Proverbs 31:25
- `verse_secondary`: "And I will put this third into the fire, and refine them as one refines silver..." — Zechariah 13:9
- `email`: sharondasavoy@culturedpearl.org
- `phone`: (202) 555-0199
- `address`: Washington, DC Metropolitan Area
- `ein`: 501(c)(3) Tax ID

---

### Collection: `Testimonials`
Featured on the Home page (`/`) under "Echoes of Grace & Impact".

| Field Key | Field Label | Data Type | Required | Description |
|:---|:---|:---|:---:|:---|
| `title` | Person Name | Text | Yes | Name of attendee, partner, or donor (e.g. "Sister Angela M.") |
| `role` | Relationship | Text | Yes | Context (e.g. "Gala Attendee", "Scholarship Parent") |
| `quote` | Testimonial Quote | Long Text | Yes | Personal reflection or impact statement |
| `image` | Avatar / Photo | Image | No | Photo of the person (optional) |

---

### Collection: `Scholarships`
Featured on `/scholarship` for application deadlines, stipend amounts, and recipient highlights.

| Field Key | Field Label | Data Type | Required | Description |
|:---|:---|:---|:---:|:---|
| `title` | Program Title | Text | Yes | Name of scholarship (e.g. "Purposeful Life Scholarship") |
| `year` | Award Year | Text | Yes | Current cycle (e.g. "2026–2027") |
| `deadline` | Application Deadline | Text | Yes | Submission cutoff date |
| `requirements` | Criteria Summary | Long Text | Yes | Bulleted eligibility requirements |
| `recipient` | Recent Recipient Name | Text | No | Featured recipient (e.g. "Kennedy Cordle") |
| `recipientSchool` | Recipient College/School | Text | No | Future university |
