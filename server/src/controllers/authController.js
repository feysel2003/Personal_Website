const jwt = require('jsonwebtoken');
const { verifyMessage } = require('ethers');

exports.login = async (req, res) => {
  try {
    const { address, signature } = req.body;
    
    // The message we expect the frontend to sign
    const message = "Login to Portfolio Admin Panel";

    // 1. Verify who signed the message
    const signerAddress = verifyMessage(message, signature);

    // 2. Check if the signer is YOU (The Admin)
    if (signerAddress.toLowerCase() !== process.env.ADMIN_WALLET_ADDRESS.toLowerCase()) {
      return res.status(401).json({ error: "Unauthorized: You are not the admin." });
    }

    // 3. Issue a Token
    const token = jwt.sign({ role: 'admin', address }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.json({ token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};