import { Viaje } from "../model/Viaje.js";
import { Testimonial } from "../model/Testimoniales.js";

const paginaInicio =async (req,res)=>{

    //consultar 3 viajes l modelo viaje

    const promiseDB = []

    promiseDB.push(Viaje.findAll({limit:3}));
    promiseDB.push(Testimonial.findAll({limit:3}));
    try {
       const resultado = await Promise.all(promiseDB);
       const [viajes, testimoniales] = resultado;
        
        res.render('inicio',{
            pagina: 'Inicio',
            clase:'home',
            viajes,
            testimoniales
        });
    } catch (error) {
        console.log(error)
    }
    
   
}



const paginaNosotros = (req,res)=>{
    res.render('nosotros',{
        pagina: 'Nosotros'
    });
    
}



const paginaViajes = async (req,res)=>{
//consultar base de datos
const viajes = await Viaje.findAll();



    res.render('viajes',{
        pagina: 'Proximos viajes',
        viajes
    });
}


const paginaTestimoniales = async (req,res)=>{

    try { 
        const testimoniales = await Testimonial.findAll();

        res.render('testimoniales',{
            pagina: 'Testimoniales',
            testimoniales
        });
        
    } catch (error) {
        console.log(error)
    }
    
}

//muestra un viaje por su slug
const paginaDetalleViaje = async (req,res)=>{

    const { slug } = req.params;

    try {
        const resultado = await Viaje.findOne({where: { slug: slug}});

     res.render('viaje',{
    pagina:'Informacion Viaje',
    resultado

       })
    } catch (error) {
        console.log(error);
    }

}


export {
    paginaInicio,
    paginaNosotros,
    paginaViajes,
    paginaTestimoniales,
    paginaDetalleViaje  
};