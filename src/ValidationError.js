import React from 'react';
import PropTypes from 'prop-types';

const ValidationError = (props) => {
    if(props.message) {
        return(
            <div>
                 {props.message}
            </div>
        );
    }
    return <></>
}

ValidationError.propTypes = {
    history: PropTypes.string,
  };

export default ValidationError;