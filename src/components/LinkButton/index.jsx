import React, { Component } from 'react'
import './index.css'
/**
 * 外形像链接的按钮
 */
export default class LinkButton extends Component {
    render() {
        const props = this.props;
        return (
            <button {...props} className="link-button">
                
            </button>
        )
    }
}
