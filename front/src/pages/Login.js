import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";
import { useDispatch } from 'react-redux';
import { login, register } from '../redux/slice/userSlice';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';

const SignupSchema = Yup.object().shape({
    password: Yup.string()
        .min(2, 'Too Short!')
        .max(70, 'Too Long!')
        .required('Password Required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Email Required'),
});

export default function Login() {
    const navigate = useNavigate()

    const [isLogin, setIsLogin] = useState(true)

    const dispatch = useDispatch();
    const token = localStorage.getItem("token")
    useEffect(() => {
        if (token) {
            navigate("/")
        }
    }, [token])
    return (
        <div className='flex flex-col justify-center items-center'>
            <h1 className="font-semibold text-xl my-8">Login</h1>
            <Formik
                initialValues={{
                    password: '',
                    email: '',
                    name: ''
                }}
                validationSchema={SignupSchema}
                onSubmit={(values, { resetForm }) => {
                    if (isLogin) {
                        dispatch(login(values)).then((res) => {
                            if (res.type == "user/login/fulfilled") {
                                if (res?.payload[0].role == "admin") {
                                    navigate("/user")
                                } else {
                                    navigate("/")
                                }
                            }

                        })
                    } else {
                        dispatch(register(values)).then((res) => {
                            navigate("/")
                        })
                    }
                    resetForm()
                }}
            >
                {({ errors, touched }) => (
                    <Form>
                        <div className='flex flex-col gap-4'>
                            {!isLogin && (
                                <div>
                                    <Field className="border border-gray-400 rounded-md p-2" name="name" placeholder="Enter Name " />
                                    <ErrorMessage component={"span"} className='text-red-400 ms-2' name="name" />
                                </div>
                            )}
                            <div>

                                <Field className="border border-gray-400 rounded-md p-2" name="email" type="email" placeholder="Enter Email " />
                                <ErrorMessage component={"span"} className='text-red-400 ms-2' name="email" />
                            </div>
                            <div>

                                <Field type="password" className="border border-gray-400 rounded-md p-2" name="password" placeholder="Enter Password" />
                                <ErrorMessage component={"span"} className='text-red-400 ms-2' name="password" />
                            </div>
                            <button className='px-4 py-2 border border-gray-400 rounded-md hover:bg-gray-300' type="submit">{isLogin ? "Login" : "Register"}</button>

                            <div className='text-right cursor-pointer text-blue-500'>


                                <p onClick={() => setIsLogin(!isLogin)}> {isLogin ? "Not Account , Signup" : "Already Account , Login"}</p>
                            </div>
                        </div>
                    </Form>
                )}
            </Formik>
        </div>
    )
}

