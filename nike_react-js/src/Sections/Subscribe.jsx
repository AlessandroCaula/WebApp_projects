import Button from "../components/Button"

const Subscribe = () => {
  return (
    <section id="contact-us" className='max-container flex justify-between items-center max-lg:flex-col gap-10 border'>
      <h3 className="font-palanquin font-bold text-3xl leading-[68px] lg:max-w-md border">
        Sign Up for
        <span className="text-coral-red"> Updates </span>
        & Newsletter
      </h3>
      {/* max-sm: => apply the style to screen smaller than the sm breackpoint (640px by default) */}
      {/* On large devices is going to take the 40% of the screen width */}
      <div className='lg:max-w-[40%] w-full flex items-center max-sm:flex-col gap-5 p-2.5 sm:border sm:border-slate-gray rounded-full border'>
        {/* Input for the mail for the newsletter */}
        <input type='text' placeholder='subscribe@nike.com' className='input' />
        <div className='flex max-sm:justify-end items-center max-sm:w-full border'>
          {/* fullWidth will be passed only then the div containing it is w-full */}
          <Button label="Sign up" fullWidth />
        </div>
      </div>
    </section>
  )
}

export default Subscribe