const User = require('../models/userModel'); // Unified User model
const Teacher = require('../models/teacherModel'); // Teacher model

exports.adminSignIn = async (req, res) => {
  try {
      console.log("Admin Sign-In Request Body:", req.body);

      const { email, password } = req.body;
      const admin = await User.findOne({ email, role: 'admin' });

      if (!admin) {
          console.log("Admin not found or role mismatch");
          return res.status(401).json({ message: 'Invalid email or role' });
      }

      // Direct password comparison (insecure)
      if (password !== admin.password) {
          console.log("Password mismatch for email:", email);
          return res.status(401).json({ message: 'Invalid email or password' });
      }

      res.status(200).json({ message: 'Admin sign in successful', user: admin });
  } catch (error) {
      console.error("Admin Sign-In Error:", error);
      res.status(500).json({ message: error.message });
  }
};

exports.studentSignIn = async (req, res) => {
  try {
    const { usn, dob } = req.body;

    // Find the student in the user model using usn
    const student = await User.findOne({ usn, role: 'student' }); // Ensure 'role' matches

    if (!student) {
      return res.status(401).json({ message: 'Invalid student USN' });
    }

    // Validate the date of birth (dob) from the user model (if provided)
    if (dob && student.dob) {
      const studentDob = (student.dob instanceof Date) ? student.dob.toISOString().split('T')[0] : String(student.dob);
      if (dob !== studentDob) {
        return res.status(401).json({ message: 'Invalid date of birth' });
      }
    }

    res.status(200).json({ message: 'Student sign in successful', user: student });
  } catch (error) {
    console.error("Student Sign-In Error:", error);
    res.status(500).json({ message: error.message });
  }
};

exports.teacherSignIn = async (req, res) => {
  try {
    const { teacherID } = req.body;

    // Step 1: Find the teacher in the teacher model using teacherID
    const teacher = await Teacher.findOne({ teacherID });

    if (!teacher) {
      return res.status(401).json({ message: 'Invalid teacher ID' });
    }

    // Step 2: No need to query the User model anymore, since teacherID is already in the Teacher model
    // We will just return the teacher's details

    res.status(200).json({ message: 'Teacher sign in successful', user: teacher });
  } catch (error) {
    console.error("Teacher Sign-In Error:", error);
    res.status(500).json({ message: error.message });
  }
};

/*
 createLabSchedule
 - Expects body:
   {
     labs: ["Lab1","Lab2","Lab3"],
     division: "A",
     batchCountPerLab: 3,            // optional, defaults to 3
     batchDurationMinutes: 60,       // optional, defaults to 60
     startTime: "2025-11-25T09:00:00Z" // optional, defaults to today 09:00 local
   }
 - Returns generated slots with assigned students (no new DB model file created).
*/
exports.createLabSchedule = async (req, res) => {
  try {
    const {
      labs = ['Lab1', 'Lab2', 'Lab3'],
      division,
      batchCountPerLab = 3,
      batchDurationMinutes = 60,
      startTime: startTimeInput
    } = req.body;

    if (!Array.isArray(labs) || labs.length === 0) {
      return res.status(400).json({ message: 'Provide labs array' });
    }
    if (!division) {
      return res.status(400).json({ message: 'Provide division' });
    }

    // determine base start time
    let baseStart;
    if (startTimeInput) {
      baseStart = new Date(startTimeInput);
      if (isNaN(baseStart)) return res.status(400).json({ message: 'Invalid startTime' });
    } else {
      // default: today at 09:00 local
      baseStart = new Date();
      baseStart.setHours(9, 0, 0, 0);
    }

    // fetch students for division
    const students = await User.find({ role: 'student', division }).sort({ usn: 1 });
    if (!students || students.length === 0) {
      return res.status(400).json({ message: 'No students found for division' });
    }

    const totalBatches = labs.length * batchCountPerLab;
    const studentsPerBatch = Math.ceil(students.length / totalBatches);

    // build slots
    const slots = [];
    for (let li = 0; li < labs.length; li++) {
      for (let bi = 0; bi < batchCountPerLab; bi++) {
        const batchIndex = li * batchCountPerLab + bi;
        const start = new Date(baseStart);
        start.setMinutes(start.getMinutes() + batchIndex * batchDurationMinutes);
        const end = new Date(start);
        end.setMinutes(end.getMinutes() + batchDurationMinutes);
        slots.push({
          lab: labs[li],
          batchNumber: bi + 1,
          startTime: start.toISOString(),
          endTime: end.toISOString(),
          students: []
        });
      }
    }

    // assign students sequentially into slots
    let idx = 0;
    for (const s of students) {
      const slotIndex = Math.floor(idx / studentsPerBatch);
      const target = slotIndex < slots.length ? slots[slotIndex] : slots[slots.length - 1];
      target.students.push({ usn: s.usn, name: s.name, id: s._id });
      idx++;
    }

    return res.status(200).json({
      message: 'Schedule generated',
      division,
      labs,
      batchCountPerLab,
      batchDurationMinutes,
      slots
    });
  } catch (err) {
    console.error("Create Lab Schedule Error:", err);
    return res.status(500).json({ message: err.message });
  }
};