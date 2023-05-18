import "./loader.scss";

type Props = {
  children: string | JSX.Element | JSX.Element[];
};

function Loader({ children }: Props) {
  return (
    <div className="loaderWrapper" data-testid="loader">
      <div className="loaderComponent">{children}</div>
    </div>
  );
}

export default Loader;
