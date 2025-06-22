import React from 'react'
import { useState } from "react";

const Contact = () => {

    const [formData, setFormData] = useState({
        name: "",
        phoneNumber: "",
        help: "",
        discription: "",
    });

    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
        ...prev,
        [name]: value,
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        setSuccessMessage("");
        setLoading(true);

        try {
        const response = await fetch("https://le-crown-interiors-backend.onrender.com/contact/contact", {
            method: "POST",
            headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        // const data = await response.json();

        if (response.ok) {
            setSuccessMessage("✅ Request submitted successfully.");
            setFormData({ name: "", phoneNumber: "", help: "", discription: "" });
        } else {
            setErrorMessage(response.error || "❌ Submission failed. Please try again.");
        }
        } catch (err) {
        setErrorMessage("❌ Something went wrong. Please try again later."+err.message);
        }

        setLoading(false);
    };

  return (
    <div>
      <section className="min-h-screen flex items-center justify-center px-4 py-12 bg-gradient-to-br from-black via-gray-900 to-gray-950 text-white">
    <div className="max-w-3xl w-full space-y-8 bg-gray-900/80 p-8 rounded-2xl shadow-2xl backdrop-blur-md">
        
        <h2 className="text-3xl sm:text-4xl font-bold text-yellow-400">Let’s Bring Your Vision to Life</h2>
        
        <p className="text-gray-300 text-lg">
        You’re one step away from transforming your space with unmatched luxury and craftsmanship.
        As an authenticated client, tell us exactly what you need — we’re here to curate perfection for you.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid sm:grid-cols-2 gap-4">
            <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name"
                required
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-yellow-400 placeholder-gray-400 text-white"
            />
            <input
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder="Your Phone Number"
                required
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-yellow-400 placeholder-gray-400 text-white"
            />
            </div>
            
            <input
                type="text"
                name="help"
                value={formData.help}
                onChange={handleChange}
                placeholder="How can we help you? (Eg: Interior Design, Renovation)"
                required
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-yellow-400 placeholder-gray-400 text-white"
            />

            <textarea
                name="discription"
                value={formData.discription}
                onChange={handleChange}
                placeholder="Describe your requirement in detail..."
                required
                rows="5"
                className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:border-yellow-400 placeholder-gray-400 text-white"
            ></textarea>

            <button
                type="submit"
                disabled={loading}
                className={`w-full py-3 bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-black font-semibold rounded-lg transition duration-300 ${
                loading ? "opacity-60 cursor-not-allowed" : ""
                }`}
            >
                {loading ? "Sending..." : "Request Assistance"}
            </button>
            </form>

            {successMessage && <p className="text-green-400 mt-4">{successMessage}</p>}
            {errorMessage && <p className="text-red-400 mt-4">{errorMessage}</p>}

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
