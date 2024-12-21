import { Testimonial } from "../model/Testimoniales.js";

const guardarTestimonial = async (req,res)=>{
  

    //Vaalidar...
    const {nombre,correo,mensaje} = req.body
    const errores = [];
    
    if(nombre.trim() === ''){
       errores.push({mensaje:'El nombre esta vacio'})
    }
    if(correo.trim() === ''){
      errores.push({mensaje:'El Correo esta Vacio'})
    }
    if(mensaje.trim() === ''){
      errores.push({mensaje:'El Mensaje esta Vacio'})
    }


    if(errores.length > 0){

      //consultar testimoniales existentes
      const testimoniales = await Testimonial.findAll();

        //mostrar vista con errores
        res.render('testimoniales',{
            pagina:'Testimoniales',
            errores,
            nombre,
            correo,
            mensaje,
            testimoniales 

        })
        } else{

          //Almacenarlo en la base de datos
          try {
            await Testimonial.create({
              nombre,
              correo,
              mensaje
            });

            res.redirect('/testimoniales')
          } catch (error) {
            console.log(error);
          }
    }

  }







export {
    guardarTestimonial
}