import Navbar from "./components/Navbar"
import FilterCall from "./components/FilterCall"
import { TaskProvider } from "./context/TaskContext"
import CardCall from "./components/CardCall"



function App() {
  

  return (
    <>
      <Navbar/>
      <TaskProvider><FilterCall/></TaskProvider>
      <CardCall/>
      
    </>
  )
}

export default App
