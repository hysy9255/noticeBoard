const generateSort = (orderBy, method) => {
  const OrderBy = orderBy ? orderBy : "createdAt";

  let Method;
  if (method === "asc") {
    Method = 1;
  } else if (method === "desc" || method === undefined) {
    Method = -1;
  }

  const sort = {};
  sort[OrderBy] = Method;

  return sort;
};

module.exports = { generateSort };
