require('dotenv').config();
console.log(process.env.DB_URL);
const express = require('express');
const mongoose = require('mongoose');
const userRoutes = require('./api/routes/userRoutes');
const User = require('./api/models/userModel');

const app = express();
const port = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', 'views');

app.use(express.json());
app.use(express.static('public'));


mongoose.connect(process.env.DB_URL)
  .then(() => console.log('Conectando a MongoDB...'))
  .catch(err => console.error('No se pudo conectar a MongoDB...', err));

// Ruta raíz
// app.get('/', (req, res) => {
//   res.render('index');
// })
app.get('/', async (req, res) => {
  try {
    const users = await User.find(); 
    res.render('index', { users }); 
  } catch (error) {
    console.error('Error al recuperar usuarios:', error);
    res.status(500).send('Error al recuperar usuarios');
  }
});

// Rutas de usuario
app.use('/users', userRoutes);


app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
