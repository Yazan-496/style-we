import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
                     :root {
                       ${(props) => props.root}
                     }
                     
`;

export default GlobalStyle;
