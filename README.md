## API Endpoints – How to Test
You can test the API using the endpoints below.
Make sure to send all requests in JSON format, and replace the sample data with your own if needed.

1. Health Check
GET /health
Purpose: Check if the API is running correctly.

Response:
200 OK – "I'm ok!"

2. Register a New Phone
POST /phones
Purpose: Register a new phone number for a client.

Request Body:
{
  "number": "11999999999",
  "carrier": "Vivo",
  "name": "Fulano",
  "description": "Personal number",
  "cpf": "12345678900"
}

Note:
- "number" and "cpf" must have exactly 11 digits.
- "carrier" must match a registered carrier name.

Response: 201 Created – Returns the created phone record.

3. List Phones by CPF
GET /phones/12345678900
Purpose: Retrieve all phone numbers associated with a given CPF (Brazilian ID number).

Response:
200 OK – Returns an array of phone records. If none are found, returns an empty array.

4. Recharge a Phone
POST /recharges
Purpose: Add credit to a registered phone using its ID.

Request Body:
{
  "phoneId": 1,
  "amount": 50
}

Rules:
- "phoneId" must reference an existing phone.
- "amount" must be between 10 and 1000.

Response: 201 Created – Returns the recharge record.

5. List Recharges by Phone Number
GET /recharges/11999999999
Purpose: View all recharges for a given phone number.

Response:
200 OK – Returns an array of recharge records. If none are found, returns an empty array.

6. Summary by CPF
GET /summary/12345678900
Purpose: Get a complete overview of all phones and their recharges for a given CPF.

Response Format:
{
  "document": "12345678900",
  "phones": [
    {
      "id": 1,
      "number": "11999999999",
      "name": "Fulano",
      "description": "Personal number",
      "cpf": "12345678900",
      "carrier_id": 2,
      "carrier": {
        "id": 2,
        "name": "Vivo"
      },
      "recharges": [
        {
          "id": 3,
          "phone_id": 1,
          "amount": 50,
          "timestamp": "2025-06-11T12:00:00.000Z"
        }
      ]
    }
  ]
}

If no phones are found for the given CPF, "phones" will be an empty array.

## Business Rules – Test Checklist

1. Phone Registration (POST /phones)

- Register phone with valid data → 201 Created

- Register phone with invalid CPF (not 11 digits) → 422 Unprocessable Entity

- Register phone with invalid number (not 11 digits) → 422

- Register phone with missing fields (e.g., no description) → 422

- Register phone with non-existent carrier → 404 Not Found

- Register phone with an already existing number → 409 Conflict

- Register more than 3 phones for the same CPF → 409 Conflict

2. List Phones (GET /phones/:cpf)

- Get phones for CPF with records → 200 OK with array of phones

- Get phones for CPF with no records → 200 OK with empty array

3. Phone Recharge (POST /recharges)

- Make a valid recharge (amount between 10 and 1000, valid phone ID) → 201 Created

- Recharge with amount less than 10 → 422

- Recharge with amount greater than 1000 → 422

- Recharge with non-existent phone ID → 404 Not Found

- Recharge with missing fields (e.g., no amount) → 422

4. List Recharges (GET /recharges/:number)

- Get recharges for number with records → 200 OK with array

- Get recharges for number with no records → 200 OK with empty array

5. Summary (GET /summary/:cpf)

- Get summary for CPF with phones and recharges → 200 OK with correct structure

- Get summary for CPF with no phones → "phones": [] (but document key must still be present)
