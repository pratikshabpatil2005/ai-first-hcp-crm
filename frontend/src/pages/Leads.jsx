

import { useEffect, useState } from "react";
import api from "../api/api";
import MainLayout from "../layouts/MainLayout";

function Leads() {

    const [leads, setLeads] = useState([]);

    const [form, setForm] = useState({
        hcp_name: "",
        company: "",
        source: "",
        status: "New",
        notes: ""
    });

    const [editingId, setEditingId] = useState(null);


    useEffect(() => {
        loadLeads();
    }, []);


    const loadLeads = async () => {
        try {
            const response = await api.get("/leads");
            setLeads(response.data);
        }
        catch(error){
            console.error(error);
        }
    };


    const clearForm = () => {

        setForm({
            hcp_name: "",
            company: "",
            source: "",
            status: "New",
            notes: ""
        });

        setEditingId(null);
    };


    const createLead = async () => {

        try {

            await api.post("/leads", form);

            clearForm();

            loadLeads();

        }
        catch(error){
            console.error(error);
        }
    };


    const editLead = (lead) => {

        setEditingId(lead.id);

        setForm({
            hcp_name: lead.hcp_name,
            company: lead.company,
            source: lead.source,
            status: lead.status,
            notes: lead.notes
        });

    };


    const updateLead = async () => {

        try {

            await api.put(
                `/leads/${editingId}`,
                form
            );

            clearForm();

            loadLeads();

        }
        catch(error){
            console.error(error);
        }

    };


    const deleteLead = async(id)=>{

        if(!window.confirm("Delete this lead?"))
            return;


        try{

            await api.delete(`/leads/${id}`);

            loadLeads();

        }
        catch(error){
            console.error(error);
        }

    };


    return (

        <MainLayout>


            <h1>Lead Management</h1>


            <div>

                <input
                    placeholder="HCP Name"
                    value={form.hcp_name}
                    onChange={(e)=>
                        setForm({
                            ...form,
                            hcp_name:e.target.value
                        })
                    }
                />


                <input
                    placeholder="Company"
                    value={form.company}
                    onChange={(e)=>
                        setForm({
                            ...form,
                            company:e.target.value
                        })
                    }
                />


                <input
                    placeholder="Source"
                    value={form.source}
                    onChange={(e)=>
                        setForm({
                            ...form,
                            source:e.target.value
                        })
                    }
                />


                <select
                    value={form.status}
                    onChange={(e)=>
                        setForm({
                            ...form,
                            status:e.target.value
                        })
                    }
                >

                    <option>New</option>
                    <option>Contacted</option>
                    <option>Converted</option>
                    <option>Closed</option>

                </select>


                <input
                    placeholder="Notes"
                    value={form.notes}
                    onChange={(e)=>
                        setForm({
                            ...form,
                            notes:e.target.value
                        })
                    }
                />

            </div>


            <br/>


            {
                editingId ?

                <button onClick={updateLead}>
                    Update Lead
                </button>

                :

                <button onClick={createLead}>
                    Add Lead
                </button>
            }



            <br/>
            <br/>


            <table border="1" cellPadding="10">

                <thead>

                    <tr>

                        <th>HCP Name</th>
                        <th>Company</th>
                        <th>Source</th>
                        <th>Status</th>
                        <th>Notes</th>
                        <th>Actions</th>

                    </tr>

                </thead>


                <tbody>


                {
                    leads.map((lead)=>(

                        <tr key={lead.id}>

                            <td>{lead.hcp_name}</td>

                            <td>{lead.company}</td>

                            <td>{lead.source}</td>

                            <td>{lead.status}</td>

                            <td>{lead.notes}</td>


                            <td>

                                <button
                                    onClick={()=>
                                        editLead(lead)
                                    }
                                >
                                    Edit
                                </button>


                                <button
                                    onClick={()=>
                                        deleteLead(lead.id)
                                    }
                                >
                                    Delete
                                </button>


                            </td>


                        </tr>

                    ))
                }


                </tbody>


            </table>


        </MainLayout>

    );

}


export default Leads;