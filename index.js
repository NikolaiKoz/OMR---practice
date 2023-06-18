const express = require('express');
const MyModel = require('./model');
const bodyParser = require('body-parser');
const sequelize = require('./database'); // Reemplaza './database' con la ruta correcta a tu archivo database.js
// Sincroniza los modelos con la base de datos
// sequelize.sync({ force: true }) // Esto eliminará y recreará las tablas en cada ejecución. Ten cuidado con los datos existentes.
//   .then(() => {
//     console.log('Base de datos creada correctamente');
//   })
//   .catch(error => {
//     console.error('Error al crear la base de datos:', error);
//   });

const app = express();

// Configurar el middleware para analizar el cuerpo de la solicitud como JSON
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
//------------------------------


//-----------------------------

// Ruta para enviar el formulario
app.get('/', (req, res) => {
  res.status(200).send(`
    <form action="/api/v1/respuesta" method="post">
      <input type="text" name="value" id="value">
      <label for="value">Ingrese algo</label>
      <input type="submit" value="Enviar">
    </form>
  `);
});

// Ruta para procesar los datos del formulario
app.post('/api/v1/respuesta', (req, res, next) => {
  const value = req.body.value;
  console.log(`aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa${value}`)

  // Crear un registro en la base de datos utilizando el modelo definido por Sequelize
  MyModel.create({ value })
    .then(() => {
      console.log('Valor guardado en la base de datos:', value);
      res.status(200).send(`El valor enviado es: ${value}`);
    })
    .catch(error => {
      console.error('Error al guardar el valor en la base de datos:', error);
      res.status(500).send('Error al procesar la solicitud');
    });
});

app.use((req, res, next) => {
  console.log('Datos de la solicitud:', req.body);
  next();
});

app.get('/api/v1/data', (req, res) => {
    // Obtén todos los registros de la base de datos utilizando el modelo definido por Sequelize
    MyModel.findAll()
      .then(data => {
        res.status(200).json(data);
      })
      .catch(error => {
        console.error('Error al obtener los datos de la base de datos:', error);
        res.status(500).send('Error al procesar la solicitud');
      });
  });



// Iniciar el servidor
app.listen(3000, () => {
  console.log('Servidor en ejecución en el puerto 3000');
});
