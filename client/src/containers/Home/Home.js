import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllArticles, getMyArticles } from '../../store/actions/articlesActions';
import Article from '../../components/Article/Article';
import WrappedLink from '../../components/WrappedLink/WrappedLink';
import './Home.css';

class Home extends Component {
    state = {
        showMyArticles: false
    }

    componentWillMount() {
        if (this.props.location.pathname === '/article/myarticles' && !this.state.showMyArticles) {
            this.toggleShowMyArticles();
        }
    }

    componentDidMount() {
        this.props.initArticles();
        if (this.props.isAuthenticated) {
            this.props.getMyArticles();
        }
    }

    toggleShowMyArticles = () => {
        this.setState((prevState) => {
            return {
                showMyArticles: !prevState.showMyArticles
            }
        });
    }

    render() {
        let allArticles = this.props.allArticles || JSON.parse(localStorage.getItem('BasicMERNStackAppAllArticles'));
        allArticles = allArticles.map(article => (
            <Article
                key={article._id}
                id={article._id}
                title={article.title} />
        ));

        let myArticles = [];
        if (this.props.isAuthenticated && this.state.showMyArticles) {
            if (this.props.myArticles) {
                myArticles = [...this.props.myArticles];
            } else {
                myArticles = [...JSON.parse(localStorage.getItem('BasicMERNStackAppMyArticles'))]
            }
            myArticles = myArticles.map(article => (
                <Article
                    key={article._id}
                    id={article._id}
                    title={article.title} />
            ));
        }

        const showArticlesLink = <WrappedLink
                to={this.state.showMyArticles ? "/" : "/article/myarticles"}
                buttonClasses={['btn', 'btn-outline-info', 'mr-3', 'MyArticlesButton']}
                onClick={this.toggleShowMyArticles}>
                    { this.state.showMyArticles ? 'All Articles' : 'My Articles' }
                </WrappedLink>

        return (
            <div className="container">
                <br />
                <div className="Header">
                    <h1 style={{display: 'inline-block'}}>All Articles</h1>
                    <WrappedLink to="/article/add" buttonClasses={['btn', 'btn-primary', 'mr-3', 'AddArticleButton']}>Add Article</WrappedLink>
                    {this.props.isAuthenticated && showArticlesLink}
                </div>
                <br />
                <div>
                    <section className="jumbotron">
                        <div className="Articles">
                            { this.state.showMyArticles ? myArticles : allArticles }
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        allArticles: state.articles.articles,
        myArticles: state.articles.myArticles,
        isAuthenticated: state.users.isAuthenticated
    };
};

const mapDispatchToProps = dispatch => {
    return {
        initArticles: () => dispatch(getAllArticles()),
        getMyArticles: () => dispatch(getMyArticles())
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
