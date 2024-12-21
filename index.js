import express from 'express';
import dotenv from 'dotenv';
import router from './routes/index.js';
import db from './config/db.js';
dotenv.config()




const app = express();


//Conectar la base de datos
db.authenticate()
  .then(()=>console.log('Base de datos conectada'))
  .catch( error => console.log('Error al conectar la base de datos', error))

const port = process.env.PORT || 4000 ;

//habilitar PUG
app.set('view engine', 'pug');

//Obtener año actual
app.use((req,res,next)=>{
    
  const year = new Date();
   
  res.locals.actualYear = year.getFullYear();
  res.locals.nombreSitio = "Agencia de Viajes"

    return next();
})

//Agregar body parser para leer los datos del formulario
app.use(express.urlencoded({extended:true}))

//definir la carpeta publica
app.use(express.static('public'));

//Agregar router
app.use('/',router);


app.listen(port,()=>{
    console.log(`Servidor iniciado en el puerto ${port}`);
})