import React, {useEffect, useState} from 'react'
import Layout from '../../components/layouts/Layout'
import AdminMenu from '../../components/layouts/AdminMenu'
import {toast} from 'react-hot-toast'
import axios from 'axios'
import About from './../About';
import CategoryForm from '../../components/Form/CategoryForm.js'
import {Modal} from 'antd';

const CreateCategory = () => {
  const [categories, setCategories] = useState([])
  const [name, setName] = useState("")
  const [visible, setVisible] = useState(false)
  const [selected, setSelected] = useState(null)
  const [updatedName, setUpdatedName] = useState('')

  //handle form
  const handleSubmit = async (e) => {
    try {
      const {data} = await axios.post('/api/v1/category/create-category', {name})
      if(data?.success) {
        toast.success(`${name} is created`)
        getAllCategory()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.log(error)
      toast.error("Somthing went WRONG in Input form")
    }
  }

  const getAllCategory = async () => {
    try {
      const {data} = await axios.get('/api/v1/category/get-category')
      if(data?.success) {
        setCategories(data?.category)
      }
    } catch (error) {
      console.log(error)
      toast.error("Somthing went wrong in getting Categories")
    }
  }

  useEffect(() => {
    getAllCategory()
  }, [])

  //update Category
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const {data} = await axios.put(`/api/v1/category/update-category/${selected._id}`, {name: updatedName})
      if(data.success) {
        toast.success(`${updatedName} is updated`)
        setSelected(null)
        setUpdatedName("")
        setVisible(false)
        getAllCategory()
      } else {
        toast.error(data.message)
      }
    } catch(error) {
      toast.error('Somthing went Wrong')
    }
  }

  //delete Category
  const handleDelete = async (pId) => {
    try {
      const {data} = await axios.delete(`/api/v1/category/delete-category/${pId}`)
      if(data.success) {
        toast.success(`Category is deleted`)
        getAllCategory()
      } else {
        toast.error(data.message)
      }
    } catch(error) {
      toast.error('Somthing went Wrong')
    }
  }

  return (
    <Layout title={"Dashboard - Create Category"}>
        <div className="container-fluid m-3 p-3">
        <div className='row'>
            <div className='col-md-3'>
                <AdminMenu /> 
            </div>
            <div className='col-md-9'>
                <h1>Manage Category</h1>
                <div className='p-3 w-50'>
                  <CategoryForm handleSubmit={handleSubmit} value={name} setValue={setName}/>
                </div>
                <div className='w-75'>
                  <table className="table">
                    <thead>
                      <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {categories?.map(c => (
                        <>
                          <tr>
                            <td key={c._id}>{c.name}</td>
                            <td>
                              <button className='btn btn-primary ms-2' onClick = {() => {setVisible(true); setUpdatedName(c.name); setSelected(c)}}>Edit</button>
                              <button className='btn btn-danger ms-2' onClick={() => {handleDelete(c._id)}}>Delete</button> 
                            </td>
                          </tr>
                        </>
                      ))}
                    </tbody>
                  </table>

                </div>
            </div>
            <Modal onCancel ={ () => setVisible(false)} footer = {null} visible={visible}>
              <CategoryForm value={updatedName} setValue={setUpdatedName} handleSubmit={handleUpdate}/>
            </Modal>
        </div>
        </div>
    </Layout>
  )
}

export default CreateCategory
