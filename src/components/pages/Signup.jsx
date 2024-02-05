import React, {useContext,useState} from 'react'
import context from '../../Context'
import { Link } from 'react-router-dom'
import { useFormik} from 'formik'

function Signup() {
    const [emailErr, setEmailErr] = useState({})
    const { validate, isDisable, sendSignup } = useContext(context)
    const formik = useFormik({
        initialValues: {
            name: '',
            email: '',
            password: '',
        },
        validate,
        onSubmit: values => {
            sendSignup(values).catch((err) => { setEmailErr(err) })
        }
    })
    console.log(emailErr)
    return (
        <>
            <div className="signup-container flex flex-col item-center justify-center gap-10 w-full px-20">
                <h3 className="text-2xl text-center">Sign Up</h3>
                <form className="signup-form flex flex-col item-center justify-center gap-5" onSubmit={formik.handleSubmit}>
                    {emailErr.status === 409 ? <div className=' text-xs text-red-600 p-1 mb-6 bg-slate-200 italic rounded-sm'>{emailErr.message}</div> : null}
                    <div className="form-group flex flex-col">
                        <input type="text" name="name" id="name" className='form-field border-b-2' placeholder='Enter Your Name' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.name}/>
                        {formik.touched.name && formik.errors.name ? <div className=' text-xs text-red-600 '>{formik.errors.name}</div> : null}
                    </div> 
                    <div className="form-group flex flex-col">
                        <input type="email" name="email" id="email" className='form-field border-b-2' placeholder='Enter Your email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}/>
                        {formik.touched.email && formik.errors.email ? <div className='text-xs text-red-600'>{formik.errors.email}</div> : null}
                    </div>
                    <div className="form-group flex flex-col">
                        <input type="password" name="password" id="password"  className='form-field border-b-2' placeholder='Enter Your New Password' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password}/>
                        {formik.touched.password && formik.errors.password ? <div className='text-xs text-red-600'>{formik.errors.password}</div> : null}
                    </div>
                    <button type="submit" className='submit-btn mt-5 border-2 border-black p-2  hover:text-white transtion duration-150 disabled:hover:bg-white disabled:hover:text-black' disabled={isDisable}>Sign Up</button>
                    <Link to='/login' className='form-link transtion duration-150'>Already have an account</Link>
                </form>

            </div>
        </>
    )
}

export default Signup