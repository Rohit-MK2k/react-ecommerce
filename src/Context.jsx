import { createContext, useState, useEffect } from 'react'
import bcrypt from 'bcryptjs'
import { data } from 'autoprefixer'


const context = createContext()

export const ContextProvider = ({ children }) => {
    const [isDisable, setDisable] = useState(true)

    // form validation function
    let validate = (values) => {
        let errors = {}
        const emailPattern = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
        const passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,10}$/
        console.log()
        switch (Object.getOwnPropertyNames(values).length) {
            case 2:
                if (!values.email) {
                    errors.email = '*Required'
                    setDisable(true)
                }
                else if (!emailPattern.test(values.email)) {
                    errors.email = '*Invalid Email ID'
                    setDisable(true)
                }
                else {
                    setDisable(false)
                }
                if (!values.password) {
                    errors.password = '*Required'
                    setDisable(true)
                }
                else if (!passwordPattern.test(values.password)) {
                    errors.password = '*Invalid Password'
                    setDisable(true)
                }
                else {
                    setDisable(false)
                }      
                break
            case 3:
                if (!values.name) {
                    errors.name = '*Required'
                    setDisable(true)
                }
                else {
                    setDisable(false)
                }
                if (!values.email) {
                    errors.email = '*Required'
                    setDisable(true)
                }
                else if (!emailPattern.test(values.email)) {
                    errors.email = '*Invalid Email ID'
                    setDisable(true)
                }
                else {
                    setDisable(false)
                }
                if (!values.password) {
                    errors.password = '*Required'
                    setDisable(true)
                }
                else if (!passwordPattern.test(values.password)) {
                    errors.password = '*Invalid Password'
                    setDisable(true)
                }
                else {
                    setDisable(false)
                }
                break
        }
        return errors
        
    }

    // @desc   writes the date for signup 
    // @route  POST /user 
    // @access Private
    const sendSignup = async (values) => {
        let { name, email, password } = values
        console.log(email)
        const emailCheck = await fetch(`http://localhost:5000/users?email=${email}`)
        const data = await emailCheck.json()
        if (data.length !== 0) {
            // if email already exists
            return Promise.reject({ status: 409, message: 'User email already exists' })
        }
        else {
            const salt = bcrypt.genSaltSync(10)
            const hashPassword = bcrypt.hashSync(password, salt)
            const response = fetch('http://localhost:5000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    "name": name,
                    "email": email,
                    "password": hashPassword
                })
                    
            })
            console.log("User signed up") 
        } 
    }


    // @desc   checking data for user login
    // @route  GET /user 
    // @access Private
    const getUser = async (values) => {
        const response = await fetch(`http://localhost:5000/users?email=${values.email}`)
        const getData = await response.json()
        const checkPassword = bcrypt.compareSync(values.password, getData[0].password)
        if (getData.length !== 0 && checkPassword) {
            const data = {
                name: getData[0].name,
                email: getData[0].email,
            }
            return data
        }
        else {
            return Promise.reject({ status: 401, message: 'Incorrect Email or Password' })
        }
    }


    return (<context.Provider value={{
        validate,
        isDisable,
        sendSignup,
        getUser,
    }}>
        {children}
    </context.Provider>)
}

export default context 