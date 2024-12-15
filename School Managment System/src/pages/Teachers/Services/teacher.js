const teachers = [
  {
    teacherName: "John Doe",
    teacherEmail: "john.doe@example.com",
    teacherPhone: "+1234567890",
    teacherClass: "Class 1",
    teacherGender: "Male",
    teacherSubject: "Mathematics",
  },
  {
    teacherName: "Jane Smith",
    teacherEmail: "jane.smith@example.com",
    teacherPhone: "+9876543210",
    teacherClass: "Class 2",
    teacherGender: "Female",
    teacherSubject: "English",
  },
];

export const getTeachers = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(teachers);
    }, 1000); // Simulate network latency with a 1-second delay
  });
};

export default teachers;
