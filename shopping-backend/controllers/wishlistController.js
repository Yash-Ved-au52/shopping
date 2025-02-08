const Wishlist = require('../models/Wishlist');

// @desc    Get Wishlist
// @route   GET /api/wishlist
// @access  Private
exports.getWishlist = async (req, res) => {
    try {
        const wishlist = await Wishlist.findOne({ userId: req.user.id }).populate('products');
        res.status(200).json(wishlist || { userId: req.user.id, products: [] });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// @desc    Add to Wishlist
// @route   POST /api/wishlist
// @access  Private
exports.addToWishlist = async (req, res) => {
    try {
        const { productId } = req.body;
        let wishlist = await Wishlist.findOne({ userId: req.user.id });

        if (!wishlist) {
            wishlist = new Wishlist({ userId: req.user.id, products: [productId] });
        } else {
            if (!wishlist.products.includes(productId)) wishlist.products.push(productId);
        }

        await wishlist.save();
        res.status(200).json({ message: 'Added to wishlist', wishlist });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};

// @desc    Remove from Wishlist
// @route   DELETE /api/wishlist/:productId
// @access  Private
exports.removeFromWishlist = async (req, res) => {
    try {
        let wishlist = await Wishlist.findOne({ userId: req.user.id });
        if (!wishlist) return res.status(404).json({ message: 'Wishlist not found' });

        wishlist.products = wishlist.products.filter(product => product.toString() !== req.params.productId);
        await wishlist.save();

        res.status(200).json({ message: 'Removed from wishlist', wishlist });
    } catch (error) {
        res.status(500).json({ message: 'Server Error', error });
    }
};
