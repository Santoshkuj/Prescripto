import { assets } from "../assets/assets_frontend/assets"

const Footer = () => {
  return (
    <div className="md:mx-10">
        <div className="flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm">
            <div>
                <img className="mb-5 w-40" src={assets.logo} alt="logo" />
                <p className="w-full md:w-2/3 text-gray-600 leading-6">Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum pariatur enim dolorum quas quo magni omnis? Modi adipisci earum corporis culpa consequatur inventore in.</p>
            </div>

            <div>
                <p className="text-xl font-medium mb-5">COMPANY</p>
                <ul className="flex flex-col text-gray-600 gap-2">
                    <li>Home</li>
                    <li>About us</li>
                    <li>Contact us</li>
                    <li>Privecy policy</li>
                </ul>
            </div>

            <div>
                <p className="text-xl font-medium mb-5">GET IN TOUCH</p>
                <ul className="flex flex-col text-gray-600 gap-2">
                    <li>+1-212-463-8372</li>
                    <li>prescripto@gmail.com</li>
                </ul>
            </div>
        </div>
        <div>
            <hr />
            <p className="py-5 text-sm text-center">Copyright &copy; {new Date().getFullYear()} Prescripto - All Rights Reserved.</p>
        </div>
    </div>
  )
}
export default Footer