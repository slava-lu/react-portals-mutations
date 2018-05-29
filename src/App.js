import React, {Component, Fragment} from 'react';
import CatPortal from './CatPortal';
import CatIcon from './CatIcon'

class App extends Component {
// nodeList for nodes that we want to modify by adding a Cat icon next to it
    state = {
        nodeList: []
    };

    componentDidMount() {
        // Add nodes that already exist at time React app is downloaded;
        const nodeList = document.querySelectorAll('.post_about_cat');
        if (nodeList.length > 0) {
            this.setState({
                nodeList
            });
        }

        //Start watching for new specific nodes in outside app that contain class 'post_about_cat'
        const mutationObserver = new MutationObserver(mutations => {
            mutations.forEach(mutation => {
                const newNodes = mutation.addedNodes;
                newNodes.forEach(node => {
                    if (node.classList && node.classList.contains('post_about_cat')) {
                        this.setState(prevState => ({nodeList: [...prevState.nodeList, node]}));
                    }
                });
            });
        });
        mutationObserver.observe(document.body, {
            attributes: false,
            characterData: false,
            childList: true,
            subtree: true,
            attributeOldValue: false,
            characterDataOldValue: false
        });

    }

    render() {
        const nodeList = [...this.state.nodeList];
        const portals = (nodeList.length > 0) ? nodeList.map((node, i) =>
            (
                <CatPortal key={i} node={node}>
                    <CatIcon/>
                </CatPortal>
            )
        ) : null;
        return (
            <Fragment>
                {portals}
            </Fragment>

        );
    }
}

export default App;
