import React, { useState, useEffect } from 'react';
import * as THREE from 'three';
import { useForm } from 'react-hook-form'; // Hook for form handling
import { ethers } from 'ethers'; // Web3 interaction for smart contracts

const BioDataRegistration = () => {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        gender: '',
        dob: '',
        address: '',
    });

    const [formErrors, setFormErrors] = useState({});
    const { register, handleSubmit, formState: { errors } } = useForm();

    const validateForm = (data) => {
        let errors = {};
        if (!data.name) errors.name = 'Name is required';
        if (!data.email || !/^\S+@\S+\.\S+$/.test(data.email)) errors.email = 'Valid email is required';
        if (!data.phone || !/^\d{10}$/.test(data.phone)) errors.phone = 'Phone number is required';
        if (!data.gender) errors.gender = 'Gender is required';
        if (!data.dob) errors.dob = 'Date of birth is required';
        if (!data.address) errors.address = 'Address is required';
        return errors;
    };

    // Function to handle form submission
    const onSubmit = async (data) => {
        setIsSubmitting(true);
        const errors = validateForm(data);
        if (Object.keys(errors).length) {
            setFormErrors(errors);
            setIsSubmitting(false);
            return;
        }

        try {
            // Simulating the process of submitting biodata to a blockchain (e.g., Ethereum)
            // Web3 connection logic
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            await provider.send("eth_requestAccounts", []);
            const signer = provider.getSigner();
            const contract = new ethers.Contract("YOUR_CONTRACT_ADDRESS", ["function submitBiodata(string name, string email, string phone)"], signer);

            // Sending the biodata to the contract
            await contract.submitBiodata(data.name, data.email, data.phone);

            alert("Biodata successfully submitted to the blockchain!");
        } catch (error) {
            console.error("Error submitting biodata:", error);
            alert("Submission failed!");
        }
        setIsSubmitting(false);
    };

    useEffect(() => {
        // Basic Three.js 3D scene setup for AR/VR
        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
        const renderer = new THREE.WebGLRenderer();
        renderer.setSize(window.innerWidth, window.innerHeight);
        document.body.appendChild(renderer.domElement);

        // Adding 3D cube as an example of interactive object
        const geometry = new THREE.BoxGeometry();
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const cube = new THREE.Mesh(geometry, material);
        scene.add(cube);

        camera.position.z = 5;

        // Animation loop for the 3D objects
        const animate = () => {
            requestAnimationFrame(animate);
            cube.rotation.x += 0.01;
            cube.rotation.y += 0.01;
            renderer.render(scene, camera);
        };

        animate();
    }, []);

    return (
        <div className="h-screen flex justify-center items-center bg-gradient-to-r from-indigo-600 to-blue-700">
            <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-8 space-y-6 transform transition duration-500 hover:scale-105 ease-in-out">
                <h1 className="text-4xl font-bold text-center text-blue-600 mb-6">Biodata Registration</h1>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                    <div className="relative">
                        <input
                            type="text"
                            {...register("name", { required: true })}
                            className="peer w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder=" "
                        />
                        <label className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg transition-all duration-300 peer-focus:text-blue-500">Name</label>
                        {errors.name && <p className="text-red-500 text-sm">{errors.name?.message}</p>}
                    </div>

                    <div className="relative">
                        <input
                            type="email"
                            {...register("email", { required: true })}
                            className="peer w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder=" "
                        />
                        <label className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg transition-all duration-300 peer-focus:text-blue-500">Email</label>
                        {errors.email && <p className="text-red-500 text-sm">{errors.email?.message}</p>}
                    </div>

                    <div className="relative">
                        <input
                            type="tel"
                            {...register("phone", { required: true })}
                            className="peer w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder=" "
                        />
                        <label className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg transition-all duration-300 peer-focus:text-blue-500">Phone</label>
                        {errors.phone && <p className="text-red-500 text-sm">{errors.phone?.message}</p>}
                    </div>

                    <div className="relative">
                        <select
                            {...register("gender", { required: true })}
                            className="peer w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select Gender</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                            <option value="other">Other</option>
                        </select>
                        <label className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg transition-all duration-300 peer-focus:text-blue-500">Gender</label>
                        {errors.gender && <p className="text-red-500 text-sm">{errors.gender?.message}</p>}
                    </div>

                    <div className="relative">
                        <input
                            type="date"
                            {...register("dob", { required: true })}
                            className="peer w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        <label className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg transition-all duration-300 peer-focus:text-blue-500">Date of Birth</label>
                        {errors.dob && <p className="text-red-500 text-sm">{errors.dob?.message}</p>}
                    </div>

                    <div className="relative">
                        <textarea
                            {...register("address", { required: true })}
                            className="peer w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder=" "
                        />
                        <label className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-lg transition-all duration-300 peer-focus:text-blue-500">Address</label>
                        {errors.address && <p className="text-red-500 text-sm">{errors.address?.message}</p>}
                    </div>

                    <div className="flex justify-center">
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-all duration-300 disabled:opacity-50"
                        >
                            {isSubmitting ? 'Submitting...' : 'Submit'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default BioDataRegistration;
