const noticeData = [
  {
    id: "1",
    title: "Holiday Announcement",
    description: "School will be closed on Friday.",
    date: "2023-07-14",
  },
  {
    id: "2",
    title: "Exam Schedule",
    description: "Final exams will start from next week.",
    date: "2023-07-15",
  },
];

// Simulate fetching data (with a delay)
export const getNotices = () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(noticeData); // Return the mock notice data after 1 second
    }, 1000); // Simulate 1-second network delay
  });
};
