import styled from 'styled-components';
import { colors } from '../GlobalStyles';
import { DataGrid } from '@mui/x-data-grid';
import { Button, OutlinedInput } from '@mui/material';
import { styled as materialStyled } from '@mui/material/styles';
import { red } from '@mui/material/colors';
export const Container = styled.div`
    width: 100%;
    height: 100%;

    display: flex;
 

    @media print {
        margin: 0;
        padding: 0;
    }

    .data-grid-print{
        @media print {
            position: absolute;
            left: 0;
            
        }
    }
  
    
    .no-print{
        @media print {
            display: none;
        }
    }
    #menu{
        padding: calc(0.5rem + 0.5%);
        height: 100%;
        background-color: ${colors.primary.tone800};
        display: flex;
        flex-direction: column;
        gap: calc(5rem + 1vw);
        
        @media (max-width: 1600px){
            flex-direction: column;
        }
    }

    #buttons-action{
        display: flex;
        flex-direction: column;
        gap: calc(0.5rem + 1vw);
        @media print {
            display: none;
            
        }
    }

    #buttons-pagination{
        display: flex;
        gap: 1rem;
        @media print {
            display: none;
            
        }
    }

    #right-side{
        flex-grow: 1;
        background-color: #F3F4F7;
        display: flex;
        flex-direction: column;
    }
    header{
        background-color: ${colors.white};
        width: 100%;
        padding: 0.5rem;
        box-shadow: rgba(33, 35, 38, 0.1) 0px 10px 10px -10px;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 1rem;
        img{
            width: calc(2.5rem + 2vw);
        }
    }

    #content-container{
        flex-grow: 1;
        display: grid;
        
        grid-template-columns: 1fr 1fr;
    }

    #aside-container{
        margin: 2rem;
        margin-left: 0rem;
        padding: 2rem;
        padding-right: calc(2rem - 8px);
        box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px;
        border-radius: 1rem;
        background-color: ${colors.white};
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        @media print {
            display: none;
            
        }
    }

    #card-container{
        padding-left: 8px;
      
        display: flex;
        flex-direction: column;
        gap: 1rem;
    }

    #input-container{
        padding-right: 8px;
        h3{
            font-size: 26px;
            margin-bottom: 1rem;
        }
    }

    .card{
        background-color: #8BC6EC;
background-image: linear-gradient(135deg, #8BC6EC 0%, #9599E2 100%);

        display: flex;
        flex-direction: column;
        align-items: flex-start;
        padding: 1rem;
        border-radius: 1rem;
        box-shadow: rgba(0, 0, 0, 0.15) 0px 2px 8px;
        span{
            font-size: 32px;
            font-weight: 500;
            color: ${colors.white}
        }
        p{
            font-size: 20px;
            color:${colors.white};
            opacity: 0.9;
        }
    }

    #content{
        width: 65vw;
      
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        gap: 1rem;
        background-color: ${colors.white};
        margin: 2rem;
        padding: 2rem;
        box-shadow: rgba(0, 0, 0, 0.18) 0px 2px 4px;
        border-radius: 1rem;
        @media print {
            box-shadow: none;
            
        }

        #table{
            height: 70vh;
        
      
        }

        #buttons-table-container{
            display: flex;
            width: 100%;
            justify-content: flex-end;
            gap: 1rem;
        }

      
    }

   

    #buttons-pagination{
        margin-top: 1rem;
        display: flex;
        justify-content: flex-end;
    }
`;

const ButtonMenuStyle = materialStyled(Button)(({ theme, fontSizeIcon, bgColor}) => ({
    minWidth: '0 !important',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '1rem',

    '&:hover':{
        
    },

 '& .css-8je8zh-MuiTouchRipple-root':{
    width: 'fit-content',
 },

 '& .css-1d6wzja-MuiButton-startIcon':{
    marginRight: '0 !important',
    marginLeft: '0 !important',
  
 },

 '& .css-1d6wzja-MuiButton-startIcon>*:nth-of-type(1)':{
    fontSize: fontSizeIcon,
    color: bgColor,
 }
 
  }));

  export function ButtonMenu({startIcon: StartIcon, fontSizeIcon, onClick, bgColor}){
    return(
        <ButtonMenuStyle
            startIcon={<StartIcon/>}
            fontSizeIcon={fontSizeIcon}
            onClick={onClick}
            bgColor={bgColor}
           
          />
    )
  }


  const ButtonPagStyle = materialStyled(Button)(({ theme, fontSizeIcon, bgColor}) => ({
    minWidth: '0 !important',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '0.5rem',

    '&:hover':{
        
    },

 '& .css-8je8zh-MuiTouchRipple-root':{
    width: 'fit-content',
 },

 '& .css-1d6wzja-MuiButton-startIcon':{
    marginRight: '0 !important',
    marginLeft: '0 !important',
  
 },

 '& .css-1d6wzja-MuiButton-startIcon>*:nth-of-type(1)':{
    fontSize: fontSizeIcon,
    color: bgColor,
 }
 
  }));

  export function ButtonPag({startIcon: StartIcon, fontSizeIcon, onClick, bgColor, disabled, variant}){
    return(
        <ButtonPagStyle
            className='no-print'
            startIcon={<StartIcon/>}
            fontSizeIcon={fontSizeIcon}
            onClick={onClick}
            bgColor={bgColor}
            disabled={disabled}
            variant={variant}
          />
    )
  }


const DataGridPaginationStyle = materialStyled(DataGrid)(({ theme}) => ({
    width: '100%',
    height: '100%',
 
    '& .css-zylse7-MuiButtonBase-root-MuiIconButton-root': {
        display: 'none !important',
      },

      '& .MuiDataGrid-columnHeader': {
        backgroundColor: colors.primary.tone300,
        color: colors.white,
      
      },

  }));

  export function DataGridPagination({rows, columns, page, pageSize}){
    return(
        <DataGridPaginationStyle
            className='data-grid-print'
            rows={rows}
            columns={columns}
            paginationModel={{ page: page, pageSize: pageSize }}
            checkboxSelection
          />
    )
  }

  const LockButtonStyle =  materialStyled(Button)(({theme, tone500, tone700}) => ({
    width: '100%',
    marginTop: '1rem',
    color: theme.palette.getContrastText(tone500),
    backgroundColor: tone500,
    padding: 'calc(0.5rem + 0.2vw) calc(1.25rem + 0.2vw) ',
    fontSize: 'calc(8px + 0.4vw)',
    fontWeight: '600',
    '&:hover': {
      backgroundColor: tone700,
    },
  }));

export function LockButton({text, icon : Icon, onClick, color}){
    const tone500 = color == "warning" ? colors.secondary.tone500 : colors.green.tone500 
    const tone700 = color == "warning" ? colors.secondary.tone700 :  colors.green.tone700 
    return (
    
        <LockButtonStyle variant="contained" color={color} endIcon={<Icon/>} onClick={onClick} tone500={tone500} tone700={tone700}>{text}</LockButtonStyle>
    );  
}


const OutlinedNoMarginButtonStyle =  materialStyled(OutlinedInput)(({ theme}) => ({
   
    
    '& .css-1w4vsez-MuiFormControl-root': {
       
        margin: '0 !important',
        marginLeft: '0 !important',
      },

     
  }));

export function OutlinedNoMarginButton({id, startAdornment, label, value, onChange, disabled}){
    return (
    
        <OutlinedNoMarginButtonStyle fx={{padding: '0px !important'}} id={id} startAdornment={startAdornment} label={label} value={value} onChange={onChange} disabled={disabled}/>
    );  
}

