import { comparePassword, hashPassword } from '../helpers/authHelper.js';
import userModel from '../models/userModel.js';
import JWT from 'jsonwebtoken';

export const registerController = async (req, res) => {
    try {
        const {name, email, password, phone, address, answer} = req.body 
        //validations
        if(!name) {
            return res.send({message: 'Name is required'})
        }
        if(!email) {
            return res.send({message: 'Email is required'})
        }
        if(!password) {
            return res.send({message: 'Password is required'})
        }
        if(!phone) {
            return res.send({message: 'Phone is required'})
        }
        if(!address) {
            return res.send({message: 'Addesss is required'})
        }
        if(!answer) {
            return res.send({message: 'Answer is required'})
        }

        //user
        const existingUser = await userModel.findOne({email})

        //existing user
        if(existingUser) {
            return res.status(200).send({
                success: false,
                message: 'Already registered, please login'
            })
        }

        //registering user
        const hashedPassword = await hashPassword(password)
        //save
        const user = await new userModel({name, email, phone, address, password: hashedPassword, answer}).save()

        res.status(201).send({
            success: true, 
            message: 'User registered successfully',
            user
        })

    } catch (error) {
        console.log(error)
        res.status(500).send({
            success: false,
            message: 'error in registration',
            error
        })
    }
};


//POST LOGIN
export const loginController = async (req, res) => {
    try {
        const {email, password} = req.body
        
        //validation
        if(!email || !password) {
            return res.status(404).send({
                success: false,
                message: 'Invalid Email or Password'
            })
        }

        const user = await userModel.findOne({email});
        if(!user) {
            return res.status(404).send({
                success: false,
                message: 'User/Email not registered',
            })
        }
        const match = await comparePassword(password, user.password)
        if(!match) {
            return res.status(404).send({
                success: false,
                message: 'Invalid password'
            })
        }

        // token
        const token = await JWT.sign({_id:user._id}, process.env.JWT_Secret, {
            expiresIn: '7d',
        });
        res.status(200).send({
            success: true,
            message: 'login successful',
            user: {
                name: user.name,
                email: user.email,
                phone: user.phone,
                address: user.address,
                role: user.role
            },
            token
        })
    } catch (error) {
        console.log(error);
        res.status(500).send({
            success: false,
            message: 'Error in login',
            error
        })
    }
};


//forgotPasswordController
export const forgotPasswordController = async (req, res) => {
  try {
    const { email, answer, newPassword } = req.body;
    if (!email) {
      res.status(400).send({ message: "Emai is required" });
    }
    if (!answer) {
      res.status(400).send({ message: "answer is required" });
    }
    if (!newPassword) {
      res.status(400).send({ message: "New Password is required" });
    }
    //check
    const user = await userModel.findOne({ email, answer });
    //validation
    if (!user) {
      return res.status(404).send({
        success: false,
        message: "Wrong Email Or Answer",
      });
    }
    const hashed = await hashPassword(newPassword);
    await userModel.findByIdAndUpdate(user._id, { password: hashed });
    res.status(200).send({
      success: true,
      message: "Password Reset Successfully",
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      success: false,
      message: "Something went wrong",
      error,
    });
  }
};


//test controller
export const testController = (req, res) => {
    res.send('Protected Route')
};