import React, {Component} from 'react'
import MainMenu from './MainMenu'
import {falcorGraph} from "store/falcorGraph";

import {AvatarUser, LoginMenu, Logo} from './TopMenu'
import {connect} from "react-redux";
import { reduxFalcor } from 'utils/redux-falcor'
import {setActiveCousubid} from 'store/modules/user'
import get from 'lodash.get'
import styled from "styled-components";
import {Link} from "react-router-dom";
// import './menu.css'

class Menu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuDisplay: 'none'
        }
    }
/*    fetchFalcorDeps() {
        if (!this.props.activeGeoid) return Promise.resolve();
        return this.props.falcor.get(
            ['geo', this.props.activeGeoid, 'cousubs']
        )
            .then(response => {
                return this.props.falcor.get(
                    ['geo', [this.props.activeGeoid, ...falcorGraph.getCache().geo[this.props.activeGeoid].cousubs.value], ['name']],
                )
            })
    }*/
    render() {
        if (this.props.menuSettings.hide) return null;
        let geoInfo = get(falcorGraph.getCache(), `geo`, null)
        let allowedGeos = [this.props.activeGeoid, ...get(geoInfo,`${this.props.activeGeoid}.cousubs.value`, [])];
        let currentPath = this.props.menus.filter(p => p.path === this.props.path)[0];


        // let title = currentPath[0] ? currentPath[0].name : ''
        let defaultOptions = {
            'location': 'menu-mobile',
            'color': 'selected-menu-color-light',
            'click': 'menu-activated-on-click',
            'selected': 'menu-has-selected-link',
            'image': this.props.menuSettings.image ? this.props.menuSettings.image : 'menu-with-image',
            'scheme': this.props.menuSettings.scheme ? this.props.menuSettings.scheme : 'color-scheme-dark',
            'style': this.props.menuSettings.style ? this.props.menuSettings.style : 'color-style-transparent',
            'submenucolor': 'sub-menu-color-light',
            'position': this.props.menuSettings.position ? this.props.menuSettings.position : 'menu-position-top',
            'layout': this.props.menuSettings.layout ? this.props.menuSettings.layout : 'menu-layout-full',
            'subemenustyle': 'sub-menu-style-inside'
        };
        /*
        menu-mobile menu-activated-on-click color-scheme-dark

         menu-activated-on-click sub-menu-style-inside
         menu-activated-on-hover sub-menu-style-flyout
        * */
        let displayOptions = Object.values(defaultOptions).join(' ');

        defaultOptions.position === 'menu-position-left'
            ? document.body.classList.add('menu-position-side')
            : document.body.classList.remove('menu-position-side');

        let dynamicStyle = {
            marginBottom: currentPath.subMenus ? 50 : 0,
            position: 'fixed',
            zIndex: 100,
            width: '100%',
            display: 'block'
        };

        defaultOptions.position === 'menu-position-top' ?
            dynamicStyle['width'] = '100vw' : dynamicStyle['height'] = '100vh';

        const DROPDOWN = defaultOptions.scheme === 'color-scheme-dark' ? styled.div`
                        div > select {
                        color: #fff;
                        border: none;
                        font-size: 0.81rem;
                        font-weight: 500;
                        text-transform: uppercase;
                        white-space: nowrap;
                        letter-spacing: 2px;
                        padding: 0px;
                        }
                    ` : styled.div`
                    div > select {
                    color: #3E4B5B;
                    border: none;
                    background: none;
                    font-size: 0.81rem;
                    font-weight: 500;
                    text-transform: uppercase;
                    white-space: nowrap;
                    letter-spacing: 2px;
                    padding: 0px;
                    }
                    `;
            // console.log('menuProps', currentPath, dynamicStyle)
        console.log('user', this.props)
        return (

            <div className={displayOptions} style={dynamicStyle}>
                <div className="mm-logo-buttons-w">
                    <a className="mm-logo" href="/">
                        <Logo/>
                    </a>
                    <div className="mm-buttons">
                        <div className="content-panel-open">
                            <div className="os-icon os-icon-grid-circles"></div>
                        </div>
                        <div className="mobile-menu-trigger" onClick={() => {
                            this.state.menuDisplay === 'none' ?
                                this.setState({menuDisplay: 'block'}) :
                                this.setState({menuDisplay: 'none'})
                        }}>
                            <div className="os-icon os-icon-hamburger-menu-1">
                            </div>
                        </div>

                    </div>
                </div>
                <div className="menu-and-user" style={{display: this.state.menuDisplay}}>
                    {
                        this.props.user && !!this.props.user.authed
                    ?
                            <div className="logged-user-w">
                                <AvatarUser user={this.props.user}/>
                            </div>
                    : null
                    }
                    <ul className="main-menu">
                        <MainMenu {...this.props} />
                        {
                            this.props.user && !!this.props.user.authed
                                ? <li>
                                    <Link to="/logout">
                                        <div className="icon-w">
                                            <div className="os-icon os-icon-signs-11"></div>
                                        </div>
                                        <span>Logout</span>
                                    </Link>
                                </li>
                                : <li>
                                    <LoginMenu/>
                                </li>
                        }
                    </ul>
                </div>


            </div>

        )
    }
}
const mapStateToProps = (state,ownProps) => {
    return {
        geoGraph: state.graph.geo,
        router: state.router,
        activeGeoid: state.user.activeGeoid,
        activeCousubid: state.user.activeCousubid,
    };
};

const mapDispatchToProps = {setActiveCousubid};
export default connect(mapStateToProps, mapDispatchToProps)(reduxFalcor(Menu))