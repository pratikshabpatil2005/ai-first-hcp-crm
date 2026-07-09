import { useState } from "react";
import axios from "axios";

function AIChat() {

const [message,setMessage]=useState("");

const [response,setResponse]=useState("");

const send=async()=>{

const res=await axios.post(

"http://127.0.0.1:8000/agent/chat",

{

message

}

);

setResponse(res.data.response);

}

return(

<div style={{padding:40}}>

<h1>AI CRM Assistant</h1>

<textarea

rows="8"

style={{width:"100%"}}

value={message}

onChange={(e)=>setMessage(e.target.value)}

/>

<br/><br/>

<button onClick={send}>

Send

</button>

<br/><br/>

<div>

{response}

</div>

</div>

)

}

export default AIChat