const jwt = require('jsonwebtoken');
const { verifyMessage } = require('ethers');

exports.login = async (req, res) => {
  try {
    const { address, signature } = req.body;
    const message = "Login to Portfolio Admin Panel";

    // 1. Verify who signed it
    const signerAddress = verifyMessage(message, signature);

    // --- DEBUGGING LOGS (Check your terminal when you click login!) ---
    console.log("------------------------------------------------");
    console.log("Attempting Login...");
    console.log("1. Wallet Connecting: ", signerAddress);
    console.log("2. Allowed Admin:     ", process.env.ADMIN_WALLET_ADDRESS);
    console.log("------------------------------------------------");

    // 2. Check if they match (Case insensitive)
    if (signerAddress.toLowerCase() !== process.env.ADMIN_WALLET_ADDRESS.toLowerCase()) {
      return res.status(401).json({ error: "Unauthorized: Wallet address does not match Admin." });
    }

    // 3. Issue Token
    const token = jwt.sign({ role: 'admin', address }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({ token });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
};