/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";

export default function VerifyEmailPage() {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [token, setToken] = useState("");
    const [verified, setVerified] = useState(false);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(true);

    const verifyUserEmail = async () => {
        try {
            await axios.post("/api/users/verifyemail", { token });
            setVerified(true);
            toast.success("Email verified successfully");
        } catch (error) {
            setError(true);
            console.error(error);
            toast.error("Error verifying email");
        } finally {
            setLoading(false);
        }
    }
        
    useEffect(() => {
        const urlToken = searchParams.get('token');
        setToken(urlToken || "");
    }, [searchParams]);

    useEffect(() => {
        if (token.length > 0) {
            verifyUserEmail();
        } else {
            setLoading(false);
        }
    }, [token]);

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-center text-gray-800">Verify Email</h1>
                {loading ? (
                    <p className="text-center text-gray-600">Verifying your email...</p>
                ) : (
                    <>
                        {verified && (
                            <div className="text-center">
                                <h2 className="text-2xl text-green-600 mb-4">Email verified successfully</h2>
                                <Link href="/login" className="text-blue-600 hover:underline">
                                    Proceed to Login
                                </Link>
                            </div>
                        )}
                        {error && (
                            <div className="text-center">
                                <h2 className="text-2xl text-red-600 mb-4">Error verifying email</h2>
                                <p className="text-gray-600">Please try again or contact support.</p>
                            </div>
                        )}
                        {!verified && !error && (
                            <p className="text-center text-gray-600">
                                {token ? "Invalid or expired token" : "No token provided"}
                            </p>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}