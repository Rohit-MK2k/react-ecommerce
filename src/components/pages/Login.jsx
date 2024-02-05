import React, { useContext, useState } from 'react'
import context from '../../Context'
import { Link } from 'react-router-dom'
import { useFormik} from 'formik'

function Login() {
    const [loginErr, setLoginErr] = useState({})
    const { validate, isDisable, getUser } = useContext(context)
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate,
        onSubmit: async (values) => {
            try {
                const data = await getUser(values)
                console.log(data)
            }
            catch (err) {
                if (err.status === 401) {
                    setLoginErr(err)
                }
                else {
                    console.log(err)
                }
            }
            
        }
    })
    return (
        <>
            <div className="login-container flex flex-col item-center justify-center gap-10 w-full px-20">
                <h3 className="text-2xl text-center">Login</h3>
                <form className="login-form flex flex-col item-center justify-center gap-5" onSubmit={formik.handleSubmit}>
                    {loginErr.status === 401 ? <div className=' text-xs text-red-600 p-1 mb-6 bg-slate-200 italic rounded-sm'>{loginErr.message}</div> : null}
                    <div className="form-group flex flex-col">
                        <input type="email" name="email" id="email" className='form-field border-b-2' placeholder='Enter Your email' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.email}/>
                        {formik.touched.email && formik.errors.email ? <div className='text-xs text-red-600'>{formik.errors.email}</div> : null}
                    </div>
                    <div className="form-group flex flex-col">
                        <input type="password" name="password" id="password"  className='form-field border-b-2' placeholder='Enter Your Password' onChange={formik.handleChange} onBlur={formik.handleBlur} value={formik.values.password}/>
                        {formik.touched.password && formik.errors.password ? <div className='text-xs text-red-600'>{formik.errors.password}</div> : null}
                    </div>
                    <button type="submit" className='submit-btn mt-5 border-2 border-black p-2  hover:text-white transtion duration-150 disabled:hover:bg-white disabled:hover:text-black' disabled={isDisable}>Login</button>
                    <Link to='/signup' className='form-link transtion duration-150'>New User? Create a new account</Link>
                </form>
                
            </div>

        </>
)
}

export default Login