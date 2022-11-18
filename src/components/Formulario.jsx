import {useState, useEffect} from 'react'
import Error from './Error';

//Declaracion de states para el formulario y el mensaje de error en caso de campo vacio
const Formulario = ({setPaciente,setPacientes, pacientes, paciente}) => {
  const [nombre, setNombre] = useState('');
  const [propietario, setPropietario] = useState('');
  const [email, setEmail] = useState('');
  const [fecha, setFecha] = useState('');
  const [sintomas, setSintomas] = useState('');
  const [error, setError] = useState(false);


  useEffect(() => {
    //Si mi paciente no esta vacio y cambia el mismo (editar) asigno en el formulario (inputs) los datos
   if(Object.keys(paciente).length > 0){
    setNombre(paciente.nombre);
    setPropietario(paciente.propietario);
    setEmail(paciente.email);
    setFecha(paciente.fecha);
    setSintomas(paciente.sintomas);
   }

  }, [paciente])
  
  

  //Genero un id para cada paciente
  const generarId = () =>{
    const random = Math.random().toString(36).substring(2);
    const fecha = Date.now().toString(36);

    return fecha+random;
  }

  //Cuando envio el formulario (añado un paciente)
  const handleSubmit = (e) =>{
    e.preventDefault();

    //Si no esta vacio ningun campo de los inputs
    if([ nombre, propietario, email, fecha, sintomas ].includes('')){
      console.log("Hay al menos un campo vacio");
    //Coloco el error

      setError(true);
      return;
    }
    //Si todos los campos estan correctos desactivo el error
    setError(false);
    
    //Objeto de Pacientes

    const objetoPaciente = {
      nombre,
      propietario,
      email,
      fecha,
      sintomas
    }

    if(paciente.id){
      //Editando el registro
      objetoPaciente.id = paciente.id;

      //Recorro los pacientes y devuelvo el objetoPaciente a editar o el que no estoy editando 
      //en el caso de que los id no coincidan (para no agregar pacientes)

      const pacientesActualizados = pacientes.map(pacienteState => pacienteState.id === 
        paciente.id ? objetoPaciente : pacienteState);

      setPacientes(pacientesActualizados);
      setPaciente({});

    }else{
      //Nuevo Registro
      objetoPaciente.id = generarId();
      setPacientes([...pacientes, objetoPaciente]);
    }


    //Reiniciar Formulario
    setNombre("");
    setPropietario("");
    setEmail("");
    setFecha("");
    setSintomas("");
  }

  return (
    <div className="md:w-1/2 lg:w-2/5 mx-5">
      <h2 className='font-black text-3xl text-center'>Seguimiento pacientes</h2>

      <p className='text-lg mt-5 text-center mb-10 font-black'>
        Añade Pacientes y {''}
        <span className='text-indigo-600 font-bold'>Administralos</span>
      </p>

      <form 
      onSubmit={handleSubmit}
      className='bg-white shadow-md rounded-lg py-10 px-5 mb-10'
      >
        {error && <Error><p>Todos los campos son obligatorios</p></Error>}

        <div className='mb-5'>
          <label htmlFor="mascota" className='block text-gray-700 uppercase font-bold'>
            Nombre Mascota
          </label>
          <input 
          id='mascota'
          type="text" 
          placeholder='Nombre de la Mascota' 
          className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
          />
        </div>
        
        <div className="mb-5">
          <label htmlFor="propietario" className='block text-gray-700 uppercase font-bold'>
            Nombre Propietario
          </label>
          <input 
          id='propietario'
          type="text" 
          placeholder='Nombre del Propietario' 
          className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
          value={propietario}
          onChange={(e) => setPropietario(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="email" className='block text-gray-700 uppercase font-bold'>
            Email
          </label>
          <input 
          id='email'
          type="email" 
          placeholder='Email Contacto Propietario' 
          className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="alta" className='block text-gray-700 uppercase font-bold'>
            Alta
          </label>
          <input 
          id='alta'
          type="date" 
          className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
          value={fecha}
          onChange={(e) => setFecha(e.target.value)}
          />
        </div>

        <div className="mb-5">
          <label htmlFor="sintomas" className='block text-gray-700 uppercase font-bold'>
            Síntomas
          </label>
          <textarea
            id='sintomas'
            className='border-2 w-full p-2 mt-2 placeholder-gray-400 rounded-md'
            placeholder='Describe los Síntomas'
            value={sintomas}
            onChange={(e) => setSintomas(e.target.value)}
          />
        </div>

        <input 
        type="submit" 
        className='bg-indigo-600 w-full p-3 text-white uppercase font-bold hover:bg-indigo-700 
        cursor-pointer transition-colors'
        value={ paciente.id ? "Editar Paciente" : "Agregar Paciente"}
        />
      </form>

    </div>
  )
}

export default Formulario