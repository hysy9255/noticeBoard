const data = [
  {
    accountId: "643bfb241a894eaef032fbca",
    title: "배포 완료!",
    views: 10,
    createdAt: "2023-04-19T11:18:28.113Z",
    updatedAt: "2023-04-19T11:18:28.113Z",
    postId: "643fce049b2afdf172280873",
    name: "james",
    email: "james@gmail.com",
    profileImage: "someImage.jpg",
    likes: 10,
  },
  {
    accountId: "643bfb241a894eaef032fbca",
    title: "배포 완료!",
    views: 11,
    createdAt: "2023-04-19T11:18:07.367Z",
    updatedAt: "2023-04-19T11:18:07.367Z",
    postId: "643fcdef9b2afdf172280871",
    name: "james",
    email: "james@gmail.com",
    profileImage: "someImage.jpg",
    likes: 9,
  },
  {
    accountId: "643bfb241a894eaef032fbca",
    title: "삭제할 게시물 2",
    views: 12,
    createdAt: "2023-04-19T11:17:34.000Z",
    updatedAt: "2023-04-19T11:17:34.000Z",
    postId: "643fcdcd9b2afdf17228086f",
    name: "james",
    email: "james@gmail.com",
    profileImage: "someImage.jpg",
    likes: 8,
  },
  {
    accountId: "643bfb241a894eaef032fbca",
    title: "삭제할 게시물 2",
    views: 13,
    createdAt: "2023-04-19T06:37:55.114Z",
    updatedAt: "2023-04-19T06:37:55.115Z",
    postId: "643f8c43f0ffacc720e5a32f",
    name: "james",
    email: "james@gmail.com",
    profileImage: "someImage.jpg",
    likes: 7,
  },
];

const sortArray = (data, order, method) => {
  const compareFn = (a, b) => {
    let sign;
    if (method === "asc") sign = 1;
    if (method === "desc") sign = -1;
    return sign * (a[order] - b[order]);
  };
  data.sort(compareFn);
  return data;
};

console.log(sortArray(data, "createdAt", "desc"));
