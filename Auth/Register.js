import React, {useState} from 'react'
import Layout from '../../components/layouts/Layout'
import axios from 'axios'
import {useNavigate} from 'react-router-dom'
import {toast} from 'react-hot-toast'
import '../../style/AuthStyle.css'

const Register = () => {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [phone, setPhone] = useState("")
    const [address, setAddress] = useState("")
    const [answer, setAnswer] = useState("")
    const navigate = useNavigate()

    // form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
             const res = await axios.post('/api/v1/auth/register', 
              {name, email, password, phone, address, answer}
            )
            if(res && res.data.success) {
              toast.success(res.data.message)
              navigate('/login')
            } else {
              toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error('Something went wrong')
        }
    }
  return (
    <Layout title={"Register - neoCommerce"}>
      <div className="form-container">
        <form onSubmit={handleSubmit}>
            <h4 className='title'>REGISTRATION FORM</h4>
            <div className="mb-3">
              <input type="text" 
                    className="form-control" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    id="exampleInputName"
                    placeholder='Name' 
                    required
                    autoFocus
              />
            </div>
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
              <input type="text" 
                    className="form-control"
                    value={phone} 
                    onChange={(e) => setPhone(e.target.value)}
                    id="exampleInputPhone"
                    placeholder='Phone' 
                    required
              />
            </div>
            <div className="mb-3">
              <input type="text" 
                    className="form-control" 
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    id="exampleInputAddress"
                    placeholder='Address' 
                    required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={answer}
                onChange={(e) => setAnswer(e.target.value)}
                className="form-control"
                id="exampleInputAnswer"
                placeholder="Your Favorite sports"
                required
              />
            </div>
            <button type="submit" className="btn btn-primary">REGISTER</button>
        </form>
      </div>
    </Layout>
  )
}

export default Register
