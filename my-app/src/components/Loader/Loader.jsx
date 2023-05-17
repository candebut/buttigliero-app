import PropTypes from 'prop-types';
import './loader.scss';

function Loader({ size = 'm', overlaid = false, ...rest }) {
    return (
        <div className="loaderWrapper">
            <div className="loaderComponent">Loading...</div>
        </div>
    );
}

Loader.propTypes = {
    overlaid: PropTypes.bool,
    size: PropTypes.string,
};

export default Loader;
