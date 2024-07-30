import {useState} from "react";
import {Container, FormControl} from "react-bootstrap";
import Table from "react-bootstrap/Table";
import axios from 'axios';
import {useNavigate} from "react-router-dom";
let Write = ()=>{
    let [inputs,setInputs] = useState({
        title:'',
        content:''
    })
    let onChange =(e)=>{
        let {name,value} = e.target
        setInputs({
            ...inputs,
            [name]: value
        })
    }
    let navigate=useNavigate()
    let moveToNext =(id)=>{
        navigate(`/board/showOne/${id}`)
    }
    let onSubmit = async (e)=>{
        e.preventDefault()
        try{
            let resp = await axios.post(`http://localhost:8080/board/write`,inputs)
            if(resp.data.resultId !== undefined){
                window.location.href = `/board/showOne/`+resp.data.resultId
                moveToNext(resp.data.resultId)
            }
        }catch(error){
            console.error(error)
        }
    }
    return(
        <Container className={"mt-3"}>
            <form onSubmit={onSubmit}>
                <Table striped hover>
                    <thead>
                         <td colSpan={2} className={"text-center"}>글 작성하기</td>
                    </thead>
                    <tbody>
                    <tr>
                        <td>제목</td>
                        <td><FormControl type={'text'} value={inputs.title} name={'title'} onChange={onChange}/></td>
                    </tr>
                    <tr>
                        <td>내용</td>
                        <td><textarea name={'text'} value={inputs.text} onChange={onChange}/></td>
                    </tr>
                    <tr>
                        <td colSpan={2} className={'text-center'}>
                            <button type={'submit'} class="btn btn-primary">
                                작성하기
                            </button>
                        </td>
                    </tr>
                    </tbody>
                </Table>
            </form>
        </Container>
    )
}
export default Write