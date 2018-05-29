import {Component} from 'react';
import ReactDOM from 'react-dom';

class CatPortal extends Component {

    render() {
        return ReactDOM.createPortal(this.props.children, this.props.node);
    }
}

export default CatPortal;