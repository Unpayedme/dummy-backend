import express from "express";
import cors from "cors";
import routes from "@/routes";
import passport from "passport";
import { initializePassport } from "@/services/auth/passport";
import cookieParser from "cookie-parser";
import businessRoutes from './routes/businessRoutes';
import discussionRoutes from '@/routes/discussionRoutes';
import favoriteRoutes from '@/routes/favoriteRoutes';
import adminRoutes from '@/routes/adminRoutes';

export const app = express();


const allowedOrigins = [
  'http://localhost:3000',
  'https://dummy-frontend-plum.vercel.app/home',
  'https://your-custom-domain.com'
];

app.use(cors({
  origin: [
    'http://localhost:3000',                      // Local frontend
    'https://dummy-frontend-plum.vercel.app/home',       // Your Vercel frontend link
    'https://your-custom-domain.com'              // Any other domains
  ],
  credentials: true,
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ extended: true, limit: '50mb' }));
app.use(cookieParser());

app.use('/api/businesses', businessRoutes);
app.use('/api/discussions', discussionRoutes);
app.use('/api/favorites', favoriteRoutes);
app.use('/api/admin', adminRoutes);

initializePassport();
app.use(passport.initialize());

app.use("/api", routes);