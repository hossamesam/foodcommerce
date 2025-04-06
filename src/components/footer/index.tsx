import React from 'react'

function Footre() {
    return (
        <footer className="bg-black text-white py-6 ">
            <div className="container mx-auto px-4 text-center">
                <p className="text-sm">&copy; 2025 Your Company. All rights reserved.</p>
                <nav className="mt-4">
                    <ul className="flex justify-center space-x-6">
                        <li><a href="#" className="hover:underline">Privacy Policy</a></li>
                        <li><a href="#" className="hover:underline">Terms of Service</a></li>
                        <li><a href="#" className="hover:underline">Contact</a></li>
                    </ul>
                </nav>
            </div>
        </footer>
    )
}

export default Footre
