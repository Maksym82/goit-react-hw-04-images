import styled from '@emotion/styled';
import { Audio } from  'react-loader-spinner';

export const LoaderWrapper = styled.div`
    margin: 0 auto;
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: rgba(0, 0, 0, 0.8);
    z-index: 1000;
`;

export const LoaderStyled = styled(Audio)`
    margin: 0 auto;
`;