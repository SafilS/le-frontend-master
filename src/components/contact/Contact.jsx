import React from 'react'

const Contact = () => {
  return (
    <div>
      <section className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-black via-gray-900 to-gray-950 text-white">
    <div className="max-w-3xl w-full space-y-8 bg-gray-900/80 p-8 rounded-2xl shadow-2xl backdrop-blur-md">
        
        <h2 className="text-3xl sm:text-4xl font-bold text-yellow-400">Let’s Bring Your Vision to Life</h2>
        
        <p className="text-gray-300 text-lg">
        You’re one step away from transforming your space with unmatched luxury and craftsmanship.
        As an authenticated client, tell us exactly what you need — we’re here to curate perfection for you.
        </p>

        <form className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
            <input
            type="text"
            name="name"
            required
            placeholder="Your Name"
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-yellow-400 placeholder-gray-400 text-white"
            />
            <input
            type="email"
            name="email"
            required
            placeholder="Your Email"
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-yellow-400 placeholder-gray-400 text-white"
            />
        </div>
        
        <input
            type="text"
            name="subject"
            required
            placeholder="How can we help you?"
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-yellow-400 placeholder-gray-400 text-white"
        />

        <textarea
            name="message"
            required
            rows="5"
            placeholder="Describe your project, your dream space, or the assistance you need..."
            className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-yellow-400 placeholder-gray-400 text-white"
        ></textarea>

        <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-black font-semibold rounded-lg transition duration-300"
        >
            Request Assistance
        </button>
        </form>

        <div className="pt-4 text-center text-gray-400 text-sm">
        Prefer a personal touch?{" "}
        <a href="https://wa.me/8883958877" className="text-yellow-400 hover:underline">
            Chat with us on WhatsApp
        </a>
        </div>
    </div>
    </section>

    </div>
  )
}

export default Contact
