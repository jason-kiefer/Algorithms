import React, { Component } from 'react';

import { connect } from 'react-redux';

class MyComponent extends Component {

    state = {

    }

    handleClick(evt) {
        evt.preventDefault();
    }

    handleSubmit(evt) {
        evt.preventDefault();
    }

    render() {

        const { myAttr } = this.props;

        return (
            <div className='MyComponentWrapper'>
                <div className='Header' />
                <div className='Body' />
                <div className='Footer' />
            </div>
        )
    }
}

const mapStateToProps = state => {

}

const mapDispatchToProps = {
    
}

export default connect(MyComponent)(MyComponent);