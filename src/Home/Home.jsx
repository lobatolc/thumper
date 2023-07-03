import React, { useState, useEffect} from 'react';

import EditNoteOutlinedIcon from '@mui/icons-material/EditNoteOutlined';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import UploadFileOutlinedIcon from '@mui/icons-material/UploadFileOutlined';
import PrintOutlinedIcon from '@mui/icons-material/PrintOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import { Container, DataGridPagination, ButtonMenu, LockButton, OutlinedNoMarginButton, ButtonPag } from './styles';
import MenuIcon from '@mui/icons-material/Menu';
import thumper from "../Images/thumper.png";
import Button from '@mui/material/Button';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import EditIcon from '@mui/icons-material/Edit';
import EditOffIcon from '@mui/icons-material/EditOff';
import { colors } from '../GlobalStyles';
import Papa from 'papaparse';
function Home() {
  const [ initialValue, setValueInitial ] = useState(0)
  const [ fees, setFees ] = useState(0)
  const [penalty, setPenalty] = useState(0)
  const [honorary, setHonorary] = useState(0)
  const [isLocked, setIsLocked] = useState(true) 
  const [numberOfPagination, setNumberOfPagination] = useState(0)
  const [sumarize, setSumarize] = useState('')
  const [pageSize, setPageSize] = useState(12)
  const [years, setYears] = useState([])
  const [rows, setRows] = useState([{ id: '', year:'', month: '', monetaryCorrection: '' },])
  const [cardCurrentYear, setCardCurrentYear] = useState(
    <div className="card no-print" >
            <MonetizationOnOutlinedIcon sx={{fontSize: 40, color: colors.white}}/>
            <span>R$ 00.00</span>
            <p>Envie o arquivo</p>
          </div>
  );
  const [cardAllYears, setCardAllYears] = useState(
    <div className="card no-print">
    <MonetizationOnOutlinedIcon sx={{fontSize: 40, color: colors.white}}/>
    <span>R$ 00.00</span>
    <p>Envie o arquivo</p>
  </div>
  );
  const columns = [
    { field: 'id', headerName: 'ID', width: 70 },
    { field: 'year', headerName: 'Ano', width: 70 },
    { field: 'month', headerName: 'Mês', width: 120 },
    { field: 'monetaryCorrection', headerName: 'Correção Monetária', width: 150 },
    { 
      field: 'initial', 
      headerName: 'Inicial (R$ '+initialValue+')', 
      width: 130,
      valueGetter: (params) =>
        `${(initialValue*params.row.monetaryCorrection).toFixed(2)}`,
    },
    { 
      field: 'fees', 
      headerName: 'Juros ('+fees*100+'%)', 
      width: 130,
      valueGetter: (params) =>
        `${((initialValue*params.row.monetaryCorrection)+((initialValue*params.row.monetaryCorrection)*fees)).toFixed(2)}`,
    },
    { 
      field: 'penalty', 
      headerName: 'Multa ('+penalty*100+'%)', 
      width: 130,
      valueGetter: (params) =>
        `${((initialValue*params.row.monetaryCorrection)+((initialValue*params.row.monetaryCorrection)*fees)+((initialValue*params.row.monetaryCorrection)*penalty)).toFixed(2)}`, 
    
    },
    { 
      field: 'honorary', 
      headerName: 'Honorários ('+honorary*100+'%)', 
      width: 130, 
      valueGetter: (params) =>
        `${((initialValue*params.row.monetaryCorrection)+((initialValue*params.row.monetaryCorrection)*fees)+((initialValue*params.row.monetaryCorrection)*penalty)+((initialValue*params.row.monetaryCorrection)*honorary)).toFixed(2)}`, 
    },
    
    {
      field: 'total',
      headerName: 'TOTAL',
      description: 'This column has a value getter and is not sortable.',
      sortable: false,
      width: 160,
      valueGetter: (params) =>
        `${((initialValue*params.row.monetaryCorrection)+((initialValue*params.row.monetaryCorrection)*fees)+((initialValue*params.row.monetaryCorrection)*penalty)+((initialValue*params.row.monetaryCorrection)*honorary)).toFixed(2)}`,
    },
  ];
  
  
  useEffect(()=>{

    if(pageSize == 52){
      
      setTimeout(() => {
        window.print();
      }, "2000");
      setTimeout(() => {
        changePageSizeToDefault()
      }, "2000");
      
    }
  }, [pageSize])

  function changePageSizeToDefault(){
    setPageSize(12)
  }

  function changePageSizeToPrint(){  
    setPageSize(52)
  } 

  function handleInitialValue(e){
    setValueInitial(e.target.value)
  }

  function handleFees(e){
    setFees(e.target.value/100)
  }

  function handlePenalty(e){
    setPenalty(e.target.value/100)
  }

  function handleHonorary(e){
    setHonorary(e.target.value/100)
  }

  function handleIsLocked(e){
    setIsLocked(!isLocked)
  }

  function opeFile() {
    // Cria um elemento de input de arquivo invisível
    var input = document.createElement('input');
    input.type = 'file';
  
    // Adiciona um ouvinte de evento para quando um arquivo for selecionado
    input.addEventListener('change', function(event) {
      var file = event.target.files[0];
      // Faça algo com o arquivo selecionado, por exemplo, exiba o nome do arquivo
     
      csvToJson(file, function(jsonResult) {
       
        let auxRows = [];
        jsonResult.forEach(function callback(element, index) {
          const date = element['Data'].split('/');
          auxRows.push({ id: index+1, year:date[2], month: numberToMonth(date[1]), monetaryCorrection: element['Fator (Indice + Taxa)'].replace(',', '.')})
        });
      
        setRows(auxRows)
        setNumberOfPagination(0)
      });
    });
  
    // Clique no botão de arquivo oculto
    input.click();
  }

  

  useEffect(()=>{
    if(rows.length>1){
      let auxCardTotal = []
      let auxYears = []
      let sum = 0
      rows.forEach(function callback(element, index) {
        if(!auxYears.includes(element.year)){
          auxYears.push(element.year)
        }
        let initialValueCorrected = initialValue*element.monetaryCorrection
        sum = ((initialValueCorrected) + (initialValueCorrected*fees) + (initialValueCorrected*penalty) + (initialValueCorrected*honorary)) + sum;  
  
  
      });
  
      auxCardTotal.push(
        <div className="card no-print">
            <MonetizationOnOutlinedIcon sx={{fontSize: 40, color: colors.white}}/>
            <span>{sum.toFixed(2)}</span>
            <p>Total Geral</p>
          </div>
      )
  
      setCardAllYears(auxCardTotal)
  
      setYears(auxYears)
    }
    
  },[rows])


  function sumarizeTotalCurrentYear(){
    let sum = 0
    rows.forEach(function callback(element, index) {
      if(element.year == years[numberOfPagination]){
        let initialValueCorrected = initialValue*element.monetaryCorrection
        sum = ((initialValueCorrected) + (initialValueCorrected*fees) + (initialValueCorrected*penalty) + (initialValueCorrected*honorary)) + sum;  
        console.log(sum)
      }
      
    });

    
    return  sum.toFixed(2)
  }

  useEffect(()=>{
    if(years!=""){
      let auxCardCurrent = []
      const sumTotalYear = sumarizeTotalCurrentYear()
      auxCardCurrent.push(
        <div className="card no-print">
            <MonetizationOnOutlinedIcon sx={{fontSize: 40, color: colors.white}}/>
            <span>{sumTotalYear}</span>
            <p>Total de {years[numberOfPagination]}</p>
          </div>
      )

      setCardCurrentYear(auxCardCurrent)
    }
    
  }, [years])

  useEffect(()=>{
 
    if(years!=""){
      
      let auxCardCurrent = []
      const sumTotalYear = sumarizeTotalCurrentYear()
      auxCardCurrent.push(
        <div className="card no-print">
            <MonetizationOnOutlinedIcon sx={{fontSize: 40, color: colors.white}}/>
            <span>{sumTotalYear}</span>
            <p>Total de {years[numberOfPagination]}</p>
          </div>
      )

      setCardCurrentYear(auxCardCurrent)
    }
  },[numberOfPagination])

  useEffect(()=>{
    if(years!=""){
      let auxCardCurrent = []
      const sumTotalYear = sumarizeTotalCurrentYear()
      auxCardCurrent.push(
        <div className="card no-print">
            <MonetizationOnOutlinedIcon sx={{fontSize: 40, color: colors.white}}/>
            <span>{sumTotalYear}</span>
            <p>Total de {years[numberOfPagination]}</p>
          </div>
      )

      setCardCurrentYear(auxCardCurrent)

      let auxCardTotal = []
      let auxYears = []
      let sum = 0
      rows.forEach(function callback(element, index) {
        if(!auxYears.includes(element.year)){
          auxYears.push(element.year)
        }
        let initialValueCorrected = initialValue*element.monetaryCorrection
        sum = ((initialValueCorrected) + (initialValueCorrected*fees) + (initialValueCorrected*penalty) + (initialValueCorrected*honorary)) + sum;  
  
  
      });
  
      auxCardTotal.push(
        <div className="card no-print">
            <MonetizationOnOutlinedIcon sx={{fontSize: 40, color: colors.white}}/>
            <span>{sum.toFixed(2)}</span>
            <p>Total Geral</p>
          </div>
      )
  
      setCardAllYears(auxCardTotal)
  
      setYears(auxYears)
    }
},[initialValue, fees, honorary, penalty])

  useEffect(()=>{
   

    
    
  }, [years])


  function csvToJson(csv, callback) {
    Papa.parse(csv, {
      header: true,
      complete: function(results) {
        callback(results.data);
      }
    });
  }

  function numberToMonth(number) {
    var months = [
      'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
      'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
    ];
  
    if (number >= 1 && number <= 12) {
      return months[number - 1];
    } 
  }

  function nextPage(e){
    if(numberOfPagination<years.length-1){
      setNumberOfPagination(numberOfPagination+1)
      setSumarize('')
    }
    
  }

  function previusPage(e){
    if(numberOfPagination>0){
      setNumberOfPagination(numberOfPagination-1)
      setSumarize('')

    }
    
  }
  

  
  return(
    <Container>
      <div id="menu" className='no-print'>
      <ButtonMenu startIcon={MenuIcon} fontSizeIcon={'30px'}  bgColor={colors.white}/>
      <div id="buttons-action">
        <ButtonMenu startIcon={UploadFileOutlinedIcon}  fontSizeIcon={'30px'} onClick={opeFile} bgColor={colors.white}/>
        <ButtonMenu startIcon={PrintOutlinedIcon} fontSizeIcon={'30px'} onClick={changePageSizeToPrint}  bgColor={colors.white}/>
      </div>
      
      </div>
      <div id="right-side">
        <header className='no-print'>
            <img src={thumper} alt="" />
            <h1>Thumper</h1>
        </header>
        <div id="content-container">
        <div id="content">
      
        <div id='table'>

        
<DataGridPagination rows={rows} columns={columns} page={numberOfPagination} pageSize={pageSize}/>
</div>
        <div id="buttons-table-container">
          <ButtonPag startIcon={ArrowBackIosIcon} disabled={numberOfPagination<=0? true : false}  fontSizeIcon={20}  variant={"error"} bgColor={"error"} onClick={previusPage}/>
          <ButtonPag startIcon={ArrowForwardIosIcon} disabled={numberOfPagination>=years.length-1 ? true : false} fontSizeIcon={20}  variant={"error"} bgColor={"error"} onClick={nextPage}/>
        </div>
        
         
          
        </div>
        <div id="aside-container" className='no-print'>
          <div id="card-container" className='no-print'>
          {cardCurrentYear}
          {cardAllYears}
          </div>
        
        <div id='input-container' className='no-print'>
          <h3>Entradas</h3>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-amount">Dinheiro</InputLabel>
          <OutlinedInput
            id="outlined-adornment-amount"
            startAdornment={<InputAdornment position="start">R$</InputAdornment>}
            label="Amount"
            value={initialValue} 
            onChange={handleInitialValue}
            disabled={isLocked}
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-fees">Juros</InputLabel>
          <OutlinedInput
            id="outlined-adornment-fees"
            startAdornment={<InputAdornment position="start">%</InputAdornment>}
            label="Fees"
            value={fees*100} 
            onChange={handleFees}
            disabled={isLocked}
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-penalty">Multa</InputLabel>
          <OutlinedInput
            id="outlined-adornment-penalty"
            startAdornment={<InputAdornment position="start">%</InputAdornment>}
            label="Penalty"
            value={penalty*100} 
            onChange={handlePenalty}
            disabled={isLocked}
          />
        </FormControl>
        <FormControl fullWidth sx={{ m: 1 }}>
          <InputLabel htmlFor="outlined-adornment-honorary">Honorários</InputLabel>
          <OutlinedInput
            id="outlined-adornment-honorary"
            startAdornment={<InputAdornment position="start">%</InputAdornment>}
            label="Honorary"
            value={honorary*100} 
            onChange={handleHonorary}
            disabled={isLocked}
          />
        </FormControl>
        <LockButton variant="contained" color={isLocked? "warning" : "success" }  icon={isLocked? EditIcon : EditOffIcon} text={isLocked? 'Desbloquear' :'Bloquear'} onClick={handleIsLocked}/>
        </div>
        </div>

        
        </div>
        
      </div>
    </Container>
  );
}

export default Home;