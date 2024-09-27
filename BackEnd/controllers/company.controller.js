import { Company } from "../models/company.model.js";
import getDataUri from "../utils/dataUri.js"
import cloudinary from "../utils/cloudinary.js"
export const companyRegister=async(req,res)=>{
    try {
        const { companyName } = req.body;
        if (!companyName) {
            return res.status(400).json({
                message: "Company name is required.",
                success: false
            });
        }
        let company = await Company.findOne({ name: companyName });
        if (company) {
            return res.status(400).json({
                message: "You can't register same company.",
                success: false
            })
        };
        company = await Company.create({
            name: companyName,
            userId: req.id//we are getting this from middleare function there we have set req.id form the token
        });

        return res.status(201).json({
            message: "Company registered successfully.",
            company,
            success: true
        })
        
        
    } catch (error) {
        console.log(error)
    }
}

//api to get company which is been created by a particular user
export const getCompany = async (req, res) => {
    try {
        const userId = req.id; // logged in user id
        const companies = await Company.find({ userId });//find all the company which is been created by this user
        //console.log(companies)
        if (!companies || companies.length==0) {
            return res.status(200).json({
                message: "Companies not found.",
                success: false
            })
        }
        return res.status(200).json({
            companies,
            success:true,
            message:"Fetched companies succesfully"
        })
    } catch (error) {
        console.log(error);
    }
}

export const getCompanyById = async (req, res) => {//for a particular company if we want to find
    try {
        const companyId = req.params.id;
        const company = await Company.findById(companyId);
        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            })
        }
        return res.status(200).json({
            company,
            success: true
        })
    } catch (error) {
        console.log(error);
    }
}
export const updateCompany=async(req,res)=>
{
    try {
        const {name,description,website,location}=req.body
        const file = req.file;
        // idhar cloudinary ayega
        const fileUri = getDataUri(file);
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content);
        const logo = cloudResponse.secure_url;
        const updatedData={name,description,website,location,logo};
        const companyId=req.params.id
        const company=await Company.findByIdAndUpdate(companyId,updatedData,{new:true})//new:true returns the updated document
        if (!company) {
            return res.status(404).json({
                message: "Company not found.",
                success: false
            })
        }
        return res.status(200).json({
            message:"Company information updated.",
            success:true
        })

        // const companyId = req.params.id;
        // const company = await Company.findById(companyId);
        // company.name=name
        // company.description=description
        // await company.save()
    } catch (error) {
        console.log(error)
    }
}

//if there are multiple companies registered by a single user then i can delete anyone of the company as well
export const deleteCompany=async(req,res)=>{
    try {
        const companyId=req.params.id
        const company=await Company.findByIdAndDelete(companyId,{new:true})
        if(!company)
        {
            return res.json({
                message:"error in removing the company",
                success:false
            })
        }
        const allCompanies = await Company.find();
        return res.json({
            companies:allCompanies,
            message:"Company deleted succesfully",
            success:true
        })


    } catch (error) {
        console.log(error)
    }
}