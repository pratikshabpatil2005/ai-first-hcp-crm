import { createSlice } from "@reduxjs/toolkit";

const hcpSlice = createSlice({
  name: "hcp",
  initialState: {
    hcps: [
      {
        id: 1,
        name: "Dr. Raj Sharma",
        specialization: "Cardiologist",
        hospital: "Apollo Hospital",
        city: "Mumbai",
      },
      {
        id: 2,
        name: "Dr. Priya Patel",
        specialization: "Pediatrician",
        hospital: "Fortis Hospital",
        city: "Pune",
      },
    ],
  },
  reducers: {},
});

export default hcpSlice.reducer;