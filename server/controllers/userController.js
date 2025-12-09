import Blog from '../models/Blog.js';
import Comment from '../models/Comment.js';
import User from '../models/User.js';

// Get all blogs belonging to the logged-in user
export const getUserBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find({ user: req.user.userId }).sort({ createdAt: -1 });
        res.json({ success: true, blogs });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Get all comments for blogs belonging to the logged-in user
export const getAllComments = async (req, res) => {
    try {
        // First find all blogs belonging to the user
        const userBlogs = await Blog.find({ user: req.user.userId }).select('_id');
        const blogIds = userBlogs.map(blog => blog._id);

        // Then find all comments for those blogs
        const comments = await Comment.find({ blog: { $in: blogIds } })
            .populate("blog")
            .sort({ createdAt: -1 });

        res.json({ success: true, comments });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Get dashboard data for the logged-in user
export const getUserDashboard = async (req, res) => {
    try {
        // Get user's blogs
        const userBlogs = await Blog.find({ user: req.user.userId });
        const blogIds = userBlogs.map(blog => blog._id);

        // Get recent blogs
        const recentBlogs = await Blog.find({ user: req.user.userId })
            .sort({ createdAt: -1 })
            .limit(5);

        // Count stats
        const blogs = await Blog.countDocuments({ user: req.user.userId });
        const comments = await Comment.countDocuments({ blog: { $in: blogIds } });
        const drafts = await Blog.countDocuments({ user: req.user.userId, isPublished: false });

        const dashboardData = {
            blogs,
            comments,
            drafts,
            recentBlogs
        };

        res.json({ success: true, dashboardData });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Delete comment (only if it belongs to user's blog)
export const deleteCommentById = async (req, res) => {
    try {
        const { id } = req.body;

        // Find the comment and populate the blog
        const comment = await Comment.findById(id).populate('blog');
        if (!comment) {
            return res.json({ success: false, message: "Comment not found" });
        }

        // Verify the blog belongs to the user
        if (comment.blog.user.toString() !== req.user.userId) {
            return res.json({ success: false, message: "Unauthorized to delete this comment" });
        }

        await Comment.findByIdAndDelete(id);
        res.json({ success: true, message: "Comment deleted successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Approve comment (only if it belongs to user's blog)
export const approveCommentById = async (req, res) => {
    try {
        const { id } = req.body;

        // Find the comment and populate the blog
        const comment = await Comment.findById(id).populate('blog');
        if (!comment) {
            return res.json({ success: false, message: "Comment not found" });
        }

        // Verify the blog belongs to the user
        if (comment.blog.user.toString() !== req.user.userId) {
            return res.json({ success: false, message: "Unauthorized to approve this comment" });
        }

        await Comment.findByIdAndUpdate(id, { isApproved: true });
        res.json({ success: true, message: "Comment approved successfully" });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Get user profile
export const getUserProfile = async (req, res) => {
    try {
        const user = await User.findById(req.user.userId).select('-password');
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }
        res.json({ success: true, user });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// Update user profile (name, email, and/or profile photo)
export const updateUserProfile = async (req, res) => {
    try {
        const { name, email } = req.body;
        const userId = req.user.userId;

        // Find user
        const user = await User.findById(userId);
        if (!user) {
            return res.json({ success: false, message: "User not found" });
        }

        // Check if email is being changed and if it's already taken
        if (email && email !== user.email) {
            const existingUser = await User.findOne({ email });
            if (existingUser) {
                return res.json({ success: false, message: "Email already in use" });
            }
            user.email = email;
        }

        // Update name if provided
        if (name) {
            user.name = name;
        }

        // Handle profile photo upload if provided
        if (req.file) {
            const fs = await import('fs');
            const imagekit = (await import('../configs/imageKit.js')).default;

            const fileBuffer = fs.default.readFileSync(req.file.path);

            // Upload to ImageKit
            const response = await imagekit.upload({
                file: fileBuffer,
                fileName: req.file.originalname,
                folder: "/profile-photos"
            });

            // Optimize image URL
            const optimizedImageUrl = imagekit.url({
                path: response.filePath,
                transformation: [
                    { quality: 'auto' },
                    { format: 'webp' },
                    { width: '400', height: '400', crop: 'at_max' }
                ]
            });

            user.profilePhoto = optimizedImageUrl;
        }

        await user.save();

        // Return updated user without password
        const updatedUser = {
            id: user._id,
            name: user.name,
            email: user.email,
            profilePhoto: user.profilePhoto
        };

        res.json({ success: true, message: "Profile updated successfully", user: updatedUser });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

