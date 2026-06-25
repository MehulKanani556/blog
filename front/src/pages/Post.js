import React from 'react'
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux'
import { deletePost, getPosts, updatePost, createPost } from '../redux/slice/postSlice';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { ErrorMessage, Field, Form, Formik } from 'formik'
import * as Yup from "yup";

export default function Post() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const { post } = useSelector(state => state.post);
    const [open, setOpen] = useState(false)
    const [isEdit, setIsEdit] = useState(false);
    const [editData, setEditData] = useState(null);
    const postSchema = Yup.object().shape({
        title: Yup.string()
            .min(2, 'Too Short!')
            .max(70, 'Too Long!')
            .required('Title Required'),
        description: Yup.string()
            .min(2, 'Too Short!')
            .max(70, 'Too Long!')
            .required('Description Required'),
        photo: Yup.mixed()
            .test("required", "Photo Required", function (value) {
                if (isEdit) return true;
                return value ? true : false;
            })
    });

    useEffect(() => {
        dispatch(getPosts())
    }, [dispatch]);
    const handleDelete = (ele) => {
        console.log(ele);

        dispatch(deletePost(ele)).then(() => {
            setTimeout(() => {
                dispatch(getPosts())
            }, 300)
        })
    }
    return (
        <div>
            <div onClick={() => navigate("/user")} className='absolute top-0 right-0 cursor-pointer'>Users Page</div>

            <h1 className='text-center font-semibold my-5 text-2xl'>All Post</h1>
            <div className='flex justify-end'>
                <button onClick={() => { setOpen(true) }} className='border border-gray-400 px-2 py-1 m-2 rounded-md text-right'> + Add Posts</button>
            </div>


            <div className='grid grid-cols-4 gap-3'>
                {post.map((ele, index) => {
                    return (
                        <>

                            <div key={ele._id} className='flex flex-col gap-4 p-4 shadow-md rounded-md border border-gray-300 relative'>
                                <div >
                                    <img src={ele.photo} className='' alt={ele.title} />
                                </div>
                                <div className='text-lg font-semibold'>{ele.title}</div>
                                <div>{ele.description}</div>
                                <div className='absolute top-2 right-2 flex gap-2'>
                                    <button className='text-red-400 text-xl bg-gray-400/50 rounded-md px-2' onClick={() => {setOpen(true); setIsEdit(true);setEditData(ele)}}>
                                        ✏️ 
                                    </button>
                                    <button className='text-red-400 text-xl bg-gray-400/50 rounded-md px-2' onClick={() => handleDelete(ele._id)}>
                                        ❌
                                    </button>
                                </div>
                            </div>
                        </>
                    )
                })}
            </div>

            {open && (
                <div className="fixed inset-0 z-10 w-screen overflow-y-auto backdrop:blur-sm bg-black/60">
                    <div className='flex justify-end '>
                        <button className='text-red-400 text-xl text-right' onClick={() => setOpen(false)}>❌</button>
                    </div>
                    <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                        <div className="">
                            <Formik
                                initialValues={{
                                    _id: editData !== null ? editData._id : "",
                                    title: editData !== null ? editData.title : '',
                                    description: editData !== null ? editData.description : '',
                                    photo: editData !== null ? editData.photo : ""
                                }}
                                validationSchema={postSchema}
                                onSubmit={(values, { resetForm }) => {
                                    const formData = new FormData();
                                    formData.append("id",values._id)
                                    formData.append("title", values.title)
                                    formData.append("description", values.description)
                                    formData.append("photo", values.photo)
                                    console.log(values,formData,isEdit);
                                    

                                    if (isEdit) {

                                        dispatch(updatePost(formData)).then(() => {
                                            setTimeout(() => {
                                                dispatch(getPosts())
                                                setIsEdit(false)
                                                setEditData(null)
                                            }, 300)
                                        })
                                    } else {
                                        dispatch(createPost(formData)).then(() => {
                                            setTimeout(() => {
                                                dispatch(getPosts())
                                            }, 300)
                                        })
                                    }
                                    resetForm()
                                    setOpen(false)
                                }}
                            >
                                {({ errors, touched, setFieldValue, values }) => (
                                    <Form>
                                        <div className='flex flex-col gap-4 bg-white p-6 rounded-md'>
                                            <div>
                                                <Field className="border w-full border-gray-400 rounded-md p-2" name="title" placeholder="Enter Title " />
                                                <ErrorMessage component={"span"} className='text-red-400 ms-2' name="title" />
                                            </div>

                                            <div>

                                                <Field className="border w-full border-gray-400 rounded-md p-2" name="description" as="textarea" rows="4" placeholder="Enter Description " />
                                                <ErrorMessage component={"span"} className='text-red-400 ms-2' name="description" />
                                            </div>


                                            <div>

                                                <input type="file" name='photo' accept='image/*' className='border border-gray-400 rounded-md p-2'
                                                    onChange={(e) => { setFieldValue("photo", e.target.files[0]); console.log(e.target.files) }}
                                                />
                                                {values.photo && (
                                                    <div>
                                                        <img className='w-32 h-32 rounded-md' src={typeof values.photo === 'string' ? values.photo : URL.createObjectURL(values.photo)} alt={"photo"} />
                                                    </div>
                                                )}
                                            </div>

                                            <button className='px-4 py-2 border border-gray-400 rounded-md bg-gray-300' type="submit">{isEdit ? "Update" : "Create"}</button>


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
