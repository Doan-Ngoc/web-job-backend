const { StatusCodes, ReasonPhrases } = require("http-status-codes");

const asyncHandler = require("../utils/AsyncHandler");
const companyService = require("../services/company.service");
const companyModel = require("../models/company.model")

module.exports = {
  createCompany: asyncHandler(async (req, res) => {
    const associatedCompany = await companyService.getCompanyByRecruiter(
      req.user.id
    );

    if (associatedCompany) {
      return res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: "Account has already associated with a company" });
    }

    const newCompany = await companyService.create(req.user.id, req.body);
    return res.status(StatusCodes.CREATED).json({ data: newCompany });
  }),

  getCompanyByAccount: asyncHandler(async (req, res) => {
    const associatedCompany = await companyService.getCompanyByRecruiter(
      req.user.id
    );

    if (!associatedCompany) {
      return res
        .status(StatusCodes.NOT_FOUND)
        .json({ message: "Account has not associated with any company" });
    }
  }),

  // Add company profile to database
  async createCompanyProfile(req, res) {
    try {
      console.log('Data received from frontend:', req.body);
          const companyProfile = new  companyModel({
            name: req.body.name,
            phone: req.body.phone,
            email: req.body.email,
            address: req.body.address,
            working_fields: req.body.working_fields,
            description: req.body.description,
          });
    
          await companyProfile.save();
    
          res.json({ status: "Company profile created successfully" });
        } catch (err) {
          console.log(err)
          return res
            .status(400)
            .json({ success: false, error: "An error occurred" });
        }
      },
      // res.status(201).json({ message: 'Profile created successfully' });
      // res.json(req.body);
    // } catch (error) {
    //   console.error('Error creating profile:', error);
    // res.status(500).json({ error: 'Internal Server Error' });
    // }
  // }
// )
};
