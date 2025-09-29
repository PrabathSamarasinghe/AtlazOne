-- Complete Database Schema for InnovateLab
-- Updated with all missing columns from API routes

-- Blog Posts
CREATE TABLE blog_posts (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    excerpt TEXT,
    image TEXT,
    author TEXT,
    date DATE,
    category TEXT,
    read_time TEXT,
    status TEXT DEFAULT 'draft', -- Added: draft, published, archived
    content TEXT -- Added: full blog post content
);

-- Projects  
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    category TEXT,
    image TEXT,
    description TEXT,
    tech TEXT[], -- Array of technologies
    link TEXT,
    github TEXT,
    status TEXT DEFAULT 'planning', -- Added: planning, in-progress, completed
    client TEXT, -- Added: client name
    start_date DATE, -- Added: project start date
    end_date DATE -- Added: project end date (nullable)
);

-- Services
CREATE TABLE services (
    id SERIAL PRIMARY KEY,
    icon TEXT,
    title TEXT NOT NULL,
    description TEXT,
    color TEXT,
    price DECIMAL(10,2), -- Added: service price
    features TEXT[], -- Added: array of service features
    isactive BOOLEAN DEFAULT true -- Added: whether service is active
);

-- Team
CREATE TABLE team (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT,
    image TEXT,
    bio TEXT,
    linkedin TEXT,
    twitter TEXT,
    github TEXT
);

-- Testimonials
CREATE TABLE testimonials (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    role TEXT,
    image TEXT,
    content TEXT,
    rating INT CHECK (rating >= 1 AND rating <= 5)
);

-- Insert Sample Data
INSERT INTO blog_posts (title, excerpt, image, author, date, category, read_time, status, content) VALUES
('The Future of AI in Web Development', 'Exploring how artificial intelligence is revolutionizing the way we build and interact with web applications.', 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg', 'Sarah Chen', '2024-01-15', 'AI & Technology', '5 min read', 'published', 'Full content of the AI in Web Development article...'),
('Building Scalable Mobile Apps in 2024', 'Best practices and modern approaches for developing mobile applications that can handle millions of users.', 'https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg', 'Marcus Johnson', '2024-01-10', 'Mobile Development', '7 min read', 'published', 'Full content of the scalable mobile apps article...'),
('Cybersecurity Trends Every Startup Should Know', 'Essential security measures and emerging threats that modern startups need to address in their digital infrastructure.', 'https://images.pexels.com/photos/60504/security-protection-anti-virus-software-60504.jpeg', 'Alex Rodriguez', '2024-01-05', 'Security', '6 min read', 'published', 'Full content of the cybersecurity trends article...'),
('Next.js 14: Performance Optimization Tips', 'Learn the latest techniques to supercharge your Next.js applications for maximum performance.', 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg', 'Emily Davis', '2024-01-20', 'Web Development', '8 min read', 'draft', 'Full content of the Next.js optimization article...'),
('Machine Learning in Healthcare', 'How ML is transforming patient care and medical diagnostics in modern healthcare systems.', 'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg', 'Dr. Michael Zhang', '2024-01-12', 'AI & Technology', '6 min read', 'published', 'Full content of the ML in healthcare article...');

INSERT INTO projects (title, category, image, description, tech, link, github, status, client, start_date, end_date) VALUES
('E-Commerce Platform', 'Web Development', 'https://images.pexels.com/photos/230544/pexels-photo-230544.jpeg', 'A modern e-commerce platform with AI-powered recommendations and seamless checkout experience.', ARRAY['Next.js','TypeScript','Stripe','AI'], '#', '#', 'planning', NULL, NULL, NULL),
('FinTech Mobile App', 'Mobile Development', 'https://images.pexels.com/photos/159888/pexels-photo-159888.jpeg', 'Revolutionary financial app with real-time analytics and secure blockchain transactions.', ARRAY['React Native','Blockchain','Node.js'], '#', '#', 'completed', 'FinanceHub Ltd', '2024-01-01', '2024-03-15'),
('Healthcare Dashboard', 'UI/UX Design', 'https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg', 'Comprehensive healthcare management system with patient tracking and analytics.', ARRAY['React','D3.js','Python','AI'], '#', '#', 'completed', 'MedTech Solutions', '2023-11-01', '2024-02-28'),
('Smart IoT Platform', 'IoT Solutions', 'https://images.pexels.com/photos/442150/pexels-photo-442150.jpeg', 'IoT management platform for smart cities with real-time monitoring and control.', ARRAY['Node.js','IoT','MongoDB','WebSocket'], '#', '#', 'planning', NULL, NULL, NULL),
('AI Content Generator', 'AI/ML', 'https://images.pexels.com/photos/8386434/pexels-photo-8386434.jpeg', 'Advanced AI platform for generating high-quality content across multiple formats.', ARRAY['Python','TensorFlow','React','FastAPI'], '#', '#', 'in-progress', 'ContentTech Inc', '2024-02-01', NULL),
('Social Media Analytics', 'Data Science', 'https://images.pexels.com/photos/267350/pexels-photo-267350.jpeg', 'Comprehensive social media analytics platform with sentiment analysis and insights.', ARRAY['Python','React','PostgreSQL','ML'], '#', '#', 'in-progress', 'SocialMetrics Co', '2024-01-15', NULL),
('Enterprise CRM System', 'Web Development', 'https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg', 'Custom CRM solution with advanced reporting and customer management features.', ARRAY['Vue.js','Laravel','MySQL','Docker'], '#', '#', 'completed', 'BusinessPro Ltd', '2023-10-01', '2024-01-30'),
('Mobile Banking App', 'Mobile Development', 'https://images.pexels.com/photos/4386321/pexels-photo-4386321.jpeg', 'Secure mobile banking application with biometric authentication and real-time transactions.', ARRAY['Flutter','Firebase','Node.js','PostgreSQL'], '#', '#', 'planning', 'SecureBank Corp', '2024-03-01', NULL);

INSERT INTO services (icon, title, description, color, price, features, isactive) VALUES
('Code', 'Web Development', 'Custom web applications built with cutting-edge technologies and modern frameworks.', '#3B82F6', 2500.00, ARRAY['Custom Design','Responsive Layout','SEO Optimization','Performance Tuning'], true),
('Smartphone', 'Mobile Apps', 'Native and cross-platform mobile applications that deliver exceptional user experiences.', '#3B82F6', 3500.00, ARRAY['iOS & Android','Cross-platform','App Store Deployment','Push Notifications'], true),
('Globe', 'Cloud Solutions', 'Scalable cloud infrastructure and deployment solutions for modern businesses.', '#3B82F6', 1800.00, ARRAY['AWS/Azure Setup','Auto Scaling','Load Balancing','Monitoring'], true),
('Zap', 'AI Integration', 'Intelligent automation and AI-powered features to transform your business processes.', '#3B82F6', 4500.00, ARRAY['Machine Learning','Natural Language Processing','Computer Vision','Predictive Analytics'], true),
('Shield', 'Security Audits', 'Comprehensive security assessments and implementation of best practices.', '#3B82F6', 1200.00, ARRAY['Vulnerability Assessment','Penetration Testing','Security Consulting','Compliance Check'], true),
('Headphones', '24/7 Support', 'Round-the-clock technical support and maintenance for all our solutions.', '#3B82F6', 800.00, ARRAY['24/7 Availability','Emergency Response','Regular Updates','Performance Monitoring'], true),
('Database', 'Database Design', 'Optimized database architecture and data management solutions.', '#3B82F6', 2000.00, ARRAY['Database Design','Query Optimization','Data Migration','Backup Solutions'], true),
('Users', 'Consulting', 'Strategic technology consulting to help your business make informed decisions.', '#3B82F6', 1500.00, ARRAY['Technology Strategy','Digital Transformation','Process Optimization','Training'], false);

INSERT INTO team (name, role, image, bio, linkedin, twitter, github) VALUES
('Alex Rodriguez', 'CEO & Founder', 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg', 'Visionary leader with 15+ years in tech innovation and startup growth.', 'https://linkedin.com/in/alex-rodriguez', 'https://twitter.com/alexrodriguez', 'https://github.com/alexrodriguez'),
('Sarah Chen', 'CTO', 'https://images.pexels.com/photos/3756681/pexels-photo-3756681.jpeg', 'Technical architect specializing in scalable systems and AI integration.', 'https://linkedin.com/in/sarah-chen', 'https://twitter.com/sarahchen', 'https://github.com/sarahchen'),
('Marcus Johnson', 'Lead Developer', 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg', 'Full-stack expert with expertise in modern web and mobile technologies.', 'https://linkedin.com/in/marcus-johnson', 'https://twitter.com/marcusjohnson', 'https://github.com/marcusjohnson'),
('Emily Davis', 'UX/UI Designer', 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg', 'Creative designer focused on user-centered design and brand experiences.', 'https://linkedin.com/in/emily-davis', 'https://twitter.com/emilydavis', 'https://github.com/emilydavis'),
('David Kumar', 'DevOps Engineer', 'https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg', 'Infrastructure specialist ensuring seamless deployment and system reliability.', 'https://linkedin.com/in/david-kumar', 'https://twitter.com/davidkumar', 'https://github.com/davidkumar'),
('Lisa Thompson', 'Data Scientist', 'https://images.pexels.com/photos/3756689/pexels-photo-3756689.jpeg', 'ML expert turning complex data into actionable business insights.', 'https://linkedin.com/in/lisa-thompson', 'https://twitter.com/lisathompson', 'https://github.com/lisathompson');

INSERT INTO testimonials (name, role, image, content, rating) VALUES
('Jennifer Walsh', 'CEO, TechCorp', 'https://images.pexels.com/photos/3756679/pexels-photo-3756679.jpeg', 'InnovateLab transformed our digital presence completely. Their innovative approach and attention to detail exceeded all our expectations.', 5),
('Michael Zhang', 'Founder, StartupXYZ', 'https://images.pexels.com/photos/3785077/pexels-photo-3785077.jpeg', 'The team delivered a cutting-edge mobile app that revolutionized our customer engagement. Truly exceptional work and support.', 5),
('Lisa Thompson', 'CTO, DataFlow Inc', 'https://images.pexels.com/photos/3756681/pexels-photo-3756681.jpeg', 'Working with InnovateLab was a game-changer. They brought our complex AI vision to life with remarkable precision and creativity.', 5),
('David Kumar', 'Director, FinanceHub', 'https://images.pexels.com/photos/2379004/pexels-photo-2379004.jpeg', 'Outstanding development team that understands both technical excellence and business needs. Highly recommended for any project.', 5),
('Amanda Rodriguez', 'Product Manager, CloudTech', 'https://images.pexels.com/photos/3756690/pexels-photo-3756690.jpeg', 'InnovateLab delivered our cloud migration project on time and under budget. Their expertise in modern technologies is unmatched.', 4),
('James Wilson', 'VP Engineering, MedTech Solutions', 'https://images.pexels.com/photos/3777931/pexels-photo-3777931.jpeg', 'The healthcare dashboard they built for us has improved our patient management efficiency by 300%. Incredible results!', 5),
('Sophie Martinez', 'Marketing Director, RetailPro', 'https://images.pexels.com/photos/3756688/pexels-photo-3756688.jpeg', 'Their e-commerce solution helped us increase online sales by 250% in the first quarter. Amazing ROI and user experience.', 5),
('Robert Chen', 'CTO, FinanceSecure', 'https://images.pexels.com/photos/3785079/pexels-photo-3785079.jpeg', 'Security was our top priority, and InnovateLab delivered a bulletproof solution. Their attention to security details is exceptional.', 5);

-- Create indexes for better performance
CREATE INDEX idx_projects_status ON projects(status);
CREATE INDEX idx_projects_client ON projects(client);
CREATE INDEX idx_projects_start_date ON projects(start_date);
CREATE INDEX idx_blog_posts_status ON blog_posts(status);
CREATE INDEX idx_blog_posts_category ON blog_posts(category);
CREATE INDEX idx_blog_posts_date ON blog_posts(date);
CREATE INDEX idx_services_isactive ON services(isactive);
CREATE INDEX idx_testimonials_rating ON testimonials(rating);