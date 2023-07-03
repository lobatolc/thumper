import { createGlobalStyle } from 'styled-components';
import { indigo, amber, lightGreen } from '@mui/material/colors';

export const colors = {
    white: "#FAFAFA",
    black: "#060606",
    gray: "#F4F6F8",
    primary: {tone300: indigo[300], tone500: indigo[500], tone800: indigo[800]},
    secondary: {tone500: amber[500], tone700: amber[700]},
    green: {tone500: lightGreen[500], tone700: lightGreen[700] },
}

export default createGlobalStyle`
    *{
        margin: 0;
        padding: 0;
        outline: 0;
        box-sizing: border-box;
    }
    
    body{
        background-color: #FFFFFF;
        display: flex;
        justify-content: center;
    }

    .App{
        width: 100%;
        height: 100vh;

    }

    p, span, h1, h2,h3 {
        color: ${colors.black};
    }
`;

