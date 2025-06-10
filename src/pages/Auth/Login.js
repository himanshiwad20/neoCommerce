import React, {useState} from 'react'
import Layout from '../../components/layouts/Layout'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-hot-toast'
import { useAuth } from "../../context/auth";

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [auth, setAuth] = useAuth();

    const navigate = useNavigate()
    // form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
             const res = await axios.post('/api/v1/auth/login', 
              {email, password}
            )
            if(res && res.data.success) {
              toast.success(res.data.message)
              setAuth({
              ...auth,
              user: res.data.user,
              token: res.data.token,
              });
              localStorage.setItem("auth", JSON.stringify(res.data));
              navigate('/')
            } else {
              toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')
        }
    }
  return (
    <Layout title={"Login - neoCommerce"}>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
          <h4 className='title'>LOGIN FORM</h4>
            <div className="mb-3">
              <input type="email" 
                    className="form-control" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="exampleInputEmail"
                    placeholder='Email' 
                    required
              />
            </div>
            <div className="mb-3">
              <input type="password" 
                    className="form-control" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    id="exampleInputPassword"
                    placeholder='Password' 
                    required
              />
            </div>
            <div className="mb-3">
              <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                  navigate("/forgot-password");
                }}
              >
                Forgot Password
              </button>
            </div>
            <button type="submit" className="btn btn-primary">LOGIN</button>
        </form>

      </div>
    </Layout>
  )
}

export default Login
