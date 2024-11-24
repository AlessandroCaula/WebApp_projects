import { services } from "../constants"
import ServicesCard from "../components/ServicesCard"

// This section will contain 3 repeated component.
const Services = () => {
  return (
    // Wrapping the text if on small screen. 
    // gap => space between the elements. 
    <section className="max-container flex justify-center flex-wrap gap-9 border border-blue-400">
      {/* Mapping through the services and immediately return the self closing ServicesCard component */}
      {services.map((service) => (
        <ServicesCard key={service.label} {...service}/>
      ))}
    </section>
  )
}

export default Services