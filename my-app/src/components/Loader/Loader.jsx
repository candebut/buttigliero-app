import PropTypes from 'prop-types';
import styles from "./generic-loader.module.css";

function Loader({ size = 'm', overlaid = false, ...rest }) {
    return (
        <div className={styles.loaderWrapper}>
            <div className={styles.loaderComponent}>Loading...</div>
        </div>
    );
}

Loader.propTypes = {
    overlaid: PropTypes.bool,
    size: PropTypes.string,
};

export default Loader;
