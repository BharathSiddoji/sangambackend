const express = require("express");
const member_router = express.Router();
const Member = require("../Models/membershipModel");
const isAuthenticated = require("../Middleware/authMiddleware");
const activeMember = require("../Models/activeMember");
const cookieParser = require("cookie-parser");
const ActiveMember = require("../Models/activeMember");
member_router.use(cookieParser());
member_router.post("/member", async (req, res) => {
  const fields = [
    "name",
    "email",
    "sonof",
    "dob",
    "pob",
    "gender",
    "address",
    "phone",
    "state",
    "qualification",
    "tamil",
    "maleMembers",
    "femaleMembers",
    "employmentStatus",
  ];

  for (let field of fields) {
    if (!req.body[field]) {
      return res.status(400).send(`Please fill the ${field} field`);
    }
  }
  const { email, phone } = req.body;
  const existingMember = await Member.findOne({ email, phone });
  if (existingMember) {
    return res.status(409).json({ message: "member already exist in members" });
  }
  const newMember = await Member.create({ ...req.body });
  res.status(200).json({ message: "new member added to the database" });
});

//sending all the member application details
member_router.get("/member", isAuthenticated, async (req, res) => {
  const allMembers = await Member.find();
  res.status(200).json(allMembers);
});

//sending only the details of specific id
member_router.get("/member/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params;
  // console.log(id)
  const member = await Member.findOne({ _id: id });
  res.status(200).json(member);
});

//Deleting Member from the Application List
member_router.delete("/member/:id", isAuthenticated, async (req, res) => {
  const { id } = req.params;
  const deleted = await Member.findOneAndDelete({ _id: id });
  // console.log(deleted)
  res.status(200).json({ message: "user deleted" });
});

//Approving Member to Join the Sangam
member_router.post(
  "/member/:id/activeMember",
  isAuthenticated,
  async (req, res) => {
    const { id } = req.params;
    const foundMember = await Member.findOne({ _id: id });
    const foundMemberObj = foundMember.toObject();
    if (foundMember) {
      const checkExisting = await ActiveMember.findOne({
        phone: foundMemberObj.phone,
        email: foundMemberObj.email,
      });

      if (checkExisting) {
        // console.log("existing",checkExisting)
        return res
          .status(500)
          .json({ message: "Member already exists in the Active members list" });
      } else {
        
        delete foundMemberObj._id;
        delete foundMemberObj.__v;
        const addMember = await ActiveMember.create(foundMemberObj);
        // console.log(addMember);
        return res.status(200).json({ message: "add member" });
      }
    }
  }
);




module.exports = member_router;
