import mongoose from 'mongoose';
import 'dotenv/config';
import Blog from '../models/Blog.js';

const sampleBlogs = [
  {
    title: "A detailed step by step guide to manage your lifestyle",
    subTitle: "A Simple Step-by-Step Guide to Managing Your Lifestyle",
    description: "<h1>A Simple Step-by-Step Guide to Managing Your Lifestyle</h1><p>If you're looking to improve your health, boost productivity, and create a balanced life, managing your lifestyle intentionally is key. Here's a short guide to help you take control of your daily habits and overall well-being.</p><h2>1. Focus on Health</h2><p>Eat balanced meals, stay hydrated, get enough sleep, and move your body daily.</p><h2>2. Set Clear Goals</h2><p>Break your goals into categories like health, career, and relationships.</p><h2>3. Manage Time Wisely</h2><p>Prioritize important tasks, limit distractions, and take regular breaks.</p>",
    category: "Lifestyle",
    image: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1200&q=80",
    isPublished: true
  },
  {
    title: "How to create an effective startup roadmap or ideas",
    subTitle: "Creating an effective startup roadmap",
    description: "<h2>1. Start with the Problem, Not the Product</h2><p>Identify a real, painful problem that affects a significant audience.</p><h2>2. Define Your MVP</h2><p>Strip your idea down to the core functionality. Build only what is needed to solve the problem simply.</p><h2>3. Set Clear Milestones</h2><p>Break your journey into research, prototyping, launching, and iterating.</p>",
    category: "Startup",
    image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1200&q=80",
    isPublished: true
  },
  {
    title: "Learning new technology to boost your career in software",
    subTitle: "Learning New Tech to Boost Your Software Career",
    description: "<h1>Learning New Tech to Boost Your Software Career</h1><p>In tech, staying still means falling behind. Modern tools, frameworks, and continuous learning keep your skillset sharp and competitive in today's fast-moving software industry.</p><h2>How to Learn Smart</h2><ul><li>Pick technologies that align with your long-term goals</li><li>Build real-world production projects</li><li>Participate in developer communities</li></ul>",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=1200&q=80",
    isPublished: true
  },
  {
    title: "Tips for getting the most out of apps and software",
    subTitle: "Tips for Getting the Most Out of Apps and Software",
    description: "<h1>Tips for Getting the Most Out of Apps and Software</h1><p>We use dozens of digital tools every day, but mastering keyboard shortcuts, workflow automations, and cross-platform integrations unlocks a 10x productivity boost.</p>",
    category: "Technology",
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80",
    isPublished: true
  },
  {
    title: "Smart strategies for personal finance and investments",
    subTitle: "Mastering your money and budget in the modern era",
    description: "<h1>Smart Strategies for Personal Finance</h1><p>Building wealth is a marathon, not a sprint. Budgeting effectively, establishing an emergency fund, and investing regularly in index funds build true financial independence.</p>",
    category: "Finance",
    image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1200&q=80",
    isPublished: true
  }
];

const seedDB = async () => {
  try {
    const mongoUri = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
    await mongoose.connect(`${mongoUri}/quickblog`);
    console.log("Connected to MongoDB for seeding...");

    const existingCount = await Blog.countDocuments();
    if (existingCount > 0) {
      console.log(`Database already has ${existingCount} blogs. Skipping seed.`);
    } else {
      await Blog.insertMany(sampleBlogs);
      console.log(`Successfully seeded ${sampleBlogs.length} sample blog posts!`);
    }
  } catch (error) {
    console.error("Seeding error:", error.message);
  } finally {
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB.");
    process.exit(0);
  }
};

seedDB();
