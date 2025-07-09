import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {Formik, Form, Field, ErrorMessage} from 'formik'
import * as yup from 'yup'


const validationSchema= yup.object().shape({
  name:yup.string().required("Name is required"),
  email:yup.string().email("invalid email").required("Email is required."),
  password:yup.string().min(8,"Password must be at least 8 character").required("password is require"),
  confirmpassword:yup.string().oneOf([yup.ref('password'),'passwords must be watch']).required('confirmpassword')

})


function App() {
  const initialvalue={
    name:'',
    email:'',
    password:'',
    confirmpassword:''
  }

  const handlesubmit=(values,{resetForm})=>{
    console.log(values);
    resetForm();
  }


  return (
    <>
      <Formik
        initialValues={initialvalue}
        validationSchema={validationSchema}
        onSubmit={handlesubmit}
      >
        <Form>
          <div>
            <label>name</label>
            <Field name="name" type="text" />
            <ErrorMessage name="name" component="div" style={{ color: 'red' }} />
          </div>

          <div>
            <label>email</label>
            <Field name="email" type="email" />
            <ErrorMessage name="email" component="div" style={{ color: 'red' }} />
          </div>

          <div>
            <label>password</label>
            <Field name="password" type="password" />
            <ErrorMessage name="password" component="div" style={{ color: 'red' }} />
          </div>

          <div>
            <label>confirmpassword</label>
            <Field name="confirmpassword" type="password" />
            <ErrorMessage name="name" component="div" style={{ color: 'red' }} />
          </div>
          <button type='submit'>Sign Up</button>
        </Form>
      </Formik>
    </>
  );
}

export default App
