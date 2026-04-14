const express = require('express');
const { detectAIText } = require('ai-text-detector');

const app = express();
const PORT = 3000;

// Middleware untuk parsing form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('.'));

// Route untuk analisis teks
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.post('/detect', (req, res) => {
    const { text } = req.body;
    
    if (!text || text.trim().length < 50) {
        return res.json({
            error: true,
            message: 'Teks minimal 50 karakter untuk analisis yang reliable'
        });
    }
    
    try {
        const result = detectAIText(text);
        res.json({
            error: false,
            isAIGenerated: result.isAIGenerated,
            confidence: (result.confidence * 100).toFixed(1),
            reasons: result.reasons,
            score: result.score
        });
    } catch (error) {
        res.json({
            error: true,
            message: error.message
        });
    }
});

app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
});