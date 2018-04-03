import React, { Component } from 'react';

class FullArticle extends Component {

    // state = {
    //     article: null
    // };
    //
    // componentDidMount() {
    //     console.log(this.state.article);
    //     console.log(this.props);
    //     this.getArticle();
    // }
    //
    // componentDidUpdate() {
    //     console.log('from componentDidUpdate', this.state.article);
    //     this.getArticle();
    // }
    //
    // getArticle() {
    //     console.log(this.props.match.param.id);
    //     fetch('http://localhost:5000/articles/' + this.props.match.param.id)
    //         .then(res => res.json())
    //         .then(data => {
    //             console.log(data);
    //             this.setState({
    //                 article: data
    //             })
    //         });
    // }

    render() {
        console.log('[In FULLARTICLE]', this.props);
        return (
            <h5>Full Article</h5>
        );
    }
}

export default FullArticle;
