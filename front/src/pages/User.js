import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, getUsers, register, updateUser } from '../redux/slice/userSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from "yup";
import AdSense from 'react-adsense';
const SignupSchema = Yup.object().shape({
    // password: Yup.string()
    //     .min(2, 'Too Short!')
    //     .max(70, 'Too Long!')
    //     .required('Password Required'),
    email: Yup.string()
        .email('Invalid email')
        .required('Email Required'),
});

export default function User() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [isEdit, setIsEdit] = useState(null);
    const { users } = useSelector(state => state.user);
    const [open, setOpen] = useState(false)
    const [isLogin, setIsLogin] = useState(true)

    useEffect(() => {
        dispatch(getUsers())
    }, [dispatch]);
    const handleDelete = (ele) => {
        console.log(ele);

        dispatch(deleteUser(ele._id)).then(() => {
            setTimeout(() => {
                dispatch(getUsers())
            }, 300)
        })
    }

    return (
        <div>
            <div onClick={() => navigate("/post")} className='absolute top-0 right-0 cursor-pointer'>Posts Page</div>
            <h1 className='text-center font-semibold my-5 text-2xl'>All Users</h1>

            <div className='flex justify-end'>
                <button onClick={()=>{setOpen(true);setIsLogin(false)}} className='border border-gray-400 px-2 py-1 m-2 rounded-md text-right'> + Add Users</button>
            </div>



            <div className='grid grid-cols-3 gap-3'>
                <table border={1} className='w-full'>
                    <thead>
                        <th>Name</th>
                        <th>Email</th>
                        <th className='w-10'>Action</th>
                    </thead>
                    <tbody>
                        {users.map((ele, index) => {
                            return (
                                <tr>
                                    <td className='text-nowrap'> {ele.name}</td>
                                    <td>{ele.email}</td>
                                    <td className='flex gap-2'>
                                        <button className='text-green-400 text-xl' onClick={() => { setIsEdit(ele); setOpen(true) }}>✏️</button>
                                        <button className='text-red-400 text-xl' onClick={() => handleDelete(ele)}>❌</button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>

                </table>
            </div>
            <AdSense.Google
  client='ca-pub-7292810486004926'
  slot='7806394673'
/>

            {open && (
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto backdrop:blur-sm bg-black/60">
                    <div className='flex justify-end '>
                        <button className='text-red-400 text-xl text-right' onClick={() => setOpen(false)}>❌</button>
                    </div>
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <div className="">
                            <Formik
                                initialValues={{
                                    _id: isEdit !== null ? isEdit._id : "",
                                    email: isEdit !== null ? isEdit.email : '',
                                    name: isEdit !== null ? isEdit.name : '',
                                }}
                                validationSchema={SignupSchema}
                                onSubmit={(values, { resetForm }) => {
                                    if (isLogin) {
                                        dispatch(updateUser(values)).then(() => {
                                            setTimeout(() => {
                                                dispatch(getUsers())
                                                setIsEdit(null)
                                            }, 300)
                                        })
                                    } else {
                                        dispatch(register(values)).then(() => {
                                            setTimeout(() => {
                                                dispatch(getUsers())
                                            }, 300)
                                        })
                                    }
                                    resetForm()
                                    setOpen(false)
                                }}
                            >
                                {({ errors, touched }) => (
                                    <Form>
                                        <div className='flex flex-col gap-4'>
                                            <div>
                                                <Field className="border border-gray-400 rounded-md p-2" name="name" placeholder="Enter Name " />
                                                <ErrorMessage component={"span"} className='text-red-400 ms-2' name="name" />
                                            </div>

                                            <div>

                                                <Field className="border border-gray-400 rounded-md p-2" name="email" type="email" placeholder="Enter Email " />
                                                <ErrorMessage component={"span"} className='text-red-400 ms-2' name="email" />
                                            </div>
                                            {!isLogin && (

                                                <div>

                                                    <Field type="password" className="border border-gray-400 rounded-md p-2" name="password" placeholder="Enter Password" />
                                                    <ErrorMessage component={"span"} className='text-red-400 ms-2' name="password" />
                                                </div>
                                            )}
                                            <button className='px-4 py-2 border border-gray-400 rounded-md bg-gray-300' type="submit">{isLogin ? "Update" : "Create"}</button>


                                        </div>
                                    </Form>
                                )}
                            </Formik>
                        </div>
                    </div>
                </div>
            )}

        </div>
    )
}
