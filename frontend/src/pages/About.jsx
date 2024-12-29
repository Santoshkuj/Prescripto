import {assets} from '../assets/assets_frontend/assets'
const About = () => {
  return (
    <div>
      <div className='text-center text-2xl pt-10 text-gray-500'>
        <p>ABOUT <span className='text-gray-700 font-medium'>US</span></p>
      </div>
      <div className='my-10 flex flex-col justify-center md:flex-row gap-12'>
        <img className='w-full md:max-w-[360px]' src={assets.about_image} alt="about" />
      <div className='flex flex-col justify-center gap-6 md:w-2/4 text-sm text-gray-600'>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptas voluptatum autem aliquam minus sit!</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Repudiandae pariatur similique harum laboriosam nesciunt? sit amet consectetur</p>
        <b className='text-gray-800'>Our Vision</b>
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Officia, magnam!</p>
      </div>
      </div>
      <div>
        <p className='text-xl my-4'>WHY <span className='text-gray-700 font-medium'>CHOOSE US</span></p>
      </div>
      <div className='flex flex-col md:flex-row mb-20'>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Efficiency:</b>
          <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus, fugiat.</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Convenience:</b>
          <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Rerum!</p>
        </div>
        <div className='border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-primary hover:text-white transition-all duration-300 text-gray-600 cursor-pointer'>
          <b>Personalisation:</b>
          <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Iure, aliquam natus.</p>
        </div>
      </div>
    </div>
  )
}
export default About