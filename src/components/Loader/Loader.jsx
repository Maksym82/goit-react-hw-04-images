import { LoaderWrapper, LoaderStyled } from './Loader.styled';

export default function Loader() {
  return (
    <LoaderWrapper>
      <LoaderStyled
        height="100"
        width="100"
        color="#4fa94d"
        ariaLabel="audio-loading"
        wrapperStyle={{}}
        wrapperClass="wrapper-class"
        visible={true}
      />
    </LoaderWrapper>
  );
}
