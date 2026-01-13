// import axios from "./axios";

// export const fetchAgents = async () => {
//   const token = localStorage.getItem("access");
//   const res = await axios.get("/accounts/users/", {
//     headers: {
//       Authorization: `Bearer ${token}`,
//     },
//   });

//   // filter only agents
//   return res.data.filter((u) => u.role === "AGENT");
// };
import api from "./axios";

export const fetchAgents = async () => {
  const res = await api.get("/accounts/users/");
  return res.data;
};
