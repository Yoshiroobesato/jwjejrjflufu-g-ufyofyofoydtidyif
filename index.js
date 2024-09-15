const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// La URL del archivo JSON
const url = 'https://futbollibrehd.pe/agenda.json';

// Middleware para manejar errores
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Algo salió mal!');
});

// Endpoint para obtener el JSON filtrado
app.get('/api/agenda', async (req, res) => {
  try {
    // Obtener el contenido del archivo JSON
    const response = await axios.get(url);
    const data = response.data;

    // Comprobar si 'data' existe y es un array
    if (data && Array.isArray(data.data)) {
      // Filtrar los datos
      const filteredData = data.data.map(item => ({
        id: item.id || null,
        attributes: {
          diary_hour: item.attributes ? item.attributes.diary_hour || null : null,
          diary_description: item.attributes ? item.attributes.diary_description || null : null,
          date_diary: item.attributes ? item.attributes.date_diary || null : null
        }
      }));

      // Enviar el contenido filtrado en formato JSON avanzado
      res.json(filteredData);
    } else {
      res.status(400).send("La estructura del JSON no es válida o no contiene el campo 'data'.");
    }
  } catch (error) {
    res.status(500).send("Error al obtener el contenido: " + error.message);
  }
});

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
