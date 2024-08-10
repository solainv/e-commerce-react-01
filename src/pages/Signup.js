//\e-commerce\src\pages\Signup.js

import React, { useState } from 'react';
import Helmet from '../components/Helmet/Helmet';
import { Container, Row, Col, Form, FormGroup } from 'reactstrap';
import { Link } from 'react-router-dom';
import '../styles/Login.css';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { setDoc, doc } from 'firebase/firestore';
import { auth } from "../firebase.config";
import { storage } from '../firebase.config';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUserName] = useState('');
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const signup = async (e) => {
    e.preventDefault()
    setLoading(true)
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);

      const user = userCredential.user;
      const storageRef = ref(storage, `images/${Date.now() + username}`);
      const uploadTask = uploadBytesResumable(storageRef, file)

      uploadTask.on('state_changed', 
        (snapshot) => {
          // You can track upload progress here if needed
        }, 
        (error) => {
          toast.error(error.message);
          setLoading(false);
        }, 
        async () => {
          // Ensure upload completes before getting download URL
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
      
          // Update user profile
          await updateProfile(user, {
            displayName: username,
            photoURL: downloadURL,
          });
      
          // Store user data in Firestore database
          await setDoc(doc(db, 'users', user.uid), {
            uid: user.uid,
            displayName: username,
            email,
            photoUrl: downloadURL,
          });
      
          setLoading(false);
          toast.success('Account created');
          navigate('/login');
        }
      );
            
    } catch (error) {
      setLoading(false)
      toast.error('something went wrong!')
    }
  }

  return (
    <Helmet title='Signup'>
      <section>
        <Container>
          <Row>
            {
              loading ?
                <Col lg='12' className='text-center'><h5 className='fw-bold'>Loading....</h5></Col>
                :
                <Col lg='6' className='m-auto text-center'>
                  <h3 className='fw-bold mb-4'>Signup</h3>
                  <Form className='auth__form' onSubmit={signup}>
                    <FormGroup className='form__group'>
                      <input type="text" placeholder='Enter your name' value={username} onChange={e => setUserName(e.target.value)} />
                    </FormGroup>

                    <FormGroup className='form__group'>
                      <input type="email" placeholder='Enter your email' value={email} onChange={e => setEmail(e.target.value)} />
                    </FormGroup>

                    <FormGroup className='form__group'>
                      <input type="file" file={file} onChange={e => setFile(e.target.files[0])} />
                    </FormGroup>

                    <FormGroup className='form__group'>
                      <input type="password" placeholder='Enter your password' value={password} onChange={e => setPassword(e.target.value)} />
                    </FormGroup>

                    <button type='submit' className="btn__buy auth__btn">Create an account</button>
                    <p>Already have an acount? <Link to='/login'>Login</Link></p>
                  </Form>
                </Col>
            }
          </Row>
        </Container>
      </section>
    </Helmet>
  );
};
export default Signup;
