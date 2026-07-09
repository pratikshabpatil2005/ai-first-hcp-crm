import { useState } from "react";

function LogInteraction() {

const [form,setForm]=useState({

hcpName:"",

hospital:"",

interactionType:"Visit",

product:"",

notes:"",

followup:""

})

const change=(e)=>{

setForm({...form,[e.target.name]:e.target.value})

}

const submit=(e)=>{

e.preventDefault()

console.log(form)

alert("Interaction Logged")

}

return(

<div style={{padding:30}}>

<h1>Log Interaction</h1>

<form onSubmit={submit}>

<input

placeholder="HCP Name"

name="hcpName"

onChange={change}

/>

<br/><br/>

<input

placeholder="Hospital"

name="hospital"

onChange={change}

/>

<br/><br/>

<select

name="interactionType"

onChange={change}

>

<option>Visit</option>

<option>Call</option>

<option>Meeting</option>

<option>Conference</option>

</select>

<br/><br/>

<input

placeholder="Product"

name="product"

onChange={change}

/>

<br/><br/>

<textarea

rows="5"

placeholder="Discussion Notes"

name="notes"

onChange={change}

/>

<br/><br/>

<input

type="date"

name="followup"

onChange={change}

/>

<br/><br/>

<button>

Save Interaction

</button>

</form>

</div>

)

}

export default LogInteraction