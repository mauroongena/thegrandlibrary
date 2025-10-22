import prisma from '@/lib/client';
import bcrypt from 'bcrypt';
import { Role } from '../_generated/prisma';
import { redirect } from 'next/navigation';

export default function RegisterPage() {
    async function createUser(formData: FormData){
        "use server";

        const email = (formData.get("email") as string) ?? "";
        const hashedPassword = await bcrypt.hash(
            formData.get("password") as string,
            10
        );

        const role = email.endsWith("@arteveldehs.be") ? Role.ADMIN : Role.USER;
        
        try {
            await prisma.user.create({
                data: {
                    email,
                    hashedPassword,
                    role,
                }
            });
        } catch (error) {
            console.error("Error creating user:", error);
        }
        redirect("/api/auth/signin");
    }

    return (
<div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black p-4">
            <form 
                action={createUser}
                className="w-full max-w-md bg-gray-800/50 backdrop-blur-md rounded-2xl border border-gray-700 p-8 shadow-2xl hover:shadow-blue-500/10 transition-shadow duration-500"
            >
$                <h2 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text text-transparent mb-8 text-center">
                    Create Your Account
                </h2>

                <div className="mb-6">
                    <label 
                        htmlFor="email" 
                        className="block text-sm font-medium text-gray-300 mb-2"
                    >
                        Email
                    </label>
                    <input 
                        type="email" 
                        id="email" 
                        name="email" 
                        required 
                        placeholder="you@example.com"
                        className="w-full px-4 py-3 bg-gray-700/70 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                    />
                </div>

                <div className="mb-8">
                    <label 
                        htmlFor="password" 
                        className="block text-sm font-medium text-gray-300 mb-2"
                    >
                        Password
                    </label>
                    <input 
                        type="password" 
                        id="password" 
                        name="password" 
                        placeholder='secret123'
                        required 
                        className="w-full px-4 py-3 bg-gray-700/70 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition duration-300"
                    />
                </div>

                <button 
                    type="submit"
                    className="w-full inline-flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-blue-500/25 hover:transform hover:-translate-y-0.5 focus:outline-none focus:ring-4 focus:ring-blue-500/50"
                >
                    Register
                </button>
            </form>
        </div>
    )
}