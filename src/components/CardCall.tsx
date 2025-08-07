
import Cards from "./Cards"

export default function CardCall() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 p-4">
      <Cards title="Sample Title" priority="High" category="Frontend" 
      assignedTo="User" DueDate="Today" assignedOn='Doreen'/>
      <Cards title="Sample Title" priority="High" category="Frontend" assignedTo="User" DueDate="Today" assignedOn='Doreen'/>
      <Cards title="Sample Title" priority="High" category="Frontend" assignedTo="User" DueDate="Today" assignedOn='Doreen'/>
      <Cards title="Sample Title" priority="High" category="Frontend" assignedTo="User" DueDate="Today" assignedOn='Doreen'/>
      <Cards title="Sample Title" priority="High" category="Frontend" assignedTo="User" DueDate="Today" assignedOn='Doreen'/>
    </div>
  )
}
