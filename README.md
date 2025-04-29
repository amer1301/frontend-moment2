# CV-Webbplats – Frontend + REST API (MongoDB)
Detta projekt är en fullständig webbapplikation som hanterar arbetserfarenheter i ett CV-format. Applikationen är uppdelad i en **frontend** (webbplats) och en **backend** (REST API) med **MongoDB** som databas.

Frontend-delen är byggd med HTML, CSS och JavaScript, och använder **Fetch API** för att kommunicera med backend.

## 🧩 Funktionalitet
- ✅ Visa lista över alla arbetserfarenheter (`index.html`)
- ✅ Lägg till ny arbetserfarenhet via formulär (`add.html`)
- ✅ Läs mer om projektet (`about.html`)
- ✅ Använder Fetch API för att kommunicera med backend
- ✅ CRUD-operationer:
  - `GET` – hämta arbetserfarenheter
  - `POST` – lägg till ny erfarenhet
  - `DELETE` – ta bort arbetserfarenhet

## ⚙️ Backend – REST API (Node.js + Express + MongoDB)

REST API:t är byggt med **Node.js**, **Express** och **MongoDB** (via Mongoose). Det hanterar lagring och hämtning av data och exponerar följande endpoints:

### API Endpoints

| Metod | URL                           | Beskrivning                          |
|-------|-------------------------------|--------------------------------------|
| GET   | `/api/workexperience`         | Hämta alla arbetserfarenheter        |
| POST  | `/api/workexperience`         | Lägg till en ny arbetserfarenhet     |
| DELETE| `/api/workexperience/:id`     | Ta bort en specifik erfarenhet       |

### Datamodell

Minst fyra fält krävs i varje post, t.ex.:

- `companyname` *(String, krävs)*
- `jobtitle` *(String, krävs)*
- `location` *(String, krävs)*
- `startdate` *(Date, krävs)*
- `enddate` *(Date, valfri)*
- `description` *(String, valfri)*
