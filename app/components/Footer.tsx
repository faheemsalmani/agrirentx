export default function Footer() {
    return (
        <footer className="bg-brand-950 text-white py-12 border-t border-brand-800" id="contact">
            <div className="max-w-7xl mx-auto px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
                    <div className="col-span-1 md:col-span-1">
                        <h3 className="text-2xl font-bold font-heading mb-4 text-white">
                            AgriRent<span className="text-brand-500">X</span>
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            India's premier agriculture equipment rental service. We bridge the gap between technology and the field.
                        </p>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4 text-gray-200">Quick Links</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li className="hover:text-white cursor-pointer">About Us</li>
                            <li className="hover:text-white cursor-pointer">Equipment Catalog</li>
                            <li className="hover:text-white cursor-pointer">Pricing</li>
                            <li className="hover:text-white cursor-pointer">Contact Support</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4 text-gray-200">Legal</h4>
                        <ul className="space-y-2 text-sm text-gray-400">
                            <li className="hover:text-white cursor-pointer">Terms of Service</li>
                            <li className="hover:text-white cursor-pointer">Privacy Policy</li>
                            <li className="hover:text-white cursor-pointer">Rental Agreement</li>
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-bold mb-4 text-gray-200">Contact Us</h4>
                        <p className="text-sm text-gray-400 mb-2">1800-AGRI-RENT</p>
                        <p className="text-sm text-gray-400 mb-2">faheembug237@gmail.com</p>
                        <p className="text-sm text-gray-400">Lucknow, India</p>
                    </div>
                </div>

                <div className="border-t border-brand-900 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500">
                    <p>© 2026 AgriRentX Private Limited. All rights reserved.</p>
                    <p className="mt-2 md:mt-0 font-medium"></p>
                </div>
            </div>
        </footer>
    );
}
