# NorthStar Candy Store API

Welcome to the NorthStar Candy Store API! This API serves as the backend data interaction platform for consumers, candy products, stores, and order management.

## Table of Contents
1. [Introduction](#introduction)
2. [Getting Started](#getting-started)
3. [Features](#features)
4. [Endpoints](#endpoints)
5. [Authentication](#authentication)
6. [Testing](#testing)
7. [Contact](#contact)

## Introduction
NorthStar Candy Store API aims to provide a seamless online ordering experience for candy enthusiasts across the country. Developed using NestJS and TypeScript, the API ensures type-safety and scalability, catering to the potential growth of NorthStar's candy business.

## Getting Started

### Prerequisites

- Node.js
- MySQL

### Installation

1. Clone the repository:
```bash
git clone https://github.com/[Your_GitHub_Username]/northstar-candy-store-api.git
```

Install the dependencies:
```bash
cd northstar-candy-store-api
npm install
```
Setup environment variables:
```bash
cp .env.example .env
```

Edit .env with your database credentials.

Run the migrations:
```bash
npm run migration:run
```

Start the server: 
```bash
npm start
```

### Features
- Customer Management: Register and update customer details.
- Inventory Management: Handle candy product inventories.
- Store Management: Register and manage NorthStar candy store outlets.
- Order Management: Accept and manage candy orders.
- JWT Authentication: Secure API endpoints.
- Pagination: Efficiently handle large sets of data.
- Reporting: Monthly reports for orders, grouped by store and status.
  
### Endpoints
Refer to the provided API documentation (replace with the link to your documentation, if any) for a detailed list of endpoints and their respective functionalities.

### Authentication
The API uses JWT for authentication. To access protected routes, you need to pass the JWT token in the Authorization header:

Authorization: Bearer YOUR_JWT_TOKEN_HERE

## Testing
### Unit Testing
Run the following command to execute unit tests:

```bash
npm run test
```

Load Testing
To evaluate the API's performance, use the provided load testing script.

## System Design



![sandbox drawio (1)](https://github.com/tgalg/northstar/assets/12563121/3392ca5c-c4e2-40e4-8edb-12e139bd051b)

