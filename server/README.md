

# My Next Trip - Backend API

Welcome to the **My Next Trip** backend! This is a Node.js + Express + MongoDB project that powers a travel booking platform. The backend handles user authentication, travel management, bookings, payments (including SSLCommerz), and admin functionalities.

---

## 🛠️ Technologies Used
- Node.js
- Express.js
- MongoDB + Mongoose
- JWT Authentication
- Bcrypt for password hashing
- Cloudinary for image uploads
- SSLCommerz for payment processing
- Nodemailer for email notifications
- Multer for file uploads

---

## ⚡ Quick Start

1. **Clone the repository:**
```bash
git clone https://github.com/mdrezuanislamridoy/MyNextTrip.git
cd server
````

2. **Install dependencies:**

```bash
npm install
```

3. **Setup environment variables:**
   Create a `.env` file and add:

```
PORT=5050
DB_URL=mongodb://localhost:27017/MyNextTrip
JWT_SECRET=your_jwt_secret

CNAME=your_cloudinary_name
CAPI_KEY=your_cloudinary_api_key
CAPI_SECRET=your_cloudinary_api_secret

GMAIL_USER=your_email@gmail.com
GMAIL_PASS=your_email_app_password

SSLC_STORE_ID=your_ssl_store_id
SSLC_STORE_PASS=your_ssl_store_password

CORS_ORIGIN=http://localhost:5173
```

4. **Start the server:**

```bash
npm start
```

Server will run on `http://localhost:5050`.

---

## 📌 Folder Structure

```
server/
│
├─ controllers/      # API logic for user, travel, booking, payment, admin
├─ middleware/       # Auth, validation, error handling
├─ models/           # MongoDB schemas
├─ routes/           # Express routers
├─ utils/            # Helpers like cloudinary, email, multer
├─ validation/       # Joi validation schemas
├─ config/           # Database connection
└─ index.js          # Entry point
```

---

## 🔹 Routes Overview

### 1️⃣ User Auth & Profile (`/api/auth`)

| Endpoint                | Method | Auth | Description                          |
| ----------------------- | ------ | ---- | ------------------------------------ |
| `/sendCode`             | POST   | No   | Send email verification code         |
| `/register`             | POST   | No   | Register a user (traveler or agency) |
| `/login`                | POST   | No   | Login and get JWT cookie             |
| `/profile`              | GET    | Yes  | Get logged-in user profile           |
| `/updateProfile`        | PUT    | Yes  | Update profile info                  |
| `/updateProfilePicture` | PUT    | Yes  | Update profile image                 |
| `/updateCoverPicture`   | PUT    | Yes  | Update cover image                   |
| `/updatePassword`       | PUT    | Yes  | Change password                      |
| `/sendForgetPassCode`   | POST   | No   | Send password reset code             |
| `/forgetPassword`       | POST   | No   | Reset password using code            |
| `/logout`               | POST   | Yes  | Logout user                          |

---

### 2️⃣ Travel Management (`/api/travel`)

| Endpoint             | Method | Auth   | Description                 |
| -------------------- | ------ | ------ | --------------------------- |
| `/addTravel`         | POST   | Agency | Add new travel              |
| `/addImage/:id`      | POST   | Agency | Upload travel image         |
| `/getMyTravels`      | GET    | Agency | Get travels added by agency |
| `/getTravels`        | GET    | No     | Fetch all travels           |
| `/getTravels/:query` | GET    | No     | Search travels              |
| `/getTravel/:id`     | GET    | No     | Get single travel details   |
| `/updateTravel/:id`  | PUT    | Agency | Update travel info          |
| `/deleteTravel/:id`  | DELETE | Agency | Delete a travel             |

---

### 3️⃣ Booking Management (`/api/booking`)

| Endpoint             | Method | Auth   | Description                        |
| -------------------- | ------ | ------ | ---------------------------------- |
| `/addBooking/:id`    | POST   | User   | Book a travel (cash or SSLCommerz) |
| `/myBookings`        | GET    | User   | Get user’s bookings                |
| `/getAgencyBookings` | GET    | Agency | Get bookings for agency’s travels  |
| `/updateBooking/:id` | PUT    | User   | Update booking status (agency)     |
| `/getBooking/:id`    | GET    | User   | Get single booking details         |

---

### 4️⃣ Payment (`/api/payment`)

| Endpoint       | Method | Auth | Description                    |
| -------------- | ------ | ---- | ------------------------------ |
| `/cash/:id`    | POST   | User | Confirm booking with cash      |
| `/payBill/:id` | POST   | User | Redirect to SSLCommerz payment |
| `/success/:id` | POST   | No   | SSLCommerz success callback    |
| `/fail/:id`    | POST   | No   | SSLCommerz fail callback       |
| `/cancel/:id`  | POST   | No   | SSLCommerz cancel callback     |

---

### 5️⃣ Admin (`/api/admin`)

| Endpoint                         | Method | Auth  | Description                  |
| -------------------------------- | ------ | ----- | ---------------------------- |
| `/admin/rr/rsc-create-bro-admin` | POST   | No    | Create new admin             |
| `/getAllAgencies`                | GET    | Admin | List all approved agencies   |
| `/getPendingAgencies`            | GET    | Admin | List pending agency requests |
| `/approveAgency/:agencyId`       | POST   | Admin | Approve agency registration  |
| `/rejectAgency/:agencyId`        | POST   | Admin | Reject agency registration   |
| `/deleteProfile/:id`             | DELETE | Admin | Delete a user/agency         |
| `/blockProfile/:id`              | PUT    | Admin | Block user/agency            |
| `/unBlockProfile/:id`            | PUT    | Admin | Unblock user/agency          |
| `/getBlockedProfiles`            | GET    | Admin | List blocked profiles        |

---

## 📧 Email Verification & Password Reset

* Verification code expires in 15 minutes.
* Emails sent using **Gmail**.
* Frontend should request `/sendCode` or `/sendForgetPassCode` and verify the code before registration/password reset.

---

## 🖼️ Image Uploads

* User profile and cover images are uploaded to **Cloudinary**.
* Travel images also use Cloudinary.
* Uses `Multer` for handling multipart/form-data.

---

## 🔒 Authentication

* JWT token stored in HTTP-only cookies.
* Frontend must send cookies with `credentials: true` when calling protected routes.

---

## 💰 Payment

* Supports **Cash** and **SSLCommerz**.
* Frontend handles redirect to `/payBill/:bookingId` for SSLCommerz.

---

## ⚠️ Notes

* Ensure CORS is configured: `CORS_ORIGIN=http://localhost:5173`.
* All admin-only actions require user role `admin`.
* Agency login requires `isAgent === "yes"`.

---
