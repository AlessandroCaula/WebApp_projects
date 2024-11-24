import { services } from "../constants"

// This section will contain 3 repeated component.
const Services = () => {
  return (
    // Wrapping the text if on small screen. 
    // gap => space between the elements. 
    <section className="max-container flex justify-center flex-wrap gap-9 border">
      {/* Mapping through the services and immediately return the self closing ServicesCard component */}
      {services.map((service) => (
        <ServicesCard key={service.label} {...service}/>
      ))}
    </section>
  )
}

export default Services