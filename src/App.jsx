import Header from "./components/Header"
import Formulario from "./components/Formulario"
import ListadoPacientes from "./components/ListadoPacientes"
import { useState, useEffect } from "react"

function App() {

  const [pacientes, setPacientes] = useState(JSON.parse(localStorage.getItem('pacientes')) ?? []); //Lista de pacientes (creados en el formulario)
  const [paciente, setPaciente] = useState({});   //Un paciente en particular (objeto) 


  //Cuando haya cambios en pacientes ejecuta esto: (GUARDA TODO EN EL STORAGE)
  useEffect(()=>{ 
    localStorage.setItem('pacientes',JSON.stringify(pacientes));
  },[pacientes])

  const eliminarPaciente = id =>{
    //Traeme a pacientes actualizados todos los id q sean distintos a los que tengo en paciente
    const PacientesActualizados = pacientes.filter( paciente => paciente.id != id)
    setPacientes(PacientesActualizados);
  }
  return (
    <div className="container mx-auto mt-20">
    <Header/>
    <div className="mt-12 md:flex">
      <Formulario
      pacientes = {pacientes}
      setPacientes = {setPacientes}
      paciente={paciente}
      setPaciente={setPaciente}
      />
      <ListadoPacientes
      pacientes={pacientes}
      setPaciente={setPaciente}
      eliminarPaciente={eliminarPaciente}
      />
    </div>
    </div>
  )
}

export default App
