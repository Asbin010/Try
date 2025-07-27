const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:3000',
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Contact form specific rate limiting
const contactLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 5 // limit each IP to 5 contact form submissions per hour
});

// Body parsing middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// MongoDB connection
const connectDB = async () => {
  try {
    if (process.env.MONGODB_URI) {
      await mongoose.connect(process.env.MONGODB_URI);
      console.log('🍃 MongoDB connected successfully');
    } else {
      console.log('⚠️  MongoDB URI not provided, running without database');
    }
  } catch (error) {
    console.error('❌ MongoDB connection error:', error.message);
  }
};

// Contact form schema
const contactSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
  },
  message: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000
  },
  submittedAt: {
    type: Date,
    default: Date.now
  },
  ipAddress: String
});

const Contact = mongoose.model('Contact', contactSchema);

// Admin user schema (simple authentication)
const adminSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

const Admin = mongoose.model('Admin', adminSchema);

// Email utility function
const sendEmail = async (contactData) => {
  try {
    const nodemailer = require('nodemailer');
    
    if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
      console.log('📧 Email not configured, logging contact form data:', contactData);
      return { success: true, message: 'Contact logged (email not configured)' };
    }

    const transporter = nodemailer.createTransporter({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT || 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER,
      to: process.env.EMAIL_TO || process.env.EMAIL_USER,
      subject: `New Contact Form Submission from ${contactData.name}`,
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h2 style="color: #00ff88; background: #0a0a0a; padding: 20px; margin: 0;">
            🔐 New Portfolio Contact
          </h2>
          <div style="padding: 20px; background: #1a1a1a; color: #ffffff;">
            <p><strong>Name:</strong> ${contactData.name}</p>
            <p><strong>Email:</strong> ${contactData.email}</p>
            <p><strong>Message:</strong></p>
            <div style="background: #2a2a2a; padding: 15px; border-left: 4px solid #00ff88; margin: 10px 0;">
              ${contactData.message.replace(/\n/g, '<br>')}
            </div>
            <p style="color: #888; font-size: 12px;">
              Submitted at: ${new Date().toLocaleString()}
            </p>
          </div>
        </div>
      `
    };

    await transporter.sendMail(mailOptions);
    return { success: true, message: 'Email sent successfully' };
  } catch (error) {
    console.error('Email sending error:', error);
    return { success: false, message: 'Email sending failed' };
  }
};

// Routes

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'OK', 
    message: '🚀 Cyber Portfolio API is running',
    timestamp: new Date().toISOString(),
    environment: process.env.NODE_ENV || 'development'
  });
});

// Contact form submission
app.post('/api/contact', contactLimiter, async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validation
    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'All fields are required'
      });
    }

    if (name.length > 100) {
      return res.status(400).json({
        success: false,
        message: 'Name must be less than 100 characters'
      });
    }

    if (message.length > 1000) {
      return res.status(400).json({
        success: false,
        message: 'Message must be less than 1000 characters'
      });
    }

    const emailRegex = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message: 'Please enter a valid email address'
      });
    }

    const contactData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      message: message.trim(),
      ipAddress: req.ip || req.connection.remoteAddress
    };

    // Save to database if available
    if (mongoose.connection.readyState === 1) {
      const contact = new Contact(contactData);
      await contact.save();
      console.log('💾 Contact saved to database:', contact._id);
    }

    // Send email
    const emailResult = await sendEmail(contactData);
    
    res.status(200).json({
      success: true,
      message: 'Message sent successfully! I\'ll get back to you soon.',
      emailSent: emailResult.success
    });

  } catch (error) {
    console.error('Contact form error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error. Please try again later.'
    });
  }
});

// Admin login (simple implementation)
app.post('/api/admin/login', async (req, res) => {
  try {
    const { username, password } = req.body;
    
    // Simple hardcoded admin check (in production, use proper authentication)
    const adminUsername = process.env.ADMIN_USERNAME || 'admin';
    const adminPassword = process.env.ADMIN_PASSWORD || 'cyber123';
    
    if (username === adminUsername && password === adminPassword) {
      const jwt = require('jsonwebtoken');
      const token = jwt.sign(
        { username, role: 'admin' },
        process.env.JWT_SECRET || 'cyber-portfolio-secret',
        { expiresIn: '24h' }
      );
      
      res.json({
        success: true,
        message: 'Login successful',
        token
      });
    } else {
      res.status(401).json({
        success: false,
        message: 'Invalid credentials'
      });
    }
  } catch (error) {
    console.error('Admin login error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Get contact submissions (admin only)
app.get('/api/admin/contacts', async (req, res) => {
  try {
    // Simple token verification
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) {
      return res.status(401).json({ success: false, message: 'No token provided' });
    }

    const jwt = require('jsonwebtoken');
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'cyber-portfolio-secret');
    
    if (decoded.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    if (mongoose.connection.readyState === 1) {
      const contacts = await Contact.find()
        .sort({ submittedAt: -1 })
        .limit(100);
      
      res.json({
        success: true,
        contacts,
        total: contacts.length
      });
    } else {
      res.json({
        success: true,
        contacts: [],
        message: 'Database not connected'
      });
    }
  } catch (error) {
    console.error('Admin contacts error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error'
    });
  }
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

// Start server
const startServer = async () => {
  await connectDB();
  
  app.listen(PORT, () => {
    console.log(`
    🌐 Server running on port ${PORT}
    🔗 API: http://localhost:${PORT}/api
    🔒 Environment: ${process.env.NODE_ENV || 'development'}
    `);
  });
};

startServer();