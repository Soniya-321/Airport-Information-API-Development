# 🛫 Airport Information API

## 📌 Objective
Design and implement a backend system to retrieve airport information based on the provided IATA code. The backend uses a relational database with three tables: Airport, City, and Country. It provides a GET API using TypeORM in Node.js.

## 🧱 Database Design

### Tables
- **Airport Table**: Stores IATA, ICAO codes, name, type, latitude, longitude, and elevation.
- **City Table**: Contains city ID, name, country ID, latitude, longitude.
- **Country Table**: Includes country ID, name, two/three-letter codes, mobile code, and continent ID.

### Relationships
- An **Airport** belongs to a **City** (`airport.city_id → city.id`)
- A **City** belongs to a **Country** (`city.country_id → country.id`)

## 🧪 API Development

### Endpoint
**GET** `/api/airport/:iata_code`  
Retrieves detailed airport information using the IATA code.

### Request Parameters
- `iata_code`: (path param) The IATA code of the airport.

### Sample Response
```json
{
  "airport": {
    "id": 145,
    "icao_code": "VIAG",
    "iata_code": "AGR",
    "name": "Agra Airport / Agra Air Force Station",
    "type": "medium_airport",
    "latitude_deg": 27.157683,
    "longitude_deg": 77.960942,
    "elevation_ft": 551,
    "address": {
      "city": {
        "id": 436,
        "name": "Agra",
        "country_id": 76,
        "is_active": true,
        "lat": 27.18,
        "long": 78.02
      },
      "country": {
        "id": 76,
        "name": "India",
        "country_code_two": "IN",
        "country_code_three": "IND",
        "mobile_code": 91,
        "continent_id": 1
      }
    }
  }
}
