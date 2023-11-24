const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const quizRoutes = require('./routes/quiz');
const PORT = process.env.PORT || 5000;


app.use(express.json());
app.use(cors());
app.use('/api/auth', authRoutes);
app.use('/api/quiz', quizRoutes);

mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));


app.listen(PORT, () => {
    console.log('Server started on port '+PORT);
});