# Festa World

A social media API built with NestJS, featuring user authentication, tweet management, timeline feeds, and social interactions.

## 🌟 Features

### Authentication
* Firebase-based authentication system
* User registration and login
* JWT token-based authorization
* Secure password handling

### Social Features
* Tweet creation and management
* Timeline feed generation
* Follow/Unfollow functionality
* Like system for tweets
* Retweet capability

### Technical Features
* Global exception handling
* Response transformation
* Swagger API documentation
* TypeORM integration with PostgreSQL
* Firebase Admin SDK integration

## 🚀 Getting Started

### Prerequisites
* Node.js (v16 or higher)
* PostgreSQL
* Firebase project credentials
* Docker (optional)

### Environment Variables
Create a `.env` file in the root directory with the following variables:

```
DATABASE_URL=your_database_url
FIREBASE_PROJECT_ID=your_firebase_project_id
FIREBASE_PRIVATE_KEY=your_firebase_private_key
FIREBASE_CLIENT_EMAIL=your_firebase_client_email
PORT=3000
```

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/festa_world.git
cd festa_world
```

2. Install dependencies:
```bash
npm install
```

3. Start PostgreSQL database (using Docker):
```bash
docker-compose up -d
```

4. Run the application:
```bash
# Development
npm run start:dev

# Production
npm run start:prod
```

## 📚 API Documentation

Once the application is running, you can access the Swagger documentation at:
`http://localhost:3000/api`

### Key Endpoints

#### Auth
* `POST /auth/signup` - Register new user
* `POST /auth/login` - User login

#### Tweets
* `POST /tweet/create` - Create new tweet
* `GET /tweet/all` - Get all tweets

#### Timeline
* `GET /timeline/all` - Get user's timeline
  * Supports pagination

#### Follows
* `POST /follows/:followingId` - Follow a user
* `DELETE /follows/:followingId` - Unfollow a user

#### Likes
* `POST /like/:tweetId` - Like a tweet
* `GET /like` - Get all likes

## 🛠 Technical Architecture

### Database Schema
* Users
* Tweets
* Follows
* Likes

### Key Technologies
* NestJS v11
* TypeORM
* PostgreSQL
* Firebase Admin SDK
* Swagger/OpenAPI
* Jest for testing

## 🧪 Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## 🔒 Security Features
* JWT-based authentication
* Firebase authentication integration
* Request validation using class-validator
* Global exception handling
* CORS enabled

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
