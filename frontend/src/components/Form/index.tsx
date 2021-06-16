import React from 'react';
import { Button } from '@material-ui/core'
import PropTypes from 'prop-types'
import '../../css/style.css'

const Form = ({handleSubmit, children, action, link,...props}) => {
    const onSubmit = (e) => {
        e.preventDefault();
        handleSubmit();
    }

    return (
        <form style={{ width: "100%" }} onSubmit={onSubmit} className={props.classNames}>
            { children}
            <div className="form-button">
                <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    href={link}                       
                >
                    {action}
                </Button>
            </div>
        </form>
    )
} 

Form.propTypes = {
    onSubmit: PropTypes.func,
    className: PropTypes.string,
};

export default Form;